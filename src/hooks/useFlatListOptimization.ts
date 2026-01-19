import { useCallback, useMemo } from 'react';
import { Platform } from 'react-native';

/**
 * Performance optimization constants for FlatList
 */
export const FLATLIST_PERFORMANCE = {
  /**
   * Number of items to render initially
   * Lower = faster initial render, but more blank space when scrolling
   */
  INITIAL_NUM_TO_RENDER: Platform.select({
    ios: 10,
    android: 5,
    default: 5,
  }),

  /**
   * Number of items to render per batch when scrolling
   * Lower = smoother scrolling, but more frequent renders
   */
  MAX_TO_RENDER_PER_BATCH: Platform.select({
    ios: 10,
    android: 5,
    default: 5,
  }),

  /**
   * How many windowSize above and below the viewport to render
   * Lower = less memory, but more blank space when scrolling fast
   */
  WINDOW_SIZE: 5,

  /**
   * Delay in ms before rendering items in a new batch
   * Lower = more responsive, but more frequent renders
   */
  UPDATE_CELLS_BATCHING_PERIOD: 50,

  /**
   * Remove clipped subviews to reduce memory (Android only)
   */
  REMOVE_CLIPPED_SUBVIEWS: Platform.OS === 'android',
};

interface FlatListItem {
  id: string | number;
  [key: string]: any;
}

interface UseFlatListOptimizationOptions<T extends FlatListItem> {
  /**
   * Custom key extractor function
   */
  getItemKey?: (item: T, index: number) => string;

  /**
   * Enable strict mode (additional optimizations)
   * @default false
   */
  strict?: boolean;
}

/**
 * Hook for optimizing FlatList performance
 *
 * Provides optimized callbacks and configuration for FlatList
 *
 * @example
 * ```tsx
 * const {
 *   keyExtractor,
 *   getItemLayout,
 *   optimizationProps,
 * } = useFlatListOptimization<Programme>({
 *   getItemKey: (item) => item.id,
 * });
 *
 * <FlatList
 *   data={data}
 *   keyExtractor={keyExtractor}
 *   getItemLayout={getItemLayout}
 *   {...optimizationProps}
 * />
 * ```
 */
export function useFlatListOptimization<T extends FlatListItem>(
  options: UseFlatListOptimizationOptions<T> = {},
) {
  const { getItemKey, strict = false } = options;

  /**
   * Optimized key extractor with fallback
   */
  const keyExtractor = useCallback(
    (item: T, index: number): string => {
      if (getItemKey) {
        return getItemKey(item, index);
      }

      // Try common id fields
      if (item.id) return String(item.id);
      if ((item as any).key) return String((item as any).key);
      if ((item as any)._id) return String((item as any)._id);

      // Fallback to index (not recommended but prevents crashes)
      return `item-${index}`;
    },
    [getItemKey],
  );

  /**
   * Base optimization props for FlatList
   */
  const optimizationProps = useMemo(
    () => ({
      initialNumToRender: FLATLIST_PERFORMANCE.INITIAL_NUM_TO_RENDER,
      maxToRenderPerBatch: FLATLIST_PERFORMANCE.MAX_TO_RENDER_PER_BATCH,
      windowSize: FLATLIST_PERFORMANCE.WINDOW_SIZE,
      updateCellsBatchingPeriod:
        FLATLIST_PERFORMANCE.UPDATE_CELLS_BATCHING_PERIOD,
      removeClippedSubviews: FLATLIST_PERFORMANCE.REMOVE_CLIPPED_SUBVIEWS,

      // Additional strict mode optimizations
      ...(strict && {
        // Disable scrolling indicator for better performance
        showsVerticalScrollIndicator: false,
        showsHorizontalScrollIndicator: false,

        // Reduce overdraw
        scrollEventThrottle: 16,
      }),
    }),
    [strict],
  );

  /**
   * Creates an optimized getItemLayout function
   * Use this when all items have the same fixed height
   *
   * @param itemHeight Height of each item
   * @param separatorHeight Height of separator (if any)
   */
  const createGetItemLayout = useCallback(
    (itemHeight: number, separatorHeight: number = 0) => {
      const totalItemHeight = itemHeight + separatorHeight;

      return (_data: any, index: number) => ({
        length: totalItemHeight,
        offset: totalItemHeight * index,
        index,
      });
    },
    [],
  );

  return {
    keyExtractor,
    optimizationProps,
    createGetItemLayout,
  };
}

export default useFlatListOptimization;
