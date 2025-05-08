
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ekart-dark-purple text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-300 text-sm">
              eKart is India's leading e-commerce marketplace with millions of products across categories. 
              Shop online for electronic gadgets, clothing, accessories and more.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white text-sm">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/electronics" className="text-gray-300 hover:text-white text-sm">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/jewelery" className="text-gray-300 hover:text-white text-sm">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link to="/category/men's%20clothing" className="text-gray-300 hover:text-white text-sm">
                  Men's Clothing
                </Link>
              </li>
              <li>
                <Link to="/category/women's%20clothing" className="text-gray-300 hover:text-white text-sm">
                  Women's Clothing
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300 text-sm space-y-2">
              <p>4/86, kuzhinjam villai house,</p>
              <p>Nagercoil, Tamil Nadu</p>
              <p>India</p>
              <p className="mt-2">Email: support@ekart.com</p>
              <p>Phone: +91 98765 43210</p>
            </address>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} eKart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
