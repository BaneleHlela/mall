import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { type User, type UserState } from "../../types/userTypes";
import { API_URL } from "../context";


// const USER_API_URL = import.meta.env.MODE === "development"
//   ? "http://localhost:5000/api/auth"
//   : "/api/auth";

const USER_API_URL = `${API_URL}/api/user`;
const PACKAGES_API_URL = `${API_URL}/api/packages`;


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
      const response = await axios.post(`${USER_API_URL}/signup`, { email, password, firstName, lastName });
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
      const response = await axios.post(`${USER_API_URL}/login`, { email, password });
      return response.data.user as User;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error logging in");
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout", 
  async (_, thunkAPI) => {
  try {
    await axios.post(`${USER_API_URL}/logout`);
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
        const response = await axios.get(`${USER_API_URL}/refresh-token`);
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
      const response = await axios.get(`${USER_API_URL}/profile`, {
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
        const response = await axios.get(`${USER_API_URL}/login-status`);
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
        const response = await axios.put(`${USER_API_URL}/edit-user`, userData);
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
        await axios.delete(`${USER_API_URL}/delete`);
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
      const response = await axios.post(`${USER_API_URL}/verify-email`, { code });
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
    const response = await axios.get(`${USER_API_URL}/check-auth`);
    return response.data.user as User;
  } catch {
    return thunkAPI.rejectWithValue(null);
  }
});



export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email: string, thunkAPI) => {
    try {
      const response = await axios.post(`${USER_API_URL}/forgot-password`, { email });
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
      const response = await axios.post(`${USER_API_URL}/reset-password/${token}`, { password });
      return response.data.message as string;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error resetting password");
    }
  }
);

// updateAvatar
export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (
    payload: { file?: File | null; remove?: boolean },  thunkAPI
  ) => {
    try {
      const formData = new FormData();

      // Handle delete request
      if (payload.remove) {
        formData.append("remove", "true");
      }

      // Handle upload request
      if (payload.file) {
        formData.append("avatar", payload.file);
      }

      const response = await axios.put(
        `${USER_API_URL}/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      return response.data.avatar; // returns URL
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update avatar"
      );
    }
  }
);

// Like Package
export const likePackage = createAsyncThunk(
  "user/likePackage",
  async (packageId: string, thunkAPI) => {
    try {
      const response = await axios.post(`${PACKAGES_API_URL}/${packageId}/like`);
      return response.data.favouritePackages as string[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to like package");
    }
  }
);

// Unlike Package
export const unlikePackage = createAsyncThunk(
  "user/unlikePackage",
  async (packageId: string, thunkAPI) => {
    try {
      const response = await axios.delete(`${PACKAGES_API_URL}/${packageId}/like`);
      return response.data.favouritePackages as string[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to unlike package");
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

      // Forgot passowrd
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
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
      
      // Manage Avatar
      .addCase(updateAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        if (state.user) {
          state.user.avatar = action.payload; // avatar URL returned
        }
        state.isLoading = false;
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      
      // Like Package
      .addCase(likePackage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(likePackage.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user?.favourites?.packages) {
          state.user.favourites.packages = action.payload;
        }
      })
      .addCase(likePackage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Unlike Package
      .addCase(unlikePackage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(unlikePackage.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user?.favourites?.packages) {
          state.user.favourites.packages = action.payload;
        }
      })
      .addCase(unlikePackage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});

export const { clearError, clearMessage, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;