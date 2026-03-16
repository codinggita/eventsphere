import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import userService from '../services/userService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const MyRegistrations = () => {
  const { token } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const res = await userService.getMyRegistrations(token);
      setRegistrations(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching your registrations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <ErrorDisplay message={error} retryHandler={fetchRegistrations} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-sans">
            My Registrations
          </h1>
          <p className="text-gray-500 mt-2 font-sans">Events you've signed up for</p>
        </div>

        {registrations.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/20 border border-gray-800 rounded-3xl font-sans">
            <div className="text-5xl mb-4">🎟️</div>
            <h3 className="text-xl font-medium text-gray-400 font-sans">No registrations yet</h3>
            <p className="text-gray-500 mt-2 mb-8 font-sans">Explore upcoming events and join the fun!</p>
            <Link
              to="/events"
              className="text-blue-500 hover:underline font-medium font-sans"
            >
              Browse all events →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {registrations.map((event) => (
              <div
                key={event._id}
                className="group bg-gray-900/40 rounded-2xl overflow-hidden border border-gray-800 hover:border-green-500/30 transition-all flex flex-col font-sans"
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
                  <div className="absolute top-4 left-4 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase shadow-lg">
                    REGISTERED
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
                      <span className="mr-2 opacity-70">📍</span>
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 opacity-70">👤</span>
                      Organizer: {event.organizer?.name || 'Unknown'}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto font-sans">
                  <Link
                    to={`/events/${event._id}`}
                    className="block w-full bg-green-600/10 hover:bg-green-600/20 text-green-500 text-center py-3 rounded-xl text-sm font-bold transition-all border border-green-500/20"
                  >
                    View Details
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

export default MyRegistrations;
