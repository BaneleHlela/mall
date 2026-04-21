import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { SearchPost } from '../../types/searchPostTypes';
import { API_URL } from '../context';
import type { RootState } from '../../app/store';

const SEARCH_POST_API_URL = `${API_URL}/api/search-posts`;

// Initial state for search posts
export interface SearchPostsState {
  searchPostsByTypes: Record<string, SearchPost>;
  searchPostTypes: string[];

  currentSearchPost: SearchPost | null;

  isLoading: boolean;
  error: string | null;
}

const initialState: SearchPostsState = {
  searchPostsByTypes: {},
  searchPostTypes: [],

  currentSearchPost: null,

  isLoading: false,
  error: null,
};

// Thunks
export const fetchSearchPosts = createAsyncThunk<
  SearchPost[],
  void
>(
  'searchPosts/fetchSearchPosts',
  async () => {
    const response = await axios.get(SEARCH_POST_API_URL);
    return response.data;
  }
);

export const fetchSearchPostById = createAsyncThunk<SearchPost, string>(
  'searchPosts/fetchSearchPostById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${SEARCH_POST_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching search post:", error);
      return thunkAPI.rejectWithValue('Failed to fetch search post');
    }
  }
);

export const createSearchPost = createAsyncThunk<SearchPost, Omit<SearchPost, '_id'>>(
  'searchPosts/createSearchPost',
  async (searchPostData) => {
    const response = await axios.post(SEARCH_POST_API_URL, searchPostData);
    return response.data;
  }
);

export const editSearchPost = createAsyncThunk<SearchPost, { id: string; updates: Partial<SearchPost> }>(
  'searchPosts/editSearchPost',
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await axios.put(`${SEARCH_POST_API_URL}/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating search post:', error);
      return thunkAPI.rejectWithValue('Failed to update search post');
    }
  }
);

export const deleteSearchPost = createAsyncThunk<string, string>(
  'searchPosts/deleteSearchPost',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${SEARCH_POST_API_URL}/${id}`);
      return id;
    } catch (error) {
      console.error('Error deleting search post:', error);
      return thunkAPI.rejectWithValue('Failed to delete search post');
    }
  }
);

export const updateSearchPostStats = createAsyncThunk<
  SearchPost,
  { searchPostId: string; stats: Partial<SearchPost['stats']> }
>(
  'searchPosts/updateSearchPostStats',
  async ({ searchPostId, stats }, thunkAPI) => {
    try {
      const response = await axios.patch(`${SEARCH_POST_API_URL}/stats/${searchPostId}`, stats);
      return response.data;
    } catch (error: any) {
      console.error('Error updating search post stats:', error);
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update search post stats');
    }
  }
);

// --- Slice ---
const searchPostSlice = createSlice({
  name: 'searchPosts',
  initialState,
  reducers: {
    setCurrentSearchPost: (state, action: PayloadAction<SearchPost | null>) => {
      state.currentSearchPost = action.payload as any;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Search Posts
      .addCase(fetchSearchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchPosts.fulfilled, (state, action) => {
        state.isLoading = false;

        const newSearchPostsByTypes: Record<string, SearchPost> = {};
        const newSearchPostTypes: string[] = [];

        for (const searchPost of action.payload) {
          const type = searchPost.type;
          newSearchPostsByTypes[type] = searchPost;
          if (!newSearchPostTypes.includes(type)) {
            newSearchPostTypes.push(type);
          }
        }

        state.searchPostsByTypes = newSearchPostsByTypes as any;
        state.searchPostTypes = newSearchPostTypes;
      })
      .addCase(fetchSearchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch search posts';
      })

      // Fetch Search Post By Id
      .addCase(fetchSearchPostById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        const searchPost = action.payload;

        // Set by type
        const type = searchPost.type;
        state.searchPostsByTypes[type] = searchPost as any;
        if (!state.searchPostTypes.includes(type)) {
          state.searchPostTypes.push(type);
        }

        // Set as current
        state.currentSearchPost = searchPost as any;
      })
      .addCase(fetchSearchPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch search post';
      })

      // Create Search Post
      .addCase(createSearchPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSearchPost.fulfilled, (state, action: PayloadAction<SearchPost>) => {
        state.isLoading = false;

        const searchPost = action.payload;
        const type = searchPost.type;

        // Set by type
        state.searchPostsByTypes[type] = searchPost as any;
        if (!state.searchPostTypes.includes(type)) {
          state.searchPostTypes.push(type);
        }

        // Set as current
        state.currentSearchPost = searchPost as any;
      })
      .addCase(createSearchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create search post';
      })

      // Edit Search Post
      .addCase(editSearchPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editSearchPost.fulfilled, (state, action: PayloadAction<SearchPost>) => {
        state.isLoading = false;
        const updatedSearchPost = action.payload;
        const type = updatedSearchPost.type;

        // Update by type
        state.searchPostsByTypes[type] = updatedSearchPost as any;

        // Update current if it's the same
        if (state.currentSearchPost?._id === updatedSearchPost._id) {
          state.currentSearchPost = updatedSearchPost as any;
        }
      })
      .addCase(editSearchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update search post';
      })

      // Delete Search Post
      .addCase(deleteSearchPost.fulfilled, (state, action) => {
        const deletedId = action.payload;

        // Find and remove the post by type
        for (const type in state.searchPostsByTypes) {
          if (state.searchPostsByTypes[type]._id === deletedId) {
            delete state.searchPostsByTypes[type];
            state.searchPostTypes = state.searchPostTypes.filter(t => t !== type);
            break;
          }
        }

        // Clear current if it's the deleted one
        if (state.currentSearchPost?._id === deletedId) {
          state.currentSearchPost = null;
        }
      })

      // Update Search Post Stats
      .addCase(updateSearchPostStats.fulfilled, (state, action) => {
        const updatedSearchPost = action.payload;
        const type = updatedSearchPost.type;

        // Update by type
        state.searchPostsByTypes[type] = updatedSearchPost as any;
        // Update current if it's the same
        if (state.currentSearchPost?._id === updatedSearchPost._id) {
          state.currentSearchPost = updatedSearchPost as any;
        }
      });
  },
});

export const { setLoading, setError, setCurrentSearchPost, clearError } = searchPostSlice.actions;


export const selectSearchPostByType = (type: string) => (state: RootState): SearchPost | undefined => {
  return state.searchPosts.searchPostsByTypes[type];
};

export const selectSearchPostTypes = (state: RootState): string[] => {
  return state.searchPosts.searchPostTypes;
};

export default searchPostSlice.reducer;