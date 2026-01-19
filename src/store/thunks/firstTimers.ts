import { getActiveFirstTimers } from '@/src/services/firstTimers';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchActiveFirstTimers = createAsyncThunk(
  'firstTimers/fetchActiveFirstTimers',
  async (_, { rejectWithValue }) => {
    try {
      const firstTimers = await getActiveFirstTimers();
      return firstTimers;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to fetch active first timers',
      );
    }
  },
);
