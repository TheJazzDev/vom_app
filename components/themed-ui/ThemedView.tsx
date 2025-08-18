import { View, type ViewProps } from 'react-native';

import { useTheme } from '@/hooks';

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
          paddingTop: 10,
          paddingBottom: 10,
          paddingHorizontal: 10,
          height: '100%',
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
