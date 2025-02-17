import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";
import { applyCoupon } from "./CouponSlice";
import { sumCartItemMrpPrice, sumCartItemSellingPrice } from "../../util/cartCalculator";

// Initial state
const initialState = {
  cart: null,
  loading: false,
  error: null,
};

// Define the base URL for the API
const API_URL = "/api/cart";

// Async thunks
export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Cart fetched ", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to fetch user cart");
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ jwt, request }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/add`, request, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Cart added ", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to add item to cart");
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ jwt, cartItemId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_URL}/item/${cartItemId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete cart item");
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ jwt, cartItemId, cartItem }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/item/${cartItemId}`, cartItem, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update cart item");
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.cartItems.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.cartItems = state.cart.cartItems.filter(
            (item) => item.id !== action.meta.arg.cartItemId
          );
          const mrpPrice = sumCartItemMrpPrice(state.cart.cartItems || []);
          const sellingPrice = sumCartItemSellingPrice(state.cart.cartItems || []);
          state.cart.totalSellingPrice = sellingPrice;
          state.cart.totalMrpPrice = mrpPrice;
        }
        state.loading = false;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        if (state.cart) {
          const index = state.cart.cartItems.findIndex(
            (item) => item.id === action.meta.arg.cartItemId
          );
          if (index !== -1) {
            state.cart.cartItems[index] = {
              ...state.cart.cartItems[index],
              ...action.payload,
            };
          }
          const mrpPrice = sumCartItemMrpPrice(state.cart.cartItems || []);
          const sellingPrice = sumCartItemSellingPrice(state.cart.cartItems || []);
          state.cart.totalSellingPrice = sellingPrice;
          state.cart.totalMrpPrice = mrpPrice;
        }
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;
export const { resetCartState } = cartSlice.actions;

// Selectors
export const selectCart = (state) => state.cart.cart;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;
