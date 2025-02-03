import axios from "axios";
import { addPet, setPets, setSinglePet} from "../redux/petsSlice";
import { AppDispatch, RootState } from "../redux/store";


const API_URL = "/api/pets/";

export const fetchPets = async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch(setPets(response.data.data)); // Access data from the API response
    return response.data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch pets");
    }
    throw new Error("An unexpected error occurred");
  }
};


export const fetchSinglePet = (petId: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}${petId}`);
    dispatch(setSinglePet(response.data.data)); // Dispatch the pet data to the Redux store
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch pet");
    }
    throw new Error("An unexpected error occurred");
  }
};



export const createPet = (petData: any) => async (
  dispatch: AppDispatch,
  getState: () => RootState
) => {
  try {
    const { userInfo } = getState().user;

    if (!userInfo || !userInfo.token) {
      throw new Error("No token found. Authorization denied.");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`, // Include the JWT token
      },
    };

    const response = await axios.post(`${API_URL}create`, petData, config);

    dispatch(addPet(response.data.data)); // Dispatch action to add the new pet
    return response.data.data;
  } catch (error: any) {
    console.error("Failed to create pet:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to create pet. Please try again."
    );
  }
};







