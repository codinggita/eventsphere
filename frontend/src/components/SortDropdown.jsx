import React from 'react';

const SortDropdown = ({ activeSort, onSortChange }) => {
  const options = [
    { id: '-createdAt', label: 'Newest First' },
    { id: 'createdAt', label: 'Oldest First' },
    { id: '-date', label: 'Upcoming Soon' },
    { id: 'title', label: 'Alphabetical (A-Z)' },
  ];

  return (
    <div className="relative inline-block w-full md:w-64 group">
      <select
        value={activeSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="block w-full px-4 py-4 bg-gray-900/40 border border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 text-white font-sans backdrop-blur-sm appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.id} value={opt.id} className="bg-gray-900 text-white">
            Sort by: {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-500">
        <span>▼</span>
      </div>
    </div>
  );
};

export default SortDropdown;
