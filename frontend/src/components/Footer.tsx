import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-300 w-full mt-3">
      <div className="px-5 py-5">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center border-b border-gray-700 pb-6 max-w-screen-xl mx-auto">
          {/* Logo and About */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-extrabold tracking-wide text-white">
              pets<span className="text-teal-400 ">Care</span>
            </h2>
            <p className="text-sm mt-2 text-gray-400 font-semibold">
              Dedicated to providing the best care and services for your beloved pets
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap space-x-6 md:space-x-8">
            <Link
              to="/about"
              className="text-sm text-gray-400 hover:text-teal-300 transition-colors font-semibold"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-sm text-gray-400 hover:text-teal-300 transition-colors font-semibold"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-sm text-gray-400 hover:text-teal-300 transition-colors font-semibold"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Middle Section */}
        <div className="flex flex-wrap justify-between items-center mt-6 max-w-screen-xl mx-auto">
          {/* Newsletter Subscription */}
          <div className="mt-4 md:mt-0">
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 text-sm text-gray-900 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-teal-400 px-4 py-2 text-sm font-semibold text-gray-900 rounded-r-md hover:bg-teal-500 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center text-sm text-white font-semibold">
         {new Date().getFullYear()} petsCare @ All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
