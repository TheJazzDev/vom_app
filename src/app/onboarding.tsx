import {
  FloatingBackground,
  NavigationButtons,
  PageIndicators,
  SlideContent,
} from '@/src/components/Onboarding';
import { onboardingSlides } from '@/src/constants/onboardingData';
import { useBackHandler } from '@/src/hooks/useBackHandler';
import { useOnboardingState } from '@/src/hooks/useOnboardingState';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, ScrollView, View } from 'react-native';
import { ROUTES } from '../constants';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<ScrollView>(null);
  const router = useRouter();
  const { completeOnboarding } = useOnboardingState();

  const currentSlide = onboardingSlides[currentIndex];

  const onComplete = async () => {
    await completeOnboarding(true);

    setTimeout(() => {
      router.replace(ROUTES.HOME);
    }, 100);
  };

  const goToNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      slideRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      onComplete();
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      slideRef.current?.scrollTo({
        x: prevIndex * width,
        animated: true,
      });
    }
  };

  // Handle Android back button - prevents accidental exit during onboarding
  const handleBackPress = useCallback(() => {
    if (currentIndex > 0) {
      // If not on first slide, go to previous slide
      goToPrevious();
      return true; // Prevent default back behavior
    } else {
      // On first slide, show confirmation dialog
      Alert.alert(
        'Exit Onboarding?',
        'Are you sure you want to exit? You can complete this later.',
        [
          { text: 'Stay', style: 'cancel' },
          {
            text: 'Exit',
            style: 'destructive',
            onPress: () => {
              router.replace(ROUTES.HOME);
            },
          },
        ],
      );
      return true; // Prevent default back behavior
    }
  }, [currentIndex, goToPrevious]);

  useBackHandler(handleBackPress);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false },
  );

  const onMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <View className={`flex-1 ${currentSlide.backgroundColor}`}>
      <FloatingBackground accentColor={currentSlide.accentColor} />

      {/* Slides */}
      <ScrollView
        ref={slideRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {onboardingSlides.map((slide) => (
          <View key={slide.id} style={{ width }}>
            <SlideContent slide={slide} />
          </View>
        ))}
      </ScrollView>

      <View className="pb-12 px-8">
        <PageIndicators
          slides={onboardingSlides}
          currentIndex={currentIndex}
          accentColor={currentSlide.accentColor}
        />

        <NavigationButtons
          currentIndex={currentIndex}
          totalSlides={onboardingSlides.length}
          accentColor={currentSlide.accentColor}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onComplete={onComplete}
        />
      </View>
    </View>
  );
}
