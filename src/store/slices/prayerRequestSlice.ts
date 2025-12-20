import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchPrayerRequestsThunk,
  fetchPrayerRequestByIdThunk,
  createPrayerRequestThunk,
  updatePrayerRequestThunk,
  deletePrayerRequestThunk,
  togglePrayedThunk,
  markAsAnsweredThunk,
  fetchPrayerRequestCommentsThunk,
  addPrayerRequestCommentThunk,
  deletePrayerRequestCommentThunk,
} from '../thunks/prayerRequestThunks';
import type { PrayerRequest, PrayerRequestComment, PrayerRequestCategory } from '@/src/services/prayerRequest';

interface PrayerRequestState {
  requests: PrayerRequest[];
  currentRequest: PrayerRequest | null;
  comments: PrayerRequestComment[];
  userPrayed: Record<string, boolean>; // requestId -> hasPrayed
  selectedCategory: PrayerRequestCategory | null;

  // Loading states
  isLoadingRequests: boolean;
  isLoadingCurrentRequest: boolean;
  isLoadingComments: boolean;
  isCreatingRequest: boolean;
  isUpdatingRequest: boolean;
  isDeletingRequest: boolean;
  isTogglingPrayed: boolean;
  isMarkingAnswered: boolean;
  isAddingComment: boolean;
  isDeletingComment: boolean;

  // Error states
  error: string | null;
  successMessage: string | null;
}

const initialState: PrayerRequestState = {
  requests: [],
  currentRequest: null,
  comments: [],
  userPrayed: {},
  selectedCategory: null,

  isLoadingRequests: false,
  isLoadingCurrentRequest: false,
  isLoadingComments: false,
  isCreatingRequest: false,
  isUpdatingRequest: false,
  isDeletingRequest: false,
  isTogglingPrayed: false,
  isMarkingAnswered: false,
  isAddingComment: false,
  isDeletingComment: false,

  error: null,
  successMessage: null,
};

