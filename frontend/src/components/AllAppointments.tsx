import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  getAllAppointmentsAsync,
} from "../services/appointmentService";

const AllAppointments: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { allAppointments } = useSelector(
    (state: RootState) => state.appointment
  );

  useEffect(() => {
    dispatch(getAllAppointmentsAsync()); // ✅ Fetch appointments on mount
  }, [dispatch]);

  // ✅ Get all appointments from Redux state

  const { userInfo } = useSelector((state: RootState) => state.user);

  return (
    <div className="container mx-auto p-6 mt-20">
      <h2 className="text-2xl font-bold text-center mb-4">All Appointments</h2>

      {(userInfo && userInfo?.isAdmin || userInfo?.isDoctor) &&
      allAppointments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userInfo && userInfo?.isAdmin
            ? allAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg shadow-md p-4"
                >
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 text-sm font-bold bg-gray-100">
                          Pet Owner
                        </td>
                        <td className="border px-4 py-2 text-sm font-normal">
                          {typeof appointment.petOwner === "object"
                            ? appointment.petOwner.name
                            : "Unknown"}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 text-sm font-bold bg-gray-100">
                          Pet
                        </td>
                        <td className="border px-4 py-2 text-sm font-normal">
                          {appointment.pet?.name || "Unknown"}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 text-sm font-bold bg-gray-100">
                          Doctor
                        </td>
                        <td className="border px-4 py-2 text-sm font-normal">
                          {appointment.doctor?.name || "Unknown"}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 text-sm font-bold bg-gray-100">
                          Date
                        </td>
                        <td className="border px-4 py-2 text-sm font-normal">
                          {appointment.appointmentDate
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/")}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 text-sm font-bold bg-gray-100">
                          Status
                        </td>
                        <td className="border px-4 py-2 text-sm font-normal">
                          {appointment.status}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))
            : allAppointments
                .filter(
                  // (appointment) => appointment.doctor?.name === userInfo && userInfo?.name
                  (appointment) => appointment.doctor?.name === userInfo?.name
                ) // Filter by doctor
                .map((appointment, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-lg shadow-md p-4"
                  >
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr>
                          <td className="border px-4 py-2 text-sm font-bold bg-gray-100">
                            Pet Owner
                          </td>
                          <td className="border px-4 py-2 text-sm font-normal">
                            {typeof appointment.petOwner === "object"
                              ? appointment.petOwner.name
                              : "Unknown"}
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 text-sm font-bold bg-gray-100">
                            Pet
                          </td>
                          <td className="border px-4 py-2 text-sm font-normal">
                            {appointment.pet?.name || "Unknown"}
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 text-sm font-bold bg-gray-100">
                            Doctor
                          </td>
                          <td className="border px-4 py-2 text-sm font-normal">
                            {appointment.doctor?.name || "Unknown"}
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 text-sm font-bold bg-gray-100">
                            Date
                          </td>
                          <td className="border px-4 py-2 text-sm font-normal">
                            {appointment.appointmentDate
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("/")}
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 text-sm font-bold bg-gray-100">
                            Status
                          </td>
                          <td className="border px-4 py-2 text-sm font-normal">
                            {appointment.status}
                          </td>
                        </tr>
                        {userInfo && userInfo.isDoctor && (
                          <tr>
                            <td className="border px-4 py-2 text-sm font-bold bg-gray-100">
                              Response
                            </td>
                            <td className="border px-4 py-2 text-sm font-normal">
                              <div className="flex justify-between items-center">
                                <button
                                  className="text-sm bg-indigo-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                  Accept
                                </button>
                                <button
        
                                  className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                  Reject
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">No Appointments Found</p>
      )}
    </div>
  );
};

export default AllAppointments;









