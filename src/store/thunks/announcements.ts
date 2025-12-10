import {
  getAnnouncementById,
  getAnnouncements,
  getAnnouncementStats,
} from '@/src/services/announcements';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAnnouncements = createAsyncThunk(
  'announcements/fetchAnnouncements',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching announcements...');
      const announcements = await getAnnouncements();
      console.log('Announcements fetched successfully:', announcements.length);
      return announcements;
    } catch (error) {
      console.error('fetchAnnouncements thunk error:', error);
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch announcements',
      );
    }
  },
);

export const fetchAnnouncementById = createAsyncThunk(
  'announcements/fetchAnnouncementById',
  async (id: string, { rejectWithValue }) => {
    try {
      const announcement = await getAnnouncementById(id);
      return announcement;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch announcement',
      );
    }
  },
);

export const fetchAnnouncementStats = createAsyncThunk(
  'announcements/fetchAnnouncementStats',
  async (_, { rejectWithValue }) => {
    try {
      const stats = await getAnnouncementStats();
      return stats;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to fetch announcement stats',
      );
    }
  },
);
