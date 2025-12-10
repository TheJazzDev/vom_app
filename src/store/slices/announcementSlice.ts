import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchAnnouncementById,
  fetchAnnouncements,
  fetchAnnouncementStats,
} from '../thunks/announcements';

const initialState: AnnouncementState = {
  announcements: [],
  isAnnouncementsLoading: false,
  announcementsError: null,

  announcementById: null,
  isAnnouncementByIdLoading: false,
  announcementByIdError: null,

  stats: null,
  isStatsLoading: false,
  statsError: null,

  announcementsLastFetch: null,
  statsLastFetch: null,
};

const announcementSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {
    clearAnnouncementById: (state) => {
      state.announcementById = null;
      state.announcementByIdError = null;
    },
    clearErrors: (state) => {
      state.announcementsError = null;
      state.announcementByIdError = null;
      state.statsError = null;
    },
    invalidateCache: (state) => {
      state.announcementsLastFetch = null;
      state.statsLastFetch = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Announcements
      .addCase(fetchAnnouncements.pending, (state) => {
        state.isAnnouncementsLoading = true;
        state.announcementsError = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.isAnnouncementsLoading = false;
        state.announcements = action.payload;
        state.announcementsLastFetch = Date.now();
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.isAnnouncementsLoading = false;
        state.announcementsError = action.payload as string;
      })

      // Fetch Announcement By ID
      .addCase(fetchAnnouncementById.pending, (state) => {
        state.isAnnouncementByIdLoading = true;
        state.announcementByIdError = null;
      })
      .addCase(fetchAnnouncementById.fulfilled, (state, action) => {
        state.isAnnouncementByIdLoading = false;
        state.announcementById = action.payload;
      })
      .addCase(fetchAnnouncementById.rejected, (state, action) => {
        state.isAnnouncementByIdLoading = false;
        state.announcementByIdError = action.payload as string;
      })

      // Fetch Announcement Stats
      .addCase(fetchAnnouncementStats.pending, (state) => {
        state.isStatsLoading = true;
        state.statsError = null;
      })
      .addCase(fetchAnnouncementStats.fulfilled, (state, action) => {
        state.isStatsLoading = false;
        state.stats = action.payload;
        state.statsLastFetch = Date.now();
      })
      .addCase(fetchAnnouncementStats.rejected, (state, action) => {
        state.isStatsLoading = false;
        state.statsError = action.payload as string;
      });
  },
});

export function useAnnouncementSlice() {
  const state = useSelector((state: RootState) => state.announcements);

  return {
    ...state,
    ...announcementSlice.actions,
  };
}

export default announcementSlice.reducer;
