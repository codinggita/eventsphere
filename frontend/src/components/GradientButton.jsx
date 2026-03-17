import React, { useRef } from 'react';

const GradientButton = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  fullWidth = false,
}) => {
  const btnRef = useRef(null);

  const createRipple = (e) => {
    if (disabled || loading) return;
    const btn = btnRef.current;
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add('ripple-effect');
    const existing = btn.querySelector('.ripple-effect');
    if (existing) existing.remove();
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  };

  const baseClasses = `
    relative overflow-hidden inline-flex items-center justify-center gap-2
    font-bold text-sm rounded-xl transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.03] active:scale-95'}
  `;

  const variantClasses = {
    primary: `
      px-6 py-3
      bg-gradient-to-r from-indigo-600 to-purple-600
      hover:from-indigo-500 hover:to-purple-500
      text-white shadow-lg shadow-indigo-500/25
      focus:ring-indigo-500
    `,
    secondary: `
      px-6 py-3
      bg-gradient-to-r from-blue-600 to-cyan-600
      hover:from-blue-500 hover:to-cyan-500
      text-white shadow-lg shadow-blue-500/25
      focus:ring-blue-500
    `,
    outline: `
      px-6 py-3
      bg-transparent border-2 border-indigo-500/50
      hover:border-indigo-400 hover:bg-indigo-500/10
      text-indigo-400 hover:text-indigo-300
      focus:ring-indigo-500
    `,
    danger: `
      px-6 py-3
      bg-gradient-to-r from-red-600 to-rose-600
      hover:from-red-500 hover:to-rose-500
      text-white shadow-lg shadow-red-500/25
      focus:ring-red-500
    `,
  };

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={(e) => {
        createRipple(e);
        if (!disabled && !loading && onClick) onClick(e);
      }}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  );
};

export default GradientButton;
