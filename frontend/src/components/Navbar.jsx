import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'All Events', path: '/events' },
    { name: 'My Events', path: '/my-events', protected: true },
    { name: 'My Registrations', path: '/my-registrations', protected: true },
    { name: 'Saved Events', path: '/saved-events', protected: true },
    { name: 'Create Event', path: '/events/create', protected: true },
  ];

  return (
    <nav className="bg-white/80 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white italic">E</div>
              <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-500">
                EventSphere
              </span>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                (!link.protected || user) && (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white px-3 py-2 rounded-xl text-sm font-bold transition-all"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input 
                type="text"
                placeholder="Search events..."
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/events?keyword=${e.target.value}`)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <div className="hidden md:flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active User</span>
                    <span className="text-sm font-black text-gray-900 dark:text-white">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-red-500/20 transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-bold text-sm px-4 py-2">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-blue-500/20 transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out border-t border-gray-100 dark:border-gray-800 ${isOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-white dark:bg-black">
          {navLinks.map((link) => (
            (!link.protected || user) && (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white px-4 py-3 rounded-xl text-base font-bold"
              >
                {link.name}
              </Link>
            )
          ))}
          {!user && (
            <div className="pt-4 flex flex-col gap-2">
              <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-3 text-gray-600 dark:text-gray-400 font-bold border border-gray-200 dark:border-gray-800 rounded-xl">
                Login
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full text-center py-3 bg-blue-600 text-white font-bold rounded-xl">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
