import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchDoctorsList } from "../services/doctorService";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AddDoctorModal from "./AddDoctorModel";
import { Plus } from "lucide-react";

const Doctors: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);

  // Fetch doctors list from the Redux store
  const { doctorsList } = useSelector((state: RootState) => state.doctors);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { addDoctor } = useSelector((state: RootState) => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctorsList);
  }, [dispatch, addDoctor]);

  const handleAptClick = () => {
    navigate("/allAppointments");
  };

  return (
    <motion.div
      className="container mx-auto px-6 py-12 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Heading Animation */}
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Our Doctors
      </motion.h2>

      {/* Display "Create Doctor" button for admin users */}
      {userInfo?.email === "admin@gmail.com" && (
        <motion.div
          className="flex justify-end mb-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <motion.button
            onClick={() => setOpen(true)}
            className="bg-indigo-600 text-white font-medium p-2 md:px-5 sm:p-3 text-sm sm:text-lg flex items-center justify-center rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200 ease-in-out"
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            Add Doctor
          </motion.button>
          <motion.button
            onClick={handleAptClick}
            className="ml-4 bg-indigo-600 text-white font-medium p-2 md:px-5 sm:p-3 text-sm sm:text-lg flex items-center justify-center rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200 ease-in-out"
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            See All Appointments
          </motion.button>
        </motion.div>
      )}

      {/* Doctors List with Stronger Animation */}
      {doctorsList && doctorsList.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3 },
            },
          }}
        >
          {doctorsList.map((doctor: any) => (
            <motion.div
              key={doctor._id}
              className="bg-white text-gray-900 rounded-xl shadow-lg hover:shadow-2xl transform transition-transform duration-300 p-6"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={`/doctor/${doctor._id}`}>
                <motion.img
                  src={doctor.profileImage}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <h3 className="text-xl font-semibold text-center mb-2">
                  {doctor.name}
                </h3>
                <p className="text-center text-gray-600 text-sm leading-relaxed mb-3">
                  Specialization: {doctor.specialization}
                </p>
                <p className="text-center text-gray-600 text-sm leading-relaxed mb-2">
                  Contact: {doctor.contactNumber}
                </p>
              </Link>
            </motion.div>
          ))}
          <AddDoctorModal isOpen={open} onClose={() => setOpen(false)} />
        </motion.div>
      ) : (
        <motion.p
          className="text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          No Doctors Found
        </motion.p>
      )}
    </motion.div>
  );
};

export default Doctors;
