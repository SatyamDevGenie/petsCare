import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { cancelDoctor, fetchSingleDoctor } from "../services/doctorService";
import EditDoctorModal from "./EditDoctorModel";
import AppointmentModal from "./AppointmentModal";
import { motion } from "framer-motion";
import { FaUserMd, FaMapMarkerAlt, FaStar, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";

const SingleDoctor: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { doctor_id } = useParams();
  const { singleDoctor } = useSelector((state: RootState) => state.doctors);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [bookAptIsOpen, setBookAptIsOpen] = useState(false);

  useEffect(() => {
    if (doctor_id) {
      dispatch(fetchSingleDoctor(doctor_id));
    }
  }, [dispatch, doctor_id]);

  if (!singleDoctor) {
    return (
      <div className="container mx-auto px-6 py-8 mt-20">
        <p className="text-center text-gray-400 text-lg">Doctor details not available.</p>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!singleDoctor?._id) {
      console.error("Error: Doctor ID is undefined.");
      return;
    }
    try {
      await dispatch(cancelDoctor(singleDoctor));
      toast.success("Doctor Deleted", {
        style: {
          fontSize: "14px",
          padding: "8px",
          minWidth: "200px",
          fontFamily: "Arial Black",
          fontWeight: "bolder",
        },
      });
      navigate("/doctors");
    } catch (err) {
      console.error("Error deleting doctor:", err);
    }
  };

  const handleAptClick = () => {
    if (userInfo?.isDoctor && userInfo._id === singleDoctor._id) {
      navigate(`/appointments/${userInfo._id}`);
    } else {
      alert("Access denied! You can only view your own appointments.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 mt-10">
      {userInfo?.isDoctor && userInfo._id === singleDoctor._id && (
        <motion.div
          className="flex justify-end mb-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <button
            onClick={handleAptClick}
            className="ml-4 bg-indigo-600 text-white font-medium px-6 py-3 text-lg flex items-center justify-center rounded-xl shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
          >
            My Appointments
          </button>
        </motion.div>
      )}

      <motion.div
        className="bg-white max-w-3xl mx-auto rounded-xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 border border-gray-200"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center">
          <img
            src={singleDoctor.profileImage}
            alt={singleDoctor.name}
            className="w-36 h-36 rounded-full border-4 border-indigo-500 shadow-lg mb-4"
          />
          <p className="text-2xl font-bold text-gray-800">{singleDoctor.name}</p>
          <p className="text-lg font-semibold text-indigo-600 flex items-center gap-2 mt-1">
            <FaUserMd /> {singleDoctor.specialization}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
            <FaMapMarkerAlt className="text-red-500" /> Mumbai, India
          </p>
          <p className="text-lg font-bold text-yellow-500 mt-2 flex items-center gap-2">
            <FaStar /> 4.8 / 5
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
            <FaPhoneAlt className="text-green-500" /> {singleDoctor.contactNumber}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
            <FaEnvelope className="text-blue-500" /> {singleDoctor.email}
          </p>
        </div>

        <div className="mt-6">
          <table className="w-full border-collapse text-gray-800 text-sm">
            <tbody>
              {[["Description", singleDoctor.notes], ["Availability", singleDoctor.availability]].map(([label, value]) => (
                <tr key={label} className="border-b">
                  <td className="px-4 py-3 font-semibold">{label}:</td>
                  <td className="px-4 py-3 text-gray-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          {userInfo && !userInfo.isAdmin && !userInfo.isDoctor && (
            <motion.button
              onClick={() => setBookAptIsOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transform hover:scale-105 transition"
              whileHover={{ scale: 1.05 }}
            >
              Book Appointment
            </motion.button>
          )}

          {userInfo?.isAdmin && (
            <>
              <motion.button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transform hover:scale-105 transition"
                whileHover={{ scale: 1.05 }}
              >
                Edit
              </motion.button>
              <motion.button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transform hover:scale-105 transition"
                whileHover={{ scale: 1.05 }}
              >
                Delete
              </motion.button>
            </>
          )}
        </div>
      </motion.div>

      <EditDoctorModal singleDoctor={singleDoctor} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <AppointmentModal singleDoctor={singleDoctor} isOpen={bookAptIsOpen} onClose={() => setBookAptIsOpen(false)} />
    </div>
  );
};

export default SingleDoctor;
