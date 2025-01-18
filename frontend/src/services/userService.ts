import axios, { AxiosError } from "axios";
import { login, logout } from "../redux/userSlice";
import { AppDispatch } from "../redux/store";

const API_URL = "/api/users/";

// Register user (if required)
export const registerUser = async (userData: { name: string; email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_URL}register`, userData);
      return response.data; // Make sure the data is returned properly
    } catch (error: any) {
      // This helps catch and throw the error properly
      if (error.response) {
        // If the error has a response object from the server
        throw new Error(error.response?.data?.message || "Registration failed!");
      } else {
        // If the error does not have a response object
        throw new Error(error.message || "An unknown error occurred");
      }
    }
  };

// Login user and dispatch login action to Redux
export const loginUser = async (dispatch: AppDispatch, userData: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}login`, userData);
    dispatch(login(response.data.user));  // Dispatch login action to store
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      throw error.response?.data?.message || error.message;
    }
    throw "An unexpected error occurred"; // Handle non-Axios errors
  }
};

// Logout user and dispatch logout action to Redux
export const logoutUser = (dispatch: AppDispatch) => {
  dispatch(logout());  // Dispatch logout action to store
};