import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { isTokenValid } from "../utils/auth";
import {
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import Login from "../pages/Login";

const Header: React.FC = () => {
  const isLoggedIn = isTokenValid();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [initialPath, setInitialPath] = useState("/");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  
  const handleLoginSuccess = (path: string) => {
    setIsLoginModalOpen(false);
    window.location.href = path;
  };

  const handleLoginClick = (path: string) => {
    setInitialPath(path);
    setIsLoginModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
    window.location.reload();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const username = localStorage.getItem("username");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#f5f5f0] text-[#333] shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center">
            <img
              src="https://t3.ftcdn.net/jpg/03/01/43/48/360_F_301434885_SruL7Mc1t5yy4ecJI9Fgtml8uxDbEi9W.jpg"
              alt="Logo"
              className="h-8 w-8"
            />
            <h1 className="text-xl font-medium ml-2 text-[#333]">MentalWell</h1>
          </Link>
        </div>
        
        <nav>
          <ul className="flex items-center space-x-8">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/how-it-works", label: "How It Works" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-[#333] font-normal text-sm hover:text-[#90a870] transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}

            {isLoggedIn && (
              <li>
                <Link
                  to="/results"
                  className="text-[#333] font-normal text-sm hover:text-[#90a870] transition-colors duration-300"
                >
                  Results
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <li
                className="relative"
                ref={dropdownRef}
              >
                <button
                  onClick={toggleDropdown}
                  className="text-[#333] font-normal text-sm hover:text-[#90a870] transition-colors duration-300 flex items-center"
                >
                  Profile
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-[#333] rounded-sm shadow-md p-4 flex flex-col space-y-2">
                    <p className="text-sm font-medium">{username}</p>
                    <button
                      className="flex items-center space-x-2 text-sm text-[#333] hover:text-[#90a870] p-2 rounded transition-colors"
                      onClick={() => (window.location.href = "/profile")}
                    >
                      <FaCog className="text-sm" />
                      <span>Settings</span>
                    </button>
                    <button
                      className="flex items-center space-x-2 text-sm text-[#333] hover:text-[#90a870] p-2 rounded transition-colors"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="text-sm" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </li>
            )}

            {!isLoggedIn && (
              <li>
                <button
                  onClick={() => handleLoginClick("/")}
                  className="border border-[#333] text-[#333] px-6 py-2 rounded-sm hover:bg-[#f0f0e8] transition-colors duration-300 text-sm font-normal"
                >
                  Login
                </button>
              </li>
            )}
            
            <li>
              <button className="bg-[#90a870] text-white px-6 py-2 rounded-sm hover:bg-[#7d9460] transition-colors duration-300 text-sm font-normal">
                Contact Us
              </button>
            </li>
          </ul>
        </nav>
      </div>

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