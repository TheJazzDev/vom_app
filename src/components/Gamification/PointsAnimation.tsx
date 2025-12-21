import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

interface PointsAnimationProps {
  points: number;
  description: string;
  visible: boolean;
  onComplete: () => void;
}

const { width } = Dimensions.get('window');

export const PointsAnimation: React.FC<PointsAnimationProps> = ({
  points,
  description,
  visible,
  onComplete,
}) => {
  const theme = useTheme();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    if (visible) {
      // Reset values
      opacity.value = 0;
      translateY.value = 50;
      scale.value = 0.5;

      // Animate in
      opacity.value = withSequence(
        withTiming(1, { duration: 200 }),
        withDelay(
          1500,
          withTiming(0, { duration: 300 }, () => {
            runOnJS(onComplete)();
          })
        )
      );

      translateY.value = withSequence(
        withTiming(0, { duration: 300, easing: Easing.out(Easing.back(1.5)) }),
        withDelay(1500, withTiming(-30, { duration: 300 }))
      );

      scale.value = withSequence(
        withTiming(1.2, { duration: 200 }),
        withTiming(1, { duration: 100 }),
        withDelay(1400, withTiming(0.8, { duration: 200 }))
      );
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  if (!visible) return null;

  return (
    <View className="absolute top-25 left-0 right-0 items-center z-[9999]" pointerEvents="none">
      <Animated.View
        className="px-6 py-4 rounded-2xl border-2 items-center shadow-lg"
        style={[
          {
            backgroundColor: theme.card,
            borderColor: theme.brand,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 8,
          },
          animatedStyle,
        ]}
      >
        <Text className="text-[32px] font-extrabold" style={{ color: theme.brand }}>
          +{points}
        </Text>
        <Text variant="caption" style={{ color: theme.textSecondary }}>
          {description}
        </Text>
      </Animated.View>
    </View>
  );
};
