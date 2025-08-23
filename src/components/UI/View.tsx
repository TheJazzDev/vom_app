import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import {
  ColorValue,
  View as RNView,
  useColorScheme,
  type ViewProps as RNViewProps,
} from 'react-native';

type GradientColor = [ColorValue, ColorValue, ...ColorValue[]];

export type ViewProps = RNViewProps & {
  safe?: boolean;
  gradient?: boolean;
  gradientColors?: GradientColor;
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
  gradientStyle?: RNViewProps['style'];
  children?: ReactNode;
};

export function View({
  safe = false,
  gradient = false,
  gradientColors,
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 1 },
  gradientStyle,
  style,
  children,
  ...containerProps
}: ViewProps) {
  const theme = useColorScheme();

  const baseContainerStyle = [
    {
      flex: 1,
      paddingHorizontal: 10,
    },
    style,
  ];

  const defaultGradient: GradientColor =
    theme === 'dark'
      ? ['#0D0D2B', '#0D1B2A', '#1B263B']
      : ['#F5F9FC', '#E0E9F2', '#C5D4E3'];

  // ["#E6F0FF", "#D0E0F5", "#AFC9E8"]

  const appliedStyle = safe ? baseContainerStyle : style;

  if (gradient) {
    return (
      <LinearGradient
        colors={gradientColors ?? defaultGradient}
        start={gradientStart}
        end={gradientEnd}
        style={[{ flex: 1 }, gradientStyle]}>
        <RNView {...containerProps} style={appliedStyle}>
          {children}
        </RNView>
      </LinearGradient>
    );
  }

  return (
    <RNView {...containerProps} style={appliedStyle}>
      {children}
    </RNView>
  );
}
