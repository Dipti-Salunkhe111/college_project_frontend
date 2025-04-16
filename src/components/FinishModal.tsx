import React from 'react';
import { useNavigate } from 'react-router-dom';

interface FinishModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const FinishModal: React.FC<FinishModalProps> = ({ isOpen, onClose, title, message }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#f8f8f5] p-8 max-w-md w-full mx-4 border border-[#eaeae5]">
        <h2 className="text-2xl font-medium text-[#333] mb-6 text-center">
          {title}
        </h2>
        <p className="text-[#555] text-center mb-6">
          {message}
        </p>
        <button
          onClick={handleClose}
          className="w-full bg-[#90a870] text-white px-4 py-2 rounded-none hover:bg-[#7d9460] transition-colors"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default FinishModal;