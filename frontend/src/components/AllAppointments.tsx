import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getAllAppointmentsAsync } from "../services/appointmentService";

const AllAppointments: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllAppointmentsAsync()); // ✅ Fetch appointments on mount
  }, [dispatch]);

  // ✅ Get all appointments from Redux state
  const { allAppointments } = useSelector(
    (state: RootState) => state.appointment
  );

  return (
    <div className="container mx-auto p-6 mt-12">
      <h2 className="text-3xl font-bold text-center mb-4 mt-10">Appointment Dashboard</h2>

      {allAppointments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
          {allAppointments.map((appointment, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-md p-4 mt-12"
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
                      {appointment.pet?.breed || "Unknown"}
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
                    {appointment.appointmentDate.split("T")[0]}
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
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">No Appointments Found</p>
      )}
    </div>
  );
};

export default AllAppointments;