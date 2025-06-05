import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Product, ProductsState, StockUpdatePayload } from '../../types/productTypes';

const API_BASE = 'http://localhost:5000/api/products';

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,
};

// 🔁 Thunks

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API_BASE);
      return res.data as Product[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Fetch product by ID
export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE}/${id}`);
      return res.data as Product;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch product');
    }
  }
);

// Fetch product by slug
export const fetchProductBySlug = createAsyncThunk(
  'products/fetchBySlug',
  async (slug: string, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE}/slug/${slug}`);
      return res.data as Product;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch product by slug');
    }
  }
);

// Create product
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData: Partial<Product>, thunkAPI) => {
    try {
      const res = await axios.post(API_BASE, productData);
      return res.data as Product;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create product');
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, data }: { id: string; data: Partial<Product> }, thunkAPI) => {
    try {
      const res = await axios.put(`${API_BASE}/${id}`, data);
      return res.data as Product;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update product');
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: string, thunkAPI) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete product');
    }
  }
);

// Update stock and sold count
export const updateStockAndSoldCount = createAsyncThunk(
  'products/updateStockAndSoldCount',
  async (items: StockUpdatePayload[], thunkAPI) => {
    try {
      const res = await axios.put(`${API_BASE}/update-stock`, { items });
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update stock');
    }
  }
);

// 🧩 Slice

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch by ID
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.selectedProduct = action.payload;
      })

      // Fetch by slug
      .addCase(fetchProductBySlug.fulfilled, (state, action: PayloadAction<Product>) => {
        state.selectedProduct = action.payload;
      })

      // Create
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })

      // Update
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.products = state.products.filter(p => p._id !== action.payload);
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
