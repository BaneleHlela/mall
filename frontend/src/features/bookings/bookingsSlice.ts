import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
  } from '@reduxjs/toolkit';
  import axios from 'axios';
  import type { Booking, BookingsState, AvailableTimes } from '../../types/bookingTypes';
  
  const API_BASE = 'http://localhost:5000/api/bookings';
  
  const initialState: BookingsState = {
    bookings: [],
    availableTimes: {},
    loading: false,
    error: null,
  };
  
  // 📅 Thunks
  
  export const makeBooking = createAsyncThunk(
    'bookings/makeBooking',
    async (bookingData: Partial<Booking>, thunkAPI) => {
      try {
        const res = await axios.post(API_BASE, bookingData);
        return res.data as Booking;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to make booking');
      }
    }
  );
  
  export const updateBooking = createAsyncThunk(
    'bookings/updateBooking',
    async ({ id, data }: { id: string; data: Partial<Booking> }, thunkAPI) => {
      try {
        const res = await axios.put(`${API_BASE}/${id}`, data);
        return res.data as Booking;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update booking');
      }
    }
  );
  
  export const getStoreBookings = createAsyncThunk(
    'bookings/getStoreBookings',
    async (storeId: string, thunkAPI) => {
      try {
        const res = await axios.get(`${API_BASE}/store/${storeId}`);
        return res.data as Booking[];
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch store bookings');
      }
    }
  );
  
  export const getStaffBookings = createAsyncThunk(
    'bookings/getStaffBookings',
    async (staffId: string, thunkAPI) => {
      try {
        const res = await axios.get(`${API_BASE}/staff/${staffId}`);
        return res.data as Booking[];
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch staff bookings');
      }
    }
  );
  
  export const getUserBookings = createAsyncThunk(
    'bookings/getUserBookings',
    async (_, thunkAPI) => {
      try {
        const res = await axios.get(`${API_BASE}/user`);
        return res.data as Booking[];
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch user bookings');
      }
    }
  );
  
  export const getAvailableBookingTimes = createAsyncThunk(
    'bookings/getAvailableBookingTimes',
    async (
      {
        storeId,
        serviceId,
        date,
        staffId,
      }: { storeId: string; serviceId: string; date: string; staffId?: string },
      thunkAPI
    ) => {
      try {
        const url = `${API_BASE}/availability/${storeId}?serviceId=${serviceId}&date=${date}${
          staffId ? `&staffId=${staffId}` : ''
        }`;
        const res = await axios.get(url);
        return res.data as AvailableTimes;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch available times');
      }
    }
  );
  
  // 🧩 Slice
  
  const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
      clearBookingState: (state) => {
        state.bookings = [];
        state.availableTimes = {};
        state.loading = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
  
        // 🛠 Booking Actions
        .addCase(makeBooking.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(makeBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
          state.loading = false;
          state.bookings.push(action.payload);
        })
        .addCase(makeBooking.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
  
        .addCase(updateBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
          const index = state.bookings.findIndex(b => b._id === action.payload._id);
          if (index !== -1) {
            state.bookings[index] = action.payload;
          }
        })
  
        .addCase(getStoreBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
          state.bookings = action.payload;
        })
        .addCase(getStaffBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
          state.bookings = action.payload;
        })
        .addCase(getUserBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
          state.bookings = action.payload;
        })
  
        // ⏰ Available Times
        .addCase(getAvailableBookingTimes.pending, (state) => {
          state.loading = true;
          state.availableTimes = {};
        })
        .addCase(getAvailableBookingTimes.fulfilled, (state, action: PayloadAction<AvailableTimes>) => {
          state.loading = false;
          state.availableTimes = action.payload;
        })
        .addCase(getAvailableBookingTimes.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export const { clearBookingState } = bookingsSlice.actions;
  export default bookingsSlice.reducer;
  