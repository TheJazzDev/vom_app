import { RHFTextInput, Text, View } from '@/src/components';
import { dispatch, loginThunk, useAuthSlice } from '@/src/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import * as yup from 'yup';

// Verification schema
const verificationSchema = yup.object().shape({
  verificationCode: yup
    .string()
    .required('Verification code is required')
    .length(6, 'Verification code must be 6 digits'),
});

export default function VerifyPhoneScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { error, isLoggingIn, clearError } = useAuthSlice();

  const phoneNumber = params.phoneNumber as string;

  const { control, handleSubmit, watch } = useForm<PhoneVerificationFormData>({
    resolver: yupResolver(verificationSchema),
    defaultValues: {
      verificationCode: '',
    },
  });

  const verificationCode = watch('verificationCode');

  const onSubmit = async (data: PhoneVerificationFormData) => {
    dispatch(clearError());

    try {
      const result = await dispatch(
        loginThunk({
          emailOrPhone: phoneNumber,
          verificationCode: data.verificationCode,
        }),
      );

      if (loginThunk.fulfilled.match(result)) {
        console.log('Phone verification successful');
        // Navigation handled by auth state management
      }
    } catch (error: any) {
      console.error('Verification failed:', error);
    }
  };

  const handleResendCode = async () => {
    dispatch(clearError());

    try {
      const result = await dispatch(
        loginThunk({
          emailOrPhone: phoneNumber,
        }),
      );

      if (loginThunk.rejected.match(result)) {
        const errorMessage = result.payload as string;
        if (errorMessage === 'SMS_CODE_SENT') {
          console.log('Verification code resent');
        }
      }
    } catch (error: any) {
      console.error('Failed to resend code:', error);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View gradient scrollable>
        <View className="items-center py-6 mb-8">
          <Text variant="h2">Verify Phone Number</Text>
          <Text className="text-center mt-2 text-gray-600 max-w-[90%]">
            We&apos;ve sent a 6-digit verification code to
          </Text>
          <Text className="text-center font-semibold text-lg mt-1">
            {phoneNumber}
          </Text>
        </View>

        {/* Verification Form */}
        <View className="mb-6">
          <RHFTextInput
            control={control}
            name="verificationCode"
            inputType="text"
            label="Verification Code"
            leftIcon="lock"
            placeholder="000000"
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
            textAlign="center"
            className="text-2xl tracking-widest"
          />
        </View>

        {/* Error Messages */}
        {error && (
          <View className="mb-4 p-3 bg-red-50 rounded-lg">
            <Text className="text-red-600 text-center text-sm">{error}</Text>
          </View>
        )}

        {/* Verify Button */}
        <TouchableOpacity
          disabled={isLoggingIn || verificationCode.length !== 6}
          onPress={handleSubmit(onSubmit)}
          className={`py-4 rounded-lg mb-6 ${
            isLoggingIn || verificationCode.length !== 6
              ? 'bg-gray-400'
              : 'bg-blue-500'
          }`}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {isLoggingIn ? 'Verifying...' : 'Verify Code'}
          </Text>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View className="flex-row justify-between mb-8">
          <TouchableOpacity
            onPress={handleResendCode}
            className="py-3 px-6 rounded-lg border border-blue-500"
            disabled={isLoggingIn}
          >
            <Text className="text-blue-500 font-medium">Resend Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleBackToLogin}
            className="py-3 px-6 rounded-lg border border-gray-300"
          >
            <Text className="text-gray-600 font-medium">Back to Login</Text>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View className="p-4 bg-blue-50 rounded-lg">
          <Text className="text-blue-800 text-sm text-center">
            <Text className="font-semibold">
              Didn&apos;t receive the code?{' '}
            </Text>
            Check your messages or try resending. The code expires in 10
            minutes.
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
