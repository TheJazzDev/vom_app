import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import {
  RefreshControl,
  View as RNView,
  ScrollView,
  useColorScheme,
  type ViewProps as RNViewProps,
  type ScrollViewProps,
} from 'react-native';

export type ViewProps = RNViewProps & {
  gradient?: boolean;
  gradientColors?: GradientColor;
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
  gradientStyle?: RNViewProps['style'];
  children?: ReactNode;
  // ScrollView props
  scrollable?: boolean;
  scrollViewProps?: Omit<ScrollViewProps, 'children' | 'refreshControl'>;
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  paddingHorizontal?: number;
  // Refresh props
  refreshing?: boolean;
  onRefresh?: () => void | Promise<void>;
  refreshColors?: string[];
  refreshTintColor?: string;
};

export function View({
  gradient = false,
  gradientColors,
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 1 },
  gradientStyle,
  style,
  children,
  // ScrollView props
  scrollable = false,
  scrollViewProps = {},
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  paddingHorizontal,
  // Refresh props
  refreshing = false,
  onRefresh,
  refreshColors,
  refreshTintColor,
  ...containerProps
}: ViewProps) {
  const mode = useColorScheme();

  const scrollContentStyle = [
    contentContainerStyle,
    {
      flexGrow: 1,
      paddingHorizontal: paddingHorizontal ?? 16,
    },
  ];

  const baseViewStyle = [
    style,
    paddingHorizontal != null ? { paddingHorizontal } : {},
  ];

  const defaultGradient: GradientColor =
    mode === 'dark'
      ? ['#0D0D2B', '#0D1B2A', '#1B263B']
      : ['#F5F9FC', '#E0E9F2', '#C5D4E3'];

  // Default refresh colors based on theme
  const defaultRefreshColors = mode === 'dark' ? ['#ffffff'] : ['#000000'];
  const defaultRefreshTintColor = mode === 'dark' ? '#ffffff' : '#000000';

  // Create refresh control if onRefresh is provided and scrollable is true
  const refreshControl =
    scrollable && onRefresh ? (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={refreshColors || defaultRefreshColors}
        tintColor={refreshTintColor || defaultRefreshTintColor}
      />
    ) : undefined;

  if (gradient) {
    const gradientProps = {
      colors: gradientColors ?? defaultGradient,
      start: gradientStart,
      end: gradientEnd,
      style: [{ flex: 1 }, gradientStyle],
    };

    if (scrollable) {
      return (
        <LinearGradient {...gradientProps}>
          <ScrollView
            {...scrollViewProps}
            style={scrollViewProps.style}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
            contentContainerStyle={scrollContentStyle}
            refreshControl={refreshControl}
          >
            {children}
          </ScrollView>
        </LinearGradient>
      );
    }

    return (
      <LinearGradient {...gradientProps}>
        <RNView style={baseViewStyle} {...containerProps}>
          {children}
        </RNView>
      </LinearGradient>
    );
  }

  if (scrollable) {
    return (
      <RNView style={{ flex: 1 }}>
        <ScrollView
          {...scrollViewProps}
          style={scrollViewProps.style}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
          contentContainerStyle={scrollContentStyle}
          refreshControl={refreshControl}
        >
          {children}
        </ScrollView>
      </RNView>
    );
  }

  return (
    <RNView style={baseViewStyle} {...containerProps}>
      {children}
    </RNView>
  );
}
