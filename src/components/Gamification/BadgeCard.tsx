import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import type { Badge } from '@/src/services/gamification/badges';
import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface BadgeCardProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({
  badge,
  size = 'md',
  onPress,
}) => {
  const theme = useTheme();

  const sizeStyles = {
    sm: {
      container: { width: 80, padding: 8 },
      iconSize: 32,
      iconFontSize: 24,
      nameSize: 10,
    },
    md: {
      container: { width: 100, padding: 12 },
      iconSize: 48,
      iconFontSize: 32,
      nameSize: 11,
    },
    lg: {
      container: { width: 140, padding: 16 },
      iconSize: 64,
      iconFontSize: 40,
      nameSize: 13,
    },
  };

  const progressStyle = useAnimatedStyle(() => ({
    width: withSpring(`${badge.progress}%`, {
      damping: 15,
      stiffness: 100,
    }),
  }));

  const getCategoryColor = () => {
    const colors = {
      prayer: '#8B5CF6',
      study: '#10B981',
      community: '#F59E0B',
      streak: '#EF4444',
      special: '#3B82F6',
    };
    return colors[badge.category] || theme.brand;
  };

  const categoryColor = getCategoryColor();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        sizeStyles[size].container,
        {
          backgroundColor: badge.isEarned ? `${categoryColor}10` : theme.card,
          borderColor: badge.isEarned ? categoryColor : theme.border,
          opacity: badge.isEarned ? 1 : 0.6,
        },
      ]}
    >
      {/* Badge Icon */}
      <View
        style={[
          styles.iconContainer,
          {
            width: sizeStyles[size].iconSize,
            height: sizeStyles[size].iconSize,
            backgroundColor: badge.isEarned
              ? `${categoryColor}20`
              : `${theme.textSecondary}10`,
          },
        ]}
      >
        <Text
          style={{
            fontSize: sizeStyles[size].iconFontSize,
            opacity: badge.isEarned ? 1 : 0.4,
          }}
        >
          {badge.icon}
        </Text>
        {!badge.isEarned && (
          <View style={styles.lockOverlay}>
            <Text style={{ fontSize: sizeStyles[size].iconFontSize / 2 }}>🔒</Text>
          </View>
        )}
      </View>

      {/* Badge Name */}
      <Text
        style={[
          styles.badgeName,
          {
            fontSize: sizeStyles[size].nameSize,
            color: badge.isEarned ? theme.heading : theme.textSecondary,
          },
        ]}
        numberOfLines={2}
      >
        {badge.name}
      </Text>

      {/* Progress Bar (for unearned badges) */}
      {!badge.isEarned && badge.progress > 0 && size !== 'sm' && (
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBackground,
              { backgroundColor: `${categoryColor}20` },
            ]}
          >
            <Animated.View
              style={[
                styles.progressFill,
                { backgroundColor: categoryColor },
                progressStyle,
              ]}
            />
          </View>
          <Text
            variant="caption"
            style={[styles.progressText, { color: theme.textSecondary }]}
          >
            {Math.round(badge.progress)}%
          </Text>
        </View>
      )}

      {/* Earned Checkmark */}
      {badge.isEarned && (
        <View
          style={[
            styles.earnedBadge,
            { backgroundColor: categoryColor },
          ]}
        >
          <Text style={styles.earnedText}>✓</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  lockOverlay: {
    position: 'absolute',
    bottom: -4,
    right: -4,
  },
  badgeName: {
    fontWeight: '600',
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginTop: 8,
  },
  progressBackground: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 9,
    textAlign: 'center',
    marginTop: 2,
  },
  earnedBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  earnedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
});
