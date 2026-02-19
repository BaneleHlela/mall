import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Store } from '../../types/storeTypes';
import { API_URL } from '../context';

const STORE_API_URL = `${API_URL}/api/stores`; // Adjust this based on your setup

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
    const response = await axios.post(`${STORE_API_URL}/add`, storeData);
    return response.data;
  }
);



export const fetchStores = createAsyncThunk<
  Store[],
  { search?: string; department?: string; sortBy?: string } | string | undefined
>(
  'stores/fetchStores',
  async (params) => {
    let queryParams: Record<string, string | undefined> = {};

    if (typeof params === 'string') {
      queryParams = { search: params };
    } else if (params && typeof params === 'object') {
      queryParams = params;
    }

    const response = await axios.get(STORE_API_URL, { params: queryParams });
    return response.data;
  }
);

export const fetchStoresInRange = createAsyncThunk<
  Store[],
  { lat: number; lng: number; range: number }
>(
  'stores/fetchStoresInRange',
  async ({ lat, lng, range }) => {
    const response = await axios.get(`${STORE_API_URL}/nearby`, {
      params: { lat, lng, range }
    });
    return response.data;
  }
);


export const fetchStoresByOwner = createAsyncThunk<Store[], string>(
  'stores/fetchStoresByOwner',
  async (ownerId) => {
    const response = await axios.get(`${STORE_API_URL}/my-stores`, { params: { ownerId } });
    return response.data;
  }
);

export const fetchStoreBySlug = createAsyncThunk<Store, string>(
  'store/fetchStoreBySlug',
  async (storeSlug, thunkAPI) => {
    try {
      const response = await axios.get(`${STORE_API_URL}/${storeSlug}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching store:", error);
      return thunkAPI.rejectWithValue('Failed to fetch store');
    }
  }
);




export const deleteStoreGalleryImage = createAsyncThunk<
  string, // returns the imageUrl of the deleted image
  { storeSlug: string; imageUrl: string }
>(
  'stores/deleteStoreGalleryImage',
  async ({ storeSlug, imageUrl }, thunkAPI) => {
    try {
      await axios.delete(`${STORE_API_URL}/${storeSlug}/gallery`, {
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
  { storeSlug: string; images: { url: string }[]; hasMore: boolean },  // Added `hasMore`
  { storeSlug: string; page: number; limit: number }  // Accept `page` and `limit` as parameters
>(
  'stores/fetchStoreImages',
  async ({ storeSlug, page, limit }, thunkAPI) => {
    try {
      // Make the request with pagination parameters
      const response = await axios.get(`${STORE_API_URL}/${storeSlug}/gallery`, {
        params: { page, limit }
      });

      // Assuming the response contains the images and a `hasMore` boolean
      return {
        storeSlug,
        images: response.data.images,  // Ensure your backend returns an array of images
        hasMore: response.data.hasMore // Make sure your backend provides this field
      };
    } catch (error) {
      console.error('Error fetching store gallery images:', error);
      return thunkAPI.rejectWithValue('Failed to fetch gallery images');
    }
  }
);

export const editStore = createAsyncThunk<Store, { storeSlug: string; updates: Partial<Store> }>(
  'stores/editStore',
  async ({ storeSlug, updates }, thunkAPI) => {
    try {
      const response = await axios.put(`${STORE_API_URL}/${storeSlug}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating store:', error);
      return thunkAPI.rejectWithValue('Failed to update store');
    }
  }
);

// Clone store for multi-location
interface CloneStoreData {
  nickname?: string;
  location?: {
    type: string;
    coordinates: [number, number];
    address?: string;
    nickname?: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
}

export const cloneStore = createAsyncThunk<Store, { storeId: string; data: CloneStoreData }>(
  'stores/cloneStore',
  async ({ storeId, data }, thunkAPI) => {
    try {
      const response = await axios.post(`${STORE_API_URL}/${storeId}/clone`, data);
      return response.data.store;
    } catch (error) {
      console.error('Error cloning store:', error);
      return thunkAPI.rejectWithValue('Failed to clone store');
    }
  }
);





// --- Slice ---
const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    setCurrentStore: (state, action: PayloadAction<Store | null>) => {
        state.currentStore = action.payload;
    },
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
      .addCase(createStore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createStore.fulfilled, (state, action: PayloadAction<Store>) => {
        state.isLoading = false;

        const store = action.payload;

        if (!store._id) return;

        // Set as current store
        state.currentStore = store;

        // Add to all stores list
        state.storesById[store._id] = store;
        if (!state.storeIds.includes(store._id)) {
          state.storeIds.push(store._id);
        }

        // Add to "my stores" list
        state.myStoresById[store._id] = store;
        if (!state.myStoreIds.includes(store._id)) {
          state.myStoreIds.push(store._id);
        }
      })
      .addCase(createStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create store';
      })

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

      // Fetch Stores in Range
      .addCase(fetchStoresInRange.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStoresInRange.fulfilled, (state, action) => {
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
      .addCase(fetchStoresInRange.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch stores in range';
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
      .addCase(fetchStoreImages.fulfilled, (state, action) => {
        state.isLoading = false;
        const { storeSlug, images, hasMore } = action.payload;

        // Append the new images to the existing images in the store
        if (state.storesById[storeSlug]) {
          state.storesById[storeSlug].images = [
            ...(state.storesById[storeSlug].images || []),  // Existing images (or an empty array if none)
            ...images.filter(img => !state.storesById[storeSlug].images?.some(existingImg => existingImg.url === img.url)),  // Only append new images
          ];
        }

        if (state.myStoresById[storeSlug]) {
          state.myStoresById[storeSlug].images = [
            ...(state.myStoresById[storeSlug].images || []),
            ...images.filter(img => !state.myStoresById[storeSlug].images?.some(existingImg => existingImg.url === img.url)), // Prevent duplicates
          ];
        }

        if (state.currentStore && state.currentStore._id === storeSlug) {
          state.currentStore.images = [
            ...(state.currentStore.images || []),
            ...images.filter(img => !state.currentStore.images?.some(existingImg => existingImg.url === img.url)), // Prevent duplicates
          ];
          (state.currentStore as any).hasMore = hasMore; // Set hasMore flag
        }
      })

      // Edit Store
      .addCase(editStore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editStore.fulfilled, (state, action: PayloadAction<Store>) => {
        state.isLoading = false;
        const updatedStore = action.payload;

        if (updatedStore._id) {
          // Update in all stores list
          state.storesById[updatedStore._id] = updatedStore;
          // Update in my stores list
          state.myStoresById[updatedStore._id] = updatedStore;
          // Update current store if it's the same
          if (state.currentStore?._id === updatedStore._id) {
            state.currentStore = updatedStore;
          }
        }
      })
      .addCase(editStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update store';
      })
      // Clone Store
      .addCase(cloneStore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cloneStore.fulfilled, (state, action: PayloadAction<Store>) => {
        state.isLoading = false;
        const clonedStore = action.payload;

        if (clonedStore._id) {
          // Add to all stores list
          state.storesById[clonedStore._id] = clonedStore;
          if (!state.storeIds.includes(clonedStore._id)) {
            state.storeIds.push(clonedStore._id);
          }

          // Add to "my stores" list
          state.myStoresById[clonedStore._id] = clonedStore;
          if (!state.myStoreIds.includes(clonedStore._id)) {
            state.myStoreIds.push(clonedStore._id);
          }
        }
      })
      .addCase(cloneStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to clone store';
      })
  },
});

export const { setLoading, setError,  setCurrentStore } = storeSlice.actions;

export default storeSlice.reducer;
