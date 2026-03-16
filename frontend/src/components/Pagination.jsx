import React from 'react';
import { generatePageRange, scrollToTop } from '../utils/paginationUtils';

const Pagination = ({ pagination, onPageChange }) => {
  const { page, totalPages, total } = pagination;

  if (totalPages <= 1) return null;

  const pages = generatePageRange(page, totalPages);

  const handlePageClick = (p) => {
    if (p !== '...' && p !== page) {
      onPageChange(p);
      scrollToTop();
    }
  };

  return (
    <div className="flex flex-col items-center mt-16 space-y-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageClick(page - 1)}
          disabled={page === 1}
          className="p-3 rounded-xl bg-gray-900/40 border border-gray-800 text-gray-400 hover:text-blue-500 hover:border-blue-500/50 disabled:opacity-30 disabled:hover:border-gray-800 disabled:hover:text-gray-400 transition-all font-sans"
        >
          ← Previous
        </button>

        <div className="flex space-x-2">
          {pages.map((p, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(p)}
              className={`w-12 h-12 rounded-xl border font-bold transition-all duration-300 font-sans ${
                p === page
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : p === '...'
                  ? 'border-transparent text-gray-600 cursor-default'
                  : 'bg-gray-900/40 border-gray-800 text-gray-400 hover:border-blue-500/50 hover:text-blue-500'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageClick(page + 1)}
          disabled={page === totalPages}
          className="p-3 rounded-xl bg-gray-900/40 border border-gray-800 text-gray-400 hover:text-blue-500 hover:border-blue-500/50 disabled:opacity-30 disabled:hover:border-gray-800 disabled:hover:text-gray-400 transition-all font-sans"
        >
          Next →
        </button>
      </div>
      
      <p className="text-gray-500 text-sm font-sans">
        Showing {total} results
      </p>
    </div>
  );
};

export default Pagination;