const prayerRequestSlice = createSlice({
  name: 'prayerRequest',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearCurrentRequest: (state) => {
      state.currentRequest = null;
      state.comments = [];
    },
    setSelectedCategory: (state, action: PayloadAction<PrayerRequestCategory | null>) => {
      state.selectedCategory = action.payload;
    },
    setUserPrayed: (state, action: PayloadAction<{ requestId: string; prayed: boolean }>) => {
      state.userPrayed[action.payload.requestId] = action.payload.prayed;
    },
  },
  extraReducers: (builder) => {
    // Fetch prayer requests
    builder
      .addCase(fetchPrayerRequestsThunk.pending, (state) => {
        state.isLoadingRequests = true;
        state.error = null;
      })
      .addCase(fetchPrayerRequestsThunk.fulfilled, (state, action) => {
        state.isLoadingRequests = false;
        state.requests = action.payload;
      })
      .addCase(fetchPrayerRequestsThunk.rejected, (state, action) => {
        state.isLoadingRequests = false;
        state.error = action.payload as string;
      });

    // Fetch prayer request by ID
    builder
      .addCase(fetchPrayerRequestByIdThunk.pending, (state) => {
        state.isLoadingCurrentRequest = true;
        state.error = null;
      })
      .addCase(fetchPrayerRequestByIdThunk.fulfilled, (state, action) => {
        state.isLoadingCurrentRequest = false;
        state.currentRequest = action.payload;
      })
      .addCase(fetchPrayerRequestByIdThunk.rejected, (state, action) => {
        state.isLoadingCurrentRequest = false;
        state.error = action.payload as string;
      });

    // Create prayer request
    builder
      .addCase(createPrayerRequestThunk.pending, (state) => {
        state.isCreatingRequest = true;
        state.error = null;
      })
      .addCase(createPrayerRequestThunk.fulfilled, (state, action) => {
        state.isCreatingRequest = false;
        state.requests.unshift(action.payload);
        state.successMessage = 'Prayer request submitted successfully';
      })
      .addCase(createPrayerRequestThunk.rejected, (state, action) => {
        state.isCreatingRequest = false;
        state.error = action.payload as string;
      });

    // Update prayer request
    builder
      .addCase(updatePrayerRequestThunk.pending, (state) => {
        state.isUpdatingRequest = true;
        state.error = null;
      })
      .addCase(updatePrayerRequestThunk.fulfilled, (state, action) => {
        state.isUpdatingRequest = false;
        const { requestId, updates } = action.payload;
        const index = state.requests.findIndex((r) => r.id === requestId);
        if (index !== -1) {
          state.requests[index] = { ...state.requests[index], ...updates };
        }
        if (state.currentRequest?.id === requestId) {
          state.currentRequest = { ...state.currentRequest, ...updates };
        }
        state.successMessage = 'Prayer request updated successfully';
      })
      .addCase(updatePrayerRequestThunk.rejected, (state, action) => {
        state.isUpdatingRequest = false;
        state.error = action.payload as string;
      });

    // Delete prayer request
    builder
      .addCase(deletePrayerRequestThunk.pending, (state) => {
        state.isDeletingRequest = true;
        state.error = null;
      })
      .addCase(deletePrayerRequestThunk.fulfilled, (state, action) => {
        state.isDeletingRequest = false;
        state.requests = state.requests.filter((r) => r.id !== action.payload);
        state.successMessage = 'Prayer request deleted successfully';
      })
      .addCase(deletePrayerRequestThunk.rejected, (state, action) => {
        state.isDeletingRequest = false;
        state.error = action.payload as string;
      });

    // Toggle prayed
    builder
      .addCase(togglePrayedThunk.pending, (state) => {
        state.isTogglingPrayed = true;
      })
      .addCase(togglePrayedThunk.fulfilled, (state, action) => {
        state.isTogglingPrayed = false;
        const { requestId, hasPrayed } = action.payload;
        state.userPrayed[requestId] = hasPrayed;

        // Update prayer count in requests list
        const requestIndex = state.requests.findIndex((r) => r.id === requestId);
        if (requestIndex !== -1) {
          state.requests[requestIndex].prayerCount += hasPrayed ? 1 : -1;
        }

        // Update current request if it matches
        if (state.currentRequest?.id === requestId) {
          state.currentRequest.prayerCount += hasPrayed ? 1 : -1;
        }
      })
      .addCase(togglePrayedThunk.rejected, (state, action) => {
        state.isTogglingPrayed = false;
        state.error = action.payload as string;
      });

    // Mark as answered
    builder
      .addCase(markAsAnsweredThunk.pending, (state) => {
        state.isMarkingAnswered = true;
      })
      .addCase(markAsAnsweredThunk.fulfilled, (state, action) => {
        state.isMarkingAnswered = false;
        const requestId = action.payload;

        // Update in requests list
        const index = state.requests.findIndex((r) => r.id === requestId);
        if (index !== -1) {
          state.requests[index].status = 'answered';
        }

        // Update current request
        if (state.currentRequest?.id === requestId) {
          state.currentRequest.status = 'answered';
        }

        state.successMessage = 'Prayer marked as answered! Praise God!';
      })
      .addCase(markAsAnsweredThunk.rejected, (state, action) => {
        state.isMarkingAnswered = false;
        state.error = action.payload as string;
      });

    // Fetch comments
    builder
      .addCase(fetchPrayerRequestCommentsThunk.pending, (state) => {
        state.isLoadingComments = true;
        state.error = null;
      })
      .addCase(fetchPrayerRequestCommentsThunk.fulfilled, (state, action) => {
        state.isLoadingComments = false;
        state.comments = action.payload;
      })
      .addCase(fetchPrayerRequestCommentsThunk.rejected, (state, action) => {
        state.isLoadingComments = false;
        state.error = action.payload as string;
      });

    // Add comment
    builder
      .addCase(addPrayerRequestCommentThunk.pending, (state) => {
        state.isAddingComment = true;
        state.error = null;
      })
      .addCase(addPrayerRequestCommentThunk.fulfilled, (state, action) => {
        state.isAddingComment = false;
        state.comments.unshift(action.payload);
        state.successMessage = 'Comment added successfully';

        // Update comment count
        if (state.currentRequest) {
          state.currentRequest.commentsCount += 1;
        }
      })
      .addCase(addPrayerRequestCommentThunk.rejected, (state, action) => {
        state.isAddingComment = false;
        state.error = action.payload as string;
      });

    // Delete comment
    builder
      .addCase(deletePrayerRequestCommentThunk.pending, (state) => {
        state.isDeletingComment = true;
        state.error = null;
      })
      .addCase(deletePrayerRequestCommentThunk.fulfilled, (state, action) => {
        state.isDeletingComment = false;
        state.comments = state.comments.filter((c) => c.id !== action.payload);
        state.successMessage = 'Comment deleted successfully';

        // Update comment count
        if (state.currentRequest) {
          state.currentRequest.commentsCount -= 1;
        }
      })
      .addCase(deletePrayerRequestCommentThunk.rejected, (state, action) => {
        state.isDeletingComment = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  clearSuccessMessage,
  clearCurrentRequest,
  setSelectedCategory,
  setUserPrayed,
} = prayerRequestSlice.actions;

export function usePrayerRequestSlice() {
  return useSelector(({ prayerRequest }: RootState) => prayerRequest);
}

export default prayerRequestSlice.reducer;
