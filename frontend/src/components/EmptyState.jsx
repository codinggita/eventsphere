import React from 'react';

const illustrations = {
  search: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 h-40">
      <circle cx="88" cy="88" r="52" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-indigo-400/30" />
      <circle cx="88" cy="88" r="36" stroke="currentColor" strokeWidth="4" strokeDasharray="6 4" className="text-indigo-400/20" />
      <path d="M128 128 L160 160" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-indigo-400/40" />
      <path d="M76 82 Q88 70 100 82" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-indigo-400/50" />
      <circle cx="80" cy="90" r="4" fill="currentColor" className="text-indigo-400/60" />
      <circle cx="96" cy="90" r="4" fill="currentColor" className="text-indigo-400/60" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 h-40">
      <rect x="30" y="45" width="140" height="120" rx="12" stroke="currentColor" strokeWidth="8" className="text-indigo-400/30" />
      <path d="M30 75 L170 75" stroke="currentColor" strokeWidth="6" className="text-indigo-400/30" />
      <path d="M70 30 L70 60" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-indigo-400/50" />
      <path d="M130 30 L130 60" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-indigo-400/50" />
      <rect x="55" y="95" width="22" height="18" rx="4" fill="currentColor" className="text-indigo-400/40" />
      <rect x="89" y="95" width="22" height="18" rx="4" fill="currentColor" className="text-indigo-400/20" />
      <rect x="123" y="95" width="22" height="18" rx="4" fill="currentColor" className="text-indigo-400/20" />
      <rect x="55" y="125" width="22" height="18" rx="4" fill="currentColor" className="text-indigo-400/20" />
      <rect x="89" y="125" width="22" height="18" rx="4" fill="currentColor" className="text-indigo-400/40" />
    </svg>
  ),
  bookmark: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 h-40">
      <path d="M60 35 L60 165 L100 140 L140 165 L140 35 Z" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" className="text-indigo-400/30" />
      <path d="M80 80 L120 80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-indigo-400/50" />
      <path d="M100 60 L100 100" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-indigo-400/50" />
    </svg>
  ),
  ticket: (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 h-40">
      <path d="M20 75 L180 75 L180 125 L20 125 Z" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" className="text-indigo-400/30" />
      <path d="M20 90 Q35 100 20 110" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-indigo-400/50 fill-none" />
      <path d="M180 90 Q165 100 180 110" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-indigo-400/50 fill-none" />
      <path d="M110 90 L160 90" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-indigo-400/40" />
      <path d="M110 100 L145 100" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-indigo-400/40" />
      <path d="M110 110 L155 110" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-indigo-400/40" />
      <circle cx="75" cy="100" r="18" stroke="currentColor" strokeWidth="5" className="text-indigo-400/40" />
      <path d="M68 100 L73 106 L83 94" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400/60" />
    </svg>
  ),
};

const EmptyState = ({
  type = 'search',
  title = 'Nothing here yet',
  description = 'Check back later or try a different filter.',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-24 px-6 text-center ${className}`}>
      {/* Gradient glow behind illustration */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full scale-150" />
        <div className="relative text-indigo-400/60">
          {illustrations[type] || illustrations.search}
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed mb-8">{description}</p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="
            inline-flex items-center gap-2
            px-6 py-3 rounded-xl font-bold text-sm
            bg-gradient-to-r from-indigo-600 to-purple-600
            hover:from-indigo-500 hover:to-purple-500
            text-white shadow-lg shadow-indigo-500/25
            transition-all duration-200 hover:scale-105 active:scale-95
          "
        >
          {actionLabel}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
