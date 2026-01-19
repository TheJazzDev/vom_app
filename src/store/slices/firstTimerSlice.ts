import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchActiveFirstTimers } from '../thunks/firstTimers';

const initialState: FirstTimerState = {
  activeFirstTimers: [],
  isLoading: false,
  error: null,
  lastFetch: null,
};

const firstTimerSlice = createSlice({
  name: 'firstTimers',
  initialState,
  reducers: {
    clearFirstTimers: (state) => {
      state.activeFirstTimers = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    invalidateCache: (state) => {
      state.lastFetch = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Active First Timers
      .addCase(fetchActiveFirstTimers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchActiveFirstTimers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activeFirstTimers = action.payload;
        state.lastFetch = Date.now();
      })
      .addCase(fetchActiveFirstTimers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export function useFirstTimerSlice() {
  const state = useSelector((state: RootState) => state.firstTimers);

  return {
    ...state,
    ...firstTimerSlice.actions,
  };
}

export default firstTimerSlice.reducer;
