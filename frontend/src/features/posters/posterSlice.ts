import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Poster } from "../../types/posterTypes";

const API_URL = "http://localhost:5000/api/posters";



// ========== THUNKS ==========

// Create poster
export const createPoster = createAsyncThunk(
  "posters/create",
  async (posterData: Poster, thunkAPI) => {
    try {
      const { data } = await axios.post(API_URL, posterData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create poster");
    }
  }
);

// Get all posters for a store
export const fetchPostersByStore = createAsyncThunk(
  "posters/fetchByStore",
  async (storeId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_URL}/store/${storeId}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch posters");
    }
  }
);

// Get single poster
export const fetchPosterById = createAsyncThunk(
  "posters/fetchById",
  async (posterId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_URL}/${posterId}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch poster");
    }
  }
);

// Update poster
export const updatePoster = createAsyncThunk(
  "posters/update",
  async ({ posterId, updates }: { posterId: string; updates: Partial<Poster> }, thunkAPI) => {
    try {
      const { data } = await axios.put(`${API_URL}/${posterId}`, updates);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update poster");
    }
  }
);

// Delete poster
export const deletePoster = createAsyncThunk(
  "posters/delete",
  async (posterId: string, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${posterId}`);
      return posterId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete poster");
    }
  }
);

// ========== SLICE ==========
interface PosterState {
  posters: Poster[];
  poster: Poster | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PosterState = {
  posters: [],
  poster: null,
  isLoading: false,
  error: null,
};

const posterSlice = createSlice({
  name: "posters",
  initialState,
  reducers: {
    resetPosterState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createPoster.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPoster.fulfilled, (state, action: PayloadAction<Poster>) => {
        state.isLoading = false;
        state.posters.push(action.payload);
      })
      .addCase(createPoster.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch by store
      .addCase(fetchPostersByStore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostersByStore.fulfilled, (state, action: PayloadAction<Poster[]>) => {
        state.isLoading = false;
        state.posters = action.payload;
      })
      .addCase(fetchPostersByStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch by ID
      .addCase(fetchPosterById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosterById.fulfilled, (state, action: PayloadAction<Poster>) => {
        state.isLoading = false;
        state.poster = action.payload;
      })
      .addCase(fetchPosterById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updatePoster.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePoster.fulfilled, (state, action: PayloadAction<Poster>) => {
        state.isLoading = false;
        const index = state.posters.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.posters[index] = action.payload;
        if (state.poster?._id === action.payload._id) state.poster = action.payload;
      })
      .addCase(updatePoster.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deletePoster.fulfilled, (state, action: PayloadAction<string>) => {
        state.posters = state.posters.filter((p) => p._id !== action.payload);
      });
  },
});

export const { resetPosterState } = posterSlice.actions;
export default posterSlice.reducer;
