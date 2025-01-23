import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  petsList: [],
};

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    setPets: (state, action) => {
      state.petsList= action.payload;
      localStorage.setItem("petsList", JSON.stringify(state.petsList)); // Save to local storage
    },
  },
});

export const { setPets } = petsSlice.actions;
export default petsSlice.reducer;