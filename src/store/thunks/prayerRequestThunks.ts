import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getPrayerRequests,
  getPrayerRequestById,
  createPrayerRequest,
  updatePrayerRequest,
  deletePrayerRequest,
  markAsPrayed,
  hasUserPrayed,
  getPrayerRequestComments,
  addPrayerRequestComment,
  deletePrayerRequestComment,
  markAsAnswered,
  PrayerRequest,
  PrayerRequestComment,
  PrayerRequestCategory,
  PrayerRequestStatus,
} from '@/src/services/prayerRequest';

// Fetch prayer requests
export const fetchPrayerRequestsThunk = createAsyncThunk<
  PrayerRequest[],
  {
    limitCount?: number;
    category?: PrayerRequestCategory;
    status?: PrayerRequestStatus;
    userId?: string;
  } | undefined,
  { rejectValue: string }
>('prayerRequest/fetchRequests', async (options, { rejectWithValue }) => {
  try {
    return await getPrayerRequests(options);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch prayer requests');
  }
});

// Fetch prayer request by ID
export const fetchPrayerRequestByIdThunk = createAsyncThunk<
  PrayerRequest | null,
  { requestId: string; userId?: string },
  { rejectValue: string }
>('prayerRequest/fetchById', async ({ requestId, userId }, { rejectWithValue, dispatch }) => {
  try {
    const request = await getPrayerRequestById(requestId);

    // Check if user has prayed for this request
    if (request && userId) {
      const hasPrayed = await hasUserPrayed(requestId, userId);
      dispatch({
        type: 'prayerRequest/setUserPrayed',
        payload: { requestId, prayed: hasPrayed },
      });
    }

    return request;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch prayer request');
  }
});

// Create prayer request
export const createPrayerRequestThunk = createAsyncThunk<
  PrayerRequest,
  Omit<PrayerRequest, 'id' | 'prayerCount' | 'commentsCount' | 'createdAt' | 'updatedAt'>,
  { rejectValue: string }
>('prayerRequest/create', async (request, { rejectWithValue }) => {
  try {
    return await createPrayerRequest(request);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to create prayer request');
  }
});

// Update prayer request
export const updatePrayerRequestThunk = createAsyncThunk<
  { requestId: string; updates: Partial<PrayerRequest> },
  { requestId: string; updates: Partial<PrayerRequest> },
  { rejectValue: string }
>('prayerRequest/update', async ({ requestId, updates }, { rejectWithValue }) => {
  try {
    await updatePrayerRequest(requestId, updates);
    return { requestId, updates };
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to update prayer request');
  }
});

// Delete prayer request
export const deletePrayerRequestThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('prayerRequest/delete', async (requestId, { rejectWithValue }) => {
  try {
    await deletePrayerRequest(requestId);
    return requestId;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to delete prayer request');
  }
});

// Toggle prayed
export const togglePrayedThunk = createAsyncThunk<
  { requestId: string; hasPrayed: boolean },
  { requestId: string; userId: string },
  { rejectValue: string }
>('prayerRequest/togglePrayed', async ({ requestId, userId }, { rejectWithValue }) => {
  try {
    const hasPrayed = await markAsPrayed(requestId, userId);
    return { requestId, hasPrayed };
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to mark as prayed');
  }
});

// Mark as answered
export const markAsAnsweredThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('prayerRequest/markAsAnswered', async (requestId, { rejectWithValue }) => {
  try {
    await markAsAnswered(requestId);
    return requestId;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to mark as answered');
  }
});

// Fetch comments
export const fetchPrayerRequestCommentsThunk = createAsyncThunk<
  PrayerRequestComment[],
  string,
  { rejectValue: string }
>('prayerRequest/fetchComments', async (requestId, { rejectWithValue }) => {
  try {
    return await getPrayerRequestComments(requestId);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch comments');
  }
});

// Add comment
export const addPrayerRequestCommentThunk = createAsyncThunk<
  PrayerRequestComment,
  {
    requestId: string;
    comment: Omit<PrayerRequestComment, 'id' | 'createdAt'>;
  },
  { rejectValue: string }
>('prayerRequest/addComment', async ({ requestId, comment }, { rejectWithValue }) => {
  try {
    return await addPrayerRequestComment(requestId, comment);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to add comment');
  }
});

// Delete comment
export const deletePrayerRequestCommentThunk = createAsyncThunk<
  string,
  { requestId: string; commentId: string },
  { rejectValue: string }
>('prayerRequest/deleteComment', async ({ requestId, commentId }, { rejectWithValue }) => {
  try {
    await deletePrayerRequestComment(requestId, commentId);
    return commentId;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to delete comment');
  }
});
