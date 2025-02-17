import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from '../../../Config/Api';

// Async thunk to fetch home page data with try-catch for error handling
export const fetchHomePageData = createAsyncThunk(
  'home/fetchHomePageData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/home-page');
      console.log("home page ", response.data);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch home page data';
      console.log("errr ", errorMessage, error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const createHomeCategories = createAsyncThunk(
  'home/createHomeCategories',
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post('/home/categories', homeCategories);
      console.log("home categories ", response.data);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create home categories';
      console.log("errr ", errorMessage, error);
      return rejectWithValue(errorMessage);
    }
  }
);
