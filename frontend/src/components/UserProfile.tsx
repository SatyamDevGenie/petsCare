import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../services/userService";
import { logout } from "../redux/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import { motion } from "framer-motion";
import { getUserAppointmentsAsync } from "../services/appointmentService";

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.user);
  const { appointments } = useSelector((state: RootState) => state.appointment);
  const { singleDoctor } = useSelector((state: RootState) => state.doctors);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getUserAppointmentsAsync());
  }, [dispatch]);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        await fetchUserProfile(dispatch);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to load user profile");
        setLoading(false);
      }
    };

    if (!userInfo) {
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, [dispatch, userInfo]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate("/edit");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-red-600 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <motion.div
      className={`grid ${
        userInfo.isAdmin || userInfo.isDoctor ? "grid-cols-1" : "md:grid-cols-3"
      } gap-8 p-6 min-h-screen mt-12`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Side - Profile */}
      <motion.div
        className={`bg-white p-6 rounded-xl shadow-lg transform transition-all hover:shadow-2xl border-l-4 border-blue-500 mt-12 ${
          userInfo.isAdmin || userInfo.isDoctor
            ? "md:col-span-3 w-full"
            : "md:col-span-1"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800 mt-12">
          User Profile
        </h2>
        <div className="space-y-4">
          <div>
            <strong className="block text-sm font-medium text-gray-700">
              Full Name
            </strong>
            <p className="text-lg text-gray-800">{userInfo?.name}</p>
          </div>
          <div>
            <strong className="block text-sm font-medium text-gray-700">
              Email
            </strong>
            <p className="text-lg text-gray-800">{userInfo?.email}</p>
          </div>
          <div>
            <strong className="block text-sm font-medium text-gray-700">
              Admin Status
            </strong>
            <p className="text-lg text-gray-800">
              {userInfo?.isAdmin ? "Yes" : "No"}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-6 space-y-3 md:space-y-0 md:space-x-4">
          <motion.button
            onClick={handleEditProfile}
            className="w-full text-sm md:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 transition-all duration-300"
          >
            Edit Profile
          </motion.button>
          <motion.button
            onClick={handleLogout}
            className="w-full text-sm md:w-auto bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </motion.button>
        </div>
      </motion.div>

      {/* Right Side - Appointments (Hidden for Admins & Doctors) */}
      {!(userInfo.isAdmin || userInfo.isDoctor) && (
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg md:col-span-2 transform transition-all hover:shadow-2xl border-l-4 border-green-500 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            My Appointments
          </h2>

          {appointments && appointments.length > 0 ? (
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {appointments.map((appointment, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Appointment #{index + 1}
                  </h3>
                  <div className="text-gray-700 space-y-1 text-sm">
                    <p>
                      <strong>👤 Pet Owner:</strong> {userInfo.name}
                    </p>
                    <p>
                      <strong>🐶 Pet:</strong>{" "}
                      {appointment.pet?.breed || "Unknown"}
                    </p>
                    <p>
                      <strong>🩺 Doctor:</strong>{" "}
                      {singleDoctor?.name ||
                        appointment?.doctor?.name ||
                        "Unknown"}
                    </p>
                    <p>
                      <strong>📅 Date:</strong>{" "}
                      {appointment.appointmentDate
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")}
                    </p>
                    <p
                      className={`font-semibold ${
                        appointment.status === "Pending"
                          ? "text-yellow-500"
                          : "text-green-600"
                      }`}
                    >
                      <strong>📌 Status:</strong> {appointment.status}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="mt-4 text-center text-gray-500 text-lg">
              No Appointments yet
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserProfile;









// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { fetchUserProfile } from "../services/userService";
// import { logout } from "../redux/userSlice";
// import { AppDispatch, RootState } from "../redux/store";
// import { motion } from "framer-motion";
// import { getUserAppointmentsAsync } from "../services/appointmentService";

// const UserProfile = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const { userInfo } = useSelector((state: RootState) => state.user);
//   const { appointments } = useSelector((state: RootState) => state.appointment);
//   const { singleDoctor } = useSelector((state: RootState) => state.doctors);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     dispatch(getUserAppointmentsAsync());
//   }, [dispatch]);

//   useEffect(() => {
//     const loadUserProfile = async () => {
//       try {
//         setLoading(true);
//         await fetchUserProfile(dispatch);
//         setLoading(false);
//       } catch (err: any) {
//         setError(err.message || "Failed to load user profile");
//         setLoading(false);
//       }
//     };

//     if (!userInfo) {
//       loadUserProfile();
//     } else {
//       setLoading(false);
//     }
//   }, [dispatch, userInfo]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const handleEditProfile = () => {
//     navigate("/edit");
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="text-lg font-semibold text-gray-700">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <div className="text-red-600 text-lg font-semibold">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       className="grid md:grid-cols-3 gap-8 p-6 min-h-screen bg-gradient-to-r from-gray-50 to-blue-100 mt-12"
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Left Side - Profile */}
//       <motion.div
//         className="bg-white p-6 rounded-xl shadow-lg md:col-span-1 transform transition-all hover:shadow-2xl border-l-4 border-blue-500 mt-12"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.7 }}
//       >
//         <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800 mt-12">
//           User Profile
//         </h2>
//         <div className="space-y-4">
//           <div>
//             <strong className="block text-sm font-medium text-gray-700">
//               Full Name
//             </strong>
//             <p className="text-lg text-gray-800">{userInfo?.name}</p>
//           </div>
//           <div>
//             <strong className="block text-sm font-medium text-gray-700">
//               Email
//             </strong>
//             <p className="text-lg text-gray-800">{userInfo?.email}</p>
//           </div>
//           <div>
//             <strong className="block text-sm font-medium text-gray-700">
//               Admin Status
//             </strong>
//             <p className="text-lg text-gray-800">
//               {userInfo?.isAdmin ? "Yes" : "No"}
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row justify-between mt-6 space-y-3 md:space-y-0 md:space-x-4">
//           <motion.button
//             onClick={handleEditProfile}
//             className="w-full text-sm md:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 transition-all duration-300"
//           >
//             Edit Profile
//           </motion.button>
//           <motion.button
//             onClick={handleLogout}
//             className="w-full text-sm md:w-auto bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
//           >
//             Logout
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* Right Side - Appointments */}
//       <motion.div
//         className="bg-white p-6 rounded-xl shadow-lg md:col-span-2 transform transition-all hover:shadow-2xl border-l-4 border-green-500 mt-12"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.7 }}
//       >
//         <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//           My Appointments
//         </h2>
//         {appointments && appointments.length > 0 ? (
//           <motion.div
//             className="grid md:grid-cols-2 gap-6"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {appointments.map((appointment, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//               >
//                 <h3 className="text-lg font-bold text-gray-800 mb-2">
//                   Appointment #{index + 1}
//                 </h3>
//                 <div className="text-gray-700 space-y-1 text-sm">
//                   <p>
//                     <strong>👤 Pet Owner:</strong> {userInfo.name}
//                   </p>
//                   <p>
//                     <strong>🐶 Pet:</strong> {appointment.pet?.breed || "Unknown"}
//                   </p>
//                   <p>
//                     <strong>🩺 Doctor:</strong>{" "}
//                     {singleDoctor?.name || appointment?.doctor?.name || "Unknown"}
//                   </p>
//                   <p>
//                     <strong>📅 Date:</strong>   {appointment.appointmentDate.split("T")[0]}
//                   </p>
//                   <p
//                     className={`font-semibold ${
//                       appointment.status === "Pending"
//                         ? "text-yellow-500"
//                         : "text-green-600"
//                     }`}
//                   >
//                     <strong>📌 Status:</strong> {appointment.status}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         ) : (
//           <p className="mt-4 text-center text-gray-500 text-lg">
//             No Appointments yet
//           </p>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default UserProfile;
