import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/events/${id}`);
        setEvent(res.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching event details');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setRegistering(true);
      const res = await axios.post(`/api/events/${id}/register`);
      setEvent(res.data.data);
      setRegistering(false);
      alert('Successfully registered for the event!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering for event');
      setRegistering(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await axios.delete(`/api/events/${id}`);
      navigate('/events');
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting event');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error || 'Event not found'}</h2>
          <Link to="/events" className="text-blue-500 hover:underline">Back to Events</Link>
        </div>
      </div>
    );
  }

  const isOrganizer = user && event.organizer && (user.id === event.organizer._id || user.id === event.organizer);
  const isRegistered = user && event.attendees.some(attendee => 
    (typeof attendee === 'string' ? attendee === user.id : attendee._id === user.id)
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 text-gray-400 hover:text-white flex items-center transition-colors font-sans"
        >
          <span className="mr-2">←</span> Back
        </button>

        <div className="bg-gray-900/40 rounded-3xl border border-gray-800 overflow-hidden backdrop-blur-sm">
          <div className="relative h-96 w-full">
            <img 
              src={event.image || 'https://via.placeholder.com/1200x600?text=Event+Banner'} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6 bg-blue-600 text-white font-bold px-4 py-2 rounded-full uppercase text-sm tracking-wider">
              {event.category}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
              <div className="mb-6 md:mb-0">
                <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-gray-400 font-sans">
                  <div className="flex items-center">
                    <span className="mr-2">📅</span>
                    {new Date(event.date).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    {event.location}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end w-full md:w-auto">
                {isOrganizer ? (
                  <div className="flex space-x-3">
                    <Link 
                      to={`/edit-event/${event._id}`}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-bold transition-all font-sans"
                    >
                      Edit Event
                    </Link>
                    <button 
                      onClick={handleDelete}
                      className="bg-red-900/30 hover:bg-red-900/50 text-red-500 px-6 py-3 rounded-xl font-bold transition-all border border-red-900/50 font-sans"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleRegister}
                    disabled={isRegistered || event.attendees.length >= event.capacity || registering}
                    className={`w-full md:w-auto px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg font-sans ${
                      isRegistered 
                        ? 'bg-green-600/20 text-green-500 border border-green-500/50 cursor-default'
                        : event.attendees.length >= event.capacity
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/20 text-white'
                    }`}
                  >
                    {registering ? 'Processing...' : isRegistered ? 'Registered' : event.attendees.length >= event.capacity ? 'Full Capacity' : 'Register Now'}
                  </button>
                )}
                <p className="mt-3 text-sm text-gray-500 font-sans">
                  {event.capacity - event.attendees.length} spots remaining out of {event.capacity}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-12 border-t border-gray-800 pt-10">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-6">About this event</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
                  {event.description}
                </p>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-4 font-sans">Organizer</h3>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold mr-4 font-sans">
                      {event.organizer?.name?.charAt(0) || 'O'}
                    </div>
                    <div>
                      <p className="font-bold font-sans">{event.organizer?.name || 'Unknown'}</p>
                      <p className="text-sm text-gray-500 font-sans">Event Organizer</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-4 font-sans">Attendees</h3>
                  <div className="bg-gray-800/20 rounded-2xl p-4 border border-gray-800 font-sans">
                    <p className="text-3xl font-bold mb-1">{event.attendees.length}</p>
                    <p className="text-sm text-gray-500">People attending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;
