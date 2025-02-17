import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../Config/Api";

const initialState = {
  orders: [],
  orderItem: null,
  currentOrder: null,
  paymentOrder: null,
  loading: false,
  error: null,
  orderCanceled: false,
};

const API_URL = "/api/orders";

// Fetch user order history
export const fetchUserOrderHistory = createAsyncThunk(
  "orders/fetchUserOrderHistory",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("order history fetched ", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue(
        error.response.data.error || "Failed to fetch order history"
      );
    }
  }
);

// Fetch order by ID
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async ({ orderId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${orderId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("order fetched ", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to fetch order");
    }
  }
);

// Create a new order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ address, jwt, paymentGateway }, { rejectWithValue }) => {
    try {
      const response = await api.post(API_URL, address, {
        headers: { Authorization: `Bearer ${jwt}` },
        params: { paymentMethod: paymentGateway },
      });
      console.log("order created ", response.data);
      if (response.data.payment_link_url) {
        window.location.href = response.data.payment_link_url;
      }

      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to create order");
    }
  }
);

// Fetch order item by ID
export const fetchOrderItemById = createAsyncThunk(
  "orders/fetchOrderItemById",
  async ({ orderItemId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/item/${orderItemId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("order item fetched ", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      return rejectWithValue("Failed to fetch order item");
    }
  }
);

// Payment success handler
export const paymentSuccess = createAsyncThunk(
  "orders/paymentSuccess",
  async ({ paymentId, jwt, paymentLinkId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/payment/${paymentId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
        params: { paymentLinkId },
      });
      console.log("payment success ", response.data);

      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to process payment");
    }
  }
);

// Cancel order
export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${API_URL}/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log("cancel order ", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error.response);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An error occurred while cancelling the order.");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user order history
      .addCase(fetchUserOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCanceled = false;
      })
      .addCase(fetchUserOrderHistory.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create a new order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.paymentOrder = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Order Item by ID
      .addCase(fetchOrderItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItem = action.payload;
      })
      .addCase(fetchOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Payment success handler
      .addCase(paymentSuccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentSuccess.fulfilled, (state) => {
        state.loading = false;
        console.log("Payment successful");
      })
      .addCase(paymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cancel order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCanceled = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
        state.orderCanceled = true;
        state.currentOrder = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;

export const selectOrders = (state) => state.orders.orders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectPaymentOrder = (state) => state.orders.paymentOrder;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;
