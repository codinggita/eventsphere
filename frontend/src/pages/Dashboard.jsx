import React from 'react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 glass-panel p-4 rounded-xl">
          <div className="flex items-center gap-4">
            <img src={logo} alt="EventSphere Logo" className="w-12 h-12 object-contain rounded-full border border-brand-500/50 shadow-md" />
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">EventSphere</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-sm border border-brand-400">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <button 
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <h2 className="text-lg font-semibold text-white mb-4">Profile Info</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Name</div>
                  <div className="text-slate-200 font-medium">{user?.name}</div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-400 mb-1">Email</div>
                  <div className="text-slate-200 font-medium">{user?.email}</div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-400 mb-2">Interests</div>
                  <div className="flex flex-wrap gap-2">
                    {user?.interests && user.interests.length > 0 ? (
                      user.interests.map((interest, idx) => (
                        <span key={idx} className="px-2 py-1 rounded-md bg-brand-500/20 text-brand-300 text-xs border border-brand-500/30">
                          {interest}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-500 italic text-sm">No interests added</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="glass-panel p-6 rounded-2xl h-full min-h-[300px] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-500/20 flex items-center justify-center mb-4 border border-brand-500/30">
                <svg className="w-8 h-8 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Welcome to your Dashboard</h2>
              <p className="text-slate-400 max-w-md">
                You've successfully authenticated! The main event features would go here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
