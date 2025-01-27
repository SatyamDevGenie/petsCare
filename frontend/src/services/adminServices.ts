import axios from "axios";
import { AppDispatch } from "../redux/store";
import { getServices, getSingleService } from "../redux/serviceSlice";


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