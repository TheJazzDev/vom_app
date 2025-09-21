import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { Text } from './UI';

interface ProgressStep {
  label?: string;
  description?: string;
  completed: boolean;
  active: boolean;
}

interface ProgressIndicatorProps {
  steps: ProgressStep[];
  currentStep: number;
  className?: string;
}

export default function ProgressIndicator({
  steps,
  currentStep,
  className = '',
}: ProgressIndicatorProps) {
  const progressAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: (currentStep / (steps.length - 1)) * 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [currentStep, steps.length, progressAnimation]);

  return (
    <View className={`mb-6 ${className}`}>
      {/* Progress Bar */}
      <View className="relative mb-4">
        <View
          className="h-2 bg-border dark:bg-dark-border rounded-full"
          style={{}}
        >
          <Animated.View
            className="h-2 bg-brand dark:bg-dark-brand rounded-full"
            style={{
              width: progressAnimation.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            }}
          />
        </View>

        {/* Step Indicators */}
        <View className="absolute -top-1 left-0 right-0 flex-row justify-between">
          {steps.map((step, index) => (
            <View
              key={index}
              className={`w-4 h-4 rounded-full border-2 border-blue-600 dark:border-blue-400 ${
                step.completed
                  ? 'bg-brand dark:bg-dark-brand'
                  : step.active
                    ? 'bg-white border-blue-500'
                    : 'bg-white border-gray-300'
              }`}
            />
          ))}
        </View>
      </View>

      {/* Current Step Info */}
      <View className="items-center">
        {steps[currentStep]?.label && (
          <Text className="font-semibold text-gray-800 mb-1">
            {steps[currentStep]?.label}
          </Text>
        )}
        {steps[currentStep]?.description && (
          <Text className="text-sm text-gray-600 text-center">
            {steps[currentStep].description}
          </Text>
        )}
      </View>
    </View>
  );
}
