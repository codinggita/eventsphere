import React from 'react';

const RegisterButton = ({ isRegistered, onRegister, onUnregister, loading, capacityReached, isOrganizer }) => {
  if (isOrganizer) return null;

  if (isRegistered) {
    return (
      <button
        onClick={onUnregister}
        disabled={loading}
        className="w-full md:w-auto px-12 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl font-sans bg-green-600/20 text-green-500 border border-green-500/50 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 group"
      >
        <span className="group-hover:hidden">{loading ? 'Processing...' : 'Registered'}</span>
        <span className="hidden group-hover:inline text-red-500">{loading ? 'Processing...' : 'Unregister?'}</span>
      </button>
    );
  }

  if (capacityReached) {
    return (
      <button
        disabled
        className="w-full md:w-auto px-12 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl font-sans bg-gray-800 text-gray-500 cursor-not-allowed"
      >
        Full Capacity
      </button>
    );
  }

  return (
    <button
      onClick={onRegister}
      disabled={loading}
      className="w-full md:w-auto px-12 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl font-sans bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/40 text-white disabled:opacity-50"
    >
      {loading ? 'Processing...' : 'Register Now'}
    </button>
  );
};

export default RegisterButton;
