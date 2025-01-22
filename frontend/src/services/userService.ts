import axios from "axios";
import { register, login, logout, getUserProfile, updateUserProfile} from "../redux/userSlice";
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
    dispatch(register(response.data));

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





// Get user profile and dispatch getUserProfile action to Redux
export const fetchUserProfile = async (dispatch: AppDispatch) => {
  try {
    // Parse the userInfo from localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

    // Check if userInfo is valid and contains token
    if (userInfo && userInfo.token) {
      const response = await axios.get(`${API_URL}profile`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`, // Use token from parsed userInfo
          'Content-Type': 'application/json', // Added Content-Type header
        },
      });

      // Dispatch getUserProfile action to Redux store
      dispatch(getUserProfile(response.data.user));

      return response.data; // Return the API response if needed
    } else {
      throw new Error("User is not authenticated");
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};



// Update user profile and dispatch updateUserProfile action to Redux
export const updateUser = async (
  dispatch: AppDispatch,
  updatedData: { name: string; email: string; password: string }
) => {
  try {
    // Parse the userInfo from localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

    // Check if userInfo is valid and contains token
    if (userInfo && userInfo.token) {
      const response = await axios.put(
        `${API_URL}profile`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`, // Use token from parsed userInfo
            'Content-Type': 'application/json', // Added Content-Type header
          },
        }
      );

      // Dispatch updateUserProfile action to Redux store
      dispatch(updateUserProfile(response.data.user));

      return response.data.user; // Return the API response if needed
    } else {
      throw new Error("User is not authenticated");
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};






