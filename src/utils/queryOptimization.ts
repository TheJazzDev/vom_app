/**
 * Query Optimization Utilities for Firestore
 *
 * Provides utilities for optimizing Firestore queries
 */

import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  Query,
  QueryConstraint,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Pagination state
 */
interface PaginationState {
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

/**
 * Paginated query result
 */
interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationState;
}

/**
 * Query builder for optimized Firestore queries
 *
 * @example
 * ```tsx
 * const programmes = await new QueryBuilder('programmes')
 *   .where('status', '==', 'published')
 *   .orderBy('createdAt', 'desc')
 *   .limit(20)
 *   .execute();
 * ```
 */
export class QueryBuilder<T = DocumentData> {
  private collectionPath: string;
  private constraints: QueryConstraint[] = [];

  constructor(collectionPath: string) {
    this.collectionPath = collectionPath;
  }

  /**
   * Add where clause
   */
  where(
    field: string,
    operator:
      | '<'
      | '<='
      | '=='
      | '!='
      | '>='
      | '>'
      | 'array-contains'
      | 'in'
      | 'array-contains-any'
      | 'not-in',
    value: any,
  ): this {
    this.constraints.push(where(field, operator, value));
    return this;
  }

  /**
   * Add orderBy clause
   */
  orderBy(field: string, direction: 'asc' | 'desc' = 'asc'): this {
    this.constraints.push(orderBy(field, direction));
    return this;
  }

  /**
   * Add limit clause
   */
  limit(count: number): this {
    this.constraints.push(limit(count));
    return this;
  }

  /**
   * Add startAfter for pagination
   */
  startAfter(doc: QueryDocumentSnapshot<DocumentData>): this {
    this.constraints.push(startAfter(doc));
    return this;
  }

  /**
   * Build the query
   */
  build(): Query<DocumentData> {
    const col = collection(db, this.collectionPath);
    return query(col, ...this.constraints);
  }

  /**
   * Execute the query and return results
   */
  async execute(): Promise<T[]> {
    const q = this.build();
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  }

  /**
   * Execute the query with pagination
   */
  async executePaginated(
    pageSize: number,
    lastVisible?: QueryDocumentSnapshot<DocumentData> | null,
  ): Promise<PaginatedResult<T>> {
    // Add pagination constraints
    if (lastVisible) {
      this.startAfter(lastVisible);
    }
    this.limit(pageSize + 1); // Fetch one extra to check if there's more

    const q = this.build();
    const snapshot = await getDocs(q);

    const hasMore = snapshot.docs.length > pageSize;
    const docs = hasMore ? snapshot.docs.slice(0, pageSize) : snapshot.docs;

    const data = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];

    return {
      data,
      pagination: {
        lastVisible: docs[docs.length - 1] || null,
        hasMore,
      },
    };
  }
}

/**
 * Batch query executor
 * Executes multiple queries in parallel for better performance
 *
 * @example
 * ```tsx
 * const [programmes, members, announcements] = await executeBatch([
 *   new QueryBuilder('programmes').limit(10).execute(),
 *   new QueryBuilder('members').limit(20).execute(),
 *   new QueryBuilder('announcements').limit(5).execute(),
 * ]);
 * ```
 */
export async function executeBatch<T extends any[]>(
  queries: [...T],
): Promise<{
  [K in keyof T]: Awaited<T[K]>;
}> {
  return Promise.all(queries) as any;
}

/**
 * Query cache for reducing redundant Firestore reads
 */
class QueryCache {
  private cache = new Map<
    string,
    {
      data: any;
      timestamp: number;
    }
  >();

  private ttl = 5 * 60 * 1000; // 5 minutes default

  /**
   * Get cached query result
   */
  get<T>(key: string): T | null {
    const cached = this.cache.get(key);

    if (!cached) return null;

    // Check if expired
    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  /**
   * Set cached query result
   */
  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Clear specific cache entry
   */
  clear(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clearAll(): void {
    this.cache.clear();
  }

  /**
   * Set custom TTL
   */
  setTTL(ms: number): void {
    this.ttl = ms;
  }
}

export const queryCache = new QueryCache();

/**
 * Cached query executor
 * Executes query and caches result
 *
 * @example
 * ```tsx
 * const programmes = await cachedQuery(
 *   'programmes-list',
 *   () => new QueryBuilder('programmes').limit(20).execute()
 * );
 * ```
 */
export async function cachedQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
): Promise<T> {
  // Check cache first
  const cached = queryCache.get<T>(key);
  if (cached) {
    if (__DEV__) {
      console.log(`[Query Cache] Hit: ${key}`);
    }
    return cached;
  }

  // Execute query
  if (__DEV__) {
    console.log(`[Query Cache] Miss: ${key}`);
  }

  const result = await queryFn();

  // Cache result
  queryCache.set(key, result);

  return result;
}

/**
 * Query optimization tips
 */
export const QUERY_OPTIMIZATION_TIPS = {
  /**
   * Use composite indexes for complex queries
   * Create indexes in Firebase Console for queries with multiple where/orderBy clauses
   */
  USE_COMPOSITE_INDEXES: 'Create composite indexes for complex queries',

  /**
   * Limit query results
   * Always use .limit() to prevent fetching too much data
   */
  LIMIT_RESULTS: 'Always use .limit() to prevent over-fetching',

  /**
   * Use pagination for large lists
   * Implement pagination instead of fetching all data at once
   */
  USE_PAGINATION: 'Implement pagination for large datasets',

  /**
   * Cache frequently accessed data
   * Use queryCache for data that doesn't change often
   */
  CACHE_DATA: 'Cache frequently accessed, rarely changing data',

  /**
   * Avoid array-contains-any and in with large arrays
   * These queries are limited to 10 items and can be slow
   */
  AVOID_LARGE_ARRAYS: 'Limit array-contains-any and in queries to 10 items',

  /**
   * Use realtime listeners sparingly
   * Only use for data that needs real-time updates
   */
  LIMIT_REALTIME: 'Use realtime listeners only when necessary',

  /**
   * Denormalize data when appropriate
   * Sometimes duplicating data improves read performance
   */
  DENORMALIZE: 'Consider denormalizing frequently accessed data',

  /**
   * Batch reads when possible
   * Use executeBatch() to parallelize independent queries
   */
  BATCH_READS: 'Execute independent queries in parallel',
};

export default QueryBuilder;
