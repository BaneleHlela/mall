import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../context";

export interface Section {
  _id: string;
  name: string;
  variation: string;
  layout: string; // Layout ID that this section belongs to
  images: {
    mobile: string;
    desktop: string;
  };
}

interface SectionsState {
  sections: Section[];
  loading: boolean;
  error: string | null;
}

const initialState: SectionsState = {
  sections: [],
  loading: false,
  error: null,
};

export const uploadStoreSection = createAsyncThunk(
    'sections/upload',
    async (formData: FormData, { rejectWithValue }) => {
      try {
        const res = await axios.post(`${API_URL}/api/sections`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data.section;
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || 'Upload failed');
      }
    }
);

// Thunk to fetch sections (optionally by name and variation)
export const fetchSections = createAsyncThunk<
  Section[],
  { name?: string; variation?: string } | undefined
>("sections/fetch", async (params, { rejectWithValue }) => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.name) {
      queryParams.append('name', params.name);
    }
    if (params?.variation) {
      queryParams.append('variation', params.variation);
    }
    
    const query = queryParams.toString() ? `?${queryParams.toString()}` : "";
    const res = await axios.get(`${API_URL}/api/sections${query}`);
    return res.data.sections;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch sections");
  }
});

// Thunk to copy section configuration from one layout to another
export const copySectionFromLayout = createAsyncThunk(
  'sections/copyFromLayout',
  async ({ sourceLayoutId, targetLayoutId, sectionName }: {
    sourceLayoutId: string;
    targetLayoutId: string;
    sectionName: string;
  }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/sections/copy`, {
        sourceLayoutId,
        targetLayoutId,
        sectionName,
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Copy section failed');
    }
  }
);

// Thunk to add section configuration from one layout to another (for adding new sections)
export const addSectionFromLayout = createAsyncThunk(
  'sections/addFromLayout',
  async ({ sourceLayoutId, targetLayoutId, sectionName }: {
    sourceLayoutId: string;
    targetLayoutId: string;
    sectionName: string;
  }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/sections/add`, {
        sourceLayoutId,
        targetLayoutId,
        sectionName,
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add section failed');
    }
  }
);


const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    clearSections(state) {
      state.sections = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
       // Upload store section/
      .addCase(uploadStoreSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadStoreSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sections.push(action.payload); // Add the uploaded section to the sections array
        state.error = null;
      })
      .addCase(uploadStoreSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set the error message
      })
      // Fetch store section
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSections.fulfilled, (state, action: PayloadAction<Section[]>) => {
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Copy section from layout
      .addCase(copySectionFromLayout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(copySectionFromLayout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(copySectionFromLayout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add section from layout
      .addCase(addSectionFromLayout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSectionFromLayout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addSectionFromLayout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSections } = sectionsSlice.actions;
export default sectionsSlice.reducer;
