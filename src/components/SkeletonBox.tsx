import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  DimensionValue,
  StyleSheet,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const SkeletonBox = ({
  width = 100,
  height = 16,
  borderRadius = 4,
  duration = 1200,
}: {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  duration?: number;
}) => {
  const colorScheme = useColorScheme();
  const shimmerValue = useSharedValue(-1);

  React.useEffect(() => {
    shimmerValue.value = withRepeat(withTiming(1, { duration }), -1, false);
  }, [shimmerValue, duration]);

  const skeletonColors = {
    light: {
      base: '#E5F2FF',
      shimmer: '#CFE0F5',
      highlight: '#B0C9E8',
    },
    dark: {
      base: '#112240',
      shimmer: '#1B263B',
      highlight: '#415A77',
    },
  };

  const palette =
    colorScheme === 'dark' ? skeletonColors.dark : skeletonColors.light;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX:
            shimmerValue.value * (typeof width === 'number' ? width : 200),
        },
      ],
    };
  });

  const containerStyle: ViewStyle = {
    width,
    height,
    backgroundColor: palette.base,
    borderRadius,
    marginVertical: 4,
    overflow: 'hidden',
  };

  return (
    <View style={containerStyle}>
      <Animated.View style={[StyleSheet.absoluteFillObject, animatedStyle]}>
        <LinearGradient
          colors={[palette.shimmer, palette.highlight, palette.shimmer]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>
    </View>
  );
};
