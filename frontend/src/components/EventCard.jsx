import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookmarkButton from './BookmarkButton';
import CountdownTimer from './CountdownTimer';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';

const CATEGORY_STYLES = {
  workshop:    { bg: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' },
  hackathon:   { bg: 'bg-purple-500/20 text-purple-400 border border-purple-500/30' },
  conference:  { bg: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
  seminar:     { bg: 'bg-amber-500/20 text-amber-400 border border-amber-500/30' },
  meetup:      { bg: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' },
  other:       { bg: 'bg-gray-500/20 text-gray-400 border border-gray-500/30' },
};

const AVATAR_COLORS = [
  'bg-indigo-500', 'bg-purple-500', 'bg-pink-500',
  'bg-blue-500', 'bg-emerald-500', 'bg-amber-500',
];

const AttendeeAvatars = ({ attendees = [] }) => {
  const max = 3;
  const shown = attendees.slice(0, max);
  const extra = attendees.length - max;

  if (attendees.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {shown.map((attendee, i) => {
          const initial = (attendee?.name || attendee?.email || '?')[0].toUpperCase();
          const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
          return (
            <div
              key={i}
              className={`w-7 h-7 rounded-full ${color} border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-[10px] font-bold`}
              title={attendee?.name || attendee?.email || 'Attendee'}
            >
              {initial}
            </div>
          );
        })}
        {extra > 0 && (
          <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-300 text-[9px] font-bold">
            +{extra}
          </div>
        )}
      </div>
      <span className="text-xs text-gray-500">{attendees.length} attending</span>
    </div>
  );
};

const EventCard = ({ event }) => {
  const { _id, title, date, location, category, image, attendees = [], capacity, price } = event;
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

  const catKey = category?.toLowerCase() || 'other';
  const catStyle = CATEGORY_STYLES[catKey] || CATEGORY_STYLES.other;
  const isFree = !price || price === 0;

  return (
    <div className="group bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-indigo-500/50 transition-all duration-300 hover:scale-[1.025] flex flex-col font-sans relative shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10">
      {/* Image */}
      <Link to={`/events/${_id}`} className="block h-48 overflow-hidden relative">
        <img
          src={image || 'https://via.placeholder.com/400x200?text=Event+Image'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Gradient overlay for bottom readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Category badge - top left */}
        <div className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full capitalize backdrop-blur-sm ${catStyle.bg}`}>
          {category}
        </div>

        {/* Price badge - top right alongside bookmark */}
        <div className="absolute top-3 right-12">
          {isFree ? (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
              Free
            </span>
          ) : (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-sm">
              ${price}
            </span>
          )}
        </div>

        {/* Countdown - bottom left */}
        <div className="absolute bottom-3 left-3">
          <CountdownTimer targetDate={date} size="small" />
        </div>
      </Link>

      {/* Bookmark button */}
      <div className="absolute top-3 right-3 z-10">
        <BookmarkButton isSaved={isSaved} onToggle={handleToggleSave} loading={loading} />
      </div>

      {/* Content */}
      <Link to={`/events/${_id}`} className="p-5 flex-grow flex flex-col gap-3">
        <h3 className="text-base font-bold leading-snug group-hover:text-indigo-500 transition-colors line-clamp-2">
          {title}
        </h3>

        <div className="flex flex-col gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <span>📅</span>
            {new Date(date).toLocaleDateString(undefined, {
              weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
            })}
          </div>
          <div className="flex items-center gap-1.5">
            <span>📍</span>
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>👥</span>
            {attendees.length} / {capacity} registered
          </div>
        </div>

        {/* Attendee avatars */}
        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
          <AttendeeAvatars attendees={attendees} />
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
