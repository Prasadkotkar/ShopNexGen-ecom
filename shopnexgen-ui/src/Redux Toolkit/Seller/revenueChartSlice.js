// src/slices/revenueSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';

// Define the base URL for the API
const API_BASE_URL = '/api/seller/revenue/chart';

// Initial state for the slice
const initialState = {
  chart: [],
  loading: false,
  error: null,
};

export const fetchRevenueChart = createAsyncThunk(
  'revenue/fetchRevenueChart',
  async ({ type }, { rejectWithValue }) => {
    console.log("type ---- ", type);
    try {
      const token = localStorage.getItem('jwt'); 
      const response = await api.get(`${API_BASE_URL}`, {
        params: { type },
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("revenue chart #####", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue(error.response?.data || 'Failed to fetch daily revenue');
    }
  }
);

// Create RevenueSlice
const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenueChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRevenueChart.fulfilled, (state, action) => {
        state.loading = false;
        state.chart = action.payload;
      })
      .addCase(fetchRevenueChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default revenueSlice.reducer;
