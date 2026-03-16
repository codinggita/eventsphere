import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ConnectButton = ({ userId }) => {
  const [status, setStatus] = useState('idle'); // idle, loading, pending
  const { token } = useAuth();

  const handleConnect = async () => {
    try {
      setStatus('loading');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.post(`/api/users/connect/${userId}`, {}, config);
      setStatus('pending');
    } catch (error) {
      console.error('Connection error:', error);
      setStatus('idle');
    }
  };

  if (status === 'pending') {
    return (
      <button disabled className="bg-gray-800 text-gray-500 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border border-white/5">
        Pending
      </button>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={status === 'loading'}
      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border border-white/10 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
    >
      {status === 'loading' ? 'Processing...' : 'Connect'}
    </button>
  );
};

export default ConnectButton;
