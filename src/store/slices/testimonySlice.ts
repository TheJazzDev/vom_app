import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchTestimoniesThunk,
  fetchTestimonyByIdThunk,
  createTestimonyThunk,
  updateTestimonyThunk,
  deleteTestimonyThunk,
  toggleTestimonyLikeThunk,
  fetchTestimonyCommentsThunk,
  addTestimonyCommentThunk,
  deleteTestimonyCommentThunk,
} from '../thunks/testimonyThunks';
import type {
  Testimony,
  TestimonyComment,
  TestimonyCategory,
} from '@/src/services/testimony';

interface TestimonyState {
  testimonies: Testimony[];
  currentTestimony: Testimony | null;
  comments: TestimonyComment[];
  userLikes: Record<string, boolean>; // testimonyId -> hasLiked
  selectedCategory: TestimonyCategory | null;

  // Loading states
  isLoadingTestimonies: boolean;
  isLoadingCurrentTestimony: boolean;
  isLoadingComments: boolean;
  isCreatingTestimony: boolean;
  isUpdatingTestimony: boolean;
  isDeletingTestimony: boolean;
  isTogglingLike: boolean;
  isAddingComment: boolean;
  isDeletingComment: boolean;

  // Error states
  error: string | null;
  successMessage: string | null;
}

const initialState: TestimonyState = {
  testimonies: [],
  currentTestimony: null,
  comments: [],
  userLikes: {},
  selectedCategory: null,

  isLoadingTestimonies: false,
  isLoadingCurrentTestimony: false,
  isLoadingComments: false,
  isCreatingTestimony: false,
  isUpdatingTestimony: false,
  isDeletingTestimony: false,
  isTogglingLike: false,
  isAddingComment: false,
  isDeletingComment: false,

  error: null,
  successMessage: null,
};

