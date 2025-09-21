import {
  getPastProgrammes,
  getProgrammeById,
  getProgrammeStats,
  getUpcomingProgrammes,
} from '@/src/services/programme';

import { getCurrentProgramme } from '@/src/services/programme/getCurrentProgramme';
import { getNextProgramme } from '@/src/services/programme/getNextProgramme';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks
export const fetchPastProgrammes = createAsyncThunk(
  'programme/fetctPastProgrammes',
  async (_, { rejectWithValue }) => {
    try {
      const programmes = await getPastProgrammes();
      return programmes;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to fetch past programmes',
      );
    }
  },
);

export const fetchUpcomingProgrammes = createAsyncThunk(
  'programme/fetctUpcomingProgrammes',
  async (_, { rejectWithValue }) => {
    try {
      const programmes = await getUpcomingProgrammes();
      return programmes;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to fetch upcoming programmes',
      );
    }
  },
);

export const fetchProgrammeById = createAsyncThunk(
  'programme/fetctProgrammeById',
  async (id: string, { rejectWithValue }) => {
    try {
      const programme = await getProgrammeById(id);
      return programme;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch programme',
      );
    }
  },
);

export const fetchProgrammeStats = createAsyncThunk(
  'programme/fetctProgrammeStats',
  async (_, { rejectWithValue }) => {
    try {
      const stats = await getProgrammeStats();
      return stats;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to fetch programme stats',
      );
    }
  },
);

export const fetchCurrentProgramme = createAsyncThunk(
  'programme/fetchCurrentProgramme',
  async (_, { rejectWithValue }) => {
    try {
      const currentProgramme = await getCurrentProgramme();
      return currentProgramme;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Failed to fetch current programme',
      );
    }
  },
);

export const fetchNextProgramme = createAsyncThunk(
  'programme/fetchNextProgramme',
  async (_, { rejectWithValue }) => {
    try {
      const nextProgramme = await getNextProgramme();
      return nextProgramme;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch next programme');
    }
  },
);

// // Smart thunk that only fetches if data is stale (older than 5 minutes)
// export const fetctPastProgrammesIfNeeded = createAsyncThunk(
//   'programme/fetctPastProgrammesIfNeeded',
//   async (_, { getState, dispatch }) => {
//     const state = getState() as RootState;
//     const { pastProgrammesLastFetch, isPastProgrammesLoading } =
//       state.programme;

//     const now = Date.now();
//     const fiveMinutes = 5 * 60 * 1000;

//     // Don't fetch if already loading or data is fresh
//     if (isPastProgrammesLoading) return;
//     if (pastProgrammesLastFetch && now - pastProgrammesLastFetch < fiveMinutes)
//       return;

//     return dispatch(fetchPastProgrammes());
//   },
// );

// export const fetchUpcomingProgrammesIfNeeded = createAsyncThunk(
//   'programme/fetctUpcomingProgrammesIfNeeded',
//   async (_, { getState, dispatch }) => {
//     const state = getState() as RootState;
//     const { upcomingProgrammesLastFetch, isUpcomingProgrammesLoading } =
//       state.programme;

//     const now = Date.now();
//     const fiveMinutes = 5 * 60 * 1000;

//     if (isUpcomingProgrammesLoading) return;
//     if (
//       upcomingProgrammesLastFetch &&
//       now - upcomingProgrammesLastFetch < fiveMinutes
//     )
//       return;

//     return dispatch(fetchUpcomingProgrammes());
//   },
// );
