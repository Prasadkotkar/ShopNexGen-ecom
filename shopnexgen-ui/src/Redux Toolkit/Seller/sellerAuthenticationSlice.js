// src/slices/sellerAuthSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../Config/Api';
import axios from 'axios';

// Define initial state
const initialState = {
    otpSent: false,
    error: null,
    loading: false,
    jwt: null,
    sellerCreated: ""
};

const API_URL = '/sellers';

// Define async thunks for sending and verifying OTP
export const sendLoginOtp = createAsyncThunk('otp/sendLoginOtp', async (email, { rejectWithValue }) => {
    try {
        const {data} = await api.post('/sellers/sent/login-top', { email });
        console.log("otp sent - ", email, data);
        return { email };
    } catch (error) {
        console.log("error", error);
        return rejectWithValue(error.response?.data?.message || 'Failed to send OTP');
    }
});

export const verifyLoginOtp = createAsyncThunk('otp/verifyLoginOtp', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post('/sellers/verify/login-top', data);
        console.log("login seller success - ", response.data);
        localStorage.setItem("jwt", response.data.jwt);
        data.navigate("/seller");
        return response.data;
    } catch (error) {
        console.log("error", error.response?.data);
        return rejectWithValue(error.response?.data?.message || 'Failed to verify OTP');
    }
});

export const createSeller = createAsyncThunk('sellers/createSeller', async (seller, { rejectWithValue }) => {
    try {
        const response = await api.post(API_URL, seller);
        console.log('create seller', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Create seller error response data:', error.response.data);
            console.error('Create seller error response status:', error.response.status);
            console.error('Create seller error response headers:', error.response.headers);
            return rejectWithValue(error.message);
        } else {
            console.error('Create seller error message:', error.message);
            return rejectWithValue('Failed to create seller');
        }
    }
});

// Create the slice
const sellerAuthSlice = createSlice({
    name: 'sellerAuth',
    initialState,
    reducers: {
        resetSellerAuthState: (state) => {
            state.otpSent = false;
            state.error = null;
            state.loading = false;
            state.jwt = null;
        },
    },
    extraReducers: (builder) => {
        // Handle sendLoginOtp actions
        builder
            .addCase(sendLoginOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendLoginOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpSent = true;
                state.error = null;
            })
            .addCase(sendLoginOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Handle verifyLoginOtp actions
        builder
            .addCase(verifyLoginOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyLoginOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.error = null;
            })
            .addCase(verifyLoginOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Handle create new seller actions
        builder
            .addCase(createSeller.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSeller.fulfilled, (state, action) => {
                state.sellerCreated = "verification email sent to you";
                state.loading = false;
            })
            .addCase(createSeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to create seller';
            });
    },
});

// Export actions and reducer
export const { resetSellerAuthState } = sellerAuthSlice.actions;
export default sellerAuthSlice.reducer;
