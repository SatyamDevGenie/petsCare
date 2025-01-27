import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";         // Ensure correct path to userSlice
import petsReducer from "./petsSlice";         // Ensure correct path to petsSlice
import serviceReducer from "./serviceSlice";   // Ensure correct path to serviceSlice
import doctorReducer from "./doctorSlice";     // Ensure correct path to doctorSlice


// Middleware to sync local storage with Redux state
const localStorageMiddleware = (store: { getState: () => any; }) => (next: (arg0: any) => any) => (action: any) => {
  const result = next(action); // Dispatch the action
  const state = store.getState(); // Get the updated state

  // Sync userInfo to local storage if it exists, else remove it
  if (state.user?.userInfo) {
    localStorage.setItem("userInfo", JSON.stringify(state.user.userInfo));
  } else {
    localStorage.removeItem("userInfo");
  }

  return result; // Pass result to next middleware or the reducer
};

// Configure the Redux store
export const store = configureStore({
  reducer: {
    user: userReducer,              // Attach userSlice reducer
    pets: petsReducer,              // Attach petsSlice reducer
    services: serviceReducer,        // Attach serviceSlice reducer
    doctors: doctorReducer          // Attach doctorSlice reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware), // Add custom middleware
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>; // Infer the state type
export type AppDispatch = typeof store.dispatch; // Infer the dispatch type



