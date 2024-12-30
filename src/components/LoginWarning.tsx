import React from "react";
import Login from "../pages/Login";

interface LoginWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (path: string) => void;
  initialPath: string;
}

const LoginWarningModal: React.FC<LoginWarningModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialPath,
}) => {
  if (!isOpen) return null;

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div onClick={handleModalClick}>
        <div className="relative bg-white rounded-lg">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          >
            ×
          </button>
          <Login
            onLoginSuccess={onLoginSuccess}
            onClose={onClose}
            initialPath={initialPath}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginWarningModal;