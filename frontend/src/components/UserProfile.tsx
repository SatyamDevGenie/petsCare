import React from "react";
import { Link } from "react-router-dom"; // Make sure to import Link correctly

const UserProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <h1 className="text-3xl font-semibold text-gray-900">User Profile</h1>

      <div className="mt-6">
        <Link
          to="/edit" // The path to the "edit profile" page
          className="text-blue-600 hover:text-blue-800 text-lg font-semibold"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
