import axios from "axios";
import { AppDispatch, RootState } from "../redux/store";
import {
  bookApt,
  getAllAppointments,
  setAppointments,
  updateAppointmentStatus,
} from "../redux/appointmentSlice";

const API_URL = "/api/appointment/";

export const bookAppointmentService =
  (appointment: any) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { userInfo } = getState().user;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      if (!userInfo.token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(`${API_URL}book`, appointment, config);
      dispatch(bookApt(response.data.appointment));
      return response.data.appointment;
    } catch (error: any) {
      console.error(
        "Failed to add service:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Failed to add service. Please try again."
      );
    }
  };

export const getUserAppointmentsAsync =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { userInfo } = getState().user;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`, // Include the JWT token
        },
      };

      const response = await axios.get(`${API_URL}usersAppointments`, config);
      console.log("Fetched Appointments from API:", response.data.appointments); // ✅ Debugging

      dispatch(setAppointments(response.data.appointments)); // Store in Redux
      return response.data.appointments;
    } catch (error: any) {
      console.error(
        "Failed to add service:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Failed to add service. Please try again."
      );
    }
  };

export const getAllAppointmentsAsync =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { userInfo } = getState().user;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`, // Include the JWT token
        },
      };
      const response = await axios.get(`${API_URL}all`, config);
      console.log(
        "Fetched All Appointments from API:",
        response.data.appointments
      ); // ✅ Debugging
      dispatch(getAllAppointments(response.data.appointments)); // Store in Redux
      return response.data.appointments;
    } catch (error: any) {
      console.error(
        "Failed to add service:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message ||
          "Failed to add service. Please try again."
      );
    }
  };




  export const respondToAppointmentService =
  (appointmentId: string, response: "Accepted" | "Rejected") =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { userInfo } = getState().user;

      // Ensure only doctors can respond to appointments
      if (userInfo.isDoctor !== true) {
        throw new Error("Unauthorized: Only doctors can respond to appointments.");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // Sending PUT request to update appointment status
      const { data } = await axios.put(`${API_URL}respond`, { appointmentId, response }, config);

      dispatch(updateAppointmentStatus({ appointmentId, status: response }));
      return data;
    } catch (error: any) {
      console.error("Failed to respond to appointment:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Failed to respond to appointment. Please try again.");
    }
  };