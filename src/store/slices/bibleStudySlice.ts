import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchBibleStudySessionsThunk,
  fetchBibleStudySessionByIdThunk,
  fetchUpcomingBibleStudySessionsThunk,
  fetchBibleStudyTopicsThunk,
} from '../thunks/bibleStudyThunks';
import type { BibleStudySession, BibleStudyTopic, BibleStudyType } from '@/src/services/bibleStudy';
import { DEFAULT_BIBLE_STUDY_TOPICS } from '@/src/services/bibleStudy';

interface BibleStudyState {
  sessions: BibleStudySession[];
  upcomingSessions: BibleStudySession[];
  currentSession: BibleStudySession | null;
  topics: BibleStudyTopic[];
  selectedType: BibleStudyType | null;

  // Loading states
  isLoadingSessions: boolean;
  isLoadingCurrentSession: boolean;
  isLoadingUpcoming: boolean;
  isLoadingTopics: boolean;

  // Error states
  error: string | null;
}

const initialState: BibleStudyState = {
  sessions: [],
  upcomingSessions: [],
  currentSession: null,
  topics: DEFAULT_BIBLE_STUDY_TOPICS,
  selectedType: null,

  isLoadingSessions: false,
  isLoadingCurrentSession: false,
  isLoadingUpcoming: false,
  isLoadingTopics: false,

  error: null,
};

const bibleStudySlice = createSlice({
  name: 'bibleStudy',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentSession: (state) => {
      state.currentSession = null;
    },
    setSelectedType: (state, action: PayloadAction<BibleStudyType | null>) => {
      state.selectedType = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Bible study sessions
    builder
      .addCase(fetchBibleStudySessionsThunk.pending, (state) => {
        state.isLoadingSessions = true;
        state.error = null;
      })
      .addCase(fetchBibleStudySessionsThunk.fulfilled, (state, action) => {
        state.isLoadingSessions = false;
        state.sessions = action.payload;
      })
      .addCase(fetchBibleStudySessionsThunk.rejected, (state, action) => {
        state.isLoadingSessions = false;
        state.error = action.payload as string;
      });

    // Fetch Bible study session by ID
    builder
      .addCase(fetchBibleStudySessionByIdThunk.pending, (state) => {
        state.isLoadingCurrentSession = true;
        state.error = null;
      })
      .addCase(fetchBibleStudySessionByIdThunk.fulfilled, (state, action) => {
        state.isLoadingCurrentSession = false;
        state.currentSession = action.payload;
      })
      .addCase(fetchBibleStudySessionByIdThunk.rejected, (state, action) => {
        state.isLoadingCurrentSession = false;
        state.error = action.payload as string;
      });

    // Fetch upcoming sessions
    builder
      .addCase(fetchUpcomingBibleStudySessionsThunk.pending, (state) => {
        state.isLoadingUpcoming = true;
        state.error = null;
      })
      .addCase(fetchUpcomingBibleStudySessionsThunk.fulfilled, (state, action) => {
        state.isLoadingUpcoming = false;
        state.upcomingSessions = action.payload;
      })
      .addCase(fetchUpcomingBibleStudySessionsThunk.rejected, (state, action) => {
        state.isLoadingUpcoming = false;
        state.error = action.payload as string;
      });

    // Fetch topics
    builder
      .addCase(fetchBibleStudyTopicsThunk.pending, (state) => {
        state.isLoadingTopics = true;
        state.error = null;
      })
      .addCase(fetchBibleStudyTopicsThunk.fulfilled, (state, action) => {
        state.isLoadingTopics = false;
        state.topics = action.payload.length > 0 ? action.payload : DEFAULT_BIBLE_STUDY_TOPICS;
      })
      .addCase(fetchBibleStudyTopicsThunk.rejected, (state, action) => {
        state.isLoadingTopics = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  clearCurrentSession,
  setSelectedType,
} = bibleStudySlice.actions;

export function useBibleStudySlice() {
  return useSelector(({ bibleStudy }: RootState) => bibleStudy);
}

export default bibleStudySlice.reducer;
