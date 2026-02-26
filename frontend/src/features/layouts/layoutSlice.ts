import axios from "axios";
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Fonts, Layout, LayoutState } from "../../types/layoutTypes";
import type { RootState } from "../../app/store.ts";
import { API_URL } from "../context.ts";

const initialState: LayoutState = {
    activeLayout: null,
    layoutSettings: null,
    layouts: [],
    isLoading: false,
    error: null,
};

// Async thunks for layout actions
export const getLayout = createAsyncThunk(
    "layouts/getLayout",
    async (layoutId: string, thunkAPI) => {
      try {
        const response = await axios.get(`${API_URL}/api/layouts/${layoutId}`);
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data || "Fetch failed");
      }
    }
);

export const getLayoutByDemoStore = createAsyncThunk(
    "layouts/getLayoutByDemoStore",
    async (storeId: string, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/api/layouts/demo-store/${storeId}`);
            return response.data as Layout;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch layout for demo store");
        }
    }
);

export const createLayout = createAsyncThunk('layouts/createLayout', async (layoutConfig: Layout) => {
    const response = await axios.post(`${API_URL}/api/layouts`, layoutConfig);
    return response.data;
});

export const editLayout = createAsyncThunk(
    'layouts/editLayout',
    async ({ layoutId, layoutConfig }: { layoutId: string; layoutConfig: Layout }) => {
        const response = await axios.put(`${API_URL}/api/layouts/${layoutId}`, layoutConfig);
        return response.data;
    }
);

export const removeLayout = createAsyncThunk('layouts/removeLayout', async (layoutId: string) => {
    await axios.delete(`${API_URL}/api/layouts/${layoutId}`);
    return layoutId;
});

export const fetchDemoLayouts = createAsyncThunk(
    "layouts/fetchDemoLayouts",
    async (trades: string[], thunkAPI) => {
      try {
        const tradesQuery = trades ? `?trades=${trades.join(',')}` : '';
        const response = await axios.get(`${API_URL}/api/layouts/demo${tradesQuery}`);
        return response.data as Layout[];
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch demo layouts");
      }
    }
);

export const createLayoutWithSettings = createAsyncThunk(
    'layouts/createLayoutWithSettings',
    async (
      {
        layoutId,
        newColors,
        newFonts,
        store,
        themeName
      }: {
        layoutId: string;
        newColors?: { primary: string; secondary: string; accent: string; quad: string; pent: string };
        newFonts?: Fonts;
        store: string;
        themeName?: string;
      },
      thunkAPI
    ) => {
      try {
        const response = await axios.post(`${API_URL}/api/layouts/with-settings`, {
          layoutId,
          newColors,
          newFonts,
          store,
          themeName
        });
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data || 'Failed to create layout with settings'
        );
      }
    }
);

export const updateLayoutWithSettings = createAsyncThunk(
    'layouts/updateLayoutWithSettings',
    async (
      {
        layoutId,
        newColors,
        newFonts,
        sectionUpdates,
        store
      }: {
        layoutId: string;
        newColors?: { primary: string; secondary: string; accent: string; quad: string; pent: string };
        newFonts?: any;
        sectionUpdates?: any;
        store: string;
      },
      thunkAPI
    ) => {
      try {
        const response = await axios.put(`${API_URL}/api/layouts/update-with-settings`, {
          layoutId,
          newColors,
          newFonts,
          sectionUpdates,
          store
        });
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data || 'Failed to update layout with settings'
        );
      }
    }
);

export const getStoreLayouts = createAsyncThunk(
    "layouts/getStoreLayouts",
    async (storeId: string, thunkAPI) => {
      try {
        const response = await axios.get(`${API_URL}/api/layouts/store/${storeId}`);
        return response.data as Layout[];
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data || "Failed to fetch store layouts"
        );
      }
    }
);

export const captureLayoutScreenshot = createAsyncThunk(
  "layouts/captureLayoutScreenshot",
  async (layoutId: string, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/api/layouts/capture/${layoutId}`);
      return response.data.layout as Layout;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to capture layout screenshot");
    }
  }
);

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
    setLayout(state, action: PayloadAction<Layout>) {
      state.activeLayout = action.payload;
    },
    clearLayout(state) {
      state.activeLayout = null;
    },
  },
    extraReducers: (builder) => {
        builder
            .addCase(getLayout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLayout.fulfilled, (state, action: PayloadAction<Layout>) => {
                state.isLoading = false;
                state.activeLayout = action.payload;
                state.layoutSettings = action.payload;
            })
            .addCase(getLayout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to load layout";
            })
            .addCase(createLayout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createLayout.fulfilled, (state, action: PayloadAction<Layout>) => {
                state.isLoading = false;
                state.layouts.push(action.payload);
                state.activeLayout = action.payload;
            })
            .addCase(createLayout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to create layout";
            })
            .addCase(editLayout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editLayout.fulfilled, (state, action: PayloadAction<Layout>) => {
                state.isLoading = false;
                const index = state.layouts.findIndex(layout => layout._id === action.payload._id);
                if (index >= 0) {
                    state.layouts[index] = action.payload;
                }
                state.activeLayout = action.payload;
            })
            .addCase(editLayout.rejected, (state, action) => {
                state.isLoading = true;
                state.error = action.error.message || "Failed to update layout";
            })
            .addCase(removeLayout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeLayout.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.layouts = state.layouts.filter(layout => layout._id !== action.payload);
            })
            .addCase(removeLayout.rejected, (state, action) => {
                state.isLoading = true;
                state.error = action.error.message || "Failed to delete layout";
            })
            .addCase(getLayoutByDemoStore.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLayoutByDemoStore.fulfilled, (state, action: PayloadAction<Layout>) => {
                state.isLoading = false;
                state.activeLayout = action.payload;
                state.layoutSettings = action.payload;
            })
            .addCase(getLayoutByDemoStore.rejected, (state, action) => {
                state.isLoading = true;
                state.error = action.error.message || "Failed to load layout for demo store";
            })
            .addCase(fetchDemoLayouts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDemoLayouts.fulfilled, (state, action: PayloadAction<Layout[]>) => {
                state.isLoading = false;
                state.layouts = action.payload;
            })
            .addCase(fetchDemoLayouts.rejected, (state, action) => {
                state.isLoading = true;
                state.error = action.error.message || "Failed to fetch demo layouts";
            })
            .addCase(createLayoutWithSettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createLayoutWithSettings.fulfilled, (state, action: PayloadAction<Layout>) => {
                state.isLoading = false;
                state.layouts.push(action.payload);
                state.activeLayout = action.payload;
            })
            .addCase(createLayoutWithSettings.rejected, (state, action) => {
                state.isLoading = true;
                state.error = action.error.message || "Failed to create layout with settings";
            })
            .addCase(getStoreLayouts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStoreLayouts.fulfilled, (state, action: PayloadAction<Layout[]>) => {
                state.isLoading = false;
                const newLayouts = action.payload;
                const existingIds = new Set(state.layouts.map(layout => layout._id));
                
                newLayouts.forEach(layout => {
                if (!existingIds.has(layout._id)) {
                    state.layouts.push(layout);
                }
                });
            })
            .addCase(getStoreLayouts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to load multiple layouts";
            })
            .addCase(captureLayoutScreenshot.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(captureLayoutScreenshot.fulfilled, (state, action: PayloadAction<Layout>) => {
              state.isLoading = false;
             
              const index = state.layouts.findIndex(layout => layout._id === action.payload._id);
              if (index >= 0) {
                state.layouts[index] = action.payload;
              } else {
                state.layouts.push(action.payload);
              }
             
              if (state.activeLayout?._id === action.payload._id) {
                state.activeLayout = action.payload;
              }
            })
            .addCase(captureLayoutScreenshot.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.error.message || "Failed to capture layout screenshot";
            })
            .addCase(updateLayoutWithSettings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateLayoutWithSettings.fulfilled, (state, action: PayloadAction<Layout>) => {
                state.isLoading = false;
                const index = state.layouts.findIndex(layout => layout._id === action.payload._id);
                if (index >= 0) {
                    state.layouts[index] = action.payload;
                }
                state.activeLayout = action.payload;
            })
            .addCase(updateLayoutWithSettings.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to update layout with settings";
            });
    },
});

export const { setLayout, clearLayout } = layoutSlice.actions;

export const selectActiveLayout = (state: RootState) => state.layout.activeLayout;

export default layoutSlice.reducer;
