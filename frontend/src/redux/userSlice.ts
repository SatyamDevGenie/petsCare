import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo") || "null"), // Load from local storage
  justRegistered: false, // Track if user just registered
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action) => {
      state.userInfo = action.payload;
      state.justRegistered = true; // Set flag when registering
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Save to local storage
    },
    login: (state, action) => {
      state.userInfo = action.payload;
      state.justRegistered = false; // Reset flag when logging in
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Save to local storage
    },
    logout: (state) => {
      state.userInfo = null;
      state.justRegistered = false; // Reset on logout
      localStorage.removeItem("userInfo"); // Remove from local storage
    },
    getUserProfile: (state, action) => {
      state.userInfo = action.payload;
    },
    updateUserProfile: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload }; // Merge the current state with the new data
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo)); // Save to local storage
    },
  },
});

export const { login, logout, register, getUserProfile, updateUserProfile} = userSlice.actions;
export default userSlice.reducer;







