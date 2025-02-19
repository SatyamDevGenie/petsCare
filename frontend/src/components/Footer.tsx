import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-300 w-full mt-auto p-3">
      <div className="px-5 py-5">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6 max-w-screen-xl mx-auto gap-6 mt-12 ">
          {/* Logo and About */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-extrabold tracking-wide text-white">
              pets<span className="text-teal-400">Care</span>
            </h2>
            <p className="text-sm mt-2 text-gray-400 font-semibold">
              Dedicated best care and services for beloved pets
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-8 text-center">
            <Link to="/about" className="text-sm text-white hover:text-teal-300 transition-colors font-semibold">
              About Us
            </Link>
            <Link to="/services" className="text-sm text-white hover:text-teal-300 transition-colors font-semibold">
              Our Services
            </Link>
            <Link to="/doctors" className="text-sm text-white hover:text-teal-300 transition-colors font-semibold">
              Scheduled Appointment
            </Link>
          </nav>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 max-w-screen-xl mx-auto gap-6 text-center md:text-left">
          {/* Address Section */}
          <div>
            <h3 className="text-lg text-white font-bold">Our Address</h3>
            <p className="text-sm text-gray-400 mt-2 font-medium">
              Shop No. 1, Mukta Apartment, <br />
              Military Rd, Bhavani Nagar, Marol, Andheri East, <br />
              Mumbai, Maharashtra 400059
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center text-lg text-white font-semibold">
         {new Date().getFullYear()} experience petsCare platform 
        </div>
      </div>
    </footer>
  );
};

export default Footer;
