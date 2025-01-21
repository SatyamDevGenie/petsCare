// UserProfile.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../services/userService";
import { logout } from "../redux/userSlice";
import { RootState } from "../redux/store";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve user data from Redux store
  const { userInfo } = useSelector((state: RootState) => state.user);

  // Local state for handling loading/error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        await fetchUserProfile(dispatch); // Dispatch fetchUserProfile to update Redux store
        setLoading(false); // User profile fetched successfully
      } catch (err: any) {
        setError(err.message || "Failed to load user profile");
        setLoading(false);
      }
    };

    if (!userInfo) {
      loadUserProfile(); // Fetch the user profile if not already available in Redux
    } else {
      setLoading(false); // If userInfo is already in store, no need to fetch again
    }
  }, [dispatch, userInfo]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear user info from Redux store
    navigate("/login"); // Redirect to login page
  };

  const handleEditProfile = () => {
    navigate("/edit"); // Redirect to edit profile page
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  // Show error message if an error occurred
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  // If userInfo is available, display the profile
  return (
    <div className="flex justify-center items-center min-h-screen mt-9">
      <div className="bg-white p-8 md:p-16 rounded-xl shadow-lg w-full max-w-md transform transition-all hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          User Profile
        </h2>

        <div className="mb-6">
          <strong className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </strong>
          <p className="text-lg text-gray-800">{userInfo?.name}</p>
        </div>

        <div className="mb-6">
          <strong className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </strong>
          <p className="text-lg text-gray-800">{userInfo?.email}</p>
        </div>

        <div className="mb-6">
          <strong className="block text-sm font-medium text-gray-700 mb-1">
            Admin Status
          </strong>
          <p className="text-lg text-gray-800">
            {userInfo?.isAdmin ? "Yes" : "No"}
          </p>
        </div>

        <div className="flex justify-between mt-6 space-x-4">
          <button
            onClick={handleEditProfile}
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 pb-3 rounded-lg shadow-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            <span className="font-medium text-lg">Edit Profile</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full sm:w-auto bg-red-500 text-white px-8 pb-3 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <span className="font-medium text-lg">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

