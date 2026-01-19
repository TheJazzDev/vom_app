/**
 * Retry Handler Utility
 *
 * Provides retry logic for failed operations with exponential backoff
 */

export interface RetryOptions {
  /**
   * Maximum number of retry attempts
   * @default 3
   */
  maxRetries?: number;
  /**
   * Initial delay in milliseconds
   * @default 1000
   */
  initialDelay?: number;
  /**
   * Backoff multiplier for exponential backoff
   * @default 2
   */
  backoffMultiplier?: number;
  /**
   * Maximum delay in milliseconds
   * @default 10000
   */
  maxDelay?: number;
  /**
   * Function to determine if error is retryable
   * @default () => true
   */
  shouldRetry?: (error: unknown) => boolean;
  /**
   * Callback called on each retry
   */
  onRetry?: (attempt: number, error: unknown) => void;
}

/**
 * Delays execution for specified milliseconds
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Calculates delay for next retry using exponential backoff
 */
function calculateDelay(
  attempt: number,
  initialDelay: number,
  backoffMultiplier: number,
  maxDelay: number,
): number {
  const exponentialDelay = initialDelay * Math.pow(backoffMultiplier, attempt);
  return Math.min(exponentialDelay, maxDelay);
}

/**
 * Executes an async function with retry logic
 *
 * @example
 * ```tsx
 * const data = await withRetry(
 *   () => fetchUserData(userId),
 *   {
 *     maxRetries: 3,
 *     initialDelay: 1000,
 *     shouldRetry: (error) => isNetworkError(error),
 *   }
 * );
 * ```
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    backoffMultiplier = 2,
    maxDelay = 10000,
    shouldRetry = () => true,
    onRetry,
  } = options;

  let lastError: unknown;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Check if we should retry
      if (attempt >= maxRetries || !shouldRetry(error)) {
        throw error;
      }

      // Calculate delay for next retry
      const retryDelay = calculateDelay(
        attempt,
        initialDelay,
        backoffMultiplier,
        maxDelay,
      );

      // Notify about retry
      if (onRetry) {
        onRetry(attempt + 1, error);
      }

      if (__DEV__) {
        console.log(
          `[Retry Handler] Attempt ${attempt + 1}/${maxRetries} failed. Retrying in ${retryDelay}ms...`,
          error,
        );
      }

      // Wait before retrying
      await delay(retryDelay);

      attempt++;
    }
  }

  // This should never be reached, but TypeScript requires it
  throw lastError;
}

/**
 * Creates a retryable version of an async function
 *
 * @example
 * ```tsx
 * const retryableFetch = createRetryableFunction(
 *   fetchUserData,
 *   { maxRetries: 5 }
 * );
 *
 * const data = await retryableFetch(userId);
 * ```
 */
export function createRetryableFunction<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  options: RetryOptions = {},
): (...args: TArgs) => Promise<TReturn> {
  return (...args: TArgs) => withRetry(() => fn(...args), options);
}

/**
 * Default retry options for network requests
 */
export const NETWORK_RETRY_OPTIONS: RetryOptions = {
  maxRetries: 3,
  initialDelay: 1000,
  backoffMultiplier: 2,
  maxDelay: 5000,
  shouldRetry: (error: unknown) => {
    // Retry on network errors
    const errorString = String(error).toLowerCase();
    return (
      errorString.includes('network') ||
      errorString.includes('timeout') ||
      errorString.includes('connection') ||
      errorString.includes('econnrefused')
    );
  },
};

/**
 * Default retry options for API requests
 */
export const API_RETRY_OPTIONS: RetryOptions = {
  maxRetries: 2,
  initialDelay: 500,
  backoffMultiplier: 2,
  maxDelay: 3000,
  shouldRetry: (error: unknown) => {
    const err = error as any;
    const statusCode = err?.response?.status || err?.status;

    // Retry on 5xx errors and rate limit (429)
    if (statusCode) {
      return statusCode === 429 || (statusCode >= 500 && statusCode < 600);
    }

    // Also retry on network errors
    return NETWORK_RETRY_OPTIONS.shouldRetry?.(error) || false;
  },
};

/**
 * Default retry options for Firestore operations
 */
export const FIRESTORE_RETRY_OPTIONS: RetryOptions = {
  maxRetries: 2,
  initialDelay: 500,
  backoffMultiplier: 1.5,
  maxDelay: 2000,
  shouldRetry: (error: unknown) => {
    const err = error as any;
    const code = err?.code;

    // Retry on transient Firestore errors
    return (
      code === 'unavailable' ||
      code === 'deadline-exceeded' ||
      code === 'resource-exhausted' ||
      code === 'internal'
    );
  },
};

export default withRetry;
