import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fethDoctorsList } from "../services/doctorService";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Doctors: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Fetch doctors list and user details from Redux store
  const { doctorsList } = useSelector((state: RootState) => state.doctors);
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Dispatch action to fetch doctors list
    dispatch(fethDoctorsList);
  }, [dispatch]);

  const handleCreateDoctor = () => {
    navigate("/create-doctor"); // Redirect to create doctor page
  };

  return (
    <motion.div
      className="container mx-auto px-6 py-12 mt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <motion.h2
        className="text-3xl font-bold text-center text-indigo-600 mt-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Meet Our Expert Doctors
      </motion.h2>

      {/* Display "Create Doctor" button for admin users */}
      {userInfo?.email === "admin@gmail.com" && (
        <motion.div
          className="flex justify-end mb-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <button
            onClick={handleCreateDoctor}
            className="bg-blue-600 text-sm hover:bg-blue-700 text-white mt-10 font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Add Doctor
          </button>
        </motion.div>
      )}

      {doctorsList && doctorsList.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 py-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {doctorsList.map((doctor: any) => (
            <motion.div
              key={doctor._id}
              className="transform transition duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link to={`/doctor/${doctor._id}`}>
                <div className="bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-2xl overflow-hidden group">
                  <motion.img
                    src={doctor.profileImage}
                    alt={doctor.name}
                    className="w-full h-48 object-fill transition duration-300 transform group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-center text-indigo-600 mb-2">
                      {doctor.name}
                    </h3>
                    <p className="text-center text-black text-sm mb-3">
                      Specialization -{" "}
                      <span className="font-semibold text-sm">{doctor.specialization}</span>
                    </p>
                    <p className="text-center text-black text-sm mb-2">
                      <strong>Contact : </strong> 
                      <span className="font-semibold text-sm">{doctor.contactNumber}</span>
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          className="text-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          No Doctors Found
        </motion.p>
      )}
    </motion.div>
  );
};

export default Doctors;
