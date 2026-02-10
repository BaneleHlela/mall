import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../context';
import type { Package, UserPackage } from '../../types/packageTypes';

const API_BASE = `${API_URL}/api/packages`;

interface PackagesState {
    packages: Package[]; // For store admin dashboard
    storePackages: Package[]; // For store page display
    userPackages: UserPackage[];
    isLoading: boolean;
    error: string | null;
}

const initialState: PackagesState = {
    packages: [],
    storePackages: [],
    userPackages: [],
    isLoading: false,
    error: null,
};

// Thunks for Store Admin (Create/Update/Delete packages)

export const createPackage = createAsyncThunk(
    'packages/create',
    async (packageData: Partial<Package>, thunkAPI) => {
        try {
            const res = await axios.post(API_BASE, packageData);
            return res.data as Package;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create package');
        }
    }
);

export const updatePackage = createAsyncThunk(
    'packages/update',
    async ({ id, data }: { id: string; data: Partial<Package> }, thunkAPI) => {
        try {
            const res = await axios.patch(`${API_BASE}/${id}`, data);
            return res.data as Package;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update package');
        }
    }
);

export const deletePackage = createAsyncThunk(
    'packages/delete',
    async (id: string, thunkAPI) => {
        try {
            await axios.delete(`${API_BASE}/${id}`);
            return id;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete package');
        }
    }
);

// Thunks for Users (Purchase/Fetch packages)

export const purchasePackage = createAsyncThunk(
    'packages/purchase',
    async ({ packageId }: { packageId: string }, thunkAPI) => {
        try {
            const res = await axios.post(`${API_BASE}/${packageId}/purchase`);
            return res.data as UserPackage;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to purchase package');
        }
    }
);

export const fetchUserPackages = createAsyncThunk(
    'packages/fetchUserPackages',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(`${API_BASE}/user/packages`);
            return res.data as UserPackage[];
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch user packages');
        }
    }
);

export const fetchStorePackages = createAsyncThunk(
    'packages/fetchStorePackages',
    async ({ storeSlug, category }: { storeSlug: string; category?: string }, thunkAPI) => {
        try {
            const params = category ? `?category=${encodeURIComponent(category)}` : '';
            const res = await axios.get(`${API_BASE}/store/${storeSlug}${params}`);
            return res.data as Package[];
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch store packages');
        }
    }
);

// Slice
const packagesSlice = createSlice({
    name: 'packages',
    initialState,
    reducers: {
        clearPackagesError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create package
            .addCase(createPackage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createPackage.fulfilled, (state, action: PayloadAction<Package>) => {
                state.isLoading = false;
                state.packages.push(action.payload);
                state.storePackages.push(action.payload);
            })
            .addCase(createPackage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Update package
            .addCase(updatePackage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updatePackage.fulfilled, (state, action: PayloadAction<Package>) => {
                state.isLoading = false;
                const index = state.packages.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.packages[index] = action.payload;
                }
                const storeIndex = state.storePackages.findIndex(p => p._id === action.payload._id);
                if (storeIndex !== -1) {
                    state.storePackages[storeIndex] = action.payload;
                }
            })
            .addCase(updatePackage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Delete package
            .addCase(deletePackage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deletePackage.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.packages = state.packages.filter(p => p._id !== action.payload);
                state.storePackages = state.storePackages.filter(p => p._id !== action.payload);
            })
            .addCase(deletePackage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Purchase package
            .addCase(purchasePackage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(purchasePackage.fulfilled, (state, action: PayloadAction<UserPackage>) => {
                state.isLoading = false;
                state.userPackages.push(action.payload);
            })
            .addCase(purchasePackage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Fetch user packages
            .addCase(fetchUserPackages.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserPackages.fulfilled, (state, action: PayloadAction<UserPackage[]>) => {
                state.isLoading = false;
                state.userPackages = action.payload;
            })
            .addCase(fetchUserPackages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Fetch store packages
            .addCase(fetchStorePackages.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchStorePackages.fulfilled, (state, action: PayloadAction<Package[]>) => {
                state.isLoading = false;
                state.storePackages = action.payload;
            })
            .addCase(fetchStorePackages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearPackagesError } = packagesSlice.actions;
export default packagesSlice.reducer;
