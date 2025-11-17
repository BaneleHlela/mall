import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { StoreAdmin } from "../../types/storeAdminTypes";
import type { Image } from "../../types/storeTypes";
import type { Store } from '../../types/storeTypes';
import { API_URL } from '../context';

const STORE_API_URL = '/api/dashboard'; 
const STORE_URL = `${API_URL}/api/stores`;

interface AddTeamMemberParams {
  storeId: string;
  memberData: {
    username: string;
    role: "owner" | "manager" | "staff" | "viewer";
    about: string;
  };
  imageFile?: File;
}

const initialState: StoreAdmin = {
  store: null,
  analytics: null,
  isLoading: false,
  error: null,
  searchResults: [], 
  recommendedStoreDesigns: null,
};

export const editStore = createAsyncThunk<
  Store,
  { storeSlug: string; updatedStore: Omit<Store, 'id'> }
>(
  'store_admin/editStore',
  async ({ storeSlug, updatedStore }, thunkAPI) => {
    try {
      const response = await axios.put(`${STORE_URL}/edit/${storeSlug}`, updatedStore);
      return response.data; // should be the updated store
    } catch (error) {
      console.error('Error editing store:', error);
      return thunkAPI.rejectWithValue('Failed to edit store');
    }
  }
);

export const searchUsersByUsername = createAsyncThunk<
  Array<{ _id: string; username: string; firstName: string; lastName: string }>,
  string
>(
  'store_admin/searchUsersByUsername',
  async (username: string, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/api/user/search-users?q=${username}`);
      return response.data;
    } catch (error) {
      console.error('User search failed:', error);
      return thunkAPI.rejectWithValue('Failed to search users');
    }
  }
);


export const deleteStore = createAsyncThunk<string, string>(
    'store_admin/deleteStore',
    async (storeId) => {
      const response = await axios.delete(`${STORE_API_URL}/delete/${storeId}`);
      return response.data;
    }
);

export const linkLayoutToStore = createAsyncThunk<string, string>(
    'store_admin/linkLayoutToStore',
    async (storeId) => {
      const response = await axios.delete(`${STORE_API_URL}/link-layout/${storeId}`);
      return response.data;
    }
);


export const fetchStore = createAsyncThunk<Store, string>(
  'store_admin/fetchStore',
  async (storeSlug) => {
    const response = await axios.get(`${STORE_URL}/${storeSlug}`);
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
  Store, // return type
  AddTeamMemberParams // argument type
>(
  'store_admin/addTeamMember',
  async ({ storeId, memberData, imageFile }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('username', memberData.username);
      formData.append('role', memberData.role);
      formData.append('about', memberData.about);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await axios.post<Store>(
        `${STORE_URL}/${storeId}/team`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to add team member'
      );
    }
  }
);

export const deleteTeamMember = createAsyncThunk<
  Store, // response type (updated store)
  { storeId: string; username: string }, // args type
  { rejectValue: string }
>(
  'store/deleteTeamMember',
  async ({ storeId, username }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${STORE_URL}/${storeId}/team/${username}`
      );
      return response.data.store;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete team member');
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
      await axios.delete(`${STORE_API_URL}/${storeId}/gallery`, {
        data: { imageUrl },
      });


      return imageUrl;
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      return thunkAPI.rejectWithValue('Failed to delete gallery image');
    }
  }
);

export const editTeamMember = createAsyncThunk<
  Store,
  {
    storeId: string;
    username: string;
    updatedData: {
      name?: string;
      position?: string;
      about?: string;
      imageFile?: File;
    };
  }
>('store/editTeamMember', async ({ storeId, username, updatedData }, thunkAPI) => {
  try {
    const formData = new FormData();
    if (updatedData.name) formData.append('name', updatedData.name);
    if (updatedData.position) formData.append('position', updatedData.position);
    if (updatedData.about) formData.append('about', updatedData.about);
    if (updatedData.imageFile) formData.append('image', updatedData.imageFile);

    const res = await axios.put(`${STORE_URL}/${storeId}/team/${username}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return res.data.store;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Edit failed');
  }
});

export const getDemoStores = createAsyncThunk<
  Store[], // Return type: array of Store
  void,    // No argument needed
  { rejectValue: string }
>(
  'store_admin/getDemoStores',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${STORE_URL}/demo`);
      return response.data; // array of demo stores
    } catch (error: any) {
      console.error('Error fetching demo stores:', error);
      return thunkAPI.rejectWithValue('Failed to fetch demo stores');
    }
  }
);

