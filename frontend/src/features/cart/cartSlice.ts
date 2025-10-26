import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Cart, CartState } from "../../types/cartTypes";
import { API_URL } from "../context";

const API_BASE = `${API_URL}/api/cart`;

// Initial state
const initialState: CartState = {
  cart: [],
  loading: false,
  error: null,
};

// Async thunks
export const addToCart = createAsyncThunk<
  Cart, // return type
  { storeId: string; productId: string; quantity: number; specialRequest?: string }, // args
  { rejectValue: string } // thunkAPI
>(
  "cart/addToCart",
  async (args, thunkAPI) => {
    try {
      const res = await axios.post(API_BASE, args);
      return res.data.cart as Cart;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add to cart");
    }
  }
);


export const getUserCart = createAsyncThunk<
  Cart[], 
  { storeId?: string }, 
  { rejectValue: string } 
>(
  "cart/getUserCart",
  async (args, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE}${args.storeId ? `?storeId=${args.storeId}` : ""}`);
      return res.data.carts as Cart[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
    }
  }
);


export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (
    { storeId, productId, quantity, specialRequest }: { storeId: string; productId: string; quantity: number; specialRequest?: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.put(API_BASE, { storeId, productId, quantity, specialRequest });
      return res.data.cart;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update cart");
    }
  }
);

export const deleteUserCart = createAsyncThunk(
  "cart/deleteUserCart",
  async (storeId: string, thunkAPI) => {
    try {
      await axios.delete(`${API_BASE}/${storeId}`);
      return storeId;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete cart");
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = [action.payload];
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get user cart
      .addCase(getUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update cart
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete user cart
      .addCase(deleteUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter((cartItem: any) => cartItem.store !== action.payload);
      })
      .addCase(deleteUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;