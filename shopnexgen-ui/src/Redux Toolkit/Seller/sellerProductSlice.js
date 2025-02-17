// src/redux/slices/sellerProductSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';

const API_URL = '/sellers/product';

// Thunks for async actions
export const fetchSellerProducts = createAsyncThunk(
  'sellerProduct/fetchSellerProducts',
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("seller products", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  'sellerProduct/createProduct',
  async ({ request, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post(API_URL, request, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("product created", response.data);
      return response.data;
    } catch (error) {
      console.log("error", error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'sellerProduct/updateProduct',
  async ({ productId, product }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/${productId}`, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductStock = createAsyncThunk(
  "sellerProduct/updateProductStock",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${API_URL}/${productId}/stock`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      );
      console.log("product stock updated ", response.data);
      return response.data;
    } catch (error) {
      console.log("error ", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'sellerProduct/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/${productId}`);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
  productCreated: false,
};

const sellerProductSlice = createSlice({
  name: 'sellerProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.productCreated = false;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.productCreated = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
        state.productCreated = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create product';
        state.productCreated = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update product';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.meta.arg);
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete product';
      });
  },
});

export default sellerProductSlice.reducer;
