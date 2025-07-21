import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { StoreAdmin } from "../../types/storeAdminTypes";
import type { Image } from "../../types/storeTypes";
import type { Store } from '../../types/storeTypes';

const API_URL = '/api/dashboard'; 
const STORE_URL = "http://localhost:5000/api/stores";

const initialState: StoreAdmin = {
    store: null,
    analytics: null,
    isLoading: false,
    error: null,
}

export const editStore = createAsyncThunk<
  Store,
  { storeId: string; updatedStore: Omit<Store, 'id'> }
>(
  'store_admin/editStore',
  async ({ storeId, updatedStore }, thunkAPI) => {
    console.log(updatedStore)
    try {
      const response = await axios.put(`${STORE_URL}/edit/${storeId}`, updatedStore);
      return response.data; // should be the updated store
    } catch (error) {
      console.error('Error editing store:', error);
      return thunkAPI.rejectWithValue('Failed to edit store');
    }
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

export const uploadStoreGalleryImage = createAsyncThunk<
  {
    _id: string; url: string; description: string; category: string 
},
  { storeId: string; imageFile: File; description: string; category: string }
>(
  'stores/uploadStoreGalleryImage',
  async ({ storeId, imageFile, description, category }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('description', description);
      formData.append('category', category);

      const response = await axios.put(`${STORE_URL}/${storeId}/gallery`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading gallery image:', error);
      return thunkAPI.rejectWithValue('Failed to upload gallery image');
    }
  }
);

export const addTeamMember = createAsyncThunk<
  Store, // returning the updated Store
  { storeId: string; memberData: { name: string; position: string; about: string; }; imageFile: File }
>(
  'store_admin/addTeamMember',
  async ({ storeId, memberData, imageFile }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('member', memberData.name);
      formData.append('position', memberData.position);
      formData.append('about', memberData.about);

      const response = await axios.post(`${STORE_URL}/${storeId}/team`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data as Store;
    } catch (error) {
      console.error('Error adding team member:', error);
      return thunkAPI.rejectWithValue('Failed to add team member');
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
        setStore: (state, action: PayloadAction<Store | null>) => {
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
        updateStoreImages: (state, action: PayloadAction<Image[]>) => {
          console.log(action);
          if (state.store) {
            state.store.images = action.payload;
          }
        },
        addImageToStore: (state, action: PayloadAction<Image>) => {
          if (state.store) {
            state.store.images = [...(state.store.images || []), action.payload];
          }
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
          // Add Team Member
          .addCase(addTeamMember.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(addTeamMember.fulfilled, (state, action: PayloadAction<Store>) => {
            state.isLoading = false;
            state.error = null;
            state.store = action.payload;
          })
          .addCase(addTeamMember.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to add team member';
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
              state.store.layouts = [action.payload];
            }
          })
          .addCase(linkLayoutToStore.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to link layout to store';
          })
          // Upload gallery image
          .addCase(uploadStoreGalleryImage.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(uploadStoreGalleryImage.fulfilled, (state, action: PayloadAction<Image>) => {
            state.isLoading = false;
            state.error = null;
            if (state.store) {
              state.store.images = [...(state.store.images || []), action.payload];
            }
          })
          .addCase(uploadStoreGalleryImage.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to upload gallery image';
          })

          // Delete gallery image
          // Add this to your existing extraReducers in storeAdminSlice
          .addCase(deleteStoreGalleryImage.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(deleteStoreGalleryImage.fulfilled, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = null;
            const imageUrl = action.payload;
            
            if (state.store && state.store.images) {
              state.store.images = state.store.images.filter(img => img.url !== imageUrl);
            }
          })
          .addCase(deleteStoreGalleryImage.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to delete gallery image';
          })
          
    }
});

export const { setLoading, setError, updateStoreSetting, setStore, updateStoreImages, addImageToStore } = storeAdminSlice.actions;

export default storeAdminSlice.reducer;
