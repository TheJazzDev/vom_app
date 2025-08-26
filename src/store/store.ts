// import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

// Import your slice reducers
import authSlice from './slices/authSlice';
import churchSlice from './slices/churchSlice';
import eventsSlice from './slices/eventsSlice';
import memberSlice from './slices/memberSlice';
import ExpoSecureStoreAdapter from './storage';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: ExpoSecureStoreAdapter,
  whitelist: ['auth', 'user'],
  blacklist: ['events'],
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authSlice,
  member: memberSlice,
  church: churchSlice,
  events: eventsSlice,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: __DEV__, // Enable Redux DevTools in development
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const dispatch = store.dispatch;
