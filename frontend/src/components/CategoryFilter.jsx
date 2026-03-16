import React from 'react';

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', label: 'All Events', icon: '🌟' },
    { id: 'workshop', label: 'Workshops', icon: '💻' },
    { id: 'hackathon', label: 'Hackathons', icon: '🚀' },
    { id: 'conference', label: 'Conferences', icon: '🎤' },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id === 'all' ? '' : cat.id)}
          className={`flex items-center px-6 py-3 rounded-2xl font-bold transition-all duration-300 font-sans border ${
            (activeCategory === cat.id || (activeCategory === '' && cat.id === 'all'))
              ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
              : 'bg-gray-900/40 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-gray-300'
          }`}
        >
          <span className="mr-2">{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
