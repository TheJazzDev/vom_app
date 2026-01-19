/**
 * Memoization Utilities
 *
 * Provides utilities for optimizing re-renders and expensive computations
 */

/**
 * Creates a memoized selector function
 * Useful for selecting and transforming data from Redux/state
 *
 * @example
 * ```tsx
 * const selectActiveUsers = createMemoizedSelector(
 *   (state) => state.users,
 *   (users) => users.filter(u => u.active)
 * );
 * ```
 */
export function createMemoizedSelector<TInput, TOutput>(
  inputSelector: () => TInput,
  transform: (input: TInput) => TOutput,
): () => TOutput {
  let lastInput: TInput;
  let lastOutput: TOutput;
  let hasRun = false;

  return () => {
    const currentInput = inputSelector();

    if (!hasRun || currentInput !== lastInput) {
      lastInput = currentInput;
      lastOutput = transform(currentInput);
      hasRun = true;
    }

    return lastOutput;
  };
}

/**
 * Shallow comparison of objects
 * Returns true if objects are equal (shallow)
 */
export function shallowEqual<T extends Record<string, any>>(
  objA: T,
  objB: T,
): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];

    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }

    if (!Object.is(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}

/**
 * Deep comparison of values
 * Returns true if values are deeply equal
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (typeof a !== 'object' || typeof b !== 'object') return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;

    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}

/**
 * Memoizes a function with custom cache key
 *
 * @example
 * ```tsx
 * const expensiveFunction = memoize(
 *   (userId: string) => fetchUserData(userId),
 *   (userId) => userId
 * );
 * ```
 */
export function memoize<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => TReturn,
  getCacheKey?: (...args: TArgs) => string,
): (...args: TArgs) => TReturn {
  const cache = new Map<string, TReturn>();

  return (...args: TArgs): TReturn => {
    const key = getCacheKey ? getCacheKey(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

/**
 * Memoizes an async function with TTL (time-to-live)
 *
 * @example
 * ```tsx
 * const fetchUser = memoizeAsync(
 *   (userId: string) => api.getUser(userId),
 *   { ttl: 5000 } // 5 seconds
 * );
 * ```
 */
export function memoizeAsync<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  options: {
    ttl?: number; // Time to live in ms
    getCacheKey?: (...args: TArgs) => string;
  } = {},
): (...args: TArgs) => Promise<TReturn> {
  const { ttl, getCacheKey } = options;
  const cache = new Map<
    string,
    {
      value: Promise<TReturn>;
      timestamp: number;
    }
  >();

  return async (...args: TArgs): Promise<TReturn> => {
    const key = getCacheKey ? getCacheKey(...args) : JSON.stringify(args);

    const cached = cache.get(key);
    const now = Date.now();

    // Return cached value if still fresh
    if (cached && (!ttl || now - cached.timestamp < ttl)) {
      return cached.value;
    }

    // Fetch new value
    const promise = fn(...args);
    cache.set(key, {
      value: promise,
      timestamp: now,
    });

    return promise;
  };
}

/**
 * Debounces a function
 * Useful for search inputs, scroll events, etc.
 *
 * @example
 * ```tsx
 * const debouncedSearch = debounce(
 *   (query: string) => fetchResults(query),
 *   300
 * );
 * ```
 */
export function debounce<TArgs extends any[]>(
  fn: (...args: TArgs) => void,
  delay: number,
): (...args: TArgs) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: TArgs) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * Throttles a function
 * Ensures function is called at most once per delay period
 *
 * @example
 * ```tsx
 * const throttledScroll = throttle(
 *   (event) => handleScroll(event),
 *   100
 * );
 * ```
 */
export function throttle<TArgs extends any[]>(
  fn: (...args: TArgs) => void,
  delay: number,
): (...args: TArgs) => void {
  let lastCall = 0;

  return (...args: TArgs) => {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Creates a cache with size limit (LRU - Least Recently Used)
 *
 * @example
 * ```tsx
 * const cache = createLRUCache<string, User>(100);
 * cache.set('user1', userData);
 * const user = cache.get('user1');
 * ```
 */
export function createLRUCache<K, V>(maxSize: number) {
  const cache = new Map<K, V>();

  return {
    get(key: K): V | undefined {
      if (!cache.has(key)) {
        return undefined;
      }

      // Move to end (most recently used)
      const value = cache.get(key)!;
      cache.delete(key);
      cache.set(key, value);

      return value;
    },

    set(key: K, value: V): void {
      // Delete if already exists (to re-add at end)
      if (cache.has(key)) {
        cache.delete(key);
      }

      // Add to end
      cache.set(key, value);

      // Remove oldest if over limit
      if (cache.size > maxSize) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
    },

    clear(): void {
      cache.clear();
    },

    size(): number {
      return cache.size;
    },
  };
}

export default {
  createMemoizedSelector,
  shallowEqual,
  deepEqual,
  memoize,
  memoizeAsync,
  debounce,
  throttle,
  createLRUCache,
};
