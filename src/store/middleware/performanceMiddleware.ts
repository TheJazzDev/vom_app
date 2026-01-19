import { Middleware } from '@reduxjs/toolkit';
import { performanceMonitor } from '@/src/utils/performanceMonitor';

/**
 * Performance monitoring middleware for Redux
 *
 * Tracks:
 * - Action dispatch duration
 * - State update duration
 * - Slow actions (> threshold)
 *
 * @example
 * ```tsx
 * const store = configureStore({
 *   reducer: rootReducer,
 *   middleware: (getDefaultMiddleware) =>
 *     getDefaultMiddleware().concat(performanceMiddleware),
 * });
 * ```
 */
export const performanceMiddleware: Middleware =
  (store) => (next) => (action) => {
    const actionType = action.type;
    const startTime = Date.now();

    // Execute action
    const result = next(action);

    const duration = Date.now() - startTime;

    // Record metric
    performanceMonitor.recordMetric({
      name: `redux-action`,
      duration,
      timestamp: Date.now(),
      metadata: {
        actionType,
      },
    });

    // Log slow actions in development
    if (__DEV__ && duration > 100) {
      console.warn(
        `[Performance] Slow Redux action: ${actionType} took ${duration}ms`,
      );
    }

    return result;
  };

/**
 * Logger middleware for Redux (development only)
 *
 * Logs actions and state changes
 */
export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  if (!__DEV__) {
    return next(action);
  }

  console.group(`[Redux] ${action.type}`);
  console.log('Action:', action);
  console.log('Previous State:', store.getState());

  const result = next(action);

  console.log('Next State:', store.getState());
  console.groupEnd();

  return result;
};

export default performanceMiddleware;
