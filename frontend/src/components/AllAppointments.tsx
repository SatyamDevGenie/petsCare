import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getAllAppointmentsAsync, respondToAppointmentService } from "../services/appointmentService";
import toast from "react-hot-toast";

const AllAppointments: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { allAppointments } = useSelector((state: RootState) => state.appointment);
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getAllAppointmentsAsync());
  }, [dispatch]);

  const filteredAppointments = allAppointments.filter((appointment) => {
    if (userInfo?.isAdmin) {
      return true;
    }
    if (userInfo?.isDoctor) {
      return appointment.doctor?.name === userInfo?.name;
    }
    return false;
  });

  const handleResponse = async (appointmentId: string, response: "Accepted" | "Rejected") => {
    await dispatch(respondToAppointmentService(appointmentId, response));
    toast.success(`Appointment ${response}`, {
      style: {
        fontSize: "14px",
        padding: "8px",
        minWidth: "200px",
        fontFamily: "Arial Black",
        fontWeight: "bolder",
      },
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 mt-20 py-10">
      <h2 className="text-3xl font-medium text-center mb-6 text-gray-800">See All Appointments</h2>

      {filteredAppointments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredAppointments.map((appointment, index) => (
            <div key={index} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-transform transform hover:scale-105 mt-12">
              <table className="w-full border-collapse text-gray-700">
                <tbody>
                  <tr>
                    <td className="border px-4 py-3 font-semibold bg-gray-100">Pet Owner</td>
                    <td className="border px-4 py-3">{typeof appointment.petOwner === "object" ? appointment.petOwner.name : "Unknown"}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-3 font-semibold bg-gray-100">Pet</td>
                    <td className="border px-4 py-3">{appointment.pet?.name || "Unknown"}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-3 font-semibold bg-gray-100">Doctor</td>
                    <td className="border px-4 py-3">{appointment.doctor?.name || "Unknown"}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-3 font-semibold bg-gray-100">Date</td>
                    <td className="border px-4 py-3">{appointment.appointmentDate.split("T")[0].split("-").reverse().join("/")}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-3 font-semibold bg-gray-100">Status</td>
                    <td className="border px-4 py-3 font-bold text-indigo-600">{appointment.status}</td>
                  </tr>
                  {userInfo?.isDoctor && (
                    <tr>
                      <td className="border px-4 py-3 font-semibold bg-gray-100">Response</td>
                      <td className="border px-4 py-3">
                        <div className="flex justify-between items-center">
                          <button
                            onClick={() => handleResponse(appointment._id, "Accepted")}
                            className="text-sm bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleResponse(appointment._id, "Rejected")}
                            className="text-sm bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
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
        <p className="text-center text-gray-500 text-lg">No appointments found.</p>
      )}
    </div>
  );
};

export default AllAppointments;



