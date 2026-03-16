import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const MyEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await axios.get('/api/events');
        // Filter events where user is organizer
        const userEvents = res.data.data.filter(event => 
          (typeof event.organizer === 'string' ? event.organizer === user.id : event.organizer._id === user.id)
        );
        setEvents(userEvents);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching your events');
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [user.id]);

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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-sans">
              My Created Events
            </h1>
            <p className="text-gray-500 mt-2 font-sans">Manage events you've organized</p>
          </div>
          <Link
            to="/events/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/10 font-sans"
          >
            + Create New
          </Link>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-500 px-4 py-3 rounded mb-8 font-sans">
            {error}
          </div>
        )}

        {events.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/20 border border-gray-800 rounded-3xl font-sans">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-xl font-medium text-gray-400 font-sans">You haven't created any events yet</h3>
            <p className="text-gray-500 mt-2 mb-8 font-sans">Start organizing your first event today!</p>
            <Link
              to="/events/create"
              className="text-blue-500 hover:underline font-medium font-sans"
            >
              Create your first event →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="group bg-gray-900/40 rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all flex flex-col font-sans"
              >
                <div className="relative h-48">
                  <img
                    src={event.image || 'https://via.placeholder.com/400x200?text=Event+Image'}
                    alt={event.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase border border-gray-700">
                    {event.category}
                  </div>
                </div>
                
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <div className="space-y-2 text-sm text-gray-500 mb-6 font-sans">
                    <div className="flex items-center">
                      <span className="mr-2 opacity-70">📅</span>
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 opacity-70">👤</span>
                      {event.attendees.length} Attendees
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex space-x-3 mt-auto font-sans">
                  <Link
                    to={`/events/${event._id}`}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-center py-2 rounded-lg text-sm font-bold transition-all border border-gray-700"
                  >
                    View
                  </Link>
                  <Link
                    to={`/events/${event._id}/edit`}
                    className="flex-1 bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 text-center py-2 rounded-lg text-sm font-bold transition-all border border-blue-500/20"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyEvents;
