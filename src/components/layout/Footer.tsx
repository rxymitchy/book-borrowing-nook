
import React from "react";
import { Link } from "react-router-dom";
import { BookOpenText, Heart, Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-primary mb-4">
              <BookOpenText size={24} />
              <span className="text-xl font-medium">BookBorrow</span>
            </Link>
            <p className="text-sm text-gray-600 max-w-md">
              A minimalist book lending library application designed with simplicity and elegance in mind.
              Discover, borrow, and return books with ease.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  My Books
                </Link>
              </li>
              <li>
                <Link to="/auth?mode=login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Heart size={20} />
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-6">
              © {new Date().getFullYear()} BookBorrow. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
