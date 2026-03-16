import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, type = 'danger' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4 font-sans">
            {title || 'Are you sure?'}
          </h2>
          <p className="text-gray-400 mb-8 font-sans leading-relaxed">
            {message || 'This action cannot be undone. Please confirm if you want to proceed.'}
          </p>
          
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-2xl bg-gray-800 hover:bg-gray-750 text-white font-bold transition-all font-sans"
            >
              {cancelText || 'Cancel'}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-6 py-4 rounded-2xl font-bold transition-all font-sans text-white shadow-lg ${
                type === 'danger' 
                  ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
              }`}
            >
              {confirmText || 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
