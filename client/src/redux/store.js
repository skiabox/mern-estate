import { configureStore } from "@reduxjs/toolkit";
//import the user reducer with whatever name we want since it is a default export
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: { user: userReducer },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
