import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { type User } from "../../types/userTypes";
import { type AdminState } from "../../types/adminTypes";

const API_URL = "http://localhost:5000/api/user"; // Adjust if your admin routes differ


const initialState: AdminState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  message: null,
};

// --- Async Thunks ---
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      return response.data as User[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch users");
    }
  }
);

export const getAUser = createAsyncThunk(
  "admin/getAUser",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data as User;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch user");
    }
  }
);

export const blockUser = createAsyncThunk(
  "admin/blockUser",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/block/${id}`);
      return response.data.user as User;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to block user");
    }
  }
);

export const unblockUser = createAsyncThunk(
  "admin/unblockUser",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/unblock/${id}`);
      return response.data.user as User;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to unblock user");
    }
  }
);

// --- Slice ---

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
    clearAdminMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })

      // Get one user
      .addCase(getAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.selectedUser = action.payload;
        state.isLoading = false;
      })
      .addCase(getAUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })

      // Block user
      .addCase(blockUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users = state.users.map(user =>
          user._id === action.payload._id ? action.payload : user
        );
        state.message = "User blocked successfully";
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Unblock user
      .addCase(unblockUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users = state.users.map(user =>
          user._id === action.payload._id ? action.payload : user
        );
        state.message = "User unblocked successfully";
      })
      .addCase(unblockUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearAdminError, clearAdminMessage } = adminSlice.actions;
export default adminSlice.reducer;
