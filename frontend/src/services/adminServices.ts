import axios from "axios";
import { AppDispatch, RootState } from "../redux/store";
import { getServices, getSingleService, addService, editService } from "../redux/serviceSlice";


const API_URL = "/api/services/";

export const fetchServices = async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch(getServices(response.data.services)); // Access data from the API response
    return response.data.services;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch Services");
    }
    throw new Error("An unexpected error occurred");
  }
};


export const fetchSingleService = (service_id:string)=> async (dispatch:AppDispatch)=>{
  try{
      const response = await axios.get(`${API_URL}${service_id}`)
      dispatch(getSingleService(response.data.service))
      console.log(response.data)
      return response.data;
  }catch(error:any){
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Failed to fetch pets");
      }
      throw new Error("An unexpected error occurred");

  }
}


export const createService = (service: any) => async (
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

    const response = await axios.post(`${API_URL}create`, service, config);

    dispatch(addService(response.data.service));
    return response.data;
  } catch (error: any) {
    console.error("Failed to add service:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to add service. Please try again."
    );
  }
};



export const updateService =
  (service: any) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
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
      const response = await axios.put(
        `${API_URL}${service._id}`,
        service,
        config
      );
      dispatch(editService(response.data.service));
      return response.data;
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