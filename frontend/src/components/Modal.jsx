import ReactDOM from 'react-dom';

function Modal({ isOpen, onClose, children }) {

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50 p-4 sm:p-6 md:p-8"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-lg shadow-xl relative max-h-[90vh] overflow-y-auto w-full max-w-lg mx-auto 
        transform transition-all duration-300 sm:max-w-lg sm:rounded-lg sm:shadow-xl
        scale-100 opacity-100 sm:scale-100 sm:opacity-100"
        
        onClick={(e) => e.stopPropagation()}
      >
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl 
          font-bold p-1 leading-none rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;