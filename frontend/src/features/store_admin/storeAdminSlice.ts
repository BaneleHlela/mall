import { createSlice, createAsyncThunk, type PayloadAction, type Store } from '@reduxjs/toolkit';
import axios from 'axios';
import type { StoreAdmin } from "../../types/storeAdminTypes";

const API_URL = '/api/dashboard'; 
const STORE_URL = "http://localhost:5000/api/stores";

const initialState: StoreAdmin = {
    store: null,
    analytics: null,
    isLoading: false,
    error: null,
}

export const editStore = createAsyncThunk<Store, { storeId: string; updatedStore: Omit<Store, 'id'> }>(
    'store_admin/editStore',
    async ({ storeId, updatedStore }) => {
      const response = await axios.put(`${API_URL}/edit/${storeId}`, updatedStore);
      return response.data;
    }
);

export const deleteStore = createAsyncThunk<string, string>(
    'store_admin/deleteStore',
    async (storeId) => {
      const response = await axios.delete(`${API_URL}/delete/${storeId}`);
      return response.data;
    }
);

export const linkLayoutToStore = createAsyncThunk<string, string>(
    'store_admin/linkLayoutToStore',
    async (storeId) => {
      const response = await axios.delete(`${API_URL}/link-layout/${storeId}`);
      return response.data;
    }
);


export const fetchStore = createAsyncThunk<Store, string>(
  'store_admin/fetchStore',
  async (storeId) => {
    const response = await axios.get(`${STORE_URL}/${storeId}`);
    return response.data;
  }
);


// --- Slice ---

const storeAdminSlice = createSlice({
    name: "storeAdmin",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
          state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
          state.error = action.payload;
        },
        setStore: (state, action: PayloadAction<Store>) => {
          state.store = action.payload;
        },
        updateStoreSetting: (state, action: PayloadAction<{ field: string; value: any }>) => {
          const { field, value } = action.payload;
          const keys = field.split('.'); // Split the field name into nested keys
          let current: any = state.store;
    
          // Traverse and create missing objects
          keys.forEach((key, index) => {
            if (index === keys.length - 1) {
              // Update the value on the last key
              current[key] = value;
            } else {
              // Ensure the current key is an object
              current[key] = current[key] || {};
              current = current[key];
            }
          });
        },
    },
    extraReducers: (builder) => {
        builder
          // Fetch Store
          .addCase(fetchStore.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(fetchStore.fulfilled, (state, action: PayloadAction<Store>) => {
            state.isLoading = false;
            state.error = null;
            state.store = action.payload;
          })
          .addCase(fetchStore.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch store';
          })
          // Edit Store
          .addCase(editStore.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(editStore.fulfilled, (state, action: PayloadAction<Store>) => {
            state.isLoading = false;
            state.error = null;
            state.store = action.payload;
          })
          .addCase(editStore.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to edit store';
          })
    
          // Delete Store
          .addCase(deleteStore.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(deleteStore.fulfilled, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = null;
            if (state.store?._id === action.payload) {
              state.store = null;
            }
          })
          .addCase(deleteStore.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to delete store';
          })
    
          // Link Layout to Store
          .addCase(linkLayoutToStore.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(linkLayoutToStore.fulfilled, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = null;
            if (state.store) {
              state.store.layoutId = action.payload;
            }
          })
          .addCase(linkLayoutToStore.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to link layout to store';
          });
    }
});

export const { setLoading, setError, updateStoreSetting, setStore } = storeAdminSlice.actions;

export default storeAdminSlice.reducer;
