import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../context";

export interface Rental {
  _id: string;
  name: string;
  description: string;
  price: {
    value: number;
    unit: string;
  };
  duration: {
    value: number;
    unit: string;
  };
  store: string;
  images: string[];
  category?: string;
  slug: string;
  isActive: boolean;
  reviews: string[];
  createdAt: string;
  updatedAt: string;
}

interface RentalsState {
  rentals: Rental[];
  currentRental: Rental | null;
  loading: boolean;
  error: string | null;
}

const initialState: RentalsState = {
  rentals: [],
  currentRental: null,
  loading: false,
  error: null,
};

export const createRental = createAsyncThunk(
  'rentals/create',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/rentals`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Create rental failed');
    }
  }
);

export const updateRental = createAsyncThunk(
  'rentals/update',
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/api/rentals/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update rental failed');
    }
  }
);

export const fetchStoreRentals = createAsyncThunk<
  Rental[],
  { storeSlug: string; category?: string }
>("rentals/fetchStore", async ({ storeSlug, category }, { rejectWithValue }) => {
  try {
    const queryParams = new URLSearchParams();
    if (category) {
      queryParams.append('category', category);
    }
    const query = queryParams.toString() ? `?${queryParams.toString()}` : "";
    const res = await axios.get(`${API_URL}/api/rentals/store/${storeSlug}${query}`);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch store rentals");
  }
});

export const fetchRentalById = createAsyncThunk<Rental, string>(
  "rentals/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/rentals/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch rental");
    }
  }
);

export const fetchRentalBySlug = createAsyncThunk<Rental, string>(
  "rentals/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/rentals/slug/${slug}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch rental");
    }
  }
);

export const deleteRental = createAsyncThunk(
  'rentals/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/rentals/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete rental failed');
    }
  }
);

const rentalsSlice = createSlice({
  name: "rentals",
  initialState,
  reducers: {
    clearRentals(state) {
      state.rentals = [];
      state.currentRental = null;
      state.error = null;
      state.loading = false;
    },
    setCurrentRental(state, action: PayloadAction<Rental | null>) {
      state.currentRental = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create rental
      .addCase(createRental.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRental.fulfilled, (state, action: PayloadAction<Rental>) => {
        state.loading = false;
        state.rentals.push(action.payload);
        state.error = null;
      })
      .addCase(createRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update rental
      .addCase(updateRental.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRental.fulfilled, (state, action: PayloadAction<Rental>) => {
        state.loading = false;
        const index = state.rentals.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.rentals[index] = action.payload;
        }
        if (state.currentRental && state.currentRental._id === action.payload._id) {
          state.currentRental = action.payload;
        }
        state.error = null;
      })
      .addCase(updateRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch store rentals
      .addCase(fetchStoreRentals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreRentals.fulfilled, (state, action: PayloadAction<Rental[]>) => {
        state.loading = false;
        state.rentals = action.payload;
      })
      .addCase(fetchStoreRentals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch rental by ID
      .addCase(fetchRentalById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRentalById.fulfilled, (state, action: PayloadAction<Rental>) => {
        state.loading = false;
        state.currentRental = action.payload;
      })
      .addCase(fetchRentalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch rental by slug
      .addCase(fetchRentalBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRentalBySlug.fulfilled, (state, action: PayloadAction<Rental>) => {
        state.loading = false;
        state.currentRental = action.payload;
      })
      .addCase(fetchRentalBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete rental
      .addCase(deleteRental.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRental.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.rentals = state.rentals.filter(r => r._id !== action.payload);
        if (state.currentRental && state.currentRental._id === action.payload) {
          state.currentRental = null;
        }
        state.error = null;
      })
      .addCase(deleteRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRentals, setCurrentRental } = rentalsSlice.actions;
export default rentalsSlice.reducer;