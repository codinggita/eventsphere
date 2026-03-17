import React from 'react';

const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col shadow-sm animate-pulse">
    {/* Image area */}
    <div className="h-48 bg-gray-200 dark:bg-gray-800 relative">
      {/* Category badge placeholder */}
      <div className="absolute top-4 left-4 h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
      {/* Countdown badge placeholder */}
      <div className="absolute bottom-4 left-4 h-5 w-28 bg-gray-300 dark:bg-gray-700 rounded-full" />
    </div>

    {/* Content area */}
    <div className="p-6 flex-grow space-y-4">
      {/* Title */}
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-4/5" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/5" />

      {/* Meta rows */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        </div>
      </div>

      {/* Attendee avatars */}
      <div className="flex items-center gap-2 pt-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900"
            style={{ marginLeft: i > 0 ? '-8px' : '0' }}
          />
        ))}
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 ml-2" />
      </div>
    </div>
  </div>
);

const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
