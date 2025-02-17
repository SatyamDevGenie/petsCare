import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state: any) => state.user.userInfo);

  const handleLogout = () => {
    dispatch(logout());
    // Show success toast
    toast.success("Logout successfully", {
      style: {
        fontSize: "14px", // Smaller text size
        padding: "8px", // Reduce padding
        minWidth: "200px", // Reduce width
        fontFamily: "Arial Black",
        fontWeight: "bolder",
        color: "black", // White text color for contrast
        borderRadius: "8px", // Rounded corners
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional subtle shadow
      },
    });

    navigate("/login"); // Redirect to login page
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center py-4">
        {/* Logo Section */}
        <div className="text-3xl font-bold tracking-wide text-white">
          <Link to="/" className="hover:text-teal-300 transition-all">
            <span className="text-teal-400">🐾 pets</span>
            <span className="text-white">Care</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/about"
            className="text-sm font-medium tracking-wide uppercase hover:text-teal-300 transition-transform transform hover:scale-105"
          >
            About
          </Link>
          <Link
            to="/services"
            className="text-sm font-medium tracking-wide uppercase hover:text-teal-300 transition-transform transform hover:scale-105"
          >
            Services
          </Link>
          <Link
            to="/doctors"
            className="text-sm font-medium tracking-wide uppercase hover:text-teal-300 transition-transform transform hover:scale-105"
          >
            Doctors
          </Link>
          {userInfo ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-sm md:text-base font-medium focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-black font-extrabold">
                  Welcome {userInfo.name}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-gray-700 rounded-lg shadow-lg py-2 z-50">
                  <div className="flex justify-between items-center space-x-4">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block text-teal-500 px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm px-6 py-3 rounded-full font-semibold shadow-lg hover:from-teal-600 hover:to-teal-700 hover:shadow-xl transition-all ease-in-out duration-300 transform hover:scale-105"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        } md:hidden bg-gray-800 bg-opacity-95 fixed top-0 left-0 w-full h-screen transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-6 space-y-6 text-center">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <nav className="space-y-12">
            <Link
              to="/about"
              className="block text-teal-100 text-xl transition-transform transform hover:scale-110"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="block text-teal-100 text-xl transition-transform transform hover:scale-110"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/doctors"
              className="block text-teal-100 text-xl transition-transform transform hover:scale-110"
              onClick={() => setIsMenuOpen(false)}
            >
              Doctors
            </Link>
            {userInfo && (
              <div className="mt-3 space-y-4 space-x-4">
                <p className="text-white text-lg font-extrabold">
                  Welcome {userInfo.name} to petsCare
                </p>
                <div className="flex space-x-4 justify-center">
                  <Link
                    to="/profile"
                    className="block text-teal-50 text-lg bg-black px-4 py-1 rounded-md hover:bg-gray-800 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-teal-50 text-lg bg-black px-4 py-1 rounded-md hover:bg-gray-800 transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </nav>
          {!userInfo && (
            <Link to="/login">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white rounded-full text-lg bg-gradient-to-r from-teal-500 to-teal-600 mt-11 px-6 py-3 font-semibold shadow-lg hover:from-teal-600 hover:to-teal-700 hover:shadow-xl transition-all ease-in-out duration-300 transform hover:scale-105"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
