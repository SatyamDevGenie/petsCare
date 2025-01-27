import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fethDoctorsList } from "../services/doctorService";
import { Link, useNavigate } from "react-router-dom";

const Doctors: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Fetch doctors list and user details from Redux store
  const { doctorsList } = useSelector((state: RootState) => state.doctors);
  const { userInfo } = useSelector((state: RootState) => state.user); // Assuming `userInfo` contains logged-in user details

  useEffect(() => {
    // Dispatch action to fetch doctors list
    dispatch(fethDoctorsList);
  }, [dispatch]);

  const handleCreateDoctor = () => {
    navigate("/create-doctor"); // Redirect to create doctor page
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-4xl font-extrabold text-center text-indigo-600 mb-12">
        Meet Our Expert Doctors
      </h2>

      {/* Display "Create Doctor" button for admin users */}
      {userInfo?.email === "admin@gmail.com" && (
        <div className="mb-8 text-center">
          <button
            onClick={handleCreateDoctor}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Add New Doctor
          </button>
        </div>
      )}

      {doctorsList && doctorsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {doctorsList.map((doctor: any) => (
            <Link
              key={doctor._id}
              to={`/doctor/${doctor._id}`}
              className="transform transition duration-300 hover:scale-105"
            >
              <div className="bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-2xl overflow-hidden">
                <img
                  src={doctor.profileImage}
                  alt={doctor.name}
                  className="w-full h-48 object-fill transition duration-300 transform hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-center text-indigo-600 mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-center text-gray-500 text-lg mb-3">
                    Specialization: <span className="font-semibold">{doctor.specialization}</span>
                  </p>
                  <p className="text-center text-gray-400 mb-2">
                    <strong>Contact:</strong> {doctor.contactNumber}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No Doctors Found</p>
      )}
    </div>
  );
};

export default Doctors;
