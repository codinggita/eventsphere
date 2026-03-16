import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookmarkButton from './BookmarkButton';
import CountdownTimer from './CountdownTimer';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';

const EventCard = ({ event }) => {
  const { _id, title, date, location, category, image, attendees, capacity } = event;
  const { user, token } = useAuth();
  const [isSaved, setIsSaved] = useState(user?.savedEvents?.includes(_id));
  const [loading, setLoading] = useState(false);

  const handleToggleSave = async () => {
    if (!user) return alert('Please login to save events');
    
    try {
      setLoading(true);
      if (isSaved) {
        await userService.unsaveEvent(_id, token);
        setIsSaved(false);
      } else {
        await userService.saveEvent(_id, token);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 transition-all hover:scale-[1.02] flex flex-col font-sans relative shadow-sm hover:shadow-xl">
      <Link to={`/events/${_id}`} className="block h-48 overflow-hidden relative">
        <img
          src={image || 'https://via.placeholder.com/400x200?text=Event+Image'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
          {category}
        </div>
        <div className="absolute bottom-4 left-4">
          <CountdownTimer targetDate={date} size="small" />
        </div>
      </Link>

      <div className="absolute top-4 right-4 z-10">
        <BookmarkButton isSaved={isSaved} onToggle={handleToggleSave} loading={loading} />
      </div>
      
      <Link to={`/events/${_id}`} className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        
        <div className="flex flex-col space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <span className="mr-2">📅</span>
            {new Date(date).toLocaleDateString(undefined, {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
          <div className="flex items-center">
            <span className="mr-2">📍</span>
            {location}
          </div>
          <div className="flex items-center">
            <span className="mr-2">👥</span>
            {attendees.length} / {capacity} registered
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
