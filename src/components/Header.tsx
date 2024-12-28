import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isTokenValid } from '../utils/auth';
import { FaHome, FaInfoCircle, FaHandsHelping, FaEnvelope, FaSignInAlt, FaUserCircle, FaCog, FaSignOutAlt, FaChartLine } from 'react-icons/fa'; // Importing React Icons
import Login from '../pages/Login'; // Import the Login component

const Header: React.FC = () => {
  const isLoggedIn = isTokenValid();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to manage modal visibility
  const [initialPath, setInitialPath] = useState('/'); // To store the path the user tried to access
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const handleLoginSuccess = (path: string) => {
    setIsLoginModalOpen(false); // Close the modal on successful login
    window.location.href = path; // Redirect to the respective path
  };

  const handleLoginClick = (path: string) => {
    setInitialPath(path); // Set the initial path before opening the modal
    setIsLoginModalOpen(true); // Show the login modal
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to the homepage after logout
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the visibility of the dropdown
  };

  const username = localStorage.getItem('username'); // Retrieve the username from local storage

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-2 px-6">
        <div className="flex items-center space-x-3">
          <img
            src="https://t3.ftcdn.net/jpg/03/01/43/48/360_F_301434885_SruL7Mc1t5yy4ecJI9Fgtml8uxDbEi9W.jpg"
            alt="Logo"
            className="h-10 w-10 rounded-full transition-transform duration-300 hover:scale-110"
          />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">MentalWell</h1>
        </div>
        <nav>
          <ul className="flex items-center space-x-8">
            {[
              { to: '/', icon: <FaHome />, label: 'Home' },
              { to: '/about', icon: <FaInfoCircle />, label: 'About Us' },
              { to: '/how-it-works', icon: <FaHandsHelping />, label: 'How It Works' },
              { to: '/contact', icon: <FaEnvelope />, label: 'Contact' },
              { to: '/results', icon: <FaChartLine />, label: 'Get Results' }, // New navigation item
            ].map(({ to, icon, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-white font-semibold transition-all duration-300 hover:text-pink-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-1 after:bg-white after:transition-all after:duration-300 hover:after:w-full flex flex-col items-center justify-center space-y-1"
                >
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm">{label}</span>
                </Link>
              </li>
            ))}

            {/* Show Profile Icon with Username if logged in */}
            {isLoggedIn && (
              <li className="relative flex flex-col items-center justify-center space-y-1">
                <button
                  onClick={toggleDropdown}
                  className="text-white font-semibold transition-all duration-300 hover:text-pink-200 flex flex-col items-center space-y-1"
                >
                  <FaUserCircle className="text-2xl" />
                  <span className="text-sm">Profile</span>
                </button>

                {/* Dropdown for Profile with Username */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg p-4 flex flex-col space-y-2">
                    <p className="text-sm font-semibold">{username}</p>
                    <button
                      className="flex items-center space-x-2 text-sm text-gray-700 hover:text-pink-500 p-2 rounded"
                      onClick={() => (window.location.href = '/profile')}
                    >
                      <FaCog className="text-xl" />
                      <span>Settings</span>
                    </button>
                    <button
                      className="flex items-center space-x-2 text-sm text-gray-700 hover:text-pink-500 p-2 rounded"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="text-xl" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </li>
            )}

            {/* Only show login button if the user is not logged in */}
            {!isLoggedIn && (
              <li>
                <button
                  onClick={() => handleLoginClick('/')}
                  className="text-white font-semibold transition-all duration-300 hover:text-pink-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-1 after:bg-white after:transition-all after:duration-300 hover:after:w-full flex flex-col items-center justify-center space-y-1"
                >
                  <span className="text-xl">
                    <FaSignInAlt />
                  </span>
                  <span className="text-sm">Login</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Show Login Modal if it's open */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <Login
            onLoginSuccess={handleLoginSuccess}
            onClose={() => setIsLoginModalOpen(false)}
            initialPath={initialPath}
          />
        </div>
      )}
    </header>
  );
};

export default Header;