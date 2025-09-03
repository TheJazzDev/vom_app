import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import React, { useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

const VerifyEmailSuccess = ({
  onGoToDashboard,
}: {
  onGoToDashboard?: () => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Confetti animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(confettiAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(confettiAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [confettiAnim, fadeAnim, scaleAnim, slideAnim]);

  return (
    <View className="flex-1 bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
      {/* Confetti */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 300,
          opacity: confettiAnim,
        }}
      >
        <View className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full" />
        <View className="absolute top-24 right-16 w-3 h-3 bg-green-500 rounded-full" />
        <View className="absolute top-16 left-1/3 w-4 h-4 bg-blue-500 rounded-full" />
        <View className="absolute top-28 right-1/3 w-3 h-3 bg-purple-500 rounded-full" />
        <View className="absolute top-18 left-3/4 w-4 h-4 bg-pink-500 rounded-full" />
        <View className="absolute top-22 right-1/4 w-3 h-3 bg-orange-500 rounded-full" />
      </Animated.View>

      {/* Main Content */}
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
          transform: [
            //   { opacity: fadeAnim },
            { translateY: slideAnim },
          ],
        }}
      >
        {/* Success Icon */}
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            marginBottom: 32,
          }}
        >
          <View className="w-40 h-40 bg-green-500 rounded-full items-center justify-center shadow-2xl relative">
            <View className="w-32 h-32 bg-white rounded-full items-center justify-center">
              <IconSymbol
                name="checkmark.circle.fill"
                size={80}
                color="#22c55e"
              />
            </View>
            <View className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-full items-center justify-center border-4 border-white">
              <IconSymbol name="sparkles" size={20} color="white" />
            </View>
          </View>
        </Animated.View>

        {/* Success Message */}
        <View className="items-center mb-8">
          <Text className="text-4xl font-bold text-green-600 dark:text-green-400 text-center mb-4">
            Verified!
          </Text>

          <Text className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center mb-4">
            Email Successfully Verified
          </Text>

          <Text className="text-base text-gray-600 dark:text-gray-400 text-center max-w-sm">
            Your email has been verified successfully. You can now access all
            features of your church account.
          </Text>
        </View>

        {/* Features Unlocked */}
        <View className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
          <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
            Account Features Unlocked:
          </Text>

          <View className="space-y-3">
            <View className="flex-row items-center">
              <IconSymbol
                name="checkmark.circle.fill"
                size={20}
                color="#22c55e"
              />
              <Text className="ml-3 text-gray-600 dark:text-gray-400">
                Service notifications
              </Text>
            </View>

            <View className="flex-row items-center">
              <IconSymbol
                name="checkmark.circle.fill"
                size={20}
                color="#22c55e"
              />
              <Text className="ml-3 text-gray-600 dark:text-gray-400">
                Member directory access
              </Text>
            </View>

            <View className="flex-row items-center">
              <IconSymbol
                name="checkmark.circle.fill"
                size={20}
                color="#22c55e"
              />
              <Text className="ml-3 text-gray-600 dark:text-gray-400">
                Prayer request submissions
              </Text>
            </View>

            <View className="flex-row items-center">
              <IconSymbol
                name="checkmark.circle.fill"
                size={20}
                color="#22c55e"
              />
              <Text className="ml-3 text-gray-600 dark:text-gray-400">
                Event updates
              </Text>
            </View>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          onPress={onGoToDashboard}
          className="w-full max-w-sm bg-gradient-to-r from-green-500 to-blue-500 py-4 rounded-xl shadow-lg"
        >
          <View className="flex-row items-center justify-center">
            <IconSymbol name="house.fill" size={20} color="white" />
            <Text className="text-white font-bold text-lg ml-2">
              Go to Dashboard
            </Text>
          </View>
        </TouchableOpacity>

        {/* Welcome Message */}
        <View className="mt-6 bg-green-100 dark:bg-green-900/30 rounded-xl p-4 w-full max-w-sm">
          <Text className="text-green-700 dark:text-green-300 text-center font-medium">
            Welcome to the church family! Your spiritual journey begins here.
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default VerifyEmailSuccess;
