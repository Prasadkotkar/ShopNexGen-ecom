// src/redux/slices/transactionSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from '../../Config/Api';

// Initial state
const initialState = {
  transactions: [],
  transaction: null,
  loading: false,
  error: null,
};

// Thunks
export const fetchTransactionsBySeller = createAsyncThunk(
  'transactions/fetchTransactionsBySeller',
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/transactions/seller', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetchTransactionsBySeller", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Failed to fetch transactions');
    }
  }
);

export const fetchAllTransactions = createAsyncThunk(
  'transactions/fetchAllTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/transactions');
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Failed to fetch all transactions');
    }
  }
);

// Slice
const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsBySeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsBySeller.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsBySeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionSlice.reducer;
