import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Store } from '../../types/storeTypes';
import { API_URL } from '../context';
import type { RootState } from '../../app/store';

const STORE_API_URL = `${API_URL}/api/stores`; // Adjust this based on your setup

// Initial state for store settings
export interface StoresState {
  currentStore: Store  | null;

  storesBySlug: Record<string, Store>;
  storeSlugs: string[];

  myStoresBySlug: Record<string, Store>;
  myStoreSlugs: string[];

  isLoading: boolean;
  error: string | null;
}


const initialState: StoresState = {
  currentStore: null,

  storesBySlug: {},
  storeSlugs: [],

  myStoresBySlug: {},
  myStoreSlugs: [],

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
  async () => {
    const response = await axios.get(`${STORE_API_URL}/my-stores`);
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

export const fetchStoreById = createAsyncThunk<Store, string>(
  'store/fetchStoreById',
  async (storeId, thunkAPI) => {
    try {
      const response = await axios.get(`${STORE_API_URL}/id/${storeId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching store by id:", error);
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
      console.log("Cloning store with data:", storeId, data);
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
        state.currentStore = action.payload as any;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
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

        if (!store.slug) return;

        // Set as current store
        state.currentStore = store as any;

        // Add to all stores list
        state.storesBySlug[store.slug] = store as any;
        if (!state.storeSlugs.includes(store.slug)) {
          state.storeSlugs.push(store.slug);
        }

        // Add to "my stores" list
        state.myStoresBySlug[store.slug] = store as any;
        if (!state.myStoreSlugs.includes(store.slug)) {
          state.myStoreSlugs.push(store.slug);
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

        const newStoresBySlug: Record<string, Store> = {};
        const newStoreSlugs: string[] = [];

        for (const store of action.payload) {
          if (store.slug) {
            newStoresBySlug[store.slug] = store;
            newStoreSlugs.push(store.slug);
          }
        }

        state.storesBySlug = newStoresBySlug as any;
        state.storeSlugs = newStoreSlugs;
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

        const newMyStoresBySlug: Record<string, Store> = {};
        const newMyStoreSlugs: string[] = [];

        for (const store of action.payload) {
          if (store.slug) {
            newMyStoresBySlug[store.slug] = store;
            newMyStoreSlugs.push(store.slug);
          }
        }

        state.myStoresBySlug = newMyStoresBySlug as any;
        state.myStoreSlugs = newMyStoreSlugs;
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

        const newStoresBySlug: Record<string, Store> = {};
        const newStoreSlugs: string[] = [];

        for (const store of action.payload) {
          if (store.slug) {
            newStoresBySlug[store.slug] = store;
            newStoreSlugs.push(store.slug);
          }
        }

        state.storesBySlug = newStoresBySlug as any;
        state.storeSlugs = newStoreSlugs;
      })
      .addCase(fetchStoresInRange.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch stores in range';
      })
      
      // Delete gallery image
      .addCase(deleteStoreGalleryImage.fulfilled, (state, action) => {
        const imageUrl = action.payload;
        // Assuming the thunk payload includes storeSlug, but since it's imageUrl, and action.meta.arg has storeSlug
        const { storeSlug } = action.meta.arg as { storeSlug: string };

        const removeImage = (store: Store) => {
          store.images = store.images?.filter(img => img.url !== imageUrl) || [];
        };

        if (state.myStoresBySlug[storeSlug]) {
          removeImage(state.myStoresBySlug[storeSlug] as any);
        }
        if (state.currentStore && state.currentStore.slug === storeSlug) {
          removeImage(state.currentStore as any);
        }
      })

      // Fetch Store Images
      .addCase(fetchStoreImages.fulfilled, (state, action) => {
        state.isLoading = false;
        const { storeSlug, images, hasMore } = action.payload;

        // Map images to include _id if missing
        const mappedImages = images.map((img, index) => ({
          _id: (img as any)._id || `temp-${Date.now()}-${index}`,
          url: img.url,
        }));

        // Append the new images to the existing images in the store
        if (state.storesBySlug[storeSlug]) {
          state.storesBySlug[storeSlug].images = [
            ...(state.storesBySlug[storeSlug].images || []),  // Existing images (or an empty array if none)
            ...mappedImages.filter(img => !state.storesBySlug[storeSlug].images?.some(existingImg => existingImg.url === img.url)),  // Only append new images
          ];
        }

        if (state.myStoresBySlug[storeSlug]) {
          state.myStoresBySlug[storeSlug].images = [
            ...(state.myStoresBySlug[storeSlug].images || []),
            ...mappedImages.filter(img => !state.myStoresBySlug[storeSlug].images?.some(existingImg => existingImg.url === img.url)), // Prevent duplicates
          ];
        }

        if (state.currentStore && state.currentStore.slug === storeSlug) {
          state.currentStore.images = [
            ...(state.currentStore.images || []),
            ...mappedImages.filter(img => !state.currentStore?.images?.some(existingImg => existingImg.url === img.url)), // Prevent duplicates
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

        if (updatedStore.slug) {
          // Update in all stores list
          state.storesBySlug[updatedStore.slug] = updatedStore as any;
          // Update in my stores list
          state.myStoresBySlug[updatedStore.slug] = updatedStore as any;
          // Update current store if it's the same
          if (state.currentStore?.slug === updatedStore.slug) {
            state.currentStore = updatedStore as any;
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

        if (clonedStore.slug) {
          // Add to all stores list
          state.storesBySlug[clonedStore.slug] = clonedStore as any;
          if (!state.storeSlugs.includes(clonedStore.slug)) {
            state.storeSlugs.push(clonedStore.slug);
          }

          // Add to "my stores" list
          state.myStoresBySlug[clonedStore.slug] = clonedStore as any;
          if (!state.myStoreSlugs.includes(clonedStore.slug)) {
            state.myStoreSlugs.push(clonedStore.slug);
          }
        }
      })
      .addCase(cloneStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to clone store';
      })

      // Fetch Store By Slug
      .addCase(fetchStoreBySlug.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStoreBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        const store = action.payload;
        if (store.slug) {
          state.storesBySlug[store.slug] = store as any;
          if (!state.storeSlugs.includes(store.slug)) {
            state.storeSlugs.push(store.slug);
          }
          // Also add to myStoresBySlug if it already exists there
          if (state.myStoresBySlug[store.slug]) {
            state.myStoresBySlug[store.slug] = store as any;
          }
        }
      })
      .addCase(fetchStoreBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch store';
      })

      // Fetch Store By Id
      .addCase(fetchStoreById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStoreById.fulfilled, (state, action) => {
        state.isLoading = false;
        const store = action.payload;
        if (store.slug) {
          state.storesBySlug[store.slug] = store as any;
          if (!state.storeSlugs.includes(store.slug)) {
            state.storeSlugs.push(store.slug);
          }
          // Also add to myStoresBySlug if it already exists there
          if (state.myStoresBySlug[store.slug]) {
            state.myStoresBySlug[store.slug] = store as any;
          }
        }
      })
      .addCase(fetchStoreById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch store';
      })
  },
});

export const { setLoading, setError, setCurrentStore, clearError } = storeSlice.actions;

export const selectStoreBySlug = (slug: string) => (state: RootState): Store | undefined => {
  return state.stores.storesBySlug[slug];
};

export default storeSlice.reducer;
