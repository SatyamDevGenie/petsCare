import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchServices } from "../services/adminServices";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
      className="container mx-auto px-6 sm:px-12 lg:px-20 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Page Heading */}
      <motion.h2
        className="text-2xl sm:text-4xl  font-medium text-center text-gray-900 mb-12"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Explore Our Premium <span className="text-blue-500">Services</span>
      </motion.h2>

      {/* Admin Button */}
      {isAdmin && (
        <motion.div
          className="flex justify-end mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <button
            onClick={handleAddServices}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg font-semibold"
          >
            + Add New Service
          </button>
        </motion.div>
      )}

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {allServices && allServices.length > 0 ? (
          allServices.map((service: Service) => (
            <motion.div
              key={service.id}
              className="bg-white/80 backdrop-blur-lg mt-8 text-gray-900 rounded-xl shadow-lg hover:shadow-2xl transform transition-transform duration-500"
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={`/service/${service._id}`}>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-lg text-justify">{service.description}</p>
                  <div className="mt-5 flex justify-between items-center">
              
                    <span className="bg-blue-500 text-white px-4 py-3 text-sm rounded-full">
                      Learn More
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-center text-gray-500 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            No Services Available
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Services;





