import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    // Special transparent header for the landing page
    return (
      <header className="absolute top-0 left-0 w-full z-20 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src="/assets/logo.jpg" alt="RIS Logo" className="h-10 w-10 rounded-full" />
              <span className="text-2xl font-bold text-white">Greetins</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-200 hover:text-white transition-colors">Home</Link>
              <Link to="/services" className="text-gray-200 hover:text-white transition-colors">Services</Link>
              <Link to="/about" className="text-gray-200 hover:text-white transition-colors">About</Link>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  // Default header for all other pages
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/assets/logo.jpg" alt="RIS Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-purple-600">Greetins</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;