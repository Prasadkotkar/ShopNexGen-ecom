import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

// Initial state
const initialState = {
  deals: [],
  loading: false,
  error: null,
  dealCreated: false,
  dealUpdated: false,
};

// Async thunks
export const createDeal = createAsyncThunk(
  "deals/createDeal",
  async (deal, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/deals", deal, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("created deal", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create deal"
      );
    }
  }
);

export const getAllDeals = createAsyncThunk(
  "deals/getAllDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/deals", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("get all deal", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Failed to get deals"
      );
    }
  }
);

export const deleteDeal = createAsyncThunk(
  "deals/deleteDeal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/deals/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete deal"
      );
    }
  }
);

export const updateDeal = createAsyncThunk(
  "deals/updateDeal",
  async ({ id, deal }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/deals/${id}`, deal, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("updated deal", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update deal"
      );
    }
  }
);

// Create the slice
const dealSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.dealCreated = false;
        state.dealUpdated = false;
      })
      .addCase(getAllDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(getAllDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.dealCreated = false;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.deals.push(action.payload);
        state.dealCreated = true;
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status) {
          state.deals = state.deals.filter((deal) => deal.id !== action.meta.arg);
        }
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.dealUpdated = false;
      })
      .addCase(updateDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.dealUpdated = true;
        const index = state.deals.findIndex((deal) => deal.id === action.payload.id);
        if (index !== -1) {
          state.deals[index] = action.payload;
        }
      })
      .addCase(updateDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dealSlice.reducer;
