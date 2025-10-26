import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../context";

const EMAIL_API_URL = `${API_URL}/api/email`; 

// Async thunk for sending email
export const sendEmail = createAsyncThunk(
  "email/sendEmail",
  async (
    {
      destinationEmail,
      senderEmail,
      firstName,
      lastName,
      message,
      phone,
    }: {
      destinationEmail: string;
      senderEmail: string;
      firstName: string;
      lastName: string;
      message: string;
      phone: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`${EMAIL_API_URL}/send-email`, {
        destinationEmail,
        senderEmail,
        firstName,
        lastName,
        message,
        phone,
      });
      return response.data; // Expecting { message: "Email sent successfully!" }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send email"
      );
    }
  }
);

// Initial state
const initialState = {
  isLoading: false,
  successMessage: "",
  errorMessage: "",
};

// Email slice
const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.isLoading = true;
        state.successMessage = "";
        state.errorMessage = "";
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
        state.errorMessage = "";
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.successMessage = "";
        state.errorMessage = action.payload as string;
      });
  },
});

export const { resetState } = emailSlice.actions;

export default emailSlice.reducer;