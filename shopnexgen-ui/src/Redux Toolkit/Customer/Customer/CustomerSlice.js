import { createSlice } from '@reduxjs/toolkit';
import { createHomeCategories, fetchHomePageData } from './AsyncThunk';

const initialState = {
  homePageData: null,
  homeCategories: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchHomePageData lifecycle
    builder.addCase(fetchHomePageData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchHomePageData.fulfilled, (state, action) => {
      state.loading = false;
      state.homePageData = action.payload;
    });
    builder.addCase(fetchHomePageData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to load home page data';
    });

    // Handle createHomeCategories lifecycle
    builder.addCase(createHomeCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createHomeCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.homePageData = action.payload;
    });
    builder.addCase(createHomeCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to create home categories';
    });
  },
});

export default homeSlice.reducer;
