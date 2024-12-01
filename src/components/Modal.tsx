import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xl p-6 animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
          onClick={onClose}
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
          <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
          <p className="text-gray-500 text-sm">
            Review the details of this order
          </p>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
