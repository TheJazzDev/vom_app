import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchDailyPrayersThunk,
  fetchTodaysPrayerThunk,
  fetchDailyPrayerByIdThunk,
  toggleDailyPrayerLikeThunk,
  fetchDailyPrayerCommentsThunk,
  addDailyPrayerCommentThunk,
  deleteDailyPrayerCommentThunk,
} from '../thunks/dailyPrayerThunks';
import type { DailyPrayer, DailyPrayerComment } from '@/src/services/dailyPrayer';

interface DailyPrayerState {
  prayers: DailyPrayer[];
  todaysPrayer: DailyPrayer | null;
  currentPrayer: DailyPrayer | null;
  comments: DailyPrayerComment[];
  userLikes: Record<string, boolean>; // prayerId -> hasLiked

  // Loading states
  isLoadingPrayers: boolean;
  isLoadingTodaysPrayer: boolean;
  isLoadingCurrentPrayer: boolean;
  isLoadingComments: boolean;
  isTogglingLike: boolean;
  isAddingComment: boolean;
  isDeletingComment: boolean;

  // Error states
  error: string | null;
  successMessage: string | null;
}

const initialState: DailyPrayerState = {
  prayers: [],
  todaysPrayer: null,
  currentPrayer: null,
  comments: [],
  userLikes: {},

  isLoadingPrayers: false,
  isLoadingTodaysPrayer: false,
  isLoadingCurrentPrayer: false,
  isLoadingComments: false,
  isTogglingLike: false,
  isAddingComment: false,
  isDeletingComment: false,

  error: null,
  successMessage: null,
};

const dailyPrayerSlice = createSlice({
  name: 'dailyPrayer',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearCurrentPrayer: (state) => {
      state.currentPrayer = null;
      state.comments = [];
    },
    setUserLike: (state, action: PayloadAction<{ prayerId: string; liked: boolean }>) => {
      state.userLikes[action.payload.prayerId] = action.payload.liked;
    },
  },
  extraReducers: (builder) => {
    // Fetch daily prayers
    builder
      .addCase(fetchDailyPrayersThunk.pending, (state) => {
        state.isLoadingPrayers = true;
        state.error = null;
      })
      .addCase(fetchDailyPrayersThunk.fulfilled, (state, action) => {
        state.isLoadingPrayers = false;
        state.prayers = action.payload;
      })
      .addCase(fetchDailyPrayersThunk.rejected, (state, action) => {
        state.isLoadingPrayers = false;
        state.error = action.payload as string;
      });

    // Fetch today's prayer
    builder
      .addCase(fetchTodaysPrayerThunk.pending, (state) => {
        state.isLoadingTodaysPrayer = true;
        state.error = null;
      })
      .addCase(fetchTodaysPrayerThunk.fulfilled, (state, action) => {
        state.isLoadingTodaysPrayer = false;
        state.todaysPrayer = action.payload;
      })
      .addCase(fetchTodaysPrayerThunk.rejected, (state, action) => {
        state.isLoadingTodaysPrayer = false;
        state.error = action.payload as string;
      });

    // Fetch prayer by ID
    builder
      .addCase(fetchDailyPrayerByIdThunk.pending, (state) => {
        state.isLoadingCurrentPrayer = true;
        state.error = null;
      })
      .addCase(fetchDailyPrayerByIdThunk.fulfilled, (state, action) => {
        state.isLoadingCurrentPrayer = false;
        state.currentPrayer = action.payload;
      })
      .addCase(fetchDailyPrayerByIdThunk.rejected, (state, action) => {
        state.isLoadingCurrentPrayer = false;
        state.error = action.payload as string;
      });

    // Toggle like
    builder
      .addCase(toggleDailyPrayerLikeThunk.pending, (state) => {
        state.isTogglingLike = true;
      })
      .addCase(toggleDailyPrayerLikeThunk.fulfilled, (state, action) => {
        state.isTogglingLike = false;
        const { prayerId, isLiked } = action.payload;
        state.userLikes[prayerId] = isLiked;

        // Update like count in prayers list
        const prayerIndex = state.prayers.findIndex((p) => p.id === prayerId);
        if (prayerIndex !== -1) {
          state.prayers[prayerIndex].likesCount += isLiked ? 1 : -1;
        }

        // Update today's prayer if it matches
        if (state.todaysPrayer?.id === prayerId) {
          state.todaysPrayer.likesCount += isLiked ? 1 : -1;
        }

        // Update current prayer if it matches
        if (state.currentPrayer?.id === prayerId) {
          state.currentPrayer.likesCount += isLiked ? 1 : -1;
        }
      })
      .addCase(toggleDailyPrayerLikeThunk.rejected, (state, action) => {
        state.isTogglingLike = false;
        state.error = action.payload as string;
      });

    // Fetch comments
    builder
      .addCase(fetchDailyPrayerCommentsThunk.pending, (state) => {
        state.isLoadingComments = true;
        state.error = null;
      })
      .addCase(fetchDailyPrayerCommentsThunk.fulfilled, (state, action) => {
        state.isLoadingComments = false;
        state.comments = action.payload;
      })
      .addCase(fetchDailyPrayerCommentsThunk.rejected, (state, action) => {
        state.isLoadingComments = false;
        state.error = action.payload as string;
      });

    // Add comment
    builder
      .addCase(addDailyPrayerCommentThunk.pending, (state) => {
        state.isAddingComment = true;
        state.error = null;
      })
      .addCase(addDailyPrayerCommentThunk.fulfilled, (state, action) => {
        state.isAddingComment = false;
        state.comments.unshift(action.payload);
        state.successMessage = 'Comment added successfully';

        // Update comment count
        if (state.currentPrayer) {
          state.currentPrayer.commentsCount += 1;
        }
      })
      .addCase(addDailyPrayerCommentThunk.rejected, (state, action) => {
        state.isAddingComment = false;
        state.error = action.payload as string;
      });

    // Delete comment
    builder
      .addCase(deleteDailyPrayerCommentThunk.pending, (state) => {
        state.isDeletingComment = true;
        state.error = null;
      })
      .addCase(deleteDailyPrayerCommentThunk.fulfilled, (state, action) => {
        state.isDeletingComment = false;
        state.comments = state.comments.filter((c) => c.id !== action.payload);
        state.successMessage = 'Comment deleted successfully';

        // Update comment count
        if (state.currentPrayer) {
          state.currentPrayer.commentsCount -= 1;
        }
      })
      .addCase(deleteDailyPrayerCommentThunk.rejected, (state, action) => {
        state.isDeletingComment = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  clearSuccessMessage,
  clearCurrentPrayer,
  setUserLike,
} = dailyPrayerSlice.actions;

export function useDailyPrayerSlice() {
  return useSelector(({ dailyPrayer }: RootState) => dailyPrayer);
}

export default dailyPrayerSlice.reducer;
