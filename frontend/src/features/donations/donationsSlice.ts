import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Donation, DonationsState } from '../../types/donationTypes';
import { API_URL } from '../context';

const API_BASE = `${API_URL}/api/donations`;

const initialState: DonationsState = {
  donations: [],
  isLoading: false,
  error: null,
  selectedDonation: null,
};

// 🔁 Thunks

// Fetch all donations
export const fetchAllDonations = createAsyncThunk(
  'donations/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API_BASE);
      return res.data.donations as Donation[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch donations');
    }
  }
);

// Fetch donation by ID
export const fetchDonationById = createAsyncThunk(
  'donations/fetchById',
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE}/${id}`);
      return res.data as Donation;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch donation');
    }
  }
);

// Fetch donation by slug
export const fetchDonationBySlug = createAsyncThunk(
  'donations/fetchBySlug',
  async (slug: string, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE}/slug/${slug}`);
      return res.data as Donation;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch donation by slug');
    }
  }
);

// Create donation
export const createDonation = createAsyncThunk(
  'donations/create',
  async (donationData: FormData, thunkAPI) => {
    try {
      const res = await axios.post(API_BASE, donationData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data as Donation;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create donation');
    }
  }
);

// Update donation
export const updateDonation = createAsyncThunk(
  'donations/update',
  async ({ id, data }: { id: string; data: FormData }, thunkAPI) => {
    try {
      const res = await axios.put(`${API_BASE}/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data as Donation;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update donation');
    }
  }
);

// Delete donation
export const deleteDonation = createAsyncThunk(
  'donations/delete',
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete donation');
    }
  }
);

// Fetch donations by storeSlug
export const fetchStoreDonations = createAsyncThunk(
  'donations/fetchStoreDonations',
  async ({ storeSlug }: { storeSlug: string }, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE}/store/${storeSlug}`);
      return res.data as Donation[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch store donations');
    }
  }
);

// Toggle or update donation isActive status
export const updateDonationIsActive = createAsyncThunk(
  'donations/updateIsActive',
  async ({ donationId, isActive }: { donationId: string; isActive: boolean }, thunkAPI) => {
    try {
      const res = await axios.patch(`${API_BASE}/isActive/${donationId}`, { isActive });
      return res.data.donation as Donation;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update donation status');
    }
  }
);

// 🧩 Slice
const donationSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    clearSelectedDonation(state) {
      state.selectedDonation = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAllDonations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllDonations.fulfilled, (state, action: PayloadAction<Donation[]>) => {
        state.isLoading = false;
        state.donations = action.payload;
      })
      .addCase(fetchAllDonations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch by ID
      .addCase(fetchDonationById.fulfilled, (state, action: PayloadAction<Donation>) => {
        state.isLoading = false;
        state.selectedDonation = action.payload;
      })
      .addCase(fetchDonationById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDonationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch by slug
      .addCase(fetchDonationBySlug.fulfilled, (state, action: PayloadAction<Donation>) => {
        state.selectedDonation = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDonationBySlug.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDonationBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Create
      .addCase(createDonation.fulfilled, (state, action: PayloadAction<Donation>) => {
        state.donations.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createDonation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createDonation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateDonation.fulfilled, (state, action: PayloadAction<Donation>) => {
        state.isLoading = false;
        const index = state.donations.findIndex(d => d._id === action.payload._id);
        if (index !== -1) {
          state.donations[index] = action.payload;
        }
      })
      .addCase(updateDonation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDonation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteDonation.fulfilled, (state, action: PayloadAction<string>) => {
        state.donations = state.donations.filter(d => d._id !== action.payload);
      })
      .addCase(deleteDonation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteDonation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch store donations
      .addCase(fetchStoreDonations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStoreDonations.fulfilled, (state, action: PayloadAction<Donation[]>) => {
        state.isLoading = false;
        state.donations = action.payload;
      })
      .addCase(fetchStoreDonations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update isActive status
      .addCase(updateDonationIsActive.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDonationIsActive.fulfilled, (state, action: PayloadAction<Donation>) => {
        state.isLoading = false;
        const index = state.donations.findIndex(d => d._id === action.payload._id);
        if (index !== -1) {
          state.donations[index] = action.payload;
        }
        // If the currently selected donation is this one, update it too
        if (state.selectedDonation?._id === action.payload._id) {
          state.selectedDonation = action.payload;
        }
      })
      .addCase(updateDonationIsActive.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});

export const { clearSelectedDonation } = donationSlice.actions;
export default donationSlice.reducer;