import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import petsReducer from "./petsSlice";
import serviceReducer from "./serviceSlice";
import doctorReducer from "./doctorSlice";
import appointmentReducer from "./appointmentSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"], // Only persist the user slice
};

const rootReducer = combineReducers({
  user: userReducer,
  pets: petsReducer,
  services: serviceReducer,
  doctors: doctorReducer,
  appointment: appointmentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;





