import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice";
import forecastReducer from "../features/forecastSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    forecast: forecastReducer,
  },
});
