import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Store } from '../../types/storeTypes';

const API_URL = 'http://localhost:5000/api/stores'; // Adjust this based on your setup

// Initial state for store settings
interface StoresState {
  currentStore: Store  | null;

  storesById: Record<string, Store>;
  storeIds: string[];

  myStoresById: Record<string, Store>;
  myStoreIds: string[];

  isLoading: boolean;
  error: string | null;
}


const initialState: StoresState = {
  currentStore: null,

  storesById: {},
  storeIds: [],

  myStoresById: {},
  myStoreIds: [],

  isLoading: false,
  error: null,
};

// Thunks
export const createStore = createAsyncThunk<Store, Omit<Store, 'id'>>(
  'stores/createStore',
  async (storeData) => {
    const response = await axios.post(`${API_URL}/add`, storeData);
    return response.data;
  }
);


export const fetchStores = createAsyncThunk<Store[], string | undefined>(
  'stores/fetchStores',
  async (searchTerm) => {
    const params = searchTerm ? { search: searchTerm } : {};
    const response = await axios.get(API_URL, { params });
    return response.data;
  }
);

export const fetchStoresByOwner = createAsyncThunk<Store[], string>(
  'stores/fetchStoresByOwner',
  async (ownerId) => {
    const response = await axios.get(`${API_URL}/my-stores`, { params: { ownerId } });
    return response.data;
  }
);

export const fetchStoreById = createAsyncThunk<Store, string>(
  'store/fetchStoreById',
  async (storeId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${storeId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching store:", error);
      return thunkAPI.rejectWithValue('Failed to fetch store');
    }
  }
);

// --- Upload Store Logo ---
export const uploadStoreLogo = createAsyncThunk<string, { storeId: string; logoFile: File }>(
  'stores/uploadStoreLogo',
  async ({ storeId, logoFile }) => {
    const formData = new FormData();
    formData.append('logo', logoFile);

    try {
      const response = await axios.put(`${API_URL}/${storeId}/logo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200 || !response.data.url) {
        throw new Error('Invalid response from server');
      }

      return response.data.url;
    } catch (error) {
      console.error('Error uploading store logo:', error);
      throw new Error('Failed to upload store logo');
    }
  }
);

// --- Delete Store Logo ---
export const deleteStoreLogo = createAsyncThunk<string, { storeId: string }>(
  'stores/deleteStoreLogo',
  async ({ storeId }) => {
    try {
      const response = await axios.delete(`${API_URL}/${storeId}/logo`);
      return response.data.storeId; // or simply: return storeId;
    } catch (error) {
      console.error('Error deleting store logo:', error);
      throw new Error('Failed to delete store logo');
    }
  }
);


// --- Slice ---
const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Store
      // .addCase(createStore.fulfilled, (state, action: PayloadAction<Store>) => {
      //   state.currentStore = action.payload;
      // })
      // Fetch Stores
      .addCase(fetchStores.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.isLoading = false;

        const newStoresById: Record<string, Store> = {};
        const newStoreIds: string[] = [];

        for (const store of action.payload) {
          if (store._id) {
            newStoresById[store._id] = store;
            newStoreIds.push(store._id);
          }
        }

        state.storesById = newStoresById;
        state.storeIds = newStoreIds;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch stores';
      })
      // Fetch Stores by Owner
      .addCase(fetchStoresByOwner.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStoresByOwner.fulfilled, (state, action) => {
        state.isLoading = false;
      
        const newMyStoresById: Record<string, Store> = {};
        const newMyStoreIds: string[] = [];
      
        for (const store of action.payload) {
          if (store._id) {
            newMyStoresById[store._id] = store;
            newMyStoreIds.push(store._id);
          }
        }
      
        state.myStoresById = newMyStoresById;
        state.myStoreIds = newMyStoreIds;
      })      
      .addCase(fetchStoresByOwner.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch stores by owner';
      })   
  },
});

export const { setLoading, setError } = storeSlice.actions;

export default storeSlice.reducer;
