import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import {
  ColorValue,
  View as RNView,
  SafeAreaView,
  useColorScheme,
  type ViewProps as RNViewProps,
} from 'react-native';

type GraientColor = [ColorValue, ColorValue, ...ColorValue[]];

export type ViewProps = RNViewProps & {
  safe?: boolean;
  gradient?: boolean;
  gradientColors?: GraientColor;
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
  const Container = safe ? SafeAreaView : RNView;

  const baseContainerStyle = [{ flex: 1, paddingHorizontal: 10 }, style];

  const defaultGradient: GraientColor =
    theme === 'dark'
      ? ['#0D0D2B', '#0D1B2A', '#1B263B']
      : ['#E5F2FF', '#CFE0F5', '#B0C9E8'];

  if (gradient) {
    return (
      <LinearGradient
        colors={gradientColors ?? defaultGradient}
        start={gradientStart}
        end={gradientEnd}
        style={[{ flex: 1 }, gradientStyle]}>
        <Container {...containerProps} style={baseContainerStyle}>
          {children}
        </Container>
      </LinearGradient>
    );
  }

  return (
    <Container
      {...containerProps}
      // className="bg-background dark:bg-dark-background"
      style={baseContainerStyle}>
      {children}
    </Container>
  );
}
