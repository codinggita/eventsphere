import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import userService from '../services/userService';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import EmptyState from '../components/EmptyState';

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
          <EmptyState
            type="bookmark"
            title="No saved events yet"
            description="You haven't bookmarked any events. Explore events and tap the bookmark icon to save them for later."
            actionLabel="Explore Events"
            onAction={() => window.location.href = '/events'}
          />
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
