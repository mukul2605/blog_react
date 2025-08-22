import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="content-wrapper py-8">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <Logo width="40px" />
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              BlogSpace
            </h3>
            <p className="text-xs text-slate-400">Share your thoughts with the world</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex items-center space-x-6 text-sm">
          <Link to="/" className="text-slate-400 hover:text-slate-200 transition-colors">
            Home
          </Link>
          <Link to="/all-posts" className="text-slate-400 hover:text-slate-200 transition-colors">
            Posts
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500 text-xs">
            © {currentYear} BlogSpace. Made with ❤️
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center space-x-4">
          <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-xl">
            🐦
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-xl">
            📧
          </a>
          <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-xl">
            🔗
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
