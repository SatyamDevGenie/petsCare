import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-300 w-full p-6">
      <div className="container mx-auto max-w-screen-xl">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
          {/* Logo and About */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-extrabold tracking-wide text-white">
              <span className="text-teal-400">pets</span>Care
            </h2>
            <p className="text-sm mt-5 text-gray-500 font-medium">
              Shop No. 1, Mukta Apartment, <br />
              Military Rd, Bhavani Nagar, Marol, Andheri East, <br />
              Mumbai, Maharashtra 400059
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center md:justify-end space-x-6 mt-7 md:mt-0">
            <Link
              to="/about"
              className="text-sm font-semibold uppercase hover:text-teal-400 transition-all"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-sm uppercase font-semibold hover:text-teal-400 transition-all"
            >
              Services
            </Link>
            <Link
              to="/doctors"
              className="text-sm uppercase font-semibold hover:text-teal-400 transition-all"
            >
              Doctors
            </Link>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm mt-6">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Feel Free to Reach Us
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

