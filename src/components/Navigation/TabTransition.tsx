import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface TabTransitionProps {
  children: React.ReactNode;
  isActive: boolean;
}

/**
 * Wrapper component that animates tab content when switching between tabs
 * Provides smooth fade and slide transitions
 */
export function TabTransition({ children, isActive }: TabTransitionProps) {
  const opacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  const translateY = useRef(new Animated.Value(isActive ? 0 : 10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: isActive ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: isActive ? 0 : 10,
        useNativeDriver: true,
        damping: 20,
        stiffness: 200,
      }),
    ]).start();
  }, [isActive, opacity, translateY]);

  if (!isActive && opacity._value === 0) {
    // Don't render inactive tabs that have fully faded out
    return null;
  }

  return (
    <Animated.View
      className="flex-1"
      style={{
        opacity,
        transform: [{ translateY }],
      }}
      pointerEvents={isActive ? 'auto' : 'none'}
    >
      {children}
    </Animated.View>
  );
}
