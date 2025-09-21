import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  // fetchCurrentProgramme,
  // fetchNextProgramme,
  fetchPastProgrammes,
  fetchProgrammeById,
  fetchProgrammeStats,
  fetchUpcomingProgrammes,
} from '../thunks/programme';

export interface ProgrammeStats {
  total: number;
  upcoming: number;
  past: number;
  drafts: number;
  thisMonth: number;
}

const initialState: ProgrammeState = {
  pastProgrammes: [],
  isPastProgrammesLoading: false,
  pastProgrammesError: null,

  upcomingProgrammes: [],
  isUpcomingProgrammesLoading: false,
  upcomingProgrammesError: null,

  // currentProgramme: null,
  // isCurrentProgrammeLoading: false,
  // currentProgrammeError: null,

  // nextProgramme: null,
  // isNextProgrammeLoading: false,
  // nextProgrammeError: null,

  programmeById: null,
  isProgrammeByIdLoading: false,
  programmeByIdError: null,

  stats: null,
  isStatsLoading: false,
  statsError: null,

  pastProgrammesLastFetch: null,
  upcomingProgrammesLastFetch: null,
  // currentProgrammeLastFetch: null,
  // nextProgrammeLastFetch: null,
  statsLastFetch: null,
};

const programmeSlice = createSlice({
  name: 'programme',
  initialState,
  reducers: {
    clearProgrammeById: (state) => {
      state.programmeById = null;
      state.programmeByIdError = null;
    },
    // clearNextProgramme: (state) => {
    //   state.nextProgramme = null;
    //   state.nextProgrammeError = null;
    // },
    clearErrors: (state) => {
      state.pastProgrammesError = null;
      state.upcomingProgrammesError = null;
      // state.currentProgrammeError = null;
      // state.nextProgrammeError = null;
      state.programmeByIdError = null;
      state.statsError = null;
    },
    // Action to manually invalidate cache
    invalidateCache: (state) => {
      state.pastProgrammesLastFetch = null;
      state.upcomingProgrammesLastFetch = null;
      // state.currentProgrammeLastFetch = null;
      // state.nextProgrammeLastFetch = null;
      state.statsLastFetch = null;
    },
  },
  extraReducers: (builder) => {
    // Past Programmes
    builder
      .addCase(fetchPastProgrammes.pending, (state) => {
        state.isPastProgrammesLoading = true;
        state.pastProgrammesError = null;
      })
      .addCase(fetchPastProgrammes.fulfilled, (state, action) => {
        state.isPastProgrammesLoading = false;
        state.pastProgrammes = action.payload;
        state.pastProgrammesLastFetch = Date.now();
      })
      .addCase(fetchPastProgrammes.rejected, (state, action) => {
        state.isPastProgrammesLoading = false;
        state.pastProgrammesError = action.payload as string;
      })

      // Upcoming Programmes
      .addCase(fetchUpcomingProgrammes.pending, (state) => {
        state.isUpcomingProgrammesLoading = true;
        state.upcomingProgrammesError = null;
      })
      .addCase(fetchUpcomingProgrammes.fulfilled, (state, action) => {
        state.isUpcomingProgrammesLoading = false;
        state.upcomingProgrammes = action.payload;
        state.upcomingProgrammesLastFetch = Date.now();
      })
      .addCase(fetchUpcomingProgrammes.rejected, (state, action) => {
        state.isUpcomingProgrammesLoading = false;
        state.upcomingProgrammesError = action.payload as string;
      })

      // Current Programme
      // .addCase(fetchCurrentProgramme.pending, (state) => {
      //   state.isCurrentProgrammeLoading = true;
      //   state.currentProgrammeError = null;
      // })
      // .addCase(fetchCurrentProgramme.fulfilled, (state, action) => {
      //   state.isCurrentProgrammeLoading = false;
      //   state.currentProgramme = action.payload;
      //   state.currentProgrammeLastFetch = Date.now();
      // })
      // .addCase(fetchCurrentProgramme.rejected, (state, action) => {
      //   state.isCurrentProgrammeLoading = false;
      //   state.currentProgrammeError = action.payload as string;
      // })

      // // Next Programme
      // .addCase(fetchNextProgramme.pending, (state) => {
      //   state.isNextProgrammeLoading = true;
      //   state.nextProgrammeError = null;
      // })
      // .addCase(fetchNextProgramme.fulfilled, (state, action) => {
      //   state.isNextProgrammeLoading = false;
      //   state.nextProgramme = action.payload;
      //   state.nextProgrammeLastFetch = Date.now();
      // })
      // .addCase(fetchNextProgramme.rejected, (state, action) => {
      //   state.isNextProgrammeLoading = false;
      //   state.nextProgrammeError = action.payload as string;
      // })

      // Single Programme by ID
      .addCase(fetchProgrammeById.pending, (state) => {
        state.isProgrammeByIdLoading = true;
        state.programmeByIdError = null;
      })
      .addCase(fetchProgrammeById.fulfilled, (state, action) => {
        state.isProgrammeByIdLoading = false;
        state.programmeById = action.payload;
      })
      .addCase(fetchProgrammeById.rejected, (state, action) => {
        state.isProgrammeByIdLoading = false;
        state.programmeByIdError = action.payload as string;
      })

      // Programme Stats
      .addCase(fetchProgrammeStats.pending, (state) => {
        state.isStatsLoading = true;
        state.statsError = null;
      })
      .addCase(fetchProgrammeStats.fulfilled, (state, action) => {
        state.isStatsLoading = false;
        state.stats = action.payload;
        state.statsLastFetch = Date.now();
      })
      .addCase(fetchProgrammeStats.rejected, (state, action) => {
        state.isStatsLoading = false;
        state.statsError = action.payload as string;
      });
  },
});

// Selector hook for easy state access
export function useProgrammeSlice() {
  const state = useSelector((state: RootState) => state.programme);

  return {
    ...state,
    ...programmeSlice.actions,
  };
}

export default programmeSlice.reducer;