// --- Upload Store Logo ---
export const uploadStoreLogo = createAsyncThunk<string, { storeSlug: string; logoFile: File }>(
  'stores/uploadStoreLogo',
  async ({ storeSlug, logoFile }) => {
    const formData = new FormData();
    formData.append('logo', logoFile);

    try {
      const response = await axios.put(`${STORE_URL}/${storeSlug}/logo`, formData, {
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
export const deleteStoreLogo = createAsyncThunk<string, { storeSlug: string }>(
  'stores/deleteStoreLogo',
  async ({ storeSlug }) => {
    try {
      const response = await axios.delete(`${STORE_URL}/${storeSlug}/logo`);
      return response.data.storeId; // or simply: return storeSlug;
    } catch (error) {
      console.error('Error deleting store logo:', error);
      throw new Error('Failed to delete store logo');
    }
  }
);

// Toggle Store Status
export const toggleStoreStatus = createAsyncThunk<
  Store,
  { storeSlug: string; status: 'open' | 'closed' }
>(
  'store_admin/toggleStoreStatus',
  async ({ storeSlug, status }, thunkAPI) => {
    try {
      const response = await axios.put(`${STORE_URL}/${storeSlug}/status`, { status });
      return response.data.store;
    } catch (error: any) {
      console.error('Error toggling store status:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update store status'
      );
    }
  }
);

// Reset Store Status
export const resetStoreStatus = createAsyncThunk<Store, { storeSlug: string }>(
  'store_admin/resetStoreStatus',
  async ({ storeSlug }, thunkAPI) => {
    try {
      const response = await axios.delete(`${STORE_URL}/${storeSlug}/status`);
      return response.data.store;
    } catch (error: any) {
      console.error('Error resetting store status:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to reset store status'
      );
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
            state.store = action.payload;
            state.isLoading = false;
            state.error = null;
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
          
          // Search Users By Username
          .addCase(searchUsersByUsername.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(searchUsersByUsername.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.searchResults = action.payload;
          })
          .addCase(searchUsersByUsername.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to search users';
          })
          
          // Delete Team Member
          .addCase(deleteTeamMember.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(deleteTeamMember.fulfilled, (state, action: PayloadAction<Store>) => {
            state.isLoading = false;
            state.store = action.payload; // updated store from server
          })
          .addCase(deleteTeamMember.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Failed to delete team member';
          })

          // Edit Team Member
          .addCase(editTeamMember.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(editTeamMember.fulfilled, (state, action) => {
            state.isLoading = false;
            state.store = action.payload; 
          })
          .addCase(editTeamMember.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
          })

          // Get Demo Stores
          .addCase(getDemoStores.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(getDemoStores.fulfilled, (state, action: PayloadAction<Store[]>) => {
            state.isLoading = false;
            state.recommendedStoreDesigns = action.payload;
          })
          .addCase(getDemoStores.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Failed to fetch demo stores';
          })
          
          // Upload Store Logo
        .addCase(uploadStoreLogo.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(uploadStoreLogo.fulfilled, (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = null;

          if (state.store) {
            state.store.logo = { url: action.payload }; // set logo URL as an object
          }
        })
        .addCase(uploadStoreLogo.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Failed to upload store logo';
        })

        // Toggle Store Status
        .addCase(toggleStoreStatus.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(toggleStoreStatus.fulfilled, (state, action: PayloadAction<Store>) => {
          state.isLoading = false;
          state.error = null;
          state.store = action.payload;
        })
        .addCase(toggleStoreStatus.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string || 'Failed to update store status';
        })

        // Reset Store Status
        .addCase(resetStoreStatus.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(resetStoreStatus.fulfilled, (state, action: PayloadAction<Store>) => {
          state.isLoading = false;
          state.error = null;
          state.store = action.payload;
        })
        .addCase(resetStoreStatus.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string || 'Failed to reset store status';
        })
    }
});

export const { setLoading, setError, updateStoreSetting, setStore, updateStoreImages, addImageToStore } = storeAdminSlice.actions;


export default storeAdminSlice.reducer;
