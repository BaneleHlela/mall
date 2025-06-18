import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { type Review } from "../../types/reviewTypes"; // Define your Review type accordingly

const API_URL = "http://localhost:5000/api/reviews";

interface ReviewState {
  reviews: Review[];
  selectedReview: Review | null;
  ratingStats: {
    averageRating: number;
    numberOfRatings: number;
  };
  isLoading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  ratingStats: {
    averageRating: 0,
    numberOfRatings: 0,
  },
  selectedReview: null,
  isLoading: false,
  error: null,
  message: null,
};

// --- Async Thunks ---

export const createReview = createAsyncThunk(
  "review/createReview",
  async (reviewData: Partial<Review>, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, reviewData, {
        withCredentials: true,
      });
      return response.data as Review;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to create review");
    }
  }
);

export const getAllReviews = createAsyncThunk(
  "review/getAllReviews",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data as Review[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch reviews");
    }
  }
);

export const getStoreReviews = createAsyncThunk(
  "review/getStoreReviews",
  async (storeId: string, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/store/${storeId}`);
      return response.data as Review[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch store reviews");
    }
  }
);

export const getReviewById = createAsyncThunk(
  "review/getReviewById",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data as Review;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch review");
    }
  }
);

export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ id, data }: { id: string; data: Partial<Review> }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data, {
        withCredentials: true,
      });
      return response.data as Review;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update review");
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete review");
    }
  }
);

export const getStoreRatingStats = createAsyncThunk(
  "review/getStoreRatingStats",
  async (storeId: string, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/rating-stats/${storeId}`, {
        withCredentials: true,
      });
      return response.data; // Expecting { averageRating, numberOfRatings }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch store rating stats");
    }
  }
);

// --- Slice ---

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviewError: (state) => {
      state.error = null;
    },
    clearReviewMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create review
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.reviews.unshift(action.payload);
        state.isLoading = false;
        state.message = "Review created successfully";
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Get all reviews
      .addCase(getAllReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.reviews = action.payload;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Get store reviews
      .addCase(getStoreReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.reviews = action.payload;
      })
      .addCase(getStoreReviews.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Get one review
      .addCase(getReviewById.fulfilled, (state, action: PayloadAction<Review>) => {
        state.selectedReview = action.payload;
      })
      .addCase(getReviewById.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Update review
      .addCase(updateReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.reviews = state.reviews.map((r) => (r._id === action.payload._id ? action.payload : r));
        state.message = "Review updated successfully";
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Delete review
      .addCase(deleteReview.fulfilled, (state, action: PayloadAction<string>) => {
        state.reviews = state.reviews.filter((r) => r._id !== action.payload);
        state.message = "Review deleted successfully";
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      //Get store rating stats
      .addCase(getStoreRatingStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getStoreRatingStats.fulfilled, (state, action: PayloadAction<{ averageRating: number; numberOfRatings: number }>) => {
        state.isLoading = false;
        state.error = null;
        state.message = "Store rating stats fetched successfully";
        state.reviews = []; // Clear reviews if needed
        state.selectedReview = null; // Reset selected review
        state.ratingStats.averageRating = action.payload.averageRating;
        state.ratingStats.numberOfRatings = action.payload.numberOfRatings;
      })
      .addCase(getStoreRatingStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearReviewError, clearReviewMessage } = reviewSlice.actions;
export default reviewSlice.reducer;
