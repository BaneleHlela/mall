import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface RangeState {
  range: number; // in km
  isOpen: boolean;
}

const initialState: RangeState = {
  range: 15, // default 15km
  isOpen: false,
};

const rangeSlice = createSlice({
  name: 'range',
  initialState,
  reducers: {
    openRangeModal: (state) => {
      state.isOpen = true;
    },
    closeRangeModal: (state) => {
      state.isOpen = false;
    },
    setRange: (state, action: PayloadAction<number>) => {
      state.range = action.payload;
    },
  },
});

export const { openRangeModal, closeRangeModal, setRange } = rangeSlice.actions;

export default rangeSlice.reducer;