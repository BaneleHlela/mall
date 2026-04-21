import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { SearchPost } from '../../types/searchPostTypes';
import axios from 'axios';
import { API_URL } from '../context';

const SEARCH_POST_API_URL = `${API_URL}/api/search-posts`;

// Extended state with history for undo/redo
interface SearchPostSettingsState extends SearchPost {
  _history: SearchPost[];
  _historyIndex: number;
}

// Default search post config
const defaultSearchPostConfig: Omit<SearchPost, '_id'> = {
  variation: 'basicProductCarousel',
  type: '',
  departments: [],
  stores: [],
  products: [],
  services: [],
  style: {
    text: {
      heading: {
        input: '',
      },
      subheading: {
        input: '',
      },
    },
    colors: {
      backgroundColor: '#ffffff',
      accentColor: '#000000',
    },
    content: {
      largeImage: {
        imageUrl: [],
        aspectRatio: { mobile: '4/5', desktop: '16/9' },
        borderRadius: '0px',
      },
      carousel: {
        viewAllButton: {
          show: false,
          route: '',
        },
        imagesAspectRatio: { mobile: '1/1', desktop: '1/1' },
        borderRadius: '0px',
        slidesPerView: {
          mobile: 1.5,
          desktop: 3,
        },
      },
    },
    button: {
      function: '',
    },
  },
  isActive: true,
  likelihoodIndex: 0,
};

// Define the initial state
const initialState: SearchPostSettingsState = {
  ...defaultSearchPostConfig,
  _id: '',
  _history: [],
  _historyIndex: -1,
};

// Thunks
export const createSearchPostWithSettings = createAsyncThunk<SearchPost, Omit<SearchPost, '_id'>>(
  'searchPostSettings/createSearchPost',
  async (searchPostData, thunkAPI) => {
    try {
      const response = await axios.post(SEARCH_POST_API_URL, searchPostData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to create search post');
    }
  }
);

export const updateSearchPostWithSettings = createAsyncThunk<
  SearchPost,
  { id: string; updates: Partial<SearchPost> }
>(
  'searchPostSettings/updateSearchPost',
  async ({ id, updates }, thunkAPI) => {
    try {
      const response = await axios.put(`${SEARCH_POST_API_URL}/${id}`, updates);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update search post');
    }
  }
);

const searchPostSettingsSlice = createSlice({
  name: 'searchPostSettings',
  initialState,
  reducers: {
    setInitialSearchPost: (state, action: PayloadAction<SearchPost>) => {
      const newState = action.payload as SearchPostSettingsState;
      // @ts-ignore
      state._history = [newState];
      state._historyIndex = 0;
      Object.assign(state, newState);
    },
    updateSetting: (
      state,
      action: PayloadAction<{ field: string; value: any; skipHistory?: boolean }>
    ) => {
      const { field, value, skipHistory } = action.payload;

      // Push current state to history before updating (unless skipped)
      if (!skipHistory) {
        const newHistory = state._history.slice(0, state._historyIndex + 1);
        const { _history, _historyIndex, ...currentState } = state;
        // @ts-ignore
        newHistory.push(currentState as SearchPost);
        state._history = newHistory;
        state._historyIndex = newHistory.length - 1;
      }

      const keys = field.split('.');
      let current: any = state;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = value;
        } else {
          current[key] = current[key] || {};
          current = current[key];
        }
      });
    },
    resetToDefault: () => {
      return {
        ...defaultSearchPostConfig,
        _id: '',
        _history: [],
        _historyIndex: -1,
      };
    },
    undo: (state) => {
      if (state._historyIndex > 0) {
        state._historyIndex -= 1;
        const previousState = state._history[state._historyIndex] as SearchPostSettingsState;
        const { _history, _historyIndex, ...rest } = previousState;
        Object.assign(state, rest);
      }
    },
    redo: (state) => {
      if (state._historyIndex < state._history.length - 1) {
        state._historyIndex += 1;
        const nextState = state._history[state._historyIndex] as SearchPostSettingsState;
        const { _history, _historyIndex, ...rest } = nextState;
        Object.assign(state, rest);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSearchPostWithSettings.fulfilled, (state, action) => {
        const searchPost = action.payload as SearchPostSettingsState;
        Object.assign(state, searchPost);
        // @ts-ignore
        state._history = [searchPost];
        state._historyIndex = 0;
      })
      .addCase(updateSearchPostWithSettings.fulfilled, (state, action) => {
        const searchPost = action.payload as SearchPostSettingsState;
        Object.assign(state, searchPost);
        // @ts-ignore
        state._history = [searchPost];
        state._historyIndex = 0;
      });
  },
});

export const { setInitialSearchPost, updateSetting, resetToDefault, undo, redo } =
  searchPostSettingsSlice.actions;

export default searchPostSettingsSlice.reducer;
