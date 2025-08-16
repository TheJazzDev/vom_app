import { View, type ViewProps } from 'react-native';

import { useTheme } from '@/hooks';

export type ThemedDividerProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  height?: number;
  width?: number;
  type?: 'vertical' | 'horizontal';
};

export function ThemedDivider({
  style,
  width,
  height,
  darkColor,
  lightColor,
  type = 'horizontal',
  ...otherProps
}: ThemedDividerProps) {
  const theme = useTheme();

  const defaultHeight = type === 'vertical' ? 10 : 0.5;
  const defaultWidth = type === 'vertical' ? 0.5 : '100%';

  if (type === 'vertical') {
    return (
      <View
        style={[
          {
            width: width ?? defaultWidth,
            height: height ?? defaultHeight,
            backgroundColor: theme.border,
          },
          style,
        ]}
        {...otherProps}
      />
    );
  }

  return (
    <View
      style={[
        {
          width: width ?? defaultWidth,
          height: height ?? defaultHeight,
          backgroundColor: theme.border,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
