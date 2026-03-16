import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="relative w-full max-w-xl group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span className="text-gray-500 group-focus-within:text-blue-500 transition-colors duration-300">
          🔍
        </span>
      </div>
      <input
        type="text"
        placeholder="Search events by title or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full pl-11 pr-4 py-4 bg-gray-900/40 border border-gray-800 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 text-white placeholder-gray-500 font-sans backdrop-blur-sm"
      />
    </div>
  );
};

export default SearchBar;
