import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import userService from '../services/userService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const SavedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchSavedEvents = async () => {
    try {
      setLoading(true);
      const response = await userService.getSavedEvents(token);
      setEvents(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching saved events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchSavedEvents();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col space-y-4 mb-12">
          <h1 className="text-4xl font-black bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent">
            Saved Events
          </h1>
          <p className="text-gray-500">Your curated list of upcoming experiences</p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorDisplay message={error} retryHandler={fetchSavedEvents} />
        ) : events.length === 0 ? (
          <div className="text-center py-32 bg-gray-900/20 rounded-3xl border border-gray-800 backdrop-blur-sm">
            <div className="text-6xl mb-6 opacity-20">❤️</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No saved events</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              You haven't bookmarked any events yet. Explore events and tap the heart icon to save them for later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedEvents;
