import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export interface QueuedAction {
  id: string;
  type:
    | 'prayer_request'
    | 'testimony'
    | 'first_timer'
    | 'profile_update'
    | 'gamification'
    | 'other';
  action: string; // The action to perform
  payload: any; // The data for the action
  timestamp: number;
  retryCount: number;
  maxRetries: number;
  error?: string;
}

export interface OfflineState {
  isOnline: boolean;
  queue: QueuedAction[];
  isProcessingQueue: boolean;
  lastSyncTime: number | null;
}

const initialState: OfflineState = {
  isOnline: true,
  queue: [],
  isProcessingQueue: false,
  lastSyncTime: null,
};

const offlineSlice = createSlice({
  name: 'offline',
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },

    addToQueue: (
      state,
      action: PayloadAction<
        Omit<QueuedAction, 'id' | 'timestamp' | 'retryCount'>
      >,
    ) => {
      const newAction: QueuedAction = {
        ...action.payload,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        retryCount: 0,
      };
      state.queue.push(newAction);
    },

    removeFromQueue: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter((item) => item.id !== action.payload);
    },

    updateQueueItem: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<QueuedAction> }>,
    ) => {
      const item = state.queue.find((item) => item.id === action.payload.id);
      if (item) {
        Object.assign(item, action.payload.updates);
      }
    },

    incrementRetryCount: (state, action: PayloadAction<string>) => {
      const item = state.queue.find((item) => item.id === action.payload);
      if (item) {
        item.retryCount += 1;
      }
    },

    setProcessingQueue: (state, action: PayloadAction<boolean>) => {
      state.isProcessingQueue = action.payload;
    },

    updateLastSyncTime: (state) => {
      state.lastSyncTime = Date.now();
    },

    clearQueue: (state) => {
      state.queue = [];
    },

    clearFailedItems: (state) => {
      state.queue = state.queue.filter(
        (item) => item.retryCount < item.maxRetries,
      );
    },
  },
});

export function useOfflineSlice() {
  const state = useSelector(({ offline }: RootState) => offline);

  return {
    ...state,
    ...offlineSlice.actions,
  };
}

export default offlineSlice.reducer;
