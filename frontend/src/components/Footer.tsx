import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-300 w-full p-6 md:p-8 lg:p-10">
      <div className="container mx-auto max-w-screen-xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 border-b border-gray-700 pb-6">
          {/* Logo & Address */}
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-extrabold text-white">
              <span className="text-teal-400">pets</span>Care
            </h2>
            <p className="text-sm mt-4 text-gray-400">
              Shop No. 1, Mukta Apartment, <br />
              Military Rd, Bhavani Nagar, Marol, Andheri East, <br />
              Mumbai, Maharashtra 400059
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3 text-center sm:text-left">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <Link to="/about" className="text-sm hover:text-teal-400 transition-all">
              About Us
            </Link>
            <Link to="/services" className="text-sm hover:text-teal-400 transition-all">
              Our Services
            </Link>
            <Link to="/doctors" className="text-sm hover:text-teal-400 transition-all">
              Meet Our Doctors
            </Link>
          </div>

          {/* Contact & Socials */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-white">Connect With Us</h3>
            <p className="text-sm mt-2 text-gray-400 flex justify-center sm:justify-start items-center gap-2">
              <FaEnvelope className="text-teal-400" /> support@petscare.com
            </p>
            {/* Social Media Icons */}
            <div className="flex justify-center sm:justify-start space-x-4 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
                <FaFacebookF size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
                <FaInstagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
                <FaTwitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-gray-500 text-sm mt-6 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} petsCare -
            <span className="text-teal-400 font-semibold"> "Caring for Your Pets, Like Family"</span>
          </p>

          {/* Reach Us - Opens Google Maps */}
          <p className="mt-2 sm:mt-0">
            Feel Free ❤️ To {" "}
            <a
              href="https://www.google.com/maps?q=Shop+No.+1,+Mukta+Apartment,+Military+Rd,+Bhavani+Nagar,+Marol,+Andheri+East,+Mumbai,+Maharashtra+400059"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 font-semibold hover:underline"
            >
              Reach Us
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
