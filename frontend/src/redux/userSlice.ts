import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
  },
  reducers: {
    register: (state, action) => {
      state.userInfo = action.payload;
    },
    login: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
    },
    getUserProfile: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { login, logout, register, getUserProfile } = userSlice.actions;
export default userSlice.reducer;





