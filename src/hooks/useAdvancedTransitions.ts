import { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export type TransitionType =
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'fold'
  | 'curtain'
  | 'zoom'
  | 'flip';

export function useAdvancedTransition(
  isVisible: boolean,
  transitionType: TransitionType = 'slideUp',
  duration: number = 800,
) {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const rotateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animations: Animated.CompositeAnimation[] = [];

    switch (transitionType) {
      case 'slideUp':
        animations.push(
          Animated.spring(translateY, {
            toValue: isVisible ? 0 : -height,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
        );
        break;

      case 'slideDown':
        animations.push(
          Animated.spring(translateY, {
            toValue: isVisible ? 0 : height,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
        );
        break;

      case 'slideLeft':
        animations.push(
          Animated.spring(translateX, {
            toValue: isVisible ? 0 : -width,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
        );
        break;

      case 'slideRight':
        animations.push(
          Animated.spring(translateX, {
            toValue: isVisible ? 0 : width,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
        );
        break;

      case 'fold':
        animations.push(
          Animated.spring(scale, {
            toValue: isVisible ? 1 : 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.spring(translateY, {
            toValue: isVisible ? 0 : -height * 0.5,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
        );
        break;

      case 'curtain':
        animations.push(
          Animated.timing(translateY, {
            toValue: isVisible ? 0 : -height,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: isVisible ? 1 : 0,
            duration: duration / 2,
            useNativeDriver: true,
          }),
        );
        break;

      case 'zoom':
        animations.push(
          Animated.spring(scale, {
            toValue: isVisible ? 1 : 0.3,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.timing(opacity, {
            toValue: isVisible ? 1 : 0,
            duration: duration / 2,
            useNativeDriver: true,
          }),
        );
        break;

      case 'flip':
        animations.push(
          Animated.spring(rotateY, {
            toValue: isVisible ? 0 : 90,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.timing(opacity, {
            toValue: isVisible ? 1 : 0,
            duration: duration / 2,
            useNativeDriver: true,
          }),
        );
        break;
    }

    Animated.parallel(animations).start();
  }, [
    isVisible,
    transitionType,
    duration,
    opacity,
    rotateY,
    scale,
    translateX,
    translateY,
  ]);

  const getAnimatedStyle = () => ({
    transform: [
      { translateX },
      { translateY },
      { scale },
      {
        rotateY: rotateY.interpolate({
          inputRange: [0, 90],
          outputRange: ['0deg', '90deg'],
        }),
      },
    ],
    opacity,
  });

  return {
    animatedStyle: getAnimatedStyle(),
    translateX,
    translateY,
    scale,
    rotateY,
    opacity,
  };
}
