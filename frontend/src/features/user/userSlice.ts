import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { type User, type UserState } from "../../types/userTypes";


// const API_URL = import.meta.env.MODE === "development"
//   ? "http://localhost:5000/api/auth"
//   : "/api/auth";

const API_URL = "http://localhost:5000/api/user" 


axios.defaults.withCredentials = true;

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: false,
  error: null,
  message: null,
};


// --- Async Thunks ---

export const signup = createAsyncThunk(
  "user/signup",
  async ({ email, password, firstName, lastName }: { email: string; password: string; firstName: string; lastName: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, { email, password, firstName, lastName });
      return response.data.user as User;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error signing up");
    }
  }
);


export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      return response.data.user as User;
      console.log(response.data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error logging in");
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout", 
  async (_, thunkAPI) => {
  try {
    await axios.post(`${API_URL}/logout`);
    return null;
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Error logging out");
  }
});


// Refresh access token
export const refreshAccessToken = createAsyncThunk(
    "user/refreshAccessToken",
    async (_, thunkAPI) => {
      try {
        const response = await axios.get(`${API_URL}/refresh-token`);
        return response.data.message as string;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to refresh token");
      }
    }
);

// Get current user profile
export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        withCredentials: true, // ⬅️ This is required for cookie/session-based auth
      });
      return response.data as User;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);


export const userLoginStatus = createAsyncThunk(
    "user/loginStatus",
    async (_, thunkAPI) => {
      try {
        const response = await axios.get(`${API_URL}/login-status`);
        return response.data as boolean;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(false);
      }
    }
);

// Update user
export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (userData: Partial<User>, thunkAPI) => {
      try {
        const response = await axios.put(`${API_URL}/edit-user`, userData);
        return response.data as User;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update user");
      }
    }
);
  

// Delete user account
export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (_, thunkAPI) => {
      try {
        await axios.delete(`${API_URL}/delete`);
        return null;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete user");
      }
    }
);

export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  async (code: string, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      return response.data.user as User;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error verifying email");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "user/checkAuth", 
  async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/check-auth`);
    return response.data.user as User;
  } catch {
    return thunkAPI.rejectWithValue(null);
  }
});



export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email: string, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      return response.data.message as string;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error sending email");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, password }: { token: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      return response.data.message as string;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error resetting password");
    }
  }
);


// --- Slice ---
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setUser(state, action: PayloadAction<UserState["user"]>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })

      .addCase(verifyEmail.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })

      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isCheckingAuth = false;
      })

      .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<string>) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })

      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<string>) => {
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      
      .addCase(userLoginStatus.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.isAuthenticated = action.payload;
      })
      .addCase(userLoginStatus.rejected, (state) => {
        state.isAuthenticated = false;
      })
      
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })      
  },
});

export const { clearError, clearMessage, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;