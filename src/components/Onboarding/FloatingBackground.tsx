import { useMultipleFloatingAnimations } from '@/src/hooks/useFloatingAnimation';
import React from 'react';
import { Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface FloatingBackgroundProps {
  accentColor: string;
}

export function FloatingBackground({ accentColor }: FloatingBackgroundProps) {
  const [float1, float2, float3] = useMultipleFloatingAnimations([
    { duration: 3000, translateRange: -20 },
    { duration: 4000, translateRange: -15 },
    { duration: 3500, translateRange: -18 },
  ]);

  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          top: height * 0.1,
          left: width * 0.1,
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: `${accentColor}20`,
          transform: [{ translateY: float1 }],
        }}
      />

      <Animated.View
        style={{
          position: 'absolute',
          top: height * 0.15,
          right: width * 0.15,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: `${accentColor}15`,
          transform: [{ translateY: float2 }],
        }}
      />

      <Animated.View
        style={{
          position: 'absolute',
          bottom: height * 0.06,
          left: width * 0.2,
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: `${accentColor}10`,
          transform: [{ translateY: float3 }],
        }}
      />
    </>
  );
}
