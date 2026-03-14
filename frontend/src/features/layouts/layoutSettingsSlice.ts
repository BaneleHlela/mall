import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Layout } from "../../types/layoutTypes"; 
import { defaultLayoutConfig } from '../../utils/defaults/defaultLayoutConfig';

// Extended state with history for undo/redo
interface LayoutSettingsState extends Layout {
  _history: Layout[];
  _historyIndex: number;
}

// Define the initial state using that type
//@ts-ignore
const initialState: LayoutSettingsState = {
  ...defaultLayoutConfig,
  _history: [],
  _historyIndex: -1,
};


const layoutSettingsSlice = createSlice({
  name: 'layoutSettings',
  initialState,
  reducers: {
    setInitialLayout: (state, action: PayloadAction<Layout>) => {
      const newState = action.payload as LayoutSettingsState;
      state._history = [newState];
      state._historyIndex = 0;
      Object.assign(state, newState);
    },
    updateSetting: (state, action: PayloadAction<{ field: string; value: any; skipHistory?: boolean }>) => {
      const {field, value, skipHistory} = action.payload;
      
      // Push current state to history before updating (unless skipped)
      if (!skipHistory) {
        // Remove any future states if we're not at the end of history
        const newHistory = state._history.slice(0, state._historyIndex + 1);
        // Clone current state (excluding internal history properties)
        const { _history, _historyIndex, ...currentState } = state;
        newHistory.push(currentState as Layout);
        state._history = newHistory;
        state._historyIndex = newHistory.length - 1;
      }

      const keys = field.split('.');
      let current: any = state;

      // Traverse and create missing objects
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          // Update the value on the last key
          current[key] = value;
        } else {
          // Ensure the current key is an object
          current[key] = current[key] || {};
          current = current[key];
        }
      })
    },
    undo: (state) => {
      if (state._historyIndex > 0) {
        state._historyIndex -= 1;
        const previousState = state._history[state._historyIndex] as LayoutSettingsState;
        // Restore all properties except history tracking
        const { _history, _historyIndex, ...rest } = previousState;
        Object.assign(state, rest);
      }
    },
    redo: (state) => {
      if (state._historyIndex < state._history.length - 1) {
        state._historyIndex += 1;
        const nextState = state._history[state._historyIndex] as LayoutSettingsState;
        // Restore all properties except history tracking
        const { _history, _historyIndex, ...rest } = nextState;
        Object.assign(state, rest);
      }
    },
    updateRouteOrder: (state, action) => {
      state.routeOrder = action.payload;
    },
  },
});

export const { updateSetting, setInitialLayout, updateRouteOrder, undo, redo } = layoutSettingsSlice.actions;
export default layoutSettingsSlice.reducer;
