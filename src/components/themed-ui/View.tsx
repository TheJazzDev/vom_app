import { View as RNView, type ViewProps as RNViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ViewProps = RNViewProps & {
  safe?: boolean;
  lightColor?: string;
  darkColor?: string;
};

export function View({
  style,
  darkColor,
  lightColor,
  safe = false,
  ...otherProps
}: ViewProps) {
  if (!safe)
    return (
      <RNView
        className='bg-background-primary dark:bg-background-dark-primary'
        {...otherProps}
      />
    );

  return (
    <RNView
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
