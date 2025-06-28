import React from 'react';
import ReactDOM from 'react-dom';

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <div
        className="bg-white rounded-lg shadow-xl relative max-w-sm w-full mx-auto p-6 transform transition-all duration-300 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()} 
      >
        <h3 id="confirm-dialog-title" className="text-xl font-semibold text-gray-900 mb-4">
          {title || "Confirm Action"}
        </h3>
        <p id="confirm-dialog-description" className="text-gray-700 mb-6">
          {message || "Are you sure you want to proceed?"}
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ConfirmDialog;