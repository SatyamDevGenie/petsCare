import axios from "axios";
import { AppDispatch, RootState } from "../redux/store";
import { getAllDoctors, getSingleDoctor, createDoctor as newDoctor } from "../redux/doctorSlice";

const API_URL = "/api/doctors/";

export const fethDoctorsList = async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getAllDoctors(response.data.doctors));
    return response.data.doctors;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch pets");
    }
    throw new Error("An unexpected error occurred");
  }
};

export const fetchSingleDoctor =
  (doctor_id: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`${API_URL}${doctor_id}`);
      dispatch(getSingleDoctor(response.data.doctor));
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch pets"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  };



  export const createDoctor =
  (doctor: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { userInfo } = getState().user;

      if (!userInfo || !userInfo.token) {
        throw new Error("Token Not Found");
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`, // Include the JWT token
        },
      };

      const response = await axios.post(`${API_URL}create`, doctor, config);
      dispatch(newDoctor(response.data.doctor));
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch pets"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  };