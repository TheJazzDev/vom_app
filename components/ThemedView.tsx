import { View, type ViewProps } from 'react-native';

import { useTheme } from '@/hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps & {
  safe?: boolean;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  darkColor,
  lightColor,
  safe = false,
  ...otherProps
}: ThemedViewProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  if (!safe)
    return (
      <View
        style={[{ backgroundColor: theme.uiBackground }, style]}
        {...otherProps}
      />
    );

  return (
    <View
      style={[
        {
          backgroundColor: theme.uiBackground,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: 10,
          height: '100%',
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
