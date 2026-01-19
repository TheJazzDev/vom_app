import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonBox } from '@/src/components/SkeletonBox';
import { useTheme } from '@/src/hooks';

interface GridSkeletonProps {
  /**
   * Number of columns
   * @default 2
   */
  columns?: number;
  /**
   * Number of rows to render
   * @default 2
   */
  rows?: number;
  /**
   * Show image in each grid item
   * @default true
   */
  showImage?: boolean;
  /**
   * Gap between items
   * @default 12
   */
  gap?: number;
}

/**
 * Generic grid skeleton loader
 * Useful for loading states of grid layouts
 *
 * @example
 * ```tsx
 * {isLoading ? (
 *   <GridSkeleton columns={3} rows={2} />
 * ) : (
 *   <GridView data={data} ... />
 * )}
 * ```
 */
export const GridSkeleton: React.FC<GridSkeletonProps> = ({
  columns = 2,
  rows = 2,
  showImage = true,
  gap = 12,
}) => {
  const theme = useTheme();
  const totalItems = columns * rows;

  return (
    <View style={[styles.container, { gap, padding: gap }]}>
      {Array.from({ length: totalItems }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.item,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
              width: `${100 / columns - (gap * (columns - 1)) / columns}%`,
            },
          ]}
        >
          {showImage && (
            <SkeletonBox
              width="100%"
              height={120}
              borderRadius={0}
              style={styles.image}
            />
          )}
          <View style={styles.content}>
            <SkeletonBox width="80%" height={14} style={styles.title} />
            <SkeletonBox width="60%" height={12} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
  },
  title: {
    marginBottom: 8,
  },
});

export default GridSkeleton;
