import { configureStore } from "@reduxjs/toolkit";
import weatherApiSlice from "../features/weather/weatherApiSlice";

export const store = configureStore({
  reducer: { weather: weatherApiSlice },
});
