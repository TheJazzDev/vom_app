import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import {
  registerForPushNotifications,
  unregisterPushToken,
  getNotificationSettings,
  updateNotificationSettings,
  NotificationSettings,
} from '../../services/notification';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  AppNotification,
} from '../../services/notifications';

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

  // Notification items
  notifications: AppNotification[];
  isLoadingNotifications: boolean;
  notificationsError: string | null;
  notificationsLastFetch: number | null;

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

  notifications: [],
  isLoadingNotifications: false,
  notificationsError: null,
  notificationsLastFetch: null,

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
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to register for notifications';
      return rejectWithValue(message);
    }
  },
);

export const unregisterNotifications = createAsyncThunk(
  'notification/unregister',
  async (userId: string, { rejectWithValue }) => {
    try {
      await unregisterPushToken(userId);
      return null;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to unregister notifications';
      return rejectWithValue(message);
    }
  },
);

export const fetchNotificationSettings = createAsyncThunk(
  'notification/fetchSettings',
  async (userId: string, { rejectWithValue }) => {
    try {
      const settings = await getNotificationSettings(userId);
      return settings;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to fetch settings';
      return rejectWithValue(message);
    }
  },
);

export const saveNotificationSettings = createAsyncThunk(
  'notification/saveSettings',
  async (
    {
      userId,
      settings,
    }: { userId: string; settings: Partial<NotificationSettings> },
    { rejectWithValue },
  ) => {
    try {
      await updateNotificationSettings(userId, settings);
      return settings;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to save settings';
      return rejectWithValue(message);
    }
  },
);

export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async (userId: string, { rejectWithValue }) => {
    try {
      const notifications = await getNotifications(userId);
      return notifications;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to fetch notifications';
      return rejectWithValue(message);
    }
  },
);

export const markAsRead = createAsyncThunk(
  'notification/markAsRead',
  async (notificationId: string, { rejectWithValue }) => {
    try {
      await markNotificationAsRead(notificationId);
      return notificationId;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to mark as read';
      return rejectWithValue(message);
    }
  },
);

export const markAllAsRead = createAsyncThunk(
  'notification/markAllAsRead',
  async (userId: string, { rejectWithValue }) => {
    try {
      await markAllNotificationsAsRead(userId);
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to mark all as read';
      return rejectWithValue(message);
    }
  },
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setPermissionStatus: (
      state,
      action: PayloadAction<'undetermined' | 'granted' | 'denied'>,
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
    addNotification: (state, action: PayloadAction<AppNotification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    clearErrors: (state) => {
      state.registrationError = null;
      state.settingsError = null;
      state.notificationsError = null;
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
      })

      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoadingNotifications = true;
        state.notificationsError = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoadingNotifications = false;
        state.notifications = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.read).length;
        state.notificationsLastFetch = Date.now();
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoadingNotifications = false;
        state.notificationsError = action.payload as string;
      })

      // Mark as read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(
          (n) => n.id === action.payload,
        );
        if (notification && !notification.read) {
          notification.read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })

      // Mark all as read
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications.forEach((n) => {
          n.read = true;
        });
        state.unreadCount = 0;
      });
  },
});

export const {
  setPermissionStatus,
  setUnreadCount,
  incrementUnreadCount,
  clearUnreadCount,
  addNotification,
  clearErrors,
  resetNotificationState,
} = notificationSlice.actions;

export function useNotificationSlice() {
  const state = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch<AppDispatch>();

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
    addNotification: (notification: AppNotification) =>
      dispatch(notificationSlice.actions.addNotification(notification)),
    clearErrors: () => dispatch(notificationSlice.actions.clearErrors()),
    resetNotificationState: () =>
      dispatch(notificationSlice.actions.resetNotificationState()),
    // Dispatched async thunks
    registerNotifications: (userId: string) =>
      dispatch(registerPushNotifications(userId)),
    unregister: (userId: string) => dispatch(unregisterNotifications(userId)),
    loadSettings: (userId: string) =>
      dispatch(fetchNotificationSettings(userId)),
    saveSettings: (userId: string, settings: Partial<NotificationSettings>) =>
      dispatch(saveNotificationSettings({ userId, settings })),
    loadNotifications: (userId: string) => dispatch(fetchNotifications(userId)),
    markNotificationAsRead: (notificationId: string) =>
      dispatch(markAsRead(notificationId)),
    markAllNotificationsAsRead: (userId: string) =>
      dispatch(markAllAsRead(userId)),
  };
}

export default notificationSlice.reducer;
