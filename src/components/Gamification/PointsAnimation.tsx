import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
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
          }),
        ),
      );

      translateY.value = withSequence(
        withTiming(0, { duration: 300, easing: Easing.out(Easing.back(1.5)) }),
        withDelay(1500, withTiming(-30, { duration: 300 })),
      );

      scale.value = withSequence(
        withTiming(1.2, { duration: 200 }),
        withTiming(1, { duration: 100 }),
        withDelay(1400, withTiming(0.8, { duration: 200 })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  if (!visible) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: theme.card, borderColor: theme.brand },
          animatedStyle,
        ]}
      >
        <Text style={[styles.pointsText, { color: theme.brand }]}>
          +{points}
        </Text>
        <Text variant="caption" style={{ color: theme.muted }}>
          {description}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  pointsText: {
    fontSize: 32,
    fontWeight: '800',
  },
});
