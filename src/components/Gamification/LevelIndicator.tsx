import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import {
  getLevelFromPoints,
  getProgressToNextLevel,
} from '@/src/services/gamification';
import React from 'react';
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
    <View className="flex-row items-center gap-3">
      {/* Level Icon */}
      <View
        className="rounded-xl border-2 items-center justify-center"
        style={{
          width: sizeStyles[size].iconSize,
          height: sizeStyles[size].iconSize,
          backgroundColor: `${currentLevel.color}20`,
          borderColor: currentLevel.color,
        }}
      >
        <Text style={{ fontSize: sizeStyles[size].iconFontSize }}>
          {currentLevel.icon}
        </Text>
      </View>

      {/* Level Info */}
      <View className="flex-1">
        <View className="flex-row items-center gap-2 mb-1">
          <Text
            className="font-bold"
            style={{ fontSize: sizeStyles[size].levelSize, color: currentLevel.color }}
          >
            Lv.{currentLevel.level}
          </Text>
          {showName && (
            <Text
              className="font-semibold"
              style={{ fontSize: sizeStyles[size].textSize, color: theme.heading }}
            >
              {currentLevel.name}
            </Text>
          )}
        </View>

        {/* Progress Bar */}
        {showProgress && !isMaxLevel && (
          <View className="flex-row items-center gap-2">
            <View
              className="flex-1 h-1.5 rounded-sm overflow-hidden"
              style={{ backgroundColor: `${currentLevel.color}20` }}
            >
              <Animated.View
                className="h-full rounded-sm"
                style={[
                  { backgroundColor: currentLevel.color },
                  animatedProgressStyle,
                ]}
              />
            </View>
            <Text
              variant="caption"
              className="text-[10px] min-w-[60px]"
              style={{ color: theme.textSecondary }}
            >
              {progress.current}/{progress.required}
            </Text>
          </View>
        )}

        {isMaxLevel && showProgress && (
          <Text
            variant="caption"
            className="font-semibold"
            style={{ color: currentLevel.color }}
          >
            MAX LEVEL
          </Text>
        )}
      </View>
    </View>
  );
};
