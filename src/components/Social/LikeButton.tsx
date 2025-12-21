import { useTheme } from '@/src/hooks';
import React, { useState } from 'react';
import {
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
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

interface LikeButtonProps {
  liked: boolean;
  likesCount: number;
  onToggle: () => Promise<void> | void;
  size?: 'small' | 'medium' | 'large';
  showCount?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  liked,
  likesCount,
  onToggle,
  size = 'medium',
  showCount = true,
  disabled = false,
  style,
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const scale = useSharedValue(1);

  const sizeConfig = {
    small: { iconSize: 16, fontSize: 12, padding: 6 },
    medium: { iconSize: 20, fontSize: 14, padding: 8 },
    large: { iconSize: 24, fontSize: 16, padding: 10 },
  };

  const config = sizeConfig[size];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const triggerHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePress = async () => {
    if (disabled || isLoading) return;

    // Animate
    scale.value = withSequence(
      withSpring(1.3, { damping: 5 }),
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

  const heartIcon = liked ? '❤️' : '🤍';

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      className="flex-row items-center"
      style={style}
    >
      <View className="flex-row items-center gap-1">
        <Animated.View style={animatedStyle}>
          <Text
            style={{ fontSize: config.iconSize }}
            className={isLoading ? 'opacity-50' : ''}
          >
            {heartIcon}
          </Text>
        </Animated.View>
        {showCount && (
          <Text
            style={{
              fontSize: config.fontSize,
              color: liked ? theme.brand : theme.textSecondary,
            }}
            className="font-medium"
          >
            {likesCount}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default LikeButton;
