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
import dailyPrayerReducer from './slices/dailyPrayerSlice';
import directoryReducer from './slices/directorySlice';
import programmeReduder from './slices/programmeSlice';

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

// Persist only the auth slice
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  dailyPrayer: dailyPrayerReducer,
  directory: directoryReducer,
  programme: programmeReduder,
  announcements: announcementReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const dispatch = store.dispatch;
