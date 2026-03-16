import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import eventService from '../services/eventService';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Using the newly added getAllEvents from service
        const response = await eventService.getEvents();
        
        // Filtering locally for simplicity since getEvents doesn't handle query params in service yet
        let filteredEvents = response.data;
        if (category) {
          filteredEvents = filteredEvents.filter(e => e.category === category);
        }
        
        setEvents(filteredEvents);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Upcoming Events
          </h1>
          
          <div className="flex items-center space-x-4">
            <label htmlFor="category" className="text-gray-400 text-sm font-medium">Filter by:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-all outline-none font-sans"
            >
              <option value="">All Categories</option>
              <option value="workshop">Workshop</option>
              <option value="hackathon">Hackathon</option>
              <option value="conference">Conference</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500 text-red-500 px-4 py-3 rounded mb-6 font-sans">
            {error}
          </div>
        )}

        {events.length === 0 ? (
          <div className="text-center py-20 bg-gray-900/30 rounded-2xl border border-gray-800 font-sans">
            <h3 className="text-xl font-medium text-gray-400">No events found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or check back later.</p>
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

export default EventsList;
