import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  weather: {},
  isLoading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  "weatherApi/fetchWeather",
  async ({ latitude, longitude, api_key, lang }) => {
   
    const params = new URLSearchParams({
      lat: String(latitude),
      lon: String(longitude),
      appid: api_key,
      units: "metric",
    });
    if (lang) params.set("lang", lang);

    const url = `https://api.openweathermap.org/data/2.5/weather?${params.toString()}`;
    const res = await axios.get(url);
    return res.data;
  }
);

const weatherApiSlice = createSlice({
  name: "weatherApi",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
        console.log("Fetched weather data:", state.weather);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default weatherApiSlice.reducer;
