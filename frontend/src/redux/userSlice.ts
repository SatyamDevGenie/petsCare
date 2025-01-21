import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo") || "null"), // Load from local storage
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Save to local storage
    },
    login: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Save to local storage
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo"); // Remove from local storage
    },
    getUserProfile: (state, action) => {
      state.userInfo = action.payload;
    },
    
  },
});

export const { login, logout, register, getUserProfile} = userSlice.actions;
export default userSlice.reducer;







