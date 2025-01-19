import axios from "axios";
import { register, login, logout } from "../redux/userSlice";
import { AppDispatch } from "../redux/store";

const API_URL = "/api/users/";

// Register user and dispatch register action to Redux
export const registerUser = async (
  dispatch: AppDispatch,
  userData: { name: string; email: string; password: string }
) => {
  try {
    const response = await axios.post(`${API_URL}register`, userData);

    // Dispatch register action to Redux store
    dispatch(register(response.data.user));

    return response.data; // Return the API response if needed
  } catch (error: any) {
    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed!");
    }
    // Handle other types of errors
    throw new Error(error.message || "An unknown error occurred");
  }
};

// Login user and dispatch login action to Redux
export const loginUser = async (
  dispatch: AppDispatch,
  userData: { email: string; password: string }
) => {
  try {
    const response = await axios.post(`${API_URL}login`, userData);

    // Dispatch login action to Redux store
    dispatch(login(response.data.user));

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};

// Logout user and dispatch logout action to Redux
export const logoutUser = (dispatch: AppDispatch) => {
  dispatch(logout()); // Dispatch logout action to store
};




