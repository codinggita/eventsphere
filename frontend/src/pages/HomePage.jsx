import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TrendingEvents from '../components/TrendingEvents';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white font-sans overflow-x-hidden transition-colors duration-300">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center space-y-10">
          <div className="inline-block px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 font-bold text-xs uppercase tracking-[0.3em] mb-4 animate-fade-in">
            Seamless Event Discovery
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] max-w-5xl mx-auto text-gray-900 dark:text-white">
            Experience <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-500 dark:to-pink-500">Extraordinary</span> Events.
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            Join the most exclusive workshops, conferences, and hackathons. Discover, register, and engage with a global community.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <button 
              onClick={() => navigate('/events')}
              className="w-full sm:w-auto px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/20 transition-all hover:scale-105"
            >
              Explore All Events
            </button>
            {!user && (
              <button 
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto px-12 py-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 text-gray-900 dark:text-white rounded-2xl font-bold text-lg transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Join EventSphere
              </button>
            )}
          </div>

          {/* Hero Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-12">
            {[
              { value: '1,000+', label: 'Events' },
              { value: '500+', label: 'Hosts' },
              { value: '10,000+', label: 'Attendees' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-32 pb-32">
        <TrendingEvents />

        {/* Categories Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link 
              to="/events?category=workshop" 
              className="group relative h-64 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 p-10 flex flex-col justify-end transition-all hover:border-blue-500/40"
            >
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">💻</div>
              <h3 className="text-2xl font-black mb-1">Workshops</h3>
              <p className="text-gray-500 text-sm">Level up your skills</p>
            </Link>
            
            <Link 
              to="/events?category=hackathon" 
              className="group relative h-64 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 p-10 flex flex-col justify-end transition-all hover:border-purple-500/40"
            >
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">🚀</div>
              <h3 className="text-2xl font-black mb-1">Hackathons</h3>
              <p className="text-gray-500 text-sm">Build the future</p>
            </Link>
            
            <Link 
              to="/events?category=conference" 
              className="group relative h-64 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 p-10 flex flex-col justify-end transition-all hover:border-pink-500/40"
            >
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">🎤</div>
              <h3 className="text-2xl font-black mb-1">Conferences</h3>
              <p className="text-gray-500 text-sm">Network with experts</p>
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Ready to host your own event?</h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-10 opacity-80">
            EventSphere gives you all the tools to manage registrations, track attendees, and create a premium experience.
          </p>
          <button 
            onClick={() => navigate('/events/create')}
            className="px-12 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl"
          >
            Get Started for Free
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
