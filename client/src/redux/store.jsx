import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // ✅ fix: it's "userReducer", not "useReducer"

const store = configureStore({
  reducer: {
    users: userReducer, // this sets users slice in Redux state
  },
});

export default store;
