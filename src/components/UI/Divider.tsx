import { useTheme } from '@/src/hooks';
import { DimensionValue, View, type ViewProps } from 'react-native';

export type DividerProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  height?: DimensionValue | undefined;
  width?: DimensionValue | undefined;
  type?: 'vertical' | 'horizontal';
  variant?: 'solid' | 'dashed' | 'dotted';
  colorVariant?: 'border' | 'muted';
  thickness?: number;
  spacing?: number;
  opacity?: number;
};

export function Divider({
  style,
  width,
  height,
  darkColor,
  lightColor,
  type = 'horizontal',
  variant = 'solid',
  colorVariant = 'border',
  thickness,
  spacing = 2,
  opacity = 1,
  ...otherProps
}: DividerProps) {
  const theme = useTheme();

  let dividerColor: string;
  if (colorVariant === 'muted') {
    dividerColor = theme.muted;
  } else {
    dividerColor = theme.border;
  }

  const isVertical = type === 'vertical';
  const defaultThickness = thickness ?? (isVertical ? 1 : 0.5);

  const dividerStyle = {
    backgroundColor: dividerColor,
    opacity,
    ...(isVertical
      ? {
          width: defaultThickness,
          height: height ?? '100%',
          marginHorizontal: spacing,
        }
      : {
          width: width ?? '100%',
          height: height ?? defaultThickness,
          marginVertical: spacing,
        }),
    ...(variant !== 'solid' && {
      borderStyle: variant,
      borderWidth: defaultThickness,
      backgroundColor: 'transparent',
      borderColor: dividerColor,
      ...(isVertical
        ? {
            borderLeftWidth: defaultThickness,
            width: 0,
          }
        : {
            borderTopWidth: defaultThickness,
            height: 0,
          }),
    }),
  };

  return <View style={[dividerStyle, style]} {...otherProps} />;
}
