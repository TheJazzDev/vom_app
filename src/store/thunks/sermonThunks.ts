import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getSermons,
  getSermonById,
  getFeaturedSermons,
  getSermonSeries,
  Sermon,
  SermonSeries,
  SermonCategory,
} from '@/src/services/sermon';

// Fetch sermons
export const fetchSermonsThunk = createAsyncThunk<
  Sermon[],
  | {
      limitCount?: number;
      category?: SermonCategory;
      seriesId?: string;
    }
  | undefined,
  { rejectValue: string }
>('sermon/fetchSermons', async (options, { rejectWithValue }) => {
  try {
    return await getSermons(options);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch sermons');
  }
});

// Fetch sermon by ID
export const fetchSermonByIdThunk = createAsyncThunk<
  Sermon | null,
  string,
  { rejectValue: string }
>('sermon/fetchSermonById', async (sermonId, { rejectWithValue }) => {
  try {
    return await getSermonById(sermonId);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch sermon');
  }
});

// Fetch featured sermons
export const fetchFeaturedSermonsThunk = createAsyncThunk<
  Sermon[],
  number | undefined,
  { rejectValue: string }
>('sermon/fetchFeatured', async (limitCount, { rejectWithValue }) => {
  try {
    return await getFeaturedSermons(limitCount);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch featured sermons');
  }
});

// Fetch sermon series
export const fetchSermonSeriesThunk = createAsyncThunk<
  SermonSeries[],
  void,
  { rejectValue: string }
>('sermon/fetchSeries', async (_, { rejectWithValue }) => {
  try {
    return await getSermonSeries();
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch sermon series');
  }
});
