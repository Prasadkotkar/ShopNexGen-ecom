import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

const API_URL = "/api";

// Async thunks
export const fetchReviewsByProductId = createAsyncThunk(
  "review/fetchReviewsByProductId",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${API_URL}/products/${productId}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log("fetch all reviews for product ", response.data);
      return response.data;
    } catch (error) {
      console.log("error - ", error.response?.data);
      return rejectWithValue(error.response?.data || "Failed to fetch reviews");
    }
  }
);

export const createReview = createAsyncThunk(
  "review/createReview",
  async ({ productId, review, jwt, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${API_URL}/products/${productId}/reviews`,
        review,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      navigate(`/reviews/${productId}`);
      console.log("create reviews for product ", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error);
      return rejectWithValue(error.response?.data || "Failed to create review");
    }
  }
);

export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ reviewId, review, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${API_URL}/reviews/${reviewId}`,
        review,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("updated reviews for product ", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error);
      return rejectWithValue(error.response?.data || "Failed to update review");
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async ({ reviewId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_URL}/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("error ", error);
      return rejectWithValue(error.response?.data || "Failed to delete review");
    }
  }
);

// Initial state
const initialState = {
  reviews: [],
  loading: false,
  error: null,
  reviewCreated: false,
  reviewUpdated: false,
  reviewDeleted: false,
};

// Slice
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetReviewState: (state) => {
      state.reviews = [];
      state.loading = false;
      state.error = null;
      state.reviewCreated = false;
      state.reviewUpdated = false;
      state.reviewDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByProductId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviewsByProductId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.reviewCreated = false;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.loading = false;
        state.reviewCreated = true;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.reviewCreated = false;
      })
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.reviewUpdated = false;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          (r) => r.id === action.payload.id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
        state.loading = false;
        state.reviewUpdated = true;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.reviewUpdated = false;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.reviewDeleted = false;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (r) => r.id !== action.meta.arg.reviewId
        );
        state.loading = false;
        state.reviewDeleted = true;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.reviewDeleted = false;
      });
  },
});

export default reviewSlice.reducer;
export const { resetReviewState } = reviewSlice.actions;
