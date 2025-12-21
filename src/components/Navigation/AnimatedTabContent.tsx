import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedTabContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Enhanced tab content wrapper with hardware-accelerated animations
 * using React Native Reanimated for buttery smooth 60fps transitions
 *
 * @example
 * ```tsx
 * // Wrap your tab screen content
 * export default function HomeScreen() {
 *   return (
 *     <AnimatedTabContent>
 *       <View>{/* Your content *\/}</View>
 *     </AnimatedTabContent>
 *   );
 * }
 * ```
 */
export function AnimatedTabContent({
  children,
  style,
}: AnimatedTabContentProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(10);
  const scale = useSharedValue(0.98);

  useEffect(() => {
    // Fade in animation
    opacity.value = withTiming(1, {
      duration: 250,
    });

    // Slide up animation
    translateY.value = withSpring(0, {
      damping: 15,
      stiffness: 100,
      mass: 0.5,
    });

    // Scale animation
    scale.value = withSpring(1, {
      damping: 12,
      stiffness: 120,
    });
  }, [opacity, translateY, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View className="flex-1" style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}

/**
 * Lightweight version with fade only (for better performance on low-end devices)
 */
export function AnimatedTabContentLite({
  children,
  style,
}: AnimatedTabContentProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 200,
    });
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View className="flex-1" style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}
