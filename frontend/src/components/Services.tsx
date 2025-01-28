import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchServices } from "../services/adminServices";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

// Define the service interface
interface Service {
  id: string;
  _id: string;
  title: string;
  description: string;
  price: number;
}

const Services: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Access the state of all services from Redux
  const { allServices } = useSelector((state: RootState) => state.services);
  const { userInfo } = useSelector((state: RootState) => state.user);

  // Fetch all services on component mount
  useEffect(() => {
    dispatch(fetchServices);
  }, [dispatch]);

  const handleAddServices = () => {
    navigate("/create/Service");
  };

  const isAdmin = userInfo && userInfo.email === "admin@gmail.com";

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Heading Animation */}
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-center text-black mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Services
      </motion.h2>

      {/* Admin Button Animation */}
      {isAdmin && (
        <motion.div
          className="flex justify-end mt-10 sm:mt-20 mb-9"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <button
            onClick={handleAddServices}
            className="bg-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-pink-600 transition-all text-sm sm:text-base font-extrabold"
          >
            Add Services
          </button>
        </motion.div>
      )}

      {/* Services Animation */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-5"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 1, // Stagger animations for services
            },
          },
        }}
      >
        {allServices && allServices.length > 0 ? (
          allServices.map((service: Service) => (
            <motion.div
              key={service.id}
              className="bg-white text-gray-900 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link to={`/service/${service._id}`}>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    {service.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-extrabold text-green-500">
                      Price : ${service.price}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <p>No Services found</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Services;
