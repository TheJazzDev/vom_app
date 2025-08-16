import { View, type ViewProps } from 'react-native';

import { useTheme } from '@/hooks';

export type ThemedCardProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedCard({
  style,
  darkColor,
  lightColor,
  ...otherProps
}: ThemedCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.card,
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 8,
          borderWidth: 0.5,
          borderColor: theme.border
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
