import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { fetchSingleService } from "../services/adminServices";
import { FaDollarSign } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { motion } from "framer-motion"; // Import motion for animations

const SingleService: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { service_id } = useParams<{ service_id: string }>(); // Use the service ID from the URL

  // Access SingleService from the Redux store
  const { SingleService } = useSelector((state: any) => state.services);

  useEffect(() => {
    if (service_id) {
      dispatch(fetchSingleService(service_id)); // Fetch the service by ID
    }
  }, [dispatch, service_id]);

  return (
    <div className="container mx-auto px-4 py-12 mt-20">
      {SingleService ? (
        <motion.div
          className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-3xl shadow-xl overflow-hidden mt-5"
          initial={{ opacity: 0, y: 50 }} // Start from opacity 0 and slight downward movement
          animate={{ opacity: 1, y: 0 }} // Fade in and reset the y position
          transition={{ duration: 0.8 }} // Duration of the animation
        >
          <div className="p-8 sm:p-12">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold text-white text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {SingleService.title}
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-white leading-relaxed text-center mb-6 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {SingleService.description}
            </motion.p>
            <motion.div
              className="flex items-center justify-center gap-2 text-base sm:text-lg font-extrabold text-yellow-300 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <FaDollarSign className="text-3xl sm:text-4xl" />
              <span className="text-3xl sm:text-5xl">{SingleService.price}</span>
            </motion.div>
            <motion.div
              className="flex justify-center mt-6 sm:mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-8 sm:py-4 sm:px-10 rounded-full text-lg shadow-lg transform transition-all duration-200 hover:scale-110 hover:shadow-2xl">
                Contact Us
              </button>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <FiLoader className="text-blue-500 animate-spin text-4xl" />
          <p className="ml-4 text-gray-600 text-lg">Loading service details...</p>
        </div>
      )}
    </div>
  );
};

export default SingleService;
