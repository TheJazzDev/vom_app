import { useTheme } from '@/src/hooks';
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { Text } from '../UI/Text';
import { View } from '../UI/View';
import * as Haptics from 'expo-haptics';

interface PrayButtonProps {
  hasPrayed: boolean;
  prayerCount: number;
  onToggle: () => Promise<void> | void;
  size?: 'small' | 'medium' | 'large';
  showCount?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  variant?: 'icon' | 'button';
}

export const PrayButton: React.FC<PrayButtonProps> = ({
  hasPrayed,
  prayerCount,
  onToggle,
  size = 'medium',
  showCount = true,
  disabled = false,
  style,
  variant = 'button',
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const scale = useSharedValue(1);

  const sizeConfig = {
    small: { iconSize: 16, fontSize: 12, padding: 8 },
    medium: { iconSize: 20, fontSize: 14, padding: 12 },
    large: { iconSize: 24, fontSize: 16, padding: 16 },
  };

  const config = sizeConfig[size];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const triggerHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handlePress = async () => {
    if (disabled || isLoading) return;

    scale.value = withSequence(
      withSpring(1.2, { damping: 5 }),
      withSpring(1, { damping: 8 }),
    );

    runOnJS(triggerHaptics)();

    setIsLoading(true);
    try {
      await onToggle();
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'icon') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || isLoading}
        activeOpacity={0.7}
        style={[styles.iconContainer, style]}
      >
        <View className="flex-row items-center gap-1">
          <Animated.View style={animatedStyle}>
            <Text
              style={{ fontSize: config.iconSize }}
              className={isLoading ? 'opacity-50' : ''}
            >
              🙏
            </Text>
          </Animated.View>
          {showCount && (
            <Text
              style={{
                fontSize: config.fontSize,
                color: hasPrayed ? theme.brand : theme.muted,
              }}
              className="font-medium"
            >
              {prayerCount}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || isLoading}
        activeOpacity={0.8}
        style={[
          styles.button,
          {
            backgroundColor: hasPrayed
              ? theme.brand
              : theme.isDark
                ? '#374151'
                : '#F3F4F6',
            paddingVertical: config.padding,
            paddingHorizontal: config.padding * 1.5,
          },
          style,
        ]}
      >
        <View className="flex-row items-center gap-2">
          <Text
            style={{ fontSize: config.iconSize }}
            className={isLoading ? 'opacity-50' : ''}
          >
            🙏
          </Text>
          <Text
            style={{
              fontSize: config.fontSize,
              color: hasPrayed ? '#FFFFFF' : theme.text,
            }}
            className="font-semibold"
          >
            {hasPrayed ? 'Prayed' : 'I Prayed'}
          </Text>
          {showCount && (
            <Text
              style={{
                fontSize: config.fontSize - 2,
                color: hasPrayed ? 'rgba(255,255,255,0.8)' : theme.muted,
              }}
            >
              ({prayerCount})
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PrayButton;
