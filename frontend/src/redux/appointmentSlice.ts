import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Appointment {
  petOwner: { _id: string; name: string } | string;
  pet: { _id: string; name: string };
  doctor: { _id: string; name: string };
  appointmentDate: string;
  query: string;
  status: "Pending" | "Approved" | "Rejected";
  doctorResponse: "Pending" | "Responded";
}

interface AppointmentState {
  bookAppointment: Appointment | null;
}

const initialState: AppointmentState = {
  bookAppointment: null,
};

const appointmentSlice = createSlice({
  name: "appoinment",
  initialState,
  reducers: {
    bookApt: (state, action) => {
      state.bookAppointment = action.payload;
      localStorage.setItem(
        "bookAppointment",
        JSON.stringify(state.bookAppointment)
      );
    },
  },
});


export const {bookApt} = appointmentSlice.actions;
export default appointmentSlice.reducer;