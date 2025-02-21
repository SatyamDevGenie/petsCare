import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false); // Track if user just registered

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userInfo = useSelector((state: any) => state.user.userInfo);
  const  justRegistered = useSelector((state: any) => state.user.justRegistered);

  useEffect(() => {
    // If the user came from the register page, mark as new user
    if (location.state?.fromRegister) {
      setIsNewUser(true);
    } else {
      setIsNewUser(false);
    }
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfully", {
      style: {
        fontSize: "14px",
        padding: "8px",
        minWidth: "200px",
        fontFamily: "Arial Black",
        fontWeight: "bolder",
        color: "black",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      },
    });

    navigate("/login");
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setIsNewUser(false); // Reset new user state after logout
  };

  return (
    <header className="text-black w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center py-4">
        {/* Logo Section */}
        <div className="text-3xl font-bold tracking-wide text-white">
          <Link to="/" className="hover:text-teal-300 transition-all">
            <span className="text-teal-400">pets</span>
            <span className="text-black">Care</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-sm font-medium tracking-wide uppercase hover:text-teal-900 transition-transform transform hover:scale-105">
            About
          </Link>
          <Link to="/services" className="text-sm font-medium tracking-wide uppercase hover:text-teal-900 transition-transform transform hover:scale-105">
            Services
          </Link>
          <Link to="/doctors" className="text-sm font-medium tracking-wide uppercase hover:text-teal-900 transition-transform transform hover:scale-105">
            Doctors
          </Link>

          {userInfo ? (
            <div className="relative">
              {/* Show Profile & Logout only if user logged in (not just registered) */}
              {!justRegistered ? (
                <button className="flex items-center space-x-2 text-sm md:text-base font-medium focus:outline-none" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <span className="text-black font-medium">
                    {userInfo?.name ? `Welcome, ${userInfo.name}` : "Welcome to petsCare"}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              ) : null}

              {isDropdownOpen && !justRegistered && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-gray-700 rounded-lg shadow-lg py-2 z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 font-bold" onClick={() => setIsDropdownOpen(false)}>
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="block text-teal-500 px-4 py-2 text-sm hover:bg-gray-100 font-bold">
                    Logout
                  </button>
                </div>
              )}

              {/* Show only logout if new user just registered */}
              {justRegistered && (
                <button onClick={handleLogout} className="text-teal-500 px-4 py-2 text-sm font-bold hover:bg-gray-100 rounded-md">
                  Logout
                </button>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm px-6 py-3 rounded-full font-semibold shadow-lg hover:from-teal-600 hover:to-teal-700 hover:shadow-xl transition-all ease-in-out duration-300 transform hover:scale-105">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;










