import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import React from 'react';
import { StyleSheet } from 'react-native';

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
    <View style={styles.container}>
      <View
        style={[
          styles.streakContainer,
          {
            backgroundColor: `${streakColor}15`,
            padding: sizeStyles[size].containerPadding,
          },
        ]}
      >
        <IconSymbol
          name="flame.fill"
          size={sizeStyles[size].iconSize}
          color={streakColor}
        />
        <Text
          style={[
            styles.streakText,
            { fontSize: sizeStyles[size].textSize, color: streakColor },
          ]}
        >
          {streakDays}
        </Text>
        <Text variant="caption" style={{ color: streakColor, marginLeft: 2 }}>
          days
        </Text>
      </View>

      {showLongest && longestStreak !== undefined && longestStreak > 0 && (
        <Text
          variant="caption"
          style={[styles.longestText, { color: theme.muted }]}
        >
          Best: {longestStreak} days
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    gap: 4,
  },
  streakText: {
    fontWeight: '700',
  },
  longestText: {
    marginTop: 4,
  },
});
