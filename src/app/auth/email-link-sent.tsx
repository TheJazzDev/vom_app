import { Button, View, ErrorToast } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Text } from 'react-native';
import { dispatch, sendEmailVerificationLinkThunk } from '@/src/store';

const { width, height } = Dimensions.get('window');

const EmailLinkSent = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;

  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string; password?: string }>();
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(0);

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
    ]).start();

    // Pulse animation for email icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Floating animations
    const floatingAnimation1 = Animated.loop(
      Animated.sequence([
        Animated.timing(float1, {
          toValue: -20,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(float1, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    );

    const floatingAnimation2 = Animated.loop(
      Animated.sequence([
        Animated.timing(float2, {
          toValue: -15,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(float2, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
    );

    floatingAnimation1.start();
    floatingAnimation2.start();
  }, [fadeAnim, float1, float2, pulseAnim, slideAnim]);

  // Countdown timer for rate limiting
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleResendEmail = async () => {
    if (!canResend) return;

    setIsResending(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // If we have email and password from login attempt, use them
      const credentials =
        params.email && params.password
          ? { email: params.email, password: params.password }
          : undefined;

      const result = await dispatch(sendEmailVerificationLinkThunk(credentials));

      if (sendEmailVerificationLinkThunk.fulfilled.match(result)) {
        setSuccessMessage('Verification email sent successfully! Check your inbox.');
        setCanResend(false);
        setCountdown(60); // 60 seconds cooldown
      } else {
        setError(
          result.payload as string ||
            'Failed to resend verification email. Please try again.',
        );
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <View
      gradient
      className="flex-1 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"
    >
      {/* Floating Background Elements */}
      <Animated.View
        style={{
          position: 'absolute',
          top: height * 0.15,
          left: width * 0.1,
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          transform: [{ translateY: float1 }],
        }}
      />

      <Animated.View
        style={{
          position: 'absolute',
          top: height * 0.2,
          right: width * 0.15,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          transform: [{ translateY: float2 }],
        }}
      />

      {/* Main Content */}
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
          transform: [
            // { opacity: fadeAnim },
            { translateY: slideAnim },
          ],
        }}
      >
        {/* Email Icon with Animation */}
        <Animated.View
          style={{
            transform: [{ scale: pulseAnim }],
            marginBottom: 32,
          }}
        >
          <View className="w-32 h-32 bg-green-500 rounded-full items-center justify-center shadow-2xl relative">
            <IconSymbol name="envelope.badge.fill" size={64} color="white" />
            <View className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full items-center justify-center border-2 border-white">
              <IconSymbol name="paperplane.fill" size={14} color="white" />
            </View>
          </View>
        </Animated.View>

        {/* Success Message */}
        <View className="items-center mb-6 sm:mb-8">
          <Text className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-3 sm:mb-4">
            Check Your Email!
          </Text>

          <Text className="text-base sm:text-lg text-gray-600 dark:text-gray-400 text-center mb-2 max-w-sm px-4">
            We have sent an email with a verification link to your email address.
          </Text>

          <Text className="text-sm sm:text-base text-gray-500 dark:text-gray-500 text-center max-w-sm px-4">
            Open your email and click the link to verify your account.
          </Text>
        </View>

        {/* Success Message */}
        {successMessage && (
          <View className="bg-green-100 dark:bg-green-900 rounded-xl p-3 sm:p-4 w-full mb-4">
            <Text className="text-xs sm:text-sm text-green-700 dark:text-green-300 text-center">
              {successMessage}
            </Text>
          </View>
        )}

        {/* Error Toast */}
        {error && (
          <ErrorToast
            error={error}
            onClearError={() => setError(null)}
          />
        )}

        {/* Help Text */}
        <View className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3 sm:p-4 w-full mb-4 sm:mb-6">
          <Text className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
            Didn&apos;t receive the email? Check your spam folder or wait a few
            minutes.
          </Text>
        </View>

        {/* Resend Button */}
        <Button
          onPress={handleResendEmail}
          variant="secondary"
          textVariant="h5"
          fullWidth
          disabled={!canResend || isResending}
          className="mb-3 sm:mb-4"
        >
          {isResending
            ? 'Sending...'
            : canResend
              ? 'Resend Verification Email'
              : `Resend in ${countdown}s`}
        </Button>

        <Button
          onPress={() => router.push('/auth')}
          variant="outline"
          textVariant="h5"
          fullWidth
        >
          Proceed to Sign In
        </Button>
      </Animated.View>
    </View>
  );
};

export default EmailLinkSent;
