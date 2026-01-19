import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import {
  getLevelFromPoints,
  getProgressToNextLevel,
} from '@/src/services/gamification';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface LevelIndicatorProps {
  points: number;
  showProgress?: boolean;
  showName?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const LevelIndicator: React.FC<LevelIndicatorProps> = ({
  points,
  showProgress = true,
  showName = true,
  size = 'md',
}) => {
  const theme = useTheme();
  const currentLevel = getLevelFromPoints(points);
  const progress = getProgressToNextLevel(points);
  const isMaxLevel = currentLevel.level === 14;

  const sizeStyles = {
    sm: {
      iconSize: 24,
      iconFontSize: 14,
      textSize: 10,
      levelSize: 12,
    },
    md: {
      iconSize: 40,
      iconFontSize: 20,
      textSize: 12,
      levelSize: 14,
    },
    lg: {
      iconSize: 60,
      iconFontSize: 32,
      textSize: 14,
      levelSize: 18,
    },
  };

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: withSpring(`${progress.percentage}%`, {
      damping: 15,
      stiffness: 100,
    }),
  }));

  return (
    <View style={styles.container}>
      {/* Level Icon */}
      <View
        style={[
          styles.iconContainer,
          {
            width: sizeStyles[size].iconSize,
            height: sizeStyles[size].iconSize,
            backgroundColor: `${currentLevel.color}20`,
            borderColor: currentLevel.color,
          },
        ]}
      >
        <Text style={{ fontSize: sizeStyles[size].iconFontSize }}>
          {currentLevel.icon}
        </Text>
      </View>

      {/* Level Info */}
      <View style={styles.infoContainer}>
        <View style={styles.levelRow}>
          <Text
            style={[
              styles.levelText,
              {
                fontSize: sizeStyles[size].levelSize,
                color: currentLevel.color,
              },
            ]}
          >
            Lv.{currentLevel.level}
          </Text>
          {showName && (
            <Text
              style={[
                styles.levelName,
                { fontSize: sizeStyles[size].textSize, color: theme.heading },
              ]}
            >
              {currentLevel.name}
            </Text>
          )}
        </View>

        {/* Progress Bar */}
        {showProgress && !isMaxLevel && (
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBackground,
                { backgroundColor: `${currentLevel.color}20` },
              ]}
            >
              <Animated.View
                style={[
                  styles.progressFill,
                  { backgroundColor: currentLevel.color },
                  animatedProgressStyle,
                ]}
              />
            </View>
            <Text
              variant="caption"
              style={[styles.progressText, { color: theme.muted }]}
            >
              {progress.current}/{progress.required}
            </Text>
          </View>
        )}

        {isMaxLevel && showProgress && (
          <Text
            variant="caption"
            style={{ color: currentLevel.color, fontWeight: '600' }}
          >
            MAX LEVEL
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  levelText: {
    fontWeight: '700',
  },
  levelName: {
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBackground: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    minWidth: 60,
  },
});
