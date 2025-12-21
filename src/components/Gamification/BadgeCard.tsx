import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import type { Badge } from '@/src/services/gamification/badges';
import React from 'react';
import { Pressable } from 'react-native';
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
      className="rounded-xl border items-center relative"
      style={{
        ...sizeStyles[size].container,
        backgroundColor: badge.isEarned ? `${categoryColor}10` : theme.card,
        borderColor: badge.isEarned ? categoryColor : theme.border,
        opacity: badge.isEarned ? 1 : 0.6,
      }}
    >
      {/* Badge Icon */}
      <View
        className="rounded-xl items-center justify-center mb-2 relative"
        style={{
          width: sizeStyles[size].iconSize,
          height: sizeStyles[size].iconSize,
          backgroundColor: badge.isEarned
            ? `${categoryColor}20`
            : `${theme.textSecondary}10`,
        }}
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
          <View className="absolute -bottom-1 -right-1">
            <Text style={{ fontSize: sizeStyles[size].iconFontSize / 2 }}>🔒</Text>
          </View>
        )}
      </View>

      {/* Badge Name */}
      <Text
        className="font-semibold text-center"
        style={{
          fontSize: sizeStyles[size].nameSize,
          color: badge.isEarned ? theme.heading : theme.textSecondary,
        }}
        numberOfLines={2}
      >
        {badge.name}
      </Text>

      {/* Progress Bar (for unearned badges) */}
      {!badge.isEarned && badge.progress > 0 && size !== 'sm' && (
        <View className="w-full mt-2">
          <View
            className="h-1 rounded-sm overflow-hidden"
            style={{ backgroundColor: `${categoryColor}20` }}
          >
            <Animated.View
              className="h-full rounded-sm"
              style={[
                { backgroundColor: categoryColor },
                progressStyle,
              ]}
            />
          </View>
          <Text
            variant="caption"
            className="text-[9px] text-center mt-0.5"
            style={{ color: theme.textSecondary }}
          >
            {Math.round(badge.progress)}%
          </Text>
        </View>
      )}

      {/* Earned Checkmark */}
      {badge.isEarned && (
        <View
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full items-center justify-center"
          style={{ backgroundColor: categoryColor }}
        >
          <Text className="text-white text-xs font-bold">✓</Text>
        </View>
      )}
    </Pressable>
  );
};
