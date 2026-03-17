import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';

const StatCard = ({ icon, label, value, gradient, linkTo, linkLabel, loading }) => (
  <div className={`relative rounded-2xl p-6 overflow-hidden ${gradient} shadow-xl`}>
    {/* Decorative glow circle */}
    <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full blur-xl" />
    <div className="relative z-10">
      <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center mb-4 text-white text-xl">
        {icon}
      </div>
      {loading ? (
        <div className="h-9 w-16 bg-white/20 rounded-lg animate-pulse mb-1" />
      ) : (
        <div className="text-3xl font-black text-white mb-1">{value}</div>
      )}
      <div className="text-white/70 text-sm font-medium">{label}</div>
      {linkTo && (
        <Link
          to={linkTo}
          className="inline-flex items-center gap-1 mt-4 text-xs font-bold text-white/80 hover:text-white transition-colors"
        >
          {linkLabel}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      )}
    </div>
  </div>
);

const DashboardStats = () => {
  const { token, user } = useAuth();
  const [myEventsCount, setMyEventsCount] = useState(0);
  const [registrationsCount, setRegistrationsCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [eventsRes, regsRes, savedRes] = await Promise.allSettled([
          userService.getMyEvents(token),
          userService.getMyRegistrations(token),
          userService.getSavedEvents(token),
        ]);

        if (eventsRes.status === 'fulfilled') setMyEventsCount(eventsRes.value.data?.length ?? 0);
        if (regsRes.status === 'fulfilled') setRegistrationsCount(regsRes.value.data?.length ?? 0);
        if (savedRes.status === 'fulfilled') setSavedCount(savedRes.value.data?.length ?? 0);
      } catch (err) {
        console.error('DashboardStats fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchStats();
  }, [token]);

  const stats = [
    {
      icon: '📅',
      label: 'Events Created',
      value: myEventsCount,
      gradient: 'bg-gradient-to-br from-blue-600 to-indigo-700',
      linkTo: '/my-events',
      linkLabel: 'Manage events',
    },
    {
      icon: '🎟️',
      label: 'Registrations',
      value: registrationsCount,
      gradient: 'bg-gradient-to-br from-purple-600 to-pink-700',
      linkTo: '/my-registrations',
      linkLabel: 'View registrations',
    },
    {
      icon: '❤️',
      label: 'Saved Events',
      value: savedCount,
      gradient: 'bg-gradient-to-br from-emerald-600 to-teal-700',
      linkTo: '/saved-events',
      linkLabel: 'View saved',
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-widest text-xs">
        Your Activity
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} loading={loading} />
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
