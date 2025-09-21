import { Text, View } from '@/src/components';
import {
  dispatch,
  sendEmailVerificationLinkThunk,
  useAuthSlice,
} from '@/src/store';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function EmailVerificationScreen() {
  const router = useRouter();
  const {
    guestRegistrationResult,
    isVerifyingEmail,
    // isSendingEmailCode,
    isSendingEmailVerificationLink,
    isAuthenticated,
    error,
    clearError,
  } = useAuthSlice();

  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  const email = guestRegistrationResult?.guest?.email!;
  // const firstName = guestRegistrationResult?.guest?.firstName!;

  // Navigate to profile when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/profile');
    }
  }, [isAuthenticated, router]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = useCallback(async () => {
    if (!email) {
      Alert.alert('Error', 'No email address found');
      return;
    }

    dispatch(clearError());

    try {
      // await dispatch(sendEmailVerificationThunk({ email, firstName }));
      await dispatch(sendEmailVerificationLinkThunk());
      setCountdown(60);
    } catch (error) {
      console.log(error);
    }
  }, [clearError, email]);

  // Send initial verification code when screen loads
  useEffect(() => {
    if (email && countdown === 0) {
      handleSendCode();
    }
  }, [email, countdown, handleSendCode]);

  const handleVerifyCode = async () => {
    dispatch(clearError());

    try {
      //   const result = await dispatch(
      //     verifyEmailThunk({
      //       email: email,
      //       code: verificationCode.trim(),
      //     }),
      //   );
      //   if (verifyEmailThunk.fulfilled.match(result)) {
      //     router.replace('/profile');
      //   }
    } catch (error) {
      console.log(error);
      // Error handled by Redux
    }
  };

  const handleBackToRegistration = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View gradient scrollable>
        <View className="items-center py-8 mb-6">
          <Text variant="h3">Verify Your Email</Text>
          <Text className="text-center mt-4 text-gray-600 max-w-[90%]">
            We&apos;ve sent a 6-digit verification code to:
          </Text>
          <Text className="text-center mt-2 font-semibold text-blue-600">
            {email}
          </Text>
          <Text className="text-center mt-2 text-gray-600 max-w-[90%] text-sm">
            Enter the code below to complete your registration
          </Text>
        </View>

        {/* Verification Code Input */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">
            Verification Code
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 text-lg font-mono text-center tracking-widest"
            value={verificationCode}
            onChangeText={setVerificationCode}
            placeholder="000000"
            keyboardType="number-pad"
            maxLength={6}
            autoComplete="one-time-code"
            textContentType="oneTimeCode"
          />
        </View>

        {/* Error/Success Messages */}
        {error && (
          <View className="mb-4 p-3 bg-red-50 rounded-lg">
            <Text className="text-red-600 text-center text-sm">{error}</Text>
          </View>
        )}

        {/* Verify Button */}
        <TouchableOpacity
          disabled={isVerifyingEmail || verificationCode.length !== 6}
          onPress={handleVerifyCode}
          className={`py-4 rounded-lg mb-4 ${
            isVerifyingEmail || verificationCode.length !== 6
              ? 'bg-gray-400'
              : 'bg-blue-500'
          }`}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {isVerifyingEmail ? 'Verifying...' : 'Verify Email'}
          </Text>
        </TouchableOpacity>

        {/* Resend Code */}
        <TouchableOpacity
          disabled={isSendingEmailVerificationLink || countdown > 0}
          onPress={handleSendCode}
          className="py-3 mb-6"
        >
          <Text
            className={`text-center ${
              countdown > 0 ? 'text-gray-400' : 'text-blue-500'
            }`}
          >
            {countdown > 0
              ? `Resend code in ${countdown}s`
              : isSendingEmailVerificationLink
                ? 'Sending code...'
                : 'Resend verification code'}
          </Text>
        </TouchableOpacity>

        {/* Back Button */}
        <TouchableOpacity onPress={handleBackToRegistration} className="py-3">
          <Text className="text-gray-600 text-center">
            Back to Registration
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
