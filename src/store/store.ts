import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  createTransform,
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import announcementReducer from './slices/announcementSlice';
import authReducer from './slices/authSlice';
import bibleStudyReducer from './slices/bibleStudySlice';
import dailyPrayerReducer from './slices/dailyPrayerSlice';
import directoryReducer from './slices/directorySlice';
import firstTimerReducer from './slices/firstTimerSlice';
import gamificationReducer from './slices/gamificationSlice';
import notificationReducer from './slices/notificationSlice';
import offlineReducer from './slices/offlineSlice';
import prayerRequestReducer from './slices/prayerRequestSlice';
import programmeReduder from './slices/programmeSlice';
import sermonReducer from './slices/sermonSlice';
import testimonyReducer from './slices/testimonySlice';

// Auth persistence config
const authTransform = createTransform(
  (inboundState: any) => {
    const {
      error,
      successMessage,
      isFindingMember,
      isCreatingGuestAccount,
      isSigningIn,
      isSendingEmailCode,
      isVerifyingEmail,
      isWaitingForSMS,
      phoneVerificationId,
      ...persistedState
    } = inboundState;
    return persistedState;
  },
  (outboundState: any) => ({
    ...outboundState,
    error: null,
    successMessage: null,
    isFindingMember: false,
    isCreatingGuestAccount: false,
    isSigningIn: false,
    isSendingEmailCode: false,
    isVerifyingEmail: false,
    isWaitingForSMS: false,
    phoneVerificationId: null,
  }),
  { whitelist: ['auth'] },
);

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  transforms: [authTransform],
};

// Persist the auth slice
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Persist config for offline queue
const offlinePersistConfig = {
  key: 'offline',
  storage: AsyncStorage,
  whitelist: ['queue', 'lastSyncTime'], // Only persist queue and sync time
};

const persistedOfflineReducer = persistReducer(
  offlinePersistConfig,
  offlineReducer,
);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  bibleStudy: bibleStudyReducer,
  dailyPrayer: dailyPrayerReducer,
  directory: directoryReducer,
  firstTimers: firstTimerReducer,
  gamification: gamificationReducer,
  notification: notificationReducer,
  offline: persistedOfflineReducer,
  prayerRequest: prayerRequestReducer,
  programme: programmeReduder,
  sermon: sermonReducer,
  testimony: testimonyReducer,
  announcements: announcementReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });

    // Add performance middleware in development
    if (__DEV__) {
      const {
        performanceMiddleware,
        // eslint-disable-next-line @typescript-eslint/no-require-imports
      } = require('./middleware/performanceMiddleware');
      return middleware.concat(performanceMiddleware);
    }

    return middleware;
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const dispatch = store.dispatch;
