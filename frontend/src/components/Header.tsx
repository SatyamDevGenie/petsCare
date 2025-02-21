import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, justRegistered } = useSelector((state: any) => state.user);

  const handleLogout = () => {
    dispatch(logout());

    // Show success toast
    toast.success("Logout Successfully", {
      style: {
        fontSize: "14px", // Smaller text size
        padding: "8px", // Reduce padding
        minWidth: "200px", // Reduce width
        fontFamily: "Arial Black",
        fontWeight: "bolder",
      },
    });
    navigate("/login");
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <header className="text-white w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center py-4">
        {/* Logo Section */}
        <div className="text-3xl font-bold tracking-wide">
          <Link to="/" className="hover:text-teal-300 transition-all">
            <span className="text-teal-400">🐾 pets</span>
            <span className="text-black">Care</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/about"
            className="text-sm font-medium tracking-wide uppercase hover:text-teal-900 text-black"
          >
            About
          </Link>
          <Link
            to="/services"
            className="text-sm font-medium tracking-wide uppercase hover:text-teal-900 text-black"
          >
            Services
          </Link>
          <Link
            to="/doctors"
            className="text-sm font-medium tracking-wide uppercase hover:text-teal-900 text-black"
          >
            Doctors
          </Link>

          {userInfo ? (
            justRegistered ? (
              <button
                onClick={handleLogout}
                className="text-sm font-medium bg-red-600 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <div className="relative">
                {/* Profile Dropdown Button */}
                <button
                  className="flex items-center space-x-2 text-sm font-medium focus:outline-none"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="text-black font-bold flex items-center">
                    Welcome {userInfo.name}
                    <ChevronDown className="ml-1 w-4 h-4" />
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

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded-lg shadow-lg py-2 z-50 font-semibold">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )
          ) : (
            <Link
              to="/login"
              className="bg-teal-500 text-white text-sm px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-teal-700 transition-all"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-black focus:outline-none"
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
        } md:hidden bg-gray-800 bg-opacity-95 fixed top-0 left-0 w-full h-screen transition-transform z-40`}
      >
        <div className="p-6 space-y-6 text-center">
          <button
            className="absolute top-4 right-4 text-black"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          <nav className="space-y-8">
            <Link
              to="/about"
              className="block text-teal-100 text-xl font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/services"
              className="block text-teal-100 text-xl font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/doctors"
              className="block text-teal-100 text-xl font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              Doctors
            </Link>
            {userInfo ? (
              justRegistered ? (
                <div className="flex flex-col items-center w-full">
                  <button
                    onClick={handleLogout}
                    className="text-sm bg-red-600 px-4 py-3 rounded-md w-32 text-center mt-2 font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-white text-lg font-semibold">
                    Welcome {userInfo.name} to petsCare
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/profile"
                      className="block text-white text-lg bg-gray-900 px-4 py-2 rounded-md hover:bg-gray-700 font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block text-white text-lg bg-red-600 px-4 py-2 rounded-md hover:bg-red-800 font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )
            ) : (
              <Link to="/login">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-teal-500 text-white text-lg px-6 py-2 rounded-md mt-10 font-semibold"
                >
                  Login
                </button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
