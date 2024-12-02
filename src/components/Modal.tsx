import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-lg p-6 animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Details</h2>
          <p className="text-gray-500 text-sm">
            View the relevant details below
          </p>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
