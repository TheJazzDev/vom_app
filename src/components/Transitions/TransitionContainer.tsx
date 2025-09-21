import { useScreenTransition } from '@/src/hooks/useScreenTransition';
import React from 'react';
import { Animated, StyleSheet } from 'react-native';

interface TransitionContainerProps {
  children: React.ReactNode;
  isVisible: boolean;
  animationType?: 'slide' | 'fade' | 'scale';
  duration?: number;
  style?: any;
}

export function TransitionContainer({
  children,
  isVisible,
  animationType = 'slide',
  duration = 800,
  style,
}: TransitionContainerProps) {
  const { animatedStyle } = useScreenTransition(
    isVisible,
    duration,
    animationType,
  );

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, animatedStyle, style]}
    >
      {children}
    </Animated.View>
  );
}
