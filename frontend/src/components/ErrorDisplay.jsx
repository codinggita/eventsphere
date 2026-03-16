import React from 'react';
import { Link } from 'react-router-dom';

const ErrorDisplay = ({ message, retryHandler }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="bg-red-900/10 border border-red-500/20 rounded-3xl p-8 backdrop-blur-sm">
        <div className="text-5xl mb-6">⚠️</div>
        <h2 className="text-2xl font-bold text-red-500 mb-4 font-sans">Something went wrong</h2>
        <p className="text-gray-400 mb-8 font-sans">{message || "We couldn't load the information you requested."}</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {retryHandler && (
            <button 
              onClick={retryHandler}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all font-sans"
            >
              Try Again
            </button>
          )}
          <Link 
            to="/events" 
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all font-sans"
          >
            Back to Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
