import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
};
const API_KEY = "afa452d4984319c7e712b7879bafa8c9";

export const fetchFiveDayForecast = createAsyncThunk(
  "forecast/fetchFiveDayForecast",
  async (city, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
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
const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFiveDayForecast.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default forecastSlice.reducer;
