import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Service interface
interface Service {
  _id: string;
  id: string;
  title: string;
  description: string;
  price: number;
}

// Define the initial state for the slice
interface ServiceState {
  allServices: Service[];
  SingleService: Service | null;
  addService: Service | null;
}

const initialState: ServiceState = {
  allServices: [], // Initialize as an empty array
  SingleService: null,
  addService: null,
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    getServices(state, action: PayloadAction<Service[]>) {
      state.allServices = action.payload;
    },
    getSingleService(state, action) {
      state.SingleService = action.payload;
      localStorage.setItem(
        "SingleService",
        JSON.stringify(state.SingleService)
      );
    },
    addService: (state, action) => {
      state.addService = action.payload;
    },
  },
});

export const { getServices, getSingleService, addService } = serviceSlice.actions;
export default serviceSlice.reducer;
