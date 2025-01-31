import { createSlice } from "@reduxjs/toolkit";

interface doctor {
  _id: string;
  name: string;
  email: string;
  specialization: string;
  profileImage: string;
  notes: string;
  contactNumber: string;
}

interface doctorState {
  doctorsList: doctor[];
  singleDoctor: doctor | null;
  addDoctor: doctor | null;
  updateDoctor: doctor | null;
}

const initialState: doctorState = {
  doctorsList: [],
  singleDoctor: null,
  addDoctor: null,
  updateDoctor: null
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    getAllDoctors: (state, action) => {
      state.doctorsList = action.payload;
    },
    getSingleDoctor:(state,action)=>{
        state.singleDoctor= action.payload;
    },
    createDoctor: (state, action) => {
      state.addDoctor = action.payload;
    },
    editDoctor: (state, action) => {
      state.updateDoctor = action.payload;
    }
  },
});

export const { getAllDoctors, getSingleDoctor, createDoctor, editDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;