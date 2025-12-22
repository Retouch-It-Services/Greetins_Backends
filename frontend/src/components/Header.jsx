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
              <img src="/assets/WhatsApp Image 2025-12-19 at 12.06.08 AM.jpeg" alt="Greetins Logo" className="h-24 w-auto" />
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
            <img src="/assets/WhatsApp Image 2025-12-19 at 12.06.08 AM.jpeg" alt="Greetins Logo" className="h-20 w-auto" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;