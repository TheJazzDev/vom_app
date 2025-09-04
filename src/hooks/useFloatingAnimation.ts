// src/hooks/useFloatingAnimation.ts
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export function useFloatingAnimation(
  duration: number = 3000,
  translateRange: number = -20,
  autoStart: boolean = true,
) {
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!autoStart) return;

    const createFloatingAnimation = () => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: translateRange,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
        ]),
      );
    };

    const animation = createFloatingAnimation();
    animation.start();

    return () => animation.stop();
  }, [animValue, duration, translateRange, autoStart]);

  return animValue;
}

export function useMultipleFloatingAnimations(
  configs: { duration?: number; translateRange?: number }[],
) {
  const animations = configs.map((config) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFloatingAnimation(
      config.duration || 3000,
      config.translateRange || -20,
      true,
    ),
  );

  return animations;
}
