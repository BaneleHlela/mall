import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Service, ServicesState } from '../../types/serviceTypes';



const initialState: ServicesState = {
  services: [],
  loading: false,
  error: null,
};

const API_BASE = 'http://localhost:5000/api/services';

// 🔁 Thunks
export const fetchStoreServices = createAsyncThunk(
  'services/fetchStoreServices',
  async (
    { storeId, category }: { storeId: string; category?: string },
    thunkAPI
  ) => {
    try {
      const url = category
        ? `${API_BASE}/store/${storeId}?category=${category}`
        : `${API_BASE}/store/${storeId}`;
      const res = await axios.get(url);
      return res.data as Service[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to fetch store services'
      );
    }
  }
);


export const createService = createAsyncThunk(
  'services/createService',
  async (data: Partial<Service>, thunkAPI) => {
    try {
      const res = await axios.post(API_BASE, data);
      return res.data as Service;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create service');
    }
  }
);

export const updateService = createAsyncThunk(
  'services/updateService',
  async ({ id, data }: { id: string; data: Partial<Service> }, thunkAPI) => {
    try {
      const res = await axios.put(`${API_BASE}/${id}`, data);
      return res.data as Service;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update service');
    }
  }
);

export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete service');
    }
  }
);

// 🧩 Slice
const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchStoreServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreServices.fulfilled, (state, action: PayloadAction<Service[]>) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchStoreServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create
      .addCase(createService.fulfilled, (state, action: PayloadAction<Service>) => {
        state.services.push(action.payload);
      })

      // Update
      .addCase(updateService.fulfilled, (state, action: PayloadAction<Service>) => {
        const index = state.services.findIndex(s => s._id === action.payload._id);
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteService.fulfilled, (state, action: PayloadAction<string>) => {
        state.services = state.services.filter(s => s._id !== action.payload);
      });
  },
});

export default servicesSlice.reducer;
