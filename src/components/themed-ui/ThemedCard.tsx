import { useColorScheme, useTheme } from '@/src/hooks';
import { Platform, View, type ViewProps } from 'react-native';

export type ThemedCardProps = ViewProps & {
  border?: boolean;
  shadow?: boolean;
  darkColor?: string;
  lightColor?: string;
  borderWidth?: number;
  marginBottom?: number;
  borderRadius?: number;
};

export function ThemedCard({
  style,
  border,
  darkColor,
  lightColor,
  shadow = false,
  marginBottom = 8,
  borderRadius = 12,
  borderWidth = 0.5,
  children,
  ...otherProps
}: ThemedCardProps) {
  const theme = useTheme();
  const isLightMode = useColorScheme();

  const borderStyle = border
    ? { borderWidth, borderColor: theme.border }
    : { borderWidth: 0, borderColor: 'transparent' as const };

  // Get the background color that will be used
  const backgroundColor = lightColor || darkColor || theme.card;

  // Shadow styles that adapt to theme
  const getShadowStyle = () => {
    if (!shadow) return {};

    if (Platform.OS === 'ios') {
      return {
        shadowColor: isLightMode ? '#000' : '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: isLightMode ? 0.2 : 0.15,
        shadowRadius: 3,
      };
    } else {
      return {
        elevation: 2,
        backgroundColor,
      };
    }
  };

  // If shadow is enabled, apply shadow styles to container and skip background on inner view
  if (shadow) {
    return (
      <View
        style={[
          getShadowStyle(),
          {
            borderRadius,
            marginBottom,
            backgroundColor,
          },
          borderStyle,
          style,
        ]}
        {...otherProps}>
        {children}
      </View>
    );
  }

  // If no shadow, render simple card
  return (
    <View
      style={[
        borderStyle,
        {
          borderRadius,
          marginBottom,
          backgroundColor,
        },
        style,
      ]}
      {...otherProps}>
      {children}
    </View>
  );
}
