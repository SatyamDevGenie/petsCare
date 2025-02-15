import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { cancelDoctor, fetchSingleDoctor } from "../services/doctorService";
import EditDoctorModal from "./EditDoctorModel";
import AppointmentModal from "./AppointmentModal";
import { motion } from "framer-motion";

const SingleDoctor: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { doctor_id } = useParams(); // Fetch doctor ID from route params
  const { singleDoctor } = useSelector((state: RootState) => state.doctors);
  const { userInfo } = useSelector((state: RootState) => state.user);

  const [isOpen, setisOpen] = useState<boolean>(false);
  const [BookAptisOpen, setBookAptisOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctor_id) {
      dispatch(fetchSingleDoctor(doctor_id)); // Fetch doctor details if doc_id exists
    }
  }, [dispatch, doctor_id]);

  // If no doctor is found, display a loading or error message
  if (!singleDoctor) {
    return (
      <div className="container mx-auto px-6 py-8 mt-20">
        <p className="text-center text-gray-300">
          Doctor details not available.
        </p>
      </div>
    );
  }

  const handleDelete = async (singleDoctor: any) => {
    if (!singleDoctor || !singleDoctor._id) {
      console.error("Error: Doctor ID is undefined.");
      return;
    }
    if (singleDoctor) {
      try {
        await dispatch(cancelDoctor(singleDoctor));
        navigate("/doctors");
      } catch (err: any) {
        console.error("Error deleting service:", err);
      }
    }
  };

  const handleAptClick = () => {
    navigate("/allAppointments");
  };

  // Display the doctor's details
  return (
    <div className="container mx-auto px-6 py-8 mt-20">
      {userInfo && userInfo.isDoctor && (
        <motion.div
          className="flex justify-end mb-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <button
            onClick={handleAptClick}
            className=" ml-4 bg-indigo-600 text-white font-medium mb-8  md:px-5 sm:p-3 text-sm sm:text-lg flex items-center justify-center rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 ease-in-out transform hover:scale-105"
          >
            My Appointments
          </button>
        </motion.div>
      )}
      <div className="bg-white max-w-md mx-auto text-white rounded-lg p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
        <img
          src={singleDoctor.profileImage}
          alt={singleDoctor.name}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <table className="w-full border-collapse text-gray-800">
          <tbody>
            <tr>
              <td className=" px-4 py-2 text-sm font-bold">Name:</td>
              <td className=" px-4 py-2 text-sm font-semibold text-black">
                {singleDoctor.name}
              </td>
            </tr>
            <tr>
              <td className=" px-4 py-2 text-sm font-bold ">Email:</td>
              <td className=" px-4 py-2 text-sm font-semibold text-black">
                {singleDoctor.email}
              </td>
            </tr>
            <tr>
              <td className=" px-4 py-2 text-sm font-bold ">Specialization:</td>
              <td className=" px-4 py-2 text-sm font-semibold text-black">
                {singleDoctor.specialization}
              </td>
            </tr>
            <tr>
              <td className=" px-4 py-2 text-sm font-bold ">Description:</td>
              <td className=" px-4 py-2 text-sm font-semibold text-black">
                {singleDoctor.notes}
              </td>
            </tr>
            <tr>
              <td className=" px-4 py-2 text-sm font-bold ">Availability:</td>
              <td className=" px-4 py-2 text-sm font-semibold text-black">
                {singleDoctor.availability}
              </td>
            </tr>
            <tr>
              <td className=" px-4 py-2 text-sm font-bold ">Contact:</td>
              <td className=" px-4 py-2 text-sm font-semibold text-black">
                {singleDoctor.contactNumber}
              </td>
            </tr>
          </tbody>
        </table>

        {userInfo && !userInfo.isAdmin && !userInfo.isDoctor && (
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={() => setBookAptisOpen(true)}
              className=" text-sm bg-indigo-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Book Appointment
            </button>
          </div>
        )}

        {userInfo && userInfo.isAdmin && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setisOpen(true)}
              className="text-sm bg-indigo-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(singleDoctor)}
              className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <EditDoctorModal
        singleDoctor={singleDoctor}
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
      />
      <AppointmentModal
        singleDoctor={singleDoctor}
        isOpen={BookAptisOpen}
        onClose={() => setBookAptisOpen(false)}
      />
    </div>
  );
};

export default SingleDoctor;







