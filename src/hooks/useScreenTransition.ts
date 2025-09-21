import { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export function useScreenTransition(
  isVisible: boolean,
  duration: number = 800,
  animationType: 'slide' | 'fade' | 'scale' = 'slide',
) {
  const animValue = useRef(new Animated.Value(isVisible ? 0 : 1)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const fadeValue = useRef(new Animated.Value(isVisible ? 1 : 0)).current;

  useEffect(() => {
    if (animationType === 'slide') {
      Animated.spring(animValue, {
        toValue: isVisible ? 0 : 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    } else if (animationType === 'fade') {
      Animated.timing(fadeValue, {
        toValue: isVisible ? 1 : 0,
        duration,
        useNativeDriver: true,
      }).start();
    } else if (animationType === 'scale') {
      Animated.spring(scaleValue, {
        toValue: isVisible ? 1 : 0.8,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();

      Animated.timing(fadeValue, {
        toValue: isVisible ? 1 : 0,
        duration: duration / 2,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, animValue, scaleValue, fadeValue, duration, animationType]);

  const getTransform = () => {
    switch (animationType) {
      case 'slide':
        return {
          transform: [
            {
              translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -height],
              }),
            },
          ],
          opacity: fadeValue,
        };
      case 'fade':
        return {
          opacity: fadeValue,
        };
      case 'scale':
        return {
          transform: [{ scale: scaleValue }],
          opacity: fadeValue,
        };
      default:
        return {};
    }
  };

  return {
    animatedStyle: getTransform(),
    animValue,
    scaleValue,
    fadeValue,
  };
}
