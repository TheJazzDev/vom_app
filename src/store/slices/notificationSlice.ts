import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState, dispatch } from '../store';
import {
  registerForPushNotifications,
  unregisterPushToken,
  getNotificationSettings,
  updateNotificationSettings,
  NotificationSettings,
} from '../../services/notification';

interface NotificationState {
  // Push token
  expoPushToken: string | null;
  isRegistering: boolean;
  registrationError: string | null;

  // Settings
  settings: NotificationSettings;
  isLoadingSettings: boolean;
  settingsError: string | null;

  // Permission
  permissionStatus: 'undetermined' | 'granted' | 'denied' | null;

  // Unread count
  unreadCount: number;
}

const initialState: NotificationState = {
  expoPushToken: null,
  isRegistering: false,
  registrationError: null,

  settings: {
    enabled: true,
    announcements: true,
    programmes: true,
    prayers: true,
    reminders: true,
  },
  isLoadingSettings: false,
  settingsError: null,

  permissionStatus: null,
  unreadCount: 0,
};

// Async thunks
export const registerPushNotifications = createAsyncThunk(
  'notification/register',
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = await registerForPushNotifications(userId);
      return token;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to register for notifications';
      return rejectWithValue(message);
    }
  }
);

export const unregisterNotifications = createAsyncThunk(
  'notification/unregister',
  async (userId: string, { rejectWithValue }) => {
    try {
      await unregisterPushToken(userId);
      return null;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to unregister notifications';
      return rejectWithValue(message);
    }
  }
);

export const fetchNotificationSettings = createAsyncThunk(
  'notification/fetchSettings',
  async (userId: string, { rejectWithValue }) => {
    try {
      const settings = await getNotificationSettings(userId);
      return settings;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch settings';
      return rejectWithValue(message);
    }
  }
);

export const saveNotificationSettings = createAsyncThunk(
  'notification/saveSettings',
  async (
    { userId, settings }: { userId: string; settings: Partial<NotificationSettings> },
    { rejectWithValue }
  ) => {
    try {
      await updateNotificationSettings(userId, settings);
      return settings;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save settings';
      return rejectWithValue(message);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setPermissionStatus: (
      state,
      action: PayloadAction<'undetermined' | 'granted' | 'denied'>
    ) => {
      state.permissionStatus = action.payload;
    },
    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
    incrementUnreadCount: (state) => {
      state.unreadCount += 1;
    },
    clearUnreadCount: (state) => {
      state.unreadCount = 0;
    },
    clearErrors: (state) => {
      state.registrationError = null;
      state.settingsError = null;
    },
    resetNotificationState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Register push notifications
      .addCase(registerPushNotifications.pending, (state) => {
        state.isRegistering = true;
        state.registrationError = null;
      })
      .addCase(registerPushNotifications.fulfilled, (state, action) => {
        state.isRegistering = false;
        state.expoPushToken = action.payload;
        if (action.payload) {
          state.permissionStatus = 'granted';
        }
      })
      .addCase(registerPushNotifications.rejected, (state, action) => {
        state.isRegistering = false;
        state.registrationError = action.payload as string;
      })

      // Unregister notifications
      .addCase(unregisterNotifications.fulfilled, (state) => {
        state.expoPushToken = null;
      })

      // Fetch settings
      .addCase(fetchNotificationSettings.pending, (state) => {
        state.isLoadingSettings = true;
        state.settingsError = null;
      })
      .addCase(fetchNotificationSettings.fulfilled, (state, action) => {
        state.isLoadingSettings = false;
        state.settings = action.payload;
      })
      .addCase(fetchNotificationSettings.rejected, (state, action) => {
        state.isLoadingSettings = false;
        state.settingsError = action.payload as string;
      })

      // Save settings
      .addCase(saveNotificationSettings.fulfilled, (state, action) => {
        state.settings = {
          ...state.settings,
          ...action.payload,
        };
      })
      .addCase(saveNotificationSettings.rejected, (state, action) => {
        state.settingsError = action.payload as string;
      });
  },
});

export const {
  setPermissionStatus,
  setUnreadCount,
  incrementUnreadCount,
  clearUnreadCount,
  clearErrors,
  resetNotificationState,
} = notificationSlice.actions;

export function useNotificationSlice() {
  const state = useSelector((state: RootState) => state.notification);

  return {
    ...state,
    // Dispatched sync actions
    setPermissionStatus: (status: 'undetermined' | 'granted' | 'denied') =>
      dispatch(notificationSlice.actions.setPermissionStatus(status)),
    setUnreadCount: (count: number) =>
      dispatch(notificationSlice.actions.setUnreadCount(count)),
    incrementUnreadCount: () =>
      dispatch(notificationSlice.actions.incrementUnreadCount()),
    clearUnreadCount: () =>
      dispatch(notificationSlice.actions.clearUnreadCount()),
    clearErrors: () =>
      dispatch(notificationSlice.actions.clearErrors()),
    resetNotificationState: () =>
      dispatch(notificationSlice.actions.resetNotificationState()),
    // Dispatched async thunks
    registerNotifications: (userId: string) => dispatch(registerPushNotifications(userId)),
    unregister: (userId: string) => dispatch(unregisterNotifications(userId)),
    loadSettings: (userId: string) => dispatch(fetchNotificationSettings(userId)),
    saveSettings: (userId: string, settings: Partial<NotificationSettings>) =>
      dispatch(saveNotificationSettings({ userId, settings })),
  };
}

export default notificationSlice.reducer;
