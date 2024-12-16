import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com', icon: <FaFacebook className="text-blue-500" /> },
    { name: 'Twitter', href: 'https://twitter.com', icon: <FaTwitter className="text-blue-400" /> },
    { name: 'Instagram', href: 'https://instagram.com', icon: <FaInstagram className="text-pink-500" /> },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4">
      <div className="container mx-auto px-2">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-3 text-blue-400">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/privacy-policy"
                  className="
                    text-gray-300 hover:text-blue-400 transition-colors duration-300
                  "
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="
                    text-gray-300 hover:text-blue-400 transition-colors duration-300
                  "
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="text-center">
            <h4 className="font-semibold mb-3 text-blue-400">Follow Us</h4>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    text-gray-300 hover:text-white transition-transform duration-300
                    transform hover:scale-110
                  "
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-3 text-blue-400">Contact Us</h4>
            <ul className="space-y-1">
              <li className="text-gray-300">
                <span className="font-semibold text-white">Email:</span> support@mentalwell.com
              </li>
              <li className="text-gray-300">
                <span className="font-semibold text-white">Phone:</span> +123-456-7890
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-3 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} MentalWell. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;