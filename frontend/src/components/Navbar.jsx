import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-sans">
                EventSphere
              </span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/events" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-sans">
                  All Events
                </Link>
                {user && (
                  <>
                    <Link to="/my-events" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-sans">
                      My Events
                    </Link>
                    <Link to="/events/create" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-sans">
                      Create Event
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm font-sans">Hello, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600/20 hover:bg-red-600/30 text-red-500 px-4 py-2 rounded-lg text-sm font-medium transition-all font-sans"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-sans">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all font-sans"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
