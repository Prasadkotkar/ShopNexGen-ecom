import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Config/Api";

// Initial state
const initialState = {
  response: null,
  loading: false,
  error: null,
  messages: [],
};

// Async thunk for sending the message to the chatbot
export const chatBot = createAsyncThunk(
  "aiChatBot/generateResponse",
  async ({ prompt, productId, userId }, { rejectWithValue }) => {
    try {
      const response = await api.post("/ai/chat", prompt, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        params: {
          userId,
          productId,
        },
      });
      console.log("response", productId, response.data);
      return response.data;
    } catch (error) {
      console.log("error", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate chatbot response"
      );
    }
  }
);

// Create the slice
const aiChatBotSlice = createSlice({
  name: "aiChatBot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(chatBot.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        const { prompt } = action.meta.arg;
        const userPrompt = { message: prompt.prompt, role: "user" };
        state.messages = [...state.messages, userPrompt];
      })
      .addCase(chatBot.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
        state.messages = [...state.messages, action.payload];
      })
      .addCase(chatBot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer
export default aiChatBotSlice.reducer;
