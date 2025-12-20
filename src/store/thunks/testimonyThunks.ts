import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getTestimonies,
  getTestimonyById,
  createTestimony,
  updateTestimony,
  deleteTestimony,
  toggleTestimonyLike,
  hasUserLikedTestimony,
  getTestimonyComments,
  addTestimonyComment,
  deleteTestimonyComment,
  Testimony,
  TestimonyComment,
  TestimonyCategory,
  TestimonyStatus,
} from '@/src/services/testimony';

// Fetch testimonies
export const fetchTestimoniesThunk = createAsyncThunk<
  Testimony[],
  {
    limitCount?: number;
    category?: TestimonyCategory;
    userId?: string;
    status?: TestimonyStatus;
  } | undefined,
  { rejectValue: string }
>('testimony/fetchTestimonies', async (options, { rejectWithValue }) => {
  try {
    return await getTestimonies(options);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch testimonies');
  }
});

// Fetch testimony by ID
export const fetchTestimonyByIdThunk = createAsyncThunk<
  Testimony | null,
  { testimonyId: string; userId?: string },
  { rejectValue: string }
>('testimony/fetchById', async ({ testimonyId, userId }, { rejectWithValue, dispatch }) => {
  try {
    const testimony = await getTestimonyById(testimonyId);

    // Check if user has liked this testimony
    if (testimony && userId) {
      const hasLiked = await hasUserLikedTestimony(testimonyId, userId);
      dispatch({
        type: 'testimony/setUserLike',
        payload: { testimonyId, liked: hasLiked },
      });
    }

    return testimony;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch testimony');
  }
});

// Create testimony
export const createTestimonyThunk = createAsyncThunk<
  Testimony,
  Omit<Testimony, 'id' | 'likesCount' | 'commentsCount' | 'createdAt' | 'approvedAt'>,
  { rejectValue: string }
>('testimony/create', async (testimony, { rejectWithValue }) => {
  try {
    return await createTestimony(testimony);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to create testimony');
  }
});

// Update testimony
export const updateTestimonyThunk = createAsyncThunk<
  { testimonyId: string; updates: Partial<Testimony> },
  { testimonyId: string; updates: Partial<Testimony> },
  { rejectValue: string }
>('testimony/update', async ({ testimonyId, updates }, { rejectWithValue }) => {
  try {
    await updateTestimony(testimonyId, updates);
    return { testimonyId, updates };
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to update testimony');
  }
});

// Delete testimony
export const deleteTestimonyThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('testimony/delete', async (testimonyId, { rejectWithValue }) => {
  try {
    await deleteTestimony(testimonyId);
    return testimonyId;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to delete testimony');
  }
});

// Toggle like
export const toggleTestimonyLikeThunk = createAsyncThunk<
  { testimonyId: string; isLiked: boolean },
  { testimonyId: string; userId: string },
  { rejectValue: string }
>('testimony/toggleLike', async ({ testimonyId, userId }, { rejectWithValue }) => {
  try {
    const isLiked = await toggleTestimonyLike(testimonyId, userId);
    return { testimonyId, isLiked };
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to toggle like');
  }
});

// Fetch comments
export const fetchTestimonyCommentsThunk = createAsyncThunk<
  TestimonyComment[],
  string,
  { rejectValue: string }
>('testimony/fetchComments', async (testimonyId, { rejectWithValue }) => {
  try {
    return await getTestimonyComments(testimonyId);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch comments');
  }
});

// Add comment
export const addTestimonyCommentThunk = createAsyncThunk<
  TestimonyComment,
  {
    testimonyId: string;
    comment: Omit<TestimonyComment, 'id' | 'createdAt'>;
  },
  { rejectValue: string }
>('testimony/addComment', async ({ testimonyId, comment }, { rejectWithValue }) => {
  try {
    return await addTestimonyComment(testimonyId, comment);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to add comment');
  }
});

// Delete comment
export const deleteTestimonyCommentThunk = createAsyncThunk<
  string,
  { testimonyId: string; commentId: string },
  { rejectValue: string }
>('testimony/deleteComment', async ({ testimonyId, commentId }, { rejectWithValue }) => {
  try {
    await deleteTestimonyComment(testimonyId, commentId);
    return commentId;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to delete comment');
  }
});
