import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchSingleDoctor } from "../services/doctorService";
import { motion } from "framer-motion";

const SingleDoctor: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { doctor_id } = useParams(); // Fetch doctor ID from route params
  const { singleDoctor } = useSelector((state: RootState) => state.doctors);

  useEffect(() => {
    if (doctor_id) {
      dispatch(fetchSingleDoctor(doctor_id)); // Fetch doctor details if doctor_id exists
    }
  }, [dispatch, doctor_id]);

  // If no doctor is found, display a loading or error message
  if (!singleDoctor) {
    return (
      <div className="container mx-auto px-6 py-16 mt-20">
        <p className="text-center text-gray-400 text-lg">
          Doctor details not available.
        </p>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  // Display the doctor's details
  return (
    <motion.div
      className="container mx-auto px-6 py-16 mt-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="bg-white text-gray-800 rounded-lg shadow-lg p-8 max-w-3xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <motion.img
            src={singleDoctor.profileImage}
            alt={singleDoctor.name}
            className="w-40 h-40 rounded-full shadow-lg object-cover"
            whileHover={{ scale: 1.1 }}
          />
        </div>

        {/* Doctor's Name */}
        <motion.h2
          className="text-3xl font-bold text-center text-indigo-600 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 2 } }}
        >
          {singleDoctor.name}
        </motion.h2>

        {/* Doctor Details */}
        <motion.div
          className="space-y-4 mt-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <p className="text-lg text-gray-600">
            <strong>Email:</strong>{" "}
            <span className="text-black font-medium">{singleDoctor.email}</span>
          </p>
          <p className="text-lg text-gray-600">
            <strong>Specialization:</strong>{" "}
            <span className="text-black font-medium">
              {singleDoctor.specialization}
            </span>
          </p>
          <p className="text-lg text-gray-600">
            <strong>Contact:</strong>{" "}
            <span className="text-black font-medium">
              {singleDoctor.contactNumber}
            </span>
          </p>
          <p className="text-lg text-gray-600">
            <strong>Notes:</strong>{" "}
            <span className="text-black font-medium">{singleDoctor.notes}</span>
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-200 my-6"
          initial={{ width: 0 }}
          animate={{ width: "100%", transition: { duration: 2 } }}
        ></motion.div>

        {/* Call to Action */}
        <div className="text-center">
          <motion.button
            className="bg-indigo-600 text-xl hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Book Appointment
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SingleDoctor;
