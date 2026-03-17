import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.png';
import DashboardStats from '../components/DashboardStats';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6 md:p-12">

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="glass-panel p-6 rounded-2xl">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Info</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 dark:text-slate-400 mb-1">Name</div>
                  <div className="text-gray-900 dark:text-slate-200 font-medium">{user?.name}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 dark:text-slate-400 mb-1">Email</div>
                  <div className="text-gray-900 dark:text-slate-200 font-medium">{user?.email}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 dark:text-slate-400 mb-2">Interests</div>
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Welcome to your Dashboard</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
                You've successfully authenticated! Start exploring events, managing your creations, or checking your registrations.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/events')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
                >
                  Explore Events
                </button>
                <button 
                  onClick={() => navigate('/events/create')}
                  className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
                >
                  Create New Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
