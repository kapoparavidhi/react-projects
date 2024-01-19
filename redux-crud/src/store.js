// store.js
import { configureStore } from "@reduxjs/toolkit";
import twubricReducer from "./twubricSlice";

const store = configureStore({
  reducer: {
    twubric: twubricReducer,
  },
});

export default store;