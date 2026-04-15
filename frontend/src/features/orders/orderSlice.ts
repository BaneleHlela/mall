import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Order, OrdersState } from '../../types/orderTypes';
import { API_URL } from '../context';

const API_BASE = `${API_URL}/api/orders`;

const initialState: OrdersState = {
  orders: [],
  orderAnalytics: {
    totalOrders: 0,
    totalOrderedItems: 0,
    completedOrders: 0,
    returnedOrders: 0,
  },
  isLoading: false,
  error: null,
  selectedOrder: null,
};

// 🔁 Thunks

// Fetch all orders for store admin
export const fetchStoreOrders = createAsyncThunk(
  'orders/fetchStoreOrders',
  async (storeId: string, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE}/store/${storeId}`);
      return res.data as { orders: Order[]; analytics: OrdersState['orderAnalytics'] };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

// Fetch order analytics for store
export const fetchOrderAnalytics = createAsyncThunk(
  'orders/fetchAnalytics',
  async (storeId: string, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE}/analytics/${storeId}`);
      return res.data as OrdersState['orderAnalytics'];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch analytics');
    }
  }
);

// Fetch order by ID
export const fetchOrderById = createAsyncThunk(
  'orders/fetchById',
  async (orderId: string, thunkAPI) => {
    try {
      const res = await axios.get(`${API_BASE}/${orderId}`);
      return res.data as Order;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch order');
    }
  }
);

// Create new order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ storeId, paymentMethod, deliveryOption, shippingAddress }: {
    storeId: string;
    paymentMethod: Order['paymentMethod'];
    deliveryOption: Order['deliveryOption'];
    shippingAddress?: any;
  }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_BASE}`, { storeId, paymentMethod, deliveryOption, shippingAddress });
      return res.data.order as Order;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create order');
    }
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, deliveryStatus, paymentStatus }: { orderId: string; deliveryStatus?: Order['deliveryStatus']; paymentStatus?: Order['paymentStatus'] }, thunkAPI) => {
    try {
      const res = await axios.put(`${API_BASE}/${orderId}/status`, { deliveryStatus, paymentStatus });
      return res.data as Order;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update order status');
    }
  }
);

// 🧩 Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearSelectedOrder(state) {
      state.selectedOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false;
        state.orders.unshift(action.payload); // Add to front of orders array
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch store orders
      .addCase(fetchStoreOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStoreOrders.fulfilled, (state, action: PayloadAction<{ orders: Order[]; analytics: OrdersState['orderAnalytics'] }>) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.orderAnalytics = action.payload.analytics;
      })
      .addCase(fetchStoreOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch analytics
      .addCase(fetchOrderAnalytics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderAnalytics.fulfilled, (state, action: PayloadAction<OrdersState['orderAnalytics']>) => {
        state.isLoading = false;
        state.orderAnalytics = action.payload;
      })
      .addCase(fetchOrderAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update status
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false;
        const index = state.orders.findIndex(o => o._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.selectedOrder?._id === action.payload._id) {
          state.selectedOrder = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedOrder, clearError } = orderSlice.actions;
export default orderSlice.reducer;