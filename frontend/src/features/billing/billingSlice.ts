import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../context";

interface BillingStats {
  amount: number;
  percentage: number;
  timeframe: string;
}

interface BillingState {
  stats: BillingStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: BillingState = {
  stats: null,
  loading: false,
  error: null,
};

export const fetchBillingStats = createAsyncThunk<
  BillingStats,
  { storeId: string; timeframe: string }
>("billing/fetchStats", async ({ storeId, timeframe }, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}/api/stores/${storeId}/billing/stats?timeframe=${timeframe}`);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch billing stats");
  }
});

const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    clearBillingState(state) {
      state.stats = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillingStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBillingStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchBillingStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBillingState } = billingSlice.actions;
export default billingSlice.reducer;