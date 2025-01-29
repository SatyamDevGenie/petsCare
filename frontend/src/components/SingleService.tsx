import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { fetchSingleService } from "../services/adminServices";
import { FaDollarSign } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";

const SingleService: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { service_id } = useParams<{ service_id: string }>();

  const { SingleService } = useSelector((state: any) => state.services);

  useEffect(() => {
    if (service_id) {
      dispatch(fetchSingleService(service_id));
    }
  }, [dispatch, service_id]);

  return (
    <div className="container mx-auto px-4 py-12 mt-5">
      {SingleService ? (
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className=" h-40 sm:h-52"></div>
          <div className="p-2 sm:p-12 relative -mt-16">
            <motion.div
              className=" p-6 sm:p-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-4">
                {SingleService.title}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 text-center mb-6 leading-relaxed font-medium">
                {SingleService.description}
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <FaDollarSign className="text-2xl sm:text-3xl text-yellow-500" />
                <span className="text-3xl sm:text-4xl font-bold">{SingleService.price}</span>
              </div>
              <div className="mt-8 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-8 sm:py-4 sm:px-12 rounded-full text-lg font-semibold shadow-lg transition-all"
                >
                  Contact Us
                </motion.button>
              </div>
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
