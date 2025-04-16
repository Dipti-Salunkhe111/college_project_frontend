import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#f5f5f0] text-[#333] pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main Footer Content with Newsletter on right */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-medium mb-4">MentalWell</h4>
            <p className="text-[#555] mb-4">
              Empowering mental health awareness with innovative technology for better well-being.
            </p>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-lg font-medium mb-4">Legal</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/privacy-policy" className="text-[#555] hover:text-[#90a870] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-[#555] hover:text-[#90a870] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-[#555] hover:text-[#90a870] transition-colors">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-4">Contact Us</h4>
            <ul className="space-y-3 text-[#555]">
              <li>Email: support@mentalwell.com</li>
              <li>Phone: +123-456-7890</li>
              <li>123 Wellness Street<br />Mental Health City, MH 12345</li>
            </ul>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-[#90a870]">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-[#90a870]">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-[#90a870]">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-[#90a870]">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Newsletter Section - Fourth column (right side) */}
          <div>
            <h4 className="text-lg font-medium mb-3">Stay connected</h4>
            <p className="text-[#555] mb-3 text-sm">
              Join our community for the latest updates on mental wellness.
            </p>
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 text-sm border border-[#ddd] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#90a870] w-full"
              />
              <button className="bg-[#90a870] text-white px-4 py-2 text-sm rounded-sm hover:bg-[#7d9460] transition-colors duration-300 w-full">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-[#ddd] pt-8 text-center text-[#777] text-sm">
          © {currentYear} MentalWell. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;