import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const { _id, title, date, location, category, image, attendees, capacity } = event;

  return (
    <Link
      to={`/events/${_id}`}
      className="group bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all hover:scale-[1.02] flex flex-col font-sans"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || 'https://via.placeholder.com/400x200?text=Event+Image'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
          {category}
        </div>
      </div>
      
      <div className="p-6 flex-grow">
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
      </div>
    </Link>
  );
};

export default EventCard;
