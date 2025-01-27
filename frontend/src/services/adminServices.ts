import axios from "axios";
import { AppDispatch } from "../redux/store";
import { getServices } from "../redux/serviceSlice";


const API_URL = "/api/services";

export const fetchServices = async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch(getServices(response.data.services)); // Access data from the API response
    return response.data.services;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch pets");
    }
    throw new Error("An unexpected error occurred");
  }
};