import { Spacer, Text } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  iconColor: string;
  backgroundColor: string;
  accentColor: string;
}

const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Welcome',
    subtitle: 'Cherubim and Seraphim Movement Church (Ayo Ni O)',
    description:
      'Experience spiritual growth and community fellowship right from your mobile device. Join Valley of Mercy family.',
    icon: 'building.2',
    iconColor: '#3b82f6',
    backgroundColor: 'bg-blue-50 dark:bg-blue-950',
    accentColor: '#3b82f6',
  },
  {
    id: 2,
    title: 'Stay Connected',
    subtitle: 'Never Miss a Service',
    description:
      'Get real-time updates about service schedules, special events, and church announcements. Your spiritual journey stays on track.',
    icon: 'bell.badge',
    iconColor: '#10b981',
    backgroundColor: 'bg-green-50 dark:bg-green-950',
    accentColor: '#10b981',
  },
  {
    id: 3,
    title: 'Community & Prayer',
    subtitle: 'Share Your Heart',
    description:
      'Connect with fellow believers, submit prayer requests, and join our community of faith. Together, we grow stronger.',
    icon: 'hands.sparkles',
    iconColor: '#8b5cf6',
    backgroundColor: 'bg-purple-50 dark:bg-purple-950',
    accentColor: '#8b5cf6',
  },
  {
    id: 4,
    title: 'Ready to Begin?',
    subtitle: 'Your Spiritual Journey Awaits',
    description:
      "Join thousands of believers in experiencing God's love and building lasting relationships in our church community.",
    icon: 'heart',
    iconColor: '#f59e0b',
    backgroundColor: 'bg-amber-50 dark:bg-amber-950',
    accentColor: '#f59e0b',
  },
];

const OnboardingScreens: React.FC<OnboardingScreenProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<ScrollView>(null);

  const router = useRouter();

  const onComplete = () => {
    router.push('/');
  };

  // Floating animation refs
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;
  const float3 = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Floating animations
    const createFloatingAnimation = (
      animValue: Animated.Value,
      duration: number,
    ) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: -20,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
        ]),
      );
    };

    createFloatingAnimation(float1, 3000).start();
    createFloatingAnimation(float2, 4000).start();
    createFloatingAnimation(float3, 3500).start();
  }, [float1, float2, float3]);

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

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false },
  );

  const onMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const currentSlide = onboardingSlides[currentIndex];

  return (
    <View className={`flex-1 ${currentSlide.backgroundColor}`}>
      {/* Background Decorative Elements */}
      <Animated.View
        style={{
          position: 'absolute',
          top: height * 0.1,
          left: width * 0.1,
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: `${currentSlide.accentColor}20`,
          transform: [{ translateY: float1 }],
        }}
      />

      <Animated.View
        style={{
          position: 'absolute',
          top: height * 0.15,
          right: width * 0.15,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: `${currentSlide.accentColor}15`,
          transform: [{ translateY: float2 }],
        }}
      />

      <Animated.View
        style={{
          position: 'absolute',
          bottom: height * 0.06,
          left: width * 0.2,
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: `${currentSlide.accentColor}10`,
          transform: [{ translateY: float3 }],
        }}
      />

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
          <View
            key={slide.id}
            style={{ width }}
            className="flex-1 justify-center items-center px-8"
          >
            {/* Icon */}
            <View
              style={{
                width: 160,
                height: 160,
                borderRadius: 80,
                backgroundColor: 'white',
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
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View className="pb-12 px-8">
        {/* Page Indicators */}
        <View className="flex-row justify-center mb-8">
          {onboardingSlides.map((_, index) => (
            <Animated.View
              key={index}
              style={{
                width: index === currentIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  index === currentIndex
                    ? currentSlide.accentColor
                    : `${currentSlide.accentColor}30`,
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View className="flex-row justify-between items-center">
          {currentIndex > 0 ? (
            <TouchableOpacity
              onPress={goToPrevious}
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: 'white',
                shadowColor: currentSlide.accentColor,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 4,
              }}
              className="items-center justify-center"
            >
              <IconSymbol
                name="chevron.left"
                size={24}
                color={currentSlide.accentColor}
              />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 56 }} />
          )}

          {/* Progress Circle */}
          <View className="items-center">
            <Text className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              {currentIndex + 1} of {onboardingSlides.length}
            </Text>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                borderWidth: 3,
                borderColor: `${currentSlide.accentColor}30`,
              }}
              className="items-center justify-center"
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: currentSlide.accentColor,
                }}
                className="items-center justify-center"
              >
                <Text className="text-white font-bold">
                  {Math.round(
                    ((currentIndex + 1) / onboardingSlides.length) * 100,
                  )}
                  %
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={goToNext}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: currentSlide.accentColor,
              shadowColor: currentSlide.accentColor,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
            }}
            className="items-center justify-center"
          >
            {currentIndex === onboardingSlides.length - 1 ? (
              <IconSymbol name="checkmark" size={24} color="white" />
            ) : (
              <IconSymbol name="chevron.right" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>

        {/* Call to Action */}
        {currentIndex === onboardingSlides.length - 1 ? (
          <View className="mt-6">
            <TouchableOpacity
              onPress={onComplete}
              style={{ backgroundColor: currentSlide.accentColor }}
              className="py-4 px-8 rounded-xl items-center"
            >
              <Text className="text-white font-bold text-lg">Get Started</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Spacer height={73} />
        )}
      </View>
    </View>
  );
};

export default OnboardingScreens;
