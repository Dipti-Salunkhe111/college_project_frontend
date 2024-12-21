import React from "react";
import Login from "../pages/Login"; // Import the Login component

interface LoginWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (path: string) => void; // This callback will be triggered after a successful login
  initialPath: string; // Path that the user tried to access before login
}

const LoginWarningModal: React.FC<LoginWarningModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialPath,
}) => {
  if (!isOpen) return null;

  const handleLoginSuccess = () => {
    onLoginSuccess(initialPath); // Redirect to the page the user tried to access
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <Login
        onLoginSuccess={handleLoginSuccess}
        onClose={onClose}
        initialPath={initialPath}
      />
    </div>
  );
};

export default LoginWarningModal;
