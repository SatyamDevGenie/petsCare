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
        <p className="text-center text-gray-300">Doctor details not available.</p>
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
    <div className="container mx-auto px-6 py-12 mt-20 p-5">
      {userInfo?.isDoctor && userInfo._id === singleDoctor._id && (
        <motion.div
          className="flex justify-end mb-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <button
            onClick={handleAptClick}
            className="ml-4 bg-indigo-600 text-white font-medium px-5 py-3 text-lg flex items-center justify-center rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 ease-in-out transform hover:scale-105"
          >
            My Appointments
          </button>
        </motion.div>
      )}

      <div className="bg-white max-w-md mx-auto rounded-lg p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
        <img
          src={singleDoctor.profileImage}
          alt={singleDoctor.name}
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500 shadow-lg"
        />

        {/* Doctor's Name */}
        <p className="text-xl font-bold text-center text-gray-800">{singleDoctor.name}</p>

        {/* Specialization with Icon */}
        <p className="text-lg font-semibold text-indigo-600 flex items-center justify-center gap-2 mt-2">
          <FaUserMd /> {singleDoctor.specialization}
        </p>

        {/* 📍 Static Location Section */}
        <p className="text-sm text-gray-500 flex items-center justify-center gap-2 mt-1">
          <FaMapMarkerAlt className="text-red-500" /> Mumbai, India
        </p>

        {/* ⭐ Rating */}
        <p className="text-lg font-bold text-yellow-500 mt-2 flex items-center justify-center gap-2">
          <FaStar /> 4.8 / 5
        </p>

        {/* Contact Information */}
        <p className="text-sm text-gray-600 flex items-center justify-center gap-2 mt-2">
          <FaPhoneAlt className="text-green-500" /> {singleDoctor.contactNumber}
        </p>
        <p className="text-sm text-gray-600 flex items-center justify-center gap-2 mt-1">
          <FaEnvelope className="text-blue-500" /> {singleDoctor.email}
        </p>

        {/* Static Table for Details */}
        <table className="w-full border-collapse text-gray-800 mt-4">
          <tbody>
            {[["Description", singleDoctor.notes], ["Availability", singleDoctor.availability]].map(([label, value]) => (
              <tr key={label}>
                <td className="px-4 py-2 text-sm font-bold">{label}:</td>
                <td className="px-4 py-2 text-sm font-semibold text-black">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Buttons for Booking & Editing */}
        {userInfo && !userInfo.isAdmin && !userInfo.isDoctor && (
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={() => setBookAptIsOpen(true)}
              className="text-sm bg-indigo-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Book Appointment
            </button>
          </div>
        )}

        {userInfo?.isAdmin && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setIsOpen(true)}
              className="text-sm bg-indigo-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <EditDoctorModal singleDoctor={singleDoctor} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <AppointmentModal singleDoctor={singleDoctor} isOpen={bookAptIsOpen} onClose={() => setBookAptIsOpen(false)} />
    </div>
  );
};

export default SingleDoctor;







