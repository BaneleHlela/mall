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

export const uploadStoreGalleryImage = createAsyncThunk<
  string, // returns the uploaded image URL
  { storeId: string; imageFile: File }
>(
  'stores/uploadStoreGalleryImage',
  async ({ storeId, imageFile }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await axios.put(`${API_URL}/${storeId}/gallery`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data.url;
    } catch (error) {
      console.error('Error uploading gallery image:', error);
      return thunkAPI.rejectWithValue('Failed to upload gallery image');
    }
  }
);

export const deleteStoreGalleryImage = createAsyncThunk<
  string, // returns the imageUrl of the deleted image
  { storeId: string; imageUrl: string }
>(
  'stores/deleteStoreGalleryImage',
  async ({ storeId, imageUrl }, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${storeId}/gallery`, {
        data: { imageUrl },
      });


      return imageUrl;
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      return thunkAPI.rejectWithValue('Failed to delete gallery image');
    }
  }
);

export const fetchStoreImages = createAsyncThunk<
  { storeId: string; images: { url: string }[] },
  string
>(
  'stores/fetchStoreImages',
  async (storeId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${storeId}/gallery`);
      return { storeId, images: response.data };
    } catch (error) {
      console.error('Error fetching store gallery images:', error);
      return thunkAPI.rejectWithValue('Failed to fetch gallery images');
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
    setCurrentStore: (state, action: PayloadAction<Store | null>) => {
      state.currentStore = action.payload;
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
      
      // Upload gallery image
      .addCase(uploadStoreGalleryImage.fulfilled, (state, action) => {
        const url = action.payload;
        const storeId = state.currentStore?._id;
        if (storeId && state.myStoresById[storeId]) {
          state.myStoresById[storeId].images?.push({ url });
        }
        if (storeId && state.currentStore) {
          state.currentStore.images?.push({ url });
        }
      })

      // Delete gallery image
      .addCase(deleteStoreGalleryImage.fulfilled, (state, action) => {
        const imageUrl = action.payload;
        const storeId = state.currentStore?._id;

        const removeImage = (store: Store) => {
          store.images = store.images?.filter(img => img.url !== imageUrl) || [];
        };

        if (storeId && state.myStoresById[storeId]) {
          removeImage(state.myStoresById[storeId]);
        }
        if (storeId && state.currentStore) {
          removeImage(state.currentStore);
        }
      })

      // Fetch Store Images
      .addCase(fetchStoreImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStoreImages.fulfilled, (state, action) => {
        state.isLoading = false;
        const { storeId, images } = action.payload;

        if (state.storesById[storeId]) {
          state.storesById[storeId].images = images;
        }

        if (state.myStoresById[storeId]) {
          state.myStoresById[storeId].images = images;
        }

        if (state.currentStore && state.currentStore._id === storeId) {
          state.currentStore.images = images;
        }
      })
      .addCase(fetchStoreImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })      

  },
});

export const { setLoading, setError,  setCurrentStore } = storeSlice.actions;

export default storeSlice.reducer;
