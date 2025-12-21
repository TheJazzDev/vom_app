import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import React from 'react';

interface StreakCounterProps {
  streakDays: number;
  longestStreak?: number;
  size?: 'sm' | 'md' | 'lg';
  showLongest?: boolean;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({
  streakDays,
  longestStreak,
  size = 'md',
  showLongest = false,
}) => {
  const theme = useTheme();

  const getStreakColor = () => {
    if (streakDays >= 365) return '#EF4444'; // Legendary
    if (streakDays >= 90) return '#F59E0B'; // Amazing
    if (streakDays >= 30) return '#8B5CF6'; // Great
    if (streakDays >= 7) return '#3B82F6'; // Good
    return '#6B7280'; // Starting
  };

  const sizeStyles = {
    sm: {
      iconSize: 16,
      textSize: 14,
      containerPadding: 6,
    },
    md: {
      iconSize: 20,
      textSize: 18,
      containerPadding: 10,
    },
    lg: {
      iconSize: 28,
      textSize: 24,
      containerPadding: 14,
    },
  };

  const streakColor = getStreakColor();

  return (
    <View className="items-center">
      <View
        className="flex-row items-center rounded-full gap-1"
        style={{
          backgroundColor: `${streakColor}15`,
          padding: sizeStyles[size].containerPadding,
        }}
      >
        <IconSymbol
          name="flame.fill"
          size={sizeStyles[size].iconSize}
          color={streakColor}
        />
        <Text
          className="font-bold"
          style={{ fontSize: sizeStyles[size].textSize, color: streakColor }}
        >
          {streakDays}
        </Text>
        <Text
          variant="caption"
          className="ml-0.5"
          style={{ color: streakColor }}
        >
          days
        </Text>
      </View>

      {showLongest && longestStreak !== undefined && longestStreak > 0 && (
        <Text
          variant="caption"
          className="mt-1"
          style={{ color: theme.textSecondary }}
        >
          Best: {longestStreak} days
        </Text>
      )}
    </View>
  );
};
