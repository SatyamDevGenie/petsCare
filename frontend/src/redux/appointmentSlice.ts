import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Appointment {
  petOwner: { _id: string; name: string } | string;
  pet: {
    breed: string; _id: string; name: string 
};
  doctor: { _id: string; name: string };
  appointmentDate: string;
  query: string;
  status: "Pending" | "Approved" | "Rejected";
  doctorResponse: "Pending" | "Responded";
}

interface AppointmentState {
  bookAppointment: Appointment | null;
  appointments: Appointment[];
  allAppointments: Appointment[];
  
}

const initialState: AppointmentState = {
  bookAppointment: null,
  appointments: [],
  allAppointments: []
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
    setAppointments: (state, action) => {
      state.appointments = action.payload; // Overwrite with API response
    },
    getAllAppointments: (state, action) => {
      state.allAppointments = action.payload;
    }
  },
});


export const {bookApt, setAppointments, getAllAppointments} = appointmentSlice.actions;
export default appointmentSlice.reducer;