import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../context";

interface VisitStats {
  count: number;
  percentage: number;
  timeframe: string;
}

interface VisitState {
  isTracking: boolean;
  error: string | null;
  lastTrackedStoreId: string | null;
  stats: VisitStats | null;
  statsLoading: boolean;
}

const initialState: VisitState = {
  isTracking: false,
  error: null,
  lastTrackedStoreId: null,
  stats: null,
  statsLoading: false,
};

// 🔥 Track visit
export const trackVisit = createAsyncThunk<
  { counted: boolean; storeId: string },
  { storeId: string }
>("visits/track", async ({ storeId }, { rejectWithValue }) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/visits/track`,
      { storeId },
      {
        withCredentials: true, // 🔥 IMPORTANT (cookies)
      }
    );

    return {
      counted: res.data.counted,
      storeId,
    };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to track visit"
    );
  }
});

export const fetchVisitStats = createAsyncThunk<
  VisitStats,
  { storeId: string; timeframe: string }
>("visits/fetchStats", async ({ storeId, timeframe }, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}/api/visits/stats/${storeId}?timeframe=${timeframe}`);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch visit stats");
  }
});

const visitSlice = createSlice({
  name: "visits",
  initialState,
  reducers: {
    clearVisitState(state) {
      state.isTracking = false;
      state.error = null;
      state.lastTrackedStoreId = null;
      state.stats = null;
      state.statsLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Track visit
      .addCase(trackVisit.pending, (state) => {
        state.isTracking = true;
        state.error = null;
      })
      .addCase(trackVisit.fulfilled, (state, action) => {
        state.isTracking = false;
        state.lastTrackedStoreId = action.payload.storeId;
      })
      .addCase(trackVisit.rejected, (state, action) => {
        state.isTracking = false;
        state.error = action.payload as string;
      })
      // Fetch stats
      .addCase(fetchVisitStats.pending, (state) => {
        state.statsLoading = true;
        state.error = null;
      })
      .addCase(fetchVisitStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchVisitStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearVisitState } = visitSlice.actions;
export default visitSlice.reducer;