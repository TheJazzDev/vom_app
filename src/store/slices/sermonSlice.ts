import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchSermonsThunk,
  fetchSermonByIdThunk,
  fetchFeaturedSermonsThunk,
  fetchSermonSeriesThunk,
} from '../thunks/sermonThunks';
import type { Sermon, SermonSeries, SermonCategory } from '@/src/services/sermon';

interface SermonState {
  sermons: Sermon[];
  featuredSermons: Sermon[];
  currentSermon: Sermon | null;
  series: SermonSeries[];
  selectedCategory: SermonCategory | null;

  // Loading states
  isLoadingSermons: boolean;
  isLoadingCurrentSermon: boolean;
  isLoadingFeatured: boolean;
  isLoadingSeries: boolean;

  // Error states
  error: string | null;
}

const initialState: SermonState = {
  sermons: [],
  featuredSermons: [],
  currentSermon: null,
  series: [],
  selectedCategory: null,

  isLoadingSermons: false,
  isLoadingCurrentSermon: false,
  isLoadingFeatured: false,
  isLoadingSeries: false,

  error: null,
};

const sermonSlice = createSlice({
  name: 'sermon',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentSermon: (state) => {
      state.currentSermon = null;
    },
    setSelectedCategory: (state, action: PayloadAction<SermonCategory | null>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch sermons
    builder
      .addCase(fetchSermonsThunk.pending, (state) => {
        state.isLoadingSermons = true;
        state.error = null;
      })
      .addCase(fetchSermonsThunk.fulfilled, (state, action) => {
        state.isLoadingSermons = false;
        state.sermons = action.payload;
      })
      .addCase(fetchSermonsThunk.rejected, (state, action) => {
        state.isLoadingSermons = false;
        state.error = action.payload as string;
      });

    // Fetch sermon by ID
    builder
      .addCase(fetchSermonByIdThunk.pending, (state) => {
        state.isLoadingCurrentSermon = true;
        state.error = null;
      })
      .addCase(fetchSermonByIdThunk.fulfilled, (state, action) => {
        state.isLoadingCurrentSermon = false;
        state.currentSermon = action.payload;
      })
      .addCase(fetchSermonByIdThunk.rejected, (state, action) => {
        state.isLoadingCurrentSermon = false;
        state.error = action.payload as string;
      });

    // Fetch featured sermons
    builder
      .addCase(fetchFeaturedSermonsThunk.pending, (state) => {
        state.isLoadingFeatured = true;
        state.error = null;
      })
      .addCase(fetchFeaturedSermonsThunk.fulfilled, (state, action) => {
        state.isLoadingFeatured = false;
        state.featuredSermons = action.payload;
      })
      .addCase(fetchFeaturedSermonsThunk.rejected, (state, action) => {
        state.isLoadingFeatured = false;
        state.error = action.payload as string;
      });

    // Fetch sermon series
    builder
      .addCase(fetchSermonSeriesThunk.pending, (state) => {
        state.isLoadingSeries = true;
        state.error = null;
      })
      .addCase(fetchSermonSeriesThunk.fulfilled, (state, action) => {
        state.isLoadingSeries = false;
        state.series = action.payload;
      })
      .addCase(fetchSermonSeriesThunk.rejected, (state, action) => {
        state.isLoadingSeries = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  clearCurrentSermon,
  setSelectedCategory,
} = sermonSlice.actions;

export function useSermonSlice() {
  return useSelector(({ sermon }: RootState) => sermon);
}

export default sermonSlice.reducer;
