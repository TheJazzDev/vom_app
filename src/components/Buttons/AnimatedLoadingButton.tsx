import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface AnimatedLoadingButtonProps {
  onPress: () => void;
  disabled?: boolean;
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
  className?: string;
  spinner?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function AnimatedLoadingButton({
  onPress,
  disabled = false,
  isLoading,
  loadingText,
  children,
  className = '',
  spinner = false,
  variant = 'primary',
}: AnimatedLoadingButtonProps) {
  const spinValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  // const opacityValue = useRef(new Animated.Value(1)).current;

  // Spinning animation for loading
  useEffect(() => {
    if (isLoading) {
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      );

      const scaleAnimation = Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.95,
          duration: 200,
          useNativeDriver: true,
        }),
      ]);

      spinAnimation.start();
      scaleAnimation.start();
    } else {
      spinValue.setValue(0);
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading, spinValue, scaleValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getButtonStyles = () => {
    const baseStyles =
      'mb-6 py-4 rounded-lg flex-row items-center justify-center';

    if (disabled || isLoading) {
      return `${baseStyles} bg-gray-400`;
    }

    switch (variant) {
      case 'primary':
        return `${baseStyles} bg-blue-500`;
      case 'secondary':
        return `${baseStyles} bg-gray-600`;
      case 'outline':
        return `${baseStyles} border-2 border-blue-500 bg-transparent`;
      default:
        return `${baseStyles} bg-blue-500`;
    }
  };

  const getTextColor = () => {
    if (variant === 'outline' && !disabled && !isLoading) {
      return 'text-blue-500';
    }
    return 'text-white';
  };

  const LoadingSpinner = () => (
    <Animated.View
      style={{
        transform: [{ rotate: spin }],
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'transparent',
        borderTopColor: 'white',
        marginRight: 8,
      }}
    />
  );

  // const LoadingDots = () => {
  //   const dot1 = useRef(new Animated.Value(0)).current;
  //   const dot2 = useRef(new Animated.Value(0)).current;
  //   const dot3 = useRef(new Animated.Value(0)).current;

  //   useEffect(() => {
  //     if (isLoading) {
  //       const createDotAnimation = (dot: Animated.Value, delay: number) =>
  //         Animated.loop(
  //           Animated.sequence([
  //             Animated.delay(delay),
  //             Animated.timing(dot, {
  //               toValue: 1,
  //               duration: 300,
  //               useNativeDriver: true,
  //             }),
  //             Animated.timing(dot, {
  //               toValue: 0,
  //               duration: 300,
  //               useNativeDriver: true,
  //             }),
  //           ]),
  //         );

  //       createDotAnimation(dot1, 0).start();
  //       createDotAnimation(dot2, 200).start();
  //       createDotAnimation(dot3, 400).start();
  //     }
  //   }, [dot1, dot2, dot3]);

  //   return (
  //     <View className="flex-row items-center mr-2">
  //       {[dot1, dot2, dot3].map((dot, index) => (
  //         <Animated.View
  //           key={index}
  //           style={{
  //             width: 4,
  //             height: 4,
  //             borderRadius: 2,
  //             backgroundColor: 'white',
  //             marginHorizontal: 1,
  //             opacity: dot,
  //           }}
  //         />
  //       ))}
  //     </View>
  //   );
  // };

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleValue }],
      }}
    >
      <TouchableOpacity
        disabled={disabled || isLoading}
        onPress={onPress}
        className={`${getButtonStyles()} ${className}`}
        activeOpacity={0.8}
      >
        {isLoading && (
          <View className="flex-row items-center mr-2">
            {spinner ? (
              <LoadingSpinner />
            ) : (
              <ActivityIndicator size="small" color="white" />
            )}
          </View>
        )}

        <Text className={`text-center font-semibold text-lg ${getTextColor()}`}>
          {isLoading && loadingText ? loadingText : children}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
