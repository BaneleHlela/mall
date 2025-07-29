import axios from "axios";
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Fonts, Layout, LayoutState } from "../../types/layoutTypes";
import type { RootState } from "../../app/store.ts";


const initialState: LayoutState = {
    activeLayout: null,
    layoutSettings: null,
    layouts: [],
    isLoading: false,
    error: null,
};

const API_URL = 'http://localhost:5000';

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

// Add this thunk to your file
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
        const response = await axios.patch(`${API_URL}/api/layouts/${layoutId}`, layoutConfig);
        return response.data;
    }
);

export const removeLayout = createAsyncThunk('layouts/removeLayout', async (layoutId: string) => {
    await axios.delete(`${API_URL}/api/layouts/${layoutId}`);
    return layoutId; // Return the ID for deletion
});

export const fetchDemoLayouts = createAsyncThunk(
    "layouts/fetchDemoLayouts",
    async (_, thunkAPI) => {
      try {
        const response = await axios.get(`${API_URL}/api/layouts/demo`);
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
        oldColors,
        newFonts,
      }: {
        layoutId: string;
        newColors: string[];
        oldColors?: string[];
        newFonts?: Fonts;
      },
      thunkAPI
    ) => {
      try {
        const response = await axios.post(`${API_URL}/api/layouts/with-settings`, {
          layoutId,
          newColors,
          oldColors,
          newFonts,
        });
        return response.data; // Adjust as needed depending on what the backend returns
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data || 'Failed to create layout with settings'
        );
      }
    }
);
  
  

// New thunk for uploading image
// export const uploadLayoutImageThunk = createAsyncThunk(
//     'layouts/uploadLayoutImage',
//     async ({ layoutId, file, fileName }: { layoutId: string; file: File; fileName?: string }) => {
//       return await uploadLayoutImage(layoutId, file, fileName);
//     }
// );  

// Update layout with image, using the response from the backend
// export const updateLayoutWithImage = createAsyncThunk(
// "layouts/updateLayoutWithImage",
// async ({
//     layoutId,
//     file,
//     fileName,
//     objectPath, // Add it here too
// }: {
//     layoutId: string;
//     file: File;
//     fileName?: string;
//     objectPath: string; // Make sure this is passed
// }) => {
//     const response = await uploadLayoutImage(layoutId, file, fileName);
//     return {
//     fileUrl: response.url,
//     objectPath, // ✅ Return objectPath too
//     };
// }
// );
  

  

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
            // Get layout
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
            // Create layout
            .addCase(createLayout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createLayout.fulfilled, (state, action: PayloadAction<Layout>) => {
                state.isLoading = false;
                state.layouts.push(action.payload); // Add the new layout to the array
                state.activeLayout = action.payload; // Optionally set as active layout
            })
            .addCase(createLayout.rejected, (state, action) => {
                state.isLoading = true;
                state.error = action.error.message || "Failed to create layout";
            })
            // Edit layout
            .addCase(editLayout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editLayout.fulfilled, (state, action: PayloadAction<Layout>) => {
                state.isLoading = false;
                const index = state.layouts.findIndex(layout => layout._id === action.payload._id);
                if (index >= 0) {
                    state.layouts[index] = action.payload; // Update the existing layout in the array
                }
                state.activeLayout = action.payload; // Optionally set the updated layout as active
            })
            .addCase(editLayout.rejected, (state, action) => {
                state.isLoading = true;
                state.error = action.error.message || "Failed to update layout";
            })
            
            // Remove layout
            .addCase(removeLayout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeLayout.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.layouts = state.layouts.filter(layout => layout._id !== action.payload); // Remove layout from array
            })
            .addCase(removeLayout.rejected, (state, action) => {
                state.isLoading = true;
                state.error = action.error.message || "Failed to delete layout";
            })

            // Get layout by demo store
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
            // Fetch Demo Layouts
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
            // Create layout with settings
            // Inside builder
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
            });
  
            // Upload Layout Image
    //         .addCase(uploadLayoutImageThunk.pending, (state) => {
    //             state.isLoading = true;
    //         })
    //         .addCase(uploadLayoutImageThunk.fulfilled, (state, action: PayloadAction<Layout>) => {
    //             state.status = false;
    //             const index = state.layouts.findIndex(layout => layout._id === action.payload._id);
    //             if (index >= 0) {
    //             state.layouts[index] = action.payload; // update the layout with the new image
    //             }
    //             if (state.activeLayout?._id === action.payload._id) {
    //             state.activeLayout = action.payload; // also update activeLayout if it's the same
    //             }
    //         })
    //         .addCase(uploadLayoutImageThunk.rejected, (state, action) => {
    //             state.status = true;
    //             state.error = action.error.message || "Failed to upload image";
    //         })
    //         // Update layout with image (pending, fulfilled, rejected)
    //         .addCase(updateLayoutWithImage.pending, (state) => {
    //             state.status = "loading";
    //         })
    //         .addCase(updateLayoutWithImage.fulfilled, (state, action) => {
    //             const { objectPath, fileUrl } = action.payload;
    //             const keys = objectPath.split('.');
    //             let current: any = state;

    //             keys.forEach((key, index) => {
    //             if (index === keys.length - 1) {
    //                 current[key] = fileUrl; // Set the image URL at the final key
    //             } else {
    //                 if (!current[key]) {
    //                 const nextKey = keys[index + 1];
    //                 current[key] = isNaN(Number(nextKey)) ? {} : [];
    //                 }
    //                 current = current[key];
    //             }
    //             });

    //             // Optional: refresh state
    //             if (state.activeLayout) {
    //             state.activeLayout = { ...state.activeLayout };
    //             }

    //             state.status = false;
    //         })
    //         .addCase(updateLayoutWithImage.rejected, (state, action) => {
    //             state.status = true;
    //             state.error = action.error.message || "Failed to update layout with image";
    //         });
                        
    },
});

export const { setLayout, clearLayout } = layoutSlice.actions;

export const selectActiveLayout = (state: RootState) => state.layout.activeLayout;
// export const selectLayoutStatus = (state: RootState) => state.layout.status;

export default layoutSlice.reducer;
