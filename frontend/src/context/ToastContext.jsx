import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ICONS = {
  success: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
};

const STYLES = {
  success: {
    container: 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100',
    icon: 'bg-emerald-500/20 text-emerald-400',
    bar: 'bg-emerald-500',
  },
  error: {
    container: 'bg-red-950/90 border-red-500/40 text-red-100',
    icon: 'bg-red-500/20 text-red-400',
    bar: 'bg-red-500',
  },
  info: {
    container: 'bg-blue-950/90 border-blue-500/40 text-blue-100',
    icon: 'bg-blue-500/20 text-blue-400',
    bar: 'bg-blue-500',
  },
  warning: {
    container: 'bg-amber-950/90 border-amber-500/40 text-amber-100',
    icon: 'bg-amber-500/20 text-amber-400',
    bar: 'bg-amber-500',
  },
};

let toastId = 0;

const Toast = ({ toast, onRemove }) => {
  const style = STYLES[toast.type] || STYLES.info;
  return (
    <div
      className={`toast-item flex items-start gap-3 w-80 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${style.container}`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${style.icon}`}>
        {ICONS[toast.type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-snug">{toast.message}</p>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity mt-0.5"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {/* Progress bar */}
      <div className={`toast-progress ${style.bar}`} />
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), duration);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Stack */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
