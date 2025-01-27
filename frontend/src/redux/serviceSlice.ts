import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Service interface
interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
}

// Define the initial state for the slice
interface ServiceState {
  allServices: Service[];
}

const initialState: ServiceState = {
  allServices: [], // Initialize as an empty array
};

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    getServices(state, action: PayloadAction<Service[]>) {
      state.allServices = action.payload;
    },
  },
});

export const { getServices } = serviceSlice.actions;
export default serviceSlice.reducer;







// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   allServices: [],
// };

// const serviceSlice = createSlice({
//   name: "services",
//   initialState,
//   reducers: {
//     getServices: (state, action) => {
//       state.allServices = action.payload;
//       localStorage.setItem("allServices", JSON.stringify(state.allServices)); // Save to local storage
//     },
//   },
// });


// export const { getServices } = serviceSlice.actions;
// export default serviceSlice.reducer;
