import { Spacer, Text } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import React from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';

interface PageIndicatorsProps {
  slides: OnboardingSlide[];
  currentIndex: number;
  accentColor: string;
}

export function PageIndicators({
  slides,
  currentIndex,
  accentColor,
}: PageIndicatorsProps) {
  return (
    <View className="flex-row justify-center mb-8">
      {slides.map((_, index) => (
        <Animated.View
          key={index}
          style={{
            width: index === currentIndex ? 24 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor:
              index === currentIndex ? accentColor : `${accentColor}30`,
            marginHorizontal: 4,
          }}
        />
      ))}
    </View>
  );
}

interface NavigationButtonsProps {
  currentIndex: number;
  totalSlides: number;
  accentColor: string;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
}

export function NavigationButtons({
  currentIndex,
  totalSlides,
  accentColor,
  onPrevious,
  onNext,
  onComplete,
}: NavigationButtonsProps) {
  const isLastSlide = currentIndex === totalSlides - 1;

  return (
    <View>
      {/* Navigation Buttons */}
      <View className="flex-row justify-between items-center">
        {currentIndex > 0 ? (
          <TouchableOpacity
            onPress={onPrevious}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: 'white',
              shadowColor: accentColor,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4,
            }}
            className="items-center justify-center"
          >
            <IconSymbol name="chevron.left" size={24} color={accentColor} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 56 }} />
        )}

        {/* Progress Circle */}
        <View className="items-center">
          <Text className="text-gray-500 dark:text-gray-400 text-sm mb-2">
            {currentIndex + 1} of {totalSlides}
          </Text>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              borderWidth: 3,
              borderColor: `${accentColor}30`,
            }}
            className="items-center justify-center"
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: accentColor,
              }}
              className="items-center justify-center"
            >
              <Text className="text-white font-bold">
                {Math.round(((currentIndex + 1) / totalSlides) * 100)}%
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={isLastSlide ? onComplete : onNext}
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: accentColor,
            shadowColor: accentColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
          className="items-center justify-center"
        >
          {isLastSlide ? (
            <IconSymbol name="checkmark" size={24} color="white" />
          ) : (
            <IconSymbol name="chevron.right" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>

      {/* Call to Action */}
      {isLastSlide ? (
        <View className="mt-6">
          <TouchableOpacity
            onPress={onComplete}
            style={{ backgroundColor: accentColor }}
            className="py-4 px-8 rounded-xl items-center"
          >
            <Text className="text-white font-bold text-lg">Get Started</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Spacer height={73} />
      )}
    </View>
  );
}
