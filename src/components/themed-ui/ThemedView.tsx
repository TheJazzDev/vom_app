import { View, type ViewProps } from 'react-native';

import { useTheme } from '@/src/hooks';

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
        className='bg-background-primary dark:bg-background-dark-primary'
        {...otherProps}
      />
    );

  return (
    <View
      className='bg-background-primary dark:bg-background-dark-primary'
      style={[
        {
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
