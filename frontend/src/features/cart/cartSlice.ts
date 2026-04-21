import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Cart, CartState } from "../../types/cartTypes";
import { API_URL } from "../context";

const API_BASE = `${API_URL}/api/cart`;

// Initial state
const initialState: CartState = {
  cart: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const addToCart = createAsyncThunk<
  Cart, // return type
  {
    storeId: string;
    productId: string;
    quantity: number;
    variation?: string; // ✅ added
    specialRequest?: string;
  },
  { rejectValue: string }
>(
  "cart/addToCart",
  async (args, thunkAPI) => {
    try {
      const res = await axios.post(API_BASE, args);
      return res.data.cart as Cart;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);


export const getUserCart = createAsyncThunk<
  Cart[] 
  //,{ storeId?: string }, 
 // { rejectValue: string } 
>(
  "cart/getUserCart",
  async (args, thunkAPI) => {
    try {
      //const res = await axios.get(`${API_BASE}${args.storeId ? `?storeId=${args.storeId}` : ""}`);
      const res = await axios.get(`${API_BASE}`);
      return res.data.carts as Cart[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
    }
  }
);


export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (
    { storeId, productId, quantity, variation, specialRequest }: { storeId: string; productId: string; quantity: number; variation?: string; specialRequest?: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.put(API_BASE, { storeId, productId, quantity, variation, specialRequest });
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
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCartForStore: (state, action) => {
      state.cart = state.cart.filter(cart => cart.store._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        const newCart = action.payload as Cart;
        const existingIndex = state.cart.findIndex(cart => cart.store._id === newCart.store._id);
        if (existingIndex >= 0) {
          state.cart[existingIndex] = newCart as any;
        } else {
          state.cart.push(newCart as any);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Get user cart
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload as any;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update cart
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedCart = action.payload as Cart;
        if (updatedCart.items.length === 0) {
          state.cart = state.cart.filter(cart => cart.store._id !== updatedCart.store._id);
        } else {
          state.cart = state.cart.map(cart => cart.store._id === updatedCart.store._id ? updatedCart : cart) as any;
        }
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete user cart
      .addCase(deleteUserCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = state.cart.filter((cartItem: any) => cartItem.store !== action.payload);
      })
      .addCase(deleteUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
export const { clearError, clearCartForStore } = cartSlice.actions;