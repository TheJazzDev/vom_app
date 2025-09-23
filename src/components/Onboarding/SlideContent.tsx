import { Text } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import React from 'react';
import { View } from 'react-native';

interface SlideContentProps {
  slide: OnboardingSlide;
}

export function SlideContent({ slide }: SlideContentProps) {
  return (
    <View className="flex-1 justify-center items-center px-8">
      {/* Icon */}
      <View
        style={{
          width: 160,
          height: 160,
          borderRadius: 80,
          backgroundColor: '#E5F2FF',
          marginBottom: 48,
          shadowColor: slide.accentColor,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 10,
        }}
        className="items-center justify-center"
      >
        <IconSymbol
          name={slide.icon as any}
          size={80}
          color={slide.iconColor}
        />
        <View
          style={{
            position: 'absolute',
            top: -10,
            right: -10,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: slide.accentColor,
          }}
          className="items-center justify-center"
        >
          <IconSymbol name="sparkles" size={20} color="white" />
        </View>
      </View>

      {/* Content */}
      <View className="items-center">
        <Text
          variant="h1"
          className="text-center font-bold mb-3"
          style={{ color: slide.accentColor }}
        >
          {slide.title}
        </Text>

        <Text
          variant="h3"
          className="text-center font-semibold mb-6 text-gray-700 dark:text-gray-300"
        >
          {slide.subtitle}
        </Text>

        <Text
          variant="body"
          className="text-center leading-7 text-gray-600 dark:text-gray-400 max-w-sm"
        >
          {slide.description}
        </Text>
      </View>
    </View>
  );
}
