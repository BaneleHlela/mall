import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Layout, Menubar } from "../../types/layoutTypes"; 
import { defaultLayoutConfig } from '../../utils/defaults/defaultLayoutConfig';



// Define the initial state using that type
const initialState: Layout = {
  ...defaultLayoutConfig
};

const layoutSettingsSlice = createSlice({
  name: 'layoutSettings',
  initialState,
  reducers: {
    setInitialLayout: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateSetting: (state, action: PayloadAction<{ field: string; value: any }>) => {
      const {field, value} = action.payload;
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
    }
  },
});

export const { updateSetting, setInitialLayout } = layoutSettingsSlice.actions;
export default layoutSettingsSlice.reducer;
