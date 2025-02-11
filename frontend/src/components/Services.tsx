import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchServices } from "../services/adminServices";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

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

  const { allServices } = useSelector((state: RootState) => state.services);
  const { userInfo } = useSelector((state: RootState) => state.user);

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
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Heading Animation */}
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-center text-black mb-8"
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Our Services
      </motion.h2>

      {/* Admin Button Animation */}
      {isAdmin && (
        <motion.div
          className="flex justify-end mt-10 sm:mt-20 mb-9"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", type: "spring", stiffness: 100 }}
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
              staggerChildren: 0.3, // Staggered animation
            },
          },
        }}
      >
        {allServices && allServices.length > 0 ? (
          allServices.map((service: Service) => (
            <motion.div
              key={service.id}
              className="bg-white text-gray-900 rounded-xl shadow-md hover:shadow-2xl transform transition-transform duration-500"
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.8 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ scale: 1.1, boxShadow: "0px 10px 30px rgba(0,0,0,0.2)" }}
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
          <motion.p
            className="text-center text-gray-500 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            No Services found
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Services;
