import axios from "axios";
import { AppDispatch, RootState } from "../redux/store";
import {bookApt, setAppointments} from "../redux/appointmentSlice";

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
