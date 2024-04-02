import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
};

// Asenkron thunk işlemi
export const fetchWeather = createAsyncThunk(
  "fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      const API_KEY = "afa452d4984319c7e712b7879bafa8c9";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: { q: city, appid: API_KEY, units: "metric" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default weatherSlice.reducer;
