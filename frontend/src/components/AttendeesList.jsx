import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConnectButton from './ConnectButton';
import { useAuth } from '../context/AuthContext';

const AttendeesList = ({ eventId, mutualInterestsOnly = false }) => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        setLoading(true);
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const res = await axios.get(`/api/events/${eventId}/attendees`, config);
        
        let filteredAttendees = res.data.data;

        // Filter out current user
        filteredAttendees = filteredAttendees.filter(a => a._id !== user.id);

        if (mutualInterestsOnly && user?.interests) {
          filteredAttendees = filteredAttendees.filter(attendee => 
            attendee.interests.some(interest => user.interests.includes(interest))
          );
        }

        setAttendees(filteredAttendees);
      } catch (error) {
        console.error('Error fetching attendees:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchAttendees();
  }, [eventId, token, mutualInterestsOnly, user]);

  if (loading) return <div className="text-gray-500 animate-pulse">Loading networking opportunities...</div>;
  if (attendees.length === 0) return (
    <div className="text-gray-500 py-4 text-sm font-sans italic">
      {mutualInterestsOnly ? "No attendees with mutual interests yet." : "Be the first to join the conversation!"}
    </div>
  );

  return (
    <div className="space-y-4">
      {attendees.map((attendee) => {
        const sharedInterests = attendee.interests.filter(i => user?.interests?.includes(i));
        
        return (
          <div key={attendee._id} className="bg-gray-800/20 rounded-2xl p-4 border border-gray-800 flex items-center justify-between hover:border-gray-700 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg">
                {attendee.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-white">{attendee.name}</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {sharedInterests.slice(0, 2).map(si => (
                    <span key={si} className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
                      Mutual: {si}
                    </span>
                  ))}
                  {attendee.interests.length > sharedInterests.length && (
                    <span className="text-[10px] text-gray-500 px-1">+{attendee.interests.length - sharedInterests.length} more</span>
                  )}
                </div>
              </div>
            </div>
            <ConnectButton userId={attendee._id} />
          </div>
        );
      })}
    </div>
  );
};

export default AttendeesList;
