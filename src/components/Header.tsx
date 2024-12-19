import React from 'react';
import { Link } from 'react-router-dom';
import { isTokenValid } from '../utils/auth';

const Header: React.FC = () => {
  const isLoggedIn = isTokenValid();

  return (
    <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-2 px-6">
        <div className="flex items-center space-x-3">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-12 w-12 rounded-full transition-transform duration-300 hover:scale-110"
          />
          <h1 className="text-3xl font-extrabold tracking-tight">MentalWell</h1>
        </div>
        <nav>
          <ul className="flex items-center space-x-8">
            {[
              { to: '/', label: 'Home' }, 
              { to: '/about', label: 'About Us' }, 
              { to: '/how-it-works', label: 'How It Works' }, 
              { to: '/contact', label: 'Contact' }
            ].map(({ to, label }) => (
              <li key={to}>
                <Link 
                  to={to} 
                  className="text-white font-semibold transition-all duration-300 hover:text-pink-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-1 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  {label}
                </Link>
              </li>
            ))}
            
            {/* Only hide login if user is logged in */}
            {!isLoggedIn && (
              <li>
                <Link 
                  to="/login" 
                  className="text-white font-semibold transition-all duration-300 hover:text-pink-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-1 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;