import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PackagesState, Package } from '../../types/packageTypes';
import { API_URL } from '../context';

const initialState: PackagesState = {
  packages: [],
  loading: false,
  error: null,
};

const API_BASE = `${API_URL}/api/packages`;

// 🔁 Thunks
export const fetchStorePackages = createAsyncThunk(
  'packages/fetchStorePackages',
  async (storeId: string, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE}/store/${storeId}`);
      return res.data as Package[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch store packages');
    }
  }
);

export const fetchAllPackages = createAsyncThunk(
  'packages/fetchAllPackages',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API_BASE);
      return res.data as Package[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch all packages');
    }
  }
);

export const getPackageById = createAsyncThunk(
  'packages/getPackageById',
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE}/${id}`);
      return res.data as Package;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch package');
    }
  }
);

export const createPackage = createAsyncThunk(
  'packages/createPackage',
  async (data: Partial<Package>, thunkAPI) => {
    try {
      const res = await axios.post(API_BASE, data);
      return res.data as Package;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create package');
    }
  }
);

export const updatePackage = createAsyncThunk(
  'packages/updatePackage',
  async ({ id, data }: { id: string; data: Partial<Package> }, thunkAPI) => {
    try {
      const res = await axios.patch(`${API_BASE}/${id}`, data);
      return res.data as Package;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update package');
    }
  }
);

export const softDeletePackage = createAsyncThunk(
  'packages/softDeletePackage',
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`${API_BASE}/soft/${id}`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to soft delete package');
    }
  }
);

export const deletePackage = createAsyncThunk(
  'packages/deletePackage',
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete package');
    }
  }
);

// 🧩 Slice
const packagesSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch store packages
      .addCase(fetchStorePackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStorePackages.fulfilled, (state, action: PayloadAction<Package[]>) => {
        state.loading = false;
        state.packages = action.payload;
      })
      .addCase(fetchStorePackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch all packages
      .addCase(fetchAllPackages.fulfilled, (state, action: PayloadAction<Package[]>) => {
        state.packages = action.payload;
      })

      // Get by ID
      .addCase(getPackageById.fulfilled, (state, action: PayloadAction<Package>) => {
        const index = state.packages.findIndex(p => p._id === action.payload._id);
        if (index === -1) {
          state.packages.push(action.payload);
        } else {
          state.packages[index] = action.payload;
        }
      })

      // Create
      .addCase(createPackage.fulfilled, (state, action: PayloadAction<Package>) => {
        state.packages.push(action.payload);
      })

      // Update
      .addCase(updatePackage.fulfilled, (state, action: PayloadAction<Package>) => {
        const index = state.packages.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.packages[index] = action.payload;
        }
      })

      // Soft Delete
      .addCase(softDeletePackage.fulfilled, (state, action: PayloadAction<string>) => {
        const pkg = state.packages.find(p => p._id === action.payload);
        if (pkg) {
          pkg.deleted = true; // Assuming your Package model has a "deleted" flag
        }
      })

      // Hard Delete
      .addCase(deletePackage.fulfilled, (state, action: PayloadAction<string>) => {
        state.packages = state.packages.filter(p => p._id !== action.payload);
      });
  },
});

export default packagesSlice.reducer;
