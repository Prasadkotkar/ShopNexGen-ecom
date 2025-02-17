// src/redux/slices/sellerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../Config/Api";

// Define the initial state
const initialState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  loading: false,
  error: null,
  report: null,
  profileUpdated: false,
};

// Define the base URL for the API
const API_URL = "/sellers";

// Create async thunks for API calls
export const fetchSellerProfile = createAsyncThunk(
  "sellers/fetchSellerProfile",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetch seller profile", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Fetch sellers error response data:",
          error.response.data
        );
        return rejectWithValue(error.message);
      } else {
        console.error("Fetch sellers error message:", error.message);
        return rejectWithValue("Failed to fetch sellers");
      }
    }
  }
);

export const fetchSellers = createAsyncThunk(
  "sellers/fetchSellers",
  async (status, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        params: {
          status,
        },
      });
      console.log("fetch sellers", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Fetch sellers error response data:",
          error.response.data
        );
        return rejectWithValue(error.message);
      } else {
        console.error("Fetch sellers error message:", error.message);
        return rejectWithValue("Failed to fetch sellers");
      }
    }
  }
);

export const fetchSellerReport = createAsyncThunk(
  "sellers/fetchSellerReport",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/report`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Fetch seller report", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error);
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch seller report");
    }
  }
);

export const fetchSellerById = createAsyncThunk(
  "sellers/fetchSellerById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Fetch seller by ID error response data:",
          error.response.data
        );
        return rejectWithValue(error.message);
      } else {
        console.error("Fetch seller by ID error message:", error.message);
        return rejectWithValue("Failed to fetch seller");
      }
    }
  }
);

export const updateSeller = createAsyncThunk(
  "sellers/updateSeller",
  async (seller, { rejectWithValue }) => {
    console.log("seller update request", seller);
    try {
      const response = await api.patch(`${API_URL}`, seller, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("seller updated successfully", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Update seller error response data:", error.response);
        return rejectWithValue(error.message);
      } else {
        console.error("Update seller error message:", error);
        return rejectWithValue("Failed to update seller");
      }
    }
  }
);

export const updateSellerAccountStatus = createAsyncThunk(
  "sellers/updateSellerAccountStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/seller/${id}/status/${status}`);
      console.log("update seller status: ", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Update seller error response data:", error.response.data);
        return rejectWithValue(error.message);
      } else {
        console.error("Update seller error message:", error.message);
        return rejectWithValue("Failed to update seller");
      }
    }
  }
);

export const verifySellerEmail = createAsyncThunk(
  "sellers/verifySellerEmail",
  async ({ otp, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/verify/${otp}`);
      navigate("/seller-account-verified");
      console.log("verify seller email", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Update seller error response data:", error.response.data);
        return rejectWithValue(error.message);
      } else {
        console.error("Update seller error message:", error.message);
        return rejectWithValue("Failed to update seller");
      }
    }
  }
);

export const deleteSeller = createAsyncThunk(
  "sellers/deleteSeller",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Delete seller error response data:", error.response.data);
        return rejectWithValue(error.message);
      } else {
        console.error("Delete seller error message:", error.message);
        return rejectWithValue("Failed to delete seller");
      }
    }
  }
);

// Create the slice
const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch sellers";
      })
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.sellers = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch sellers";
      })
      .addCase(fetchSellerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerById.fulfilled, (state, action) => {
        state.selectedSeller = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch seller";
      })
      .addCase(updateSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })
      .addCase(updateSeller.fulfilled, (state, action) => {
        const index = state.sellers.findIndex(
          (seller) => seller.id === action.payload.id
        );
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
        state.profile = action.payload;
        state.loading = false;
        state.profileUpdated = true;
      })
      .addCase(updateSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update seller";
      })
      .addCase(updateSellerAccountStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerAccountStatus.fulfilled, (state, action) => {
        const index = state.sellers.findIndex(
          (seller) => seller.id === action.payload.id
        );
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateSellerAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update seller";
      })
      .addCase(deleteSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSeller.fulfilled, (state, action) => {
        state.sellers = state.sellers.filter(
          (seller) => seller.id !== action.meta.arg
        );
        state.loading = false;
      })
      .addCase(deleteSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete seller";
      })
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerSlice.reducer;

// Define selector functions
export const selectSellers = (state) => state.sellers.sellers;
export const selectSelectedSeller = (state) => state.sellers.selectedSeller;
export const selectSellerProfile = (state) => state.sellers.profile;
export const selectSellerReport = (state) => state.sellers.report;
export const selectSellerLoading = (state) => state.sellers.loading;
export const selectSellerError = (state) => state.sellers.error;
export const selectProfileUpdated = (state) => state.sellers.profileUpdated;
