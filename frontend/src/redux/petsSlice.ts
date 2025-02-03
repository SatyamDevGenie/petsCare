import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  petsList: [],
  pet:null,
  newPet: null
};

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    setPets: (state, action) => {
      state.petsList= action.payload;
      localStorage.setItem("petsList", JSON.stringify(state.petsList)); // Save to local storage
    },
    setSinglePet: (state, action) => {
      state.pet = action.payload;
      localStorage.setItem("pet", JSON.stringify(state.pet)); // Save to local storage
    },
    addPet: (state, action) => {
      state.newPet = (action.payload);
    }
  },
});

export const { setPets, setSinglePet, addPet } = petsSlice.actions;
export default petsSlice.reducer;