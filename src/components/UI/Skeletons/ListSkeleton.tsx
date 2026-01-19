import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonBox } from '@/src/components/SkeletonBox';
import { useTheme } from '@/src/hooks';

interface ListSkeletonProps {
  /**
   * Number of skeleton items to render
   * @default 3
   */
  count?: number;
  /**
   * Show avatar/icon on left
   * @default false
   */
  showAvatar?: boolean;
  /**
   * Show image on right
   * @default false
   */
  showImage?: boolean;
}

/**
 * Generic list skeleton loader
 * Useful for loading states of FlatLists and ScrollViews
 *
 * @example
 * ```tsx
 * {isLoading ? (
 *   <ListSkeleton count={5} showAvatar />
 * ) : (
 *   <FlatList data={data} ... />
 * )}
 * ```
 */
export const ListSkeleton: React.FC<ListSkeletonProps> = ({
  count = 3,
  showAvatar = false,
  showImage = false,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.item,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <View style={styles.content}>
            {showAvatar && (
              <View style={styles.avatarContainer}>
                <SkeletonBox
                  width={48}
                  height={48}
                  borderRadius={24}
                  style={styles.avatar}
                />
              </View>
            )}

            <View style={styles.textContainer}>
              <SkeletonBox width="70%" height={16} style={styles.title} />
              <SkeletonBox width="50%" height={12} style={styles.subtitle} />
            </View>

            {showImage && (
              <SkeletonBox width={60} height={60} borderRadius={8} />
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    // Additional avatar styles if needed
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    // Additional subtitle styles if needed
  },
});

export default ListSkeleton;
