import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../services/userService";
import { logout } from "../redux/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import { motion } from "framer-motion";
import { getUserAppointmentsAsync } from "../services/appointmentService";

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.user);
  const { appointments } = useSelector((state: RootState) => state.appointment);
  const { singleDoctor } = useSelector((state: RootState) => state.doctors);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getUserAppointmentsAsync());
  }, [dispatch]);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        await fetchUserProfile(dispatch);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to load user profile");
        setLoading(false);
      }
    };

    if (!userInfo) {
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, [dispatch, userInfo]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/edit");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-red-600 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center min-h-screen p-4 md:p-8 bg-gray-100"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white p-6 md:p-10 rounded-xl shadow-lg w-full max-w-xl transform transition-all hover:shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-gray-800">
          User Profile
        </h2>
        <div className="space-y-4">
          <div>
            <strong className="block text-sm font-medium text-gray-700">Full Name</strong>
            <p className="text-lg text-gray-800">{userInfo?.name}</p>
          </div>
          <div>
            <strong className="block text-sm font-medium text-gray-700">Email</strong>
            <p className="text-lg text-gray-800">{userInfo?.email}</p>
          </div>
          <div>
            <strong className="block text-sm font-medium text-gray-700">Admin Status</strong>
            <p className="text-lg text-gray-800">{userInfo?.isAdmin ? "Yes" : "No"}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-6 space-y-3 md:space-y-0 md:space-x-4">
          <motion.button
            onClick={handleEditProfile}
            className="w-full text-sm md:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 transition-all duration-300"
          >
            Edit Profile
          </motion.button>
          <motion.button
            onClick={handleLogout}
            className="w-full text-sm md:w-auto bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </motion.button>
        </div>

        {appointments && appointments.length > 0 ? (
          <>
            <h2 className="text-xl text-center mt-6 font-semibold">My Appointments</h2>
            <div className="mt-4 space-y-4">
              {appointments.map((appointment, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow border">
                  <p className="text-sm"><strong>Pet Owner:</strong> {userInfo.name}</p>
                  <p className="text-sm"><strong>Pet:</strong> {appointment.pet?.name || "Unknown"}</p>
                  <p className="text-sm"><strong>Doctor:</strong> {singleDoctor?.name || "Unknown"}</p>
                  <p className="text-sm"><strong>Date:</strong> {appointment.appointmentDate}</p>
                  <p className="text-sm"><strong>Status:</strong> {appointment.status}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-6 font-normal text-center text-gray-600">No Appointments</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;
