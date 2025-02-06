import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchDoctorsList } from "../services/doctorService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AddDoctorModal from "./AddDoctorModel";
import { Plus } from "lucide-react";

const DoctorHome: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  // Fetch doctors list from the Redux store
  const { doctorsList } = useSelector((state: RootState) => state.doctors);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { addDoctor } = useSelector((state: RootState) => state.doctors);

  useEffect(() => {
    // Dispatch action to fetch doctors list
    dispatch(fetchDoctorsList);
  }, [dispatch, addDoctor]);

  return (
    <div className="container mx-auto px-6 py-8 mt-20">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-10">
        Our Doctors
      </h2>

      {/* Display "Create Doctor" button for admin users */}
      {userInfo?.email === "admin@gmail.com" && (
        <motion.div
          className="flex justify-end mb-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <button
            onClick={() => setOpen(true)}
            className="bg-indigo-600 text-white font-medium mb-8 p-2 md:px-5 sm:p-3 text-sm sm:text-lg flex items-center justify-center rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 ease-in-out transform hover:scale-105"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            Add Doctor
          </button>
        </motion.div>
      )}
      {doctorsList && doctorsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctorsList.map((doctor: any) => (
            <Link to={`/doctor/${doctor._id}`}>
              <div
                key={doctor.email}
                className="bg-white text-gray-900 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 p-6"
              >
                <img
                  src={doctor.profileImage}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
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
              </div>
            </Link>
          ))}

          <AddDoctorModal isOpen={open} onClose={() => setOpen(false)} />
        </div>
      ) : (
        <p className="text-center text-gray-300">No Doctors Found</p>
      )}
    </div>
  );
};

export default DoctorHome;







