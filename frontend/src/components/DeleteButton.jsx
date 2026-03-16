import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';

const DeleteButton = ({ onDelete, loading, label = 'Delete', confirmTitle, confirmMessage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={loading}
        className="bg-red-900/30 hover:bg-red-900/50 text-red-500 px-8 py-4 rounded-2xl font-bold transition-all border border-red-900/50 font-sans disabled:opacity-50"
      >
        {loading ? 'Deleting...' : label}
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onDelete}
        title={confirmTitle || 'Delete Event?'}
        message={confirmMessage || 'Are you sure you want to delete this event? This will permanently remove all event data and notify registered attendees.'}
        confirmText="Delete Permanently"
        cancelText="Keep Event"
        type="danger"
      />
    </>
  );
};

export default DeleteButton;
