import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonBox } from '@/src/components/SkeletonBox';
import { useTheme } from '@/src/hooks';

interface CardSkeletonProps {
  /**
   * Show image at top of card
   * @default false
   */
  showImage?: boolean;
  /**
   * Show footer section
   * @default false
   */
  showFooter?: boolean;
  /**
   * Custom width
   */
  width?: number | string;
  /**
   * Custom height
   */
  height?: number | string;
}

/**
 * Generic card skeleton loader
 * Useful for loading states of card-based UIs
 *
 * @example
 * ```tsx
 * {isLoading ? (
 *   <CardSkeleton showImage showFooter />
 * ) : (
 *   <Card {...data} />
 * )}
 * ```
 */
export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  showImage = false,
  showFooter = false,
  width,
  height,
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          width,
          height,
        },
      ]}
    >
      {showImage && (
        <SkeletonBox
          width="100%"
          height={200}
          borderRadius={0}
          style={styles.image}
        />
      )}

      <View style={styles.content}>
        <SkeletonBox width="80%" height={20} style={styles.title} />
        <SkeletonBox width="100%" height={14} style={styles.text} />
        <SkeletonBox width="90%" height={14} style={styles.text} />
        <SkeletonBox width="60%" height={14} />
      </View>

      {showFooter && (
        <View style={[styles.footer, { borderTopColor: theme.border }]}>
          <SkeletonBox width={80} height={32} borderRadius={8} />
          <SkeletonBox width={80} height={32} borderRadius={8} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 12,
  },
  text: {
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
  },
});

export default CardSkeleton;