const testimonySlice = createSlice({
  name: 'testimony',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearCurrentTestimony: (state) => {
      state.currentTestimony = null;
      state.comments = [];
    },
    setSelectedCategory: (
      state,
      action: PayloadAction<TestimonyCategory | null>,
    ) => {
      state.selectedCategory = action.payload;
    },
    setUserLike: (
      state,
      action: PayloadAction<{ testimonyId: string; liked: boolean }>,
    ) => {
      state.userLikes[action.payload.testimonyId] = action.payload.liked;
    },
  },
  extraReducers: (builder) => {
    // Fetch testimonies
    builder
      .addCase(fetchTestimoniesThunk.pending, (state) => {
        state.isLoadingTestimonies = true;
        state.error = null;
      })
      .addCase(fetchTestimoniesThunk.fulfilled, (state, action) => {
        state.isLoadingTestimonies = false;
        state.testimonies = action.payload;
      })
      .addCase(fetchTestimoniesThunk.rejected, (state, action) => {
        state.isLoadingTestimonies = false;
        state.error = action.payload as string;
      });

    // Fetch testimony by ID
    builder
      .addCase(fetchTestimonyByIdThunk.pending, (state) => {
        state.isLoadingCurrentTestimony = true;
        state.error = null;
      })
      .addCase(fetchTestimonyByIdThunk.fulfilled, (state, action) => {
        state.isLoadingCurrentTestimony = false;
        state.currentTestimony = action.payload;
      })
      .addCase(fetchTestimonyByIdThunk.rejected, (state, action) => {
        state.isLoadingCurrentTestimony = false;
        state.error = action.payload as string;
      });

    // Create testimony
    builder
      .addCase(createTestimonyThunk.pending, (state) => {
        state.isCreatingTestimony = true;
        state.error = null;
      })
      .addCase(createTestimonyThunk.fulfilled, (state, action) => {
        state.isCreatingTestimony = false;
        state.testimonies.unshift(action.payload);
        state.successMessage = 'Testimony shared successfully! Praise God!';
      })
      .addCase(createTestimonyThunk.rejected, (state, action) => {
        state.isCreatingTestimony = false;
        state.error = action.payload as string;
      });

    // Update testimony
    builder
      .addCase(updateTestimonyThunk.pending, (state) => {
        state.isUpdatingTestimony = true;
        state.error = null;
      })
      .addCase(updateTestimonyThunk.fulfilled, (state, action) => {
        state.isUpdatingTestimony = false;
        const { testimonyId, updates } = action.payload;
        const index = state.testimonies.findIndex((t) => t.id === testimonyId);
        if (index !== -1) {
          state.testimonies[index] = {
            ...state.testimonies[index],
            ...updates,
          };
        }
        if (state.currentTestimony?.id === testimonyId) {
          state.currentTestimony = { ...state.currentTestimony, ...updates };
        }
        state.successMessage = 'Testimony updated successfully';
      })
      .addCase(updateTestimonyThunk.rejected, (state, action) => {
        state.isUpdatingTestimony = false;
        state.error = action.payload as string;
      });

    // Delete testimony
    builder
      .addCase(deleteTestimonyThunk.pending, (state) => {
        state.isDeletingTestimony = true;
        state.error = null;
      })
      .addCase(deleteTestimonyThunk.fulfilled, (state, action) => {
        state.isDeletingTestimony = false;
        state.testimonies = state.testimonies.filter(
          (t) => t.id !== action.payload,
        );
        state.successMessage = 'Testimony deleted successfully';
      })
      .addCase(deleteTestimonyThunk.rejected, (state, action) => {
        state.isDeletingTestimony = false;
        state.error = action.payload as string;
      });

    // Toggle like
    builder
      .addCase(toggleTestimonyLikeThunk.pending, (state) => {
        state.isTogglingLike = true;
      })
      .addCase(toggleTestimonyLikeThunk.fulfilled, (state, action) => {
        state.isTogglingLike = false;
        const { testimonyId, isLiked } = action.payload;
        state.userLikes[testimonyId] = isLiked;

        // Update likes count in testimonies list
        const index = state.testimonies.findIndex((t) => t.id === testimonyId);
        if (index !== -1) {
          state.testimonies[index].likesCount += isLiked ? 1 : -1;
        }

        // Update current testimony if it matches
        if (state.currentTestimony?.id === testimonyId) {
          state.currentTestimony.likesCount += isLiked ? 1 : -1;
        }
      })
      .addCase(toggleTestimonyLikeThunk.rejected, (state, action) => {
        state.isTogglingLike = false;
        state.error = action.payload as string;
      });

    // Fetch comments
    builder
      .addCase(fetchTestimonyCommentsThunk.pending, (state) => {
        state.isLoadingComments = true;
        state.error = null;
      })
      .addCase(fetchTestimonyCommentsThunk.fulfilled, (state, action) => {
        state.isLoadingComments = false;
        state.comments = action.payload;
      })
      .addCase(fetchTestimonyCommentsThunk.rejected, (state, action) => {
        state.isLoadingComments = false;
        state.error = action.payload as string;
      });

    // Add comment
    builder
      .addCase(addTestimonyCommentThunk.pending, (state) => {
        state.isAddingComment = true;
        state.error = null;
      })
      .addCase(addTestimonyCommentThunk.fulfilled, (state, action) => {
        state.isAddingComment = false;
        state.comments.unshift(action.payload);
        state.successMessage = 'Comment added successfully';

        // Update comment count
        if (state.currentTestimony) {
          state.currentTestimony.commentsCount += 1;
        }
      })
      .addCase(addTestimonyCommentThunk.rejected, (state, action) => {
        state.isAddingComment = false;
        state.error = action.payload as string;
      });

    // Delete comment
    builder
      .addCase(deleteTestimonyCommentThunk.pending, (state) => {
        state.isDeletingComment = true;
        state.error = null;
      })
      .addCase(deleteTestimonyCommentThunk.fulfilled, (state, action) => {
        state.isDeletingComment = false;
        state.comments = state.comments.filter((c) => c.id !== action.payload);
        state.successMessage = 'Comment deleted successfully';

        // Update comment count
        if (state.currentTestimony) {
          state.currentTestimony.commentsCount -= 1;
        }
      })
      .addCase(deleteTestimonyCommentThunk.rejected, (state, action) => {
        state.isDeletingComment = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  clearSuccessMessage,
  clearCurrentTestimony,
  setSelectedCategory,
  setUserLike,
} = testimonySlice.actions;

export function useTestimonySlice() {
  return useSelector(({ testimony }: RootState) => testimony);
}

export default testimonySlice.reducer;
