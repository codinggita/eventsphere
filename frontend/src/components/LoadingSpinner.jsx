import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
