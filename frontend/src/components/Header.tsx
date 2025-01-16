import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center py-4">
        {/* Logo Section */}
        <div className="text-3xl font-extrabold tracking-wider">
          <Link to="/" className="hover:text-teal-300 transition-all">
            <span className="text-teal-400">🐾 pets</span>
            <span className="text-white">Care</span>
          </Link>
        </div>

        {/* Desktop Menu and Login Button */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-8">
            <Link
              to="/about"
              className="text-sm font-medium tracking-wide uppercase hover:text-teal-300 transition-transform transform hover:scale-110"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-sm font-medium tracking-wide uppercase hover:text-teal-300 transition-transform transform hover:scale-110"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium tracking-wide uppercase hover:text-teal-300 transition-transform transform hover:scale-110"
            >
              Contact
            </Link>
          </nav>

          <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm px-6 py-3 rounded-full font-semibold shadow-lg hover:from-teal-600 hover:to-teal-700 hover:shadow-xl transition-all ease-in-out duration-300 transform hover:scale-105">
            Login
          </button>
        </div>

        {/* Hamburger Menu (Mobile Only) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } md:hidden bg-gray-800 bg-opacity-95 fixed top-0 left-0 w-full h-screen transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo in Mobile Menu */}
          <div className="text-3xl font-extrabold">
            <Link
              to="/"
              className="hover:text-teal-300 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-teal-400">🐾 pets</span>
              <span className="text-white">Care</span>
            </Link>
          </div>

          {/* Close Menu Button */}
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col items-center space-y-6 mt-8">
          <Link
            to="/"
            className="text-sm font-medium text-white hover:text-teal-300 transition-transform transform hover:scale-110"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-white hover:text-teal-300 transition-transform transform hover:scale-110"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/services"
            className="text-sm font-medium text-white hover:text-teal-300 transition-transform transform hover:scale-110"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-white hover:text-teal-300 transition-transform transform hover:scale-110"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <button
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm px-6 py-3 rounded-full font-semibold shadow-lg hover:from-teal-600 hover:to-teal-700 hover:shadow-xl transition-all ease-in-out duration-300 transform hover:scale-105"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
