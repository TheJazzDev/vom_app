import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDailyPrayers,
  getTodaysPrayer,
  getDailyPrayerById,
  toggleDailyPrayerLike,
  hasUserLikedPrayer,
  getDailyPrayerComments,
  addDailyPrayerComment,
  deleteDailyPrayerComment,
  DailyPrayer,
  DailyPrayerComment,
} from '@/src/services/dailyPrayer';

// Fetch all daily prayers
export const fetchDailyPrayersThunk = createAsyncThunk<
  DailyPrayer[],
  number | undefined,
  { rejectValue: string }
>('dailyPrayer/fetchPrayers', async (limitCount, { rejectWithValue }) => {
  try {
    return await getDailyPrayers(limitCount);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch daily prayers');
  }
});

// Fetch today's prayer
export const fetchTodaysPrayerThunk = createAsyncThunk<
  DailyPrayer | null,
  void,
  { rejectValue: string }
>('dailyPrayer/fetchTodaysPrayer', async (_, { rejectWithValue }) => {
  try {
    return await getTodaysPrayer();
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch today\'s prayer');
  }
});

// Fetch prayer by ID with like status
export const fetchDailyPrayerByIdThunk = createAsyncThunk<
  DailyPrayer | null,
  { prayerId: string; userId?: string },
  { rejectValue: string }
>('dailyPrayer/fetchById', async ({ prayerId, userId }, { rejectWithValue, dispatch }) => {
  try {
    const prayer = await getDailyPrayerById(prayerId);

    // Check if user has liked this prayer
    if (prayer && userId) {
      const hasLiked = await hasUserLikedPrayer(prayerId, userId);
      dispatch({
        type: 'dailyPrayer/setUserLike',
        payload: { prayerId, liked: hasLiked },
      });
    }

    return prayer;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch prayer');
  }
});

// Toggle like
export const toggleDailyPrayerLikeThunk = createAsyncThunk<
  { prayerId: string; isLiked: boolean },
  { prayerId: string; userId: string },
  { rejectValue: string }
>('dailyPrayer/toggleLike', async ({ prayerId, userId }, { rejectWithValue }) => {
  try {
    const isLiked = await toggleDailyPrayerLike(prayerId, userId);
    return { prayerId, isLiked };
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to toggle like');
  }
});

// Fetch comments
export const fetchDailyPrayerCommentsThunk = createAsyncThunk<
  DailyPrayerComment[],
  string,
  { rejectValue: string }
>('dailyPrayer/fetchComments', async (prayerId, { rejectWithValue }) => {
  try {
    return await getDailyPrayerComments(prayerId);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch comments');
  }
});

// Add comment
export const addDailyPrayerCommentThunk = createAsyncThunk<
  DailyPrayerComment,
  {
    prayerId: string;
    comment: Omit<DailyPrayerComment, 'id' | 'createdAt'>;
  },
  { rejectValue: string }
>('dailyPrayer/addComment', async ({ prayerId, comment }, { rejectWithValue }) => {
  try {
    return await addDailyPrayerComment(prayerId, comment);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to add comment');
  }
});

// Delete comment
export const deleteDailyPrayerCommentThunk = createAsyncThunk<
  string,
  { prayerId: string; commentId: string },
  { rejectValue: string }
>('dailyPrayer/deleteComment', async ({ prayerId, commentId }, { rejectWithValue }) => {
  try {
    await deleteDailyPrayerComment(prayerId, commentId);
    return commentId;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to delete comment');
  }
});
