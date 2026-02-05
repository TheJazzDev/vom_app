import {
  AnimatedLoadingButton,
  Button,
  Card,
  ErrorToast,
  Text,
  View,
} from '@/src/components';
import { ROUTES } from '@/src/constants';
import {
  dispatch,
  useAuthSlice,
  verifyPhoneLoginCodeThunk,
} from '@/src/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as yup from 'yup';

const verificationSchema = yup.object().shape({
  d1: yup.string().required().length(1),
  d2: yup.string().required().length(1),
  d3: yup.string().required().length(1),
  d4: yup.string().required().length(1),
});

type FormData = yup.InferType<typeof verificationSchema>;

export default function VerifyPhoneLoginScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { error, phoneMemberFound, isVerifyingPhoneCode, clearError } =
    useAuthSlice();

  const phoneNumber = params.phoneNumber as string;
  const verificationId = params.verificationId as string;

  const { control, handleSubmit, watch } = useForm<FormData>({
    resolver: yupResolver(verificationSchema),
    defaultValues: { d1: '', d2: '', d3: '', d4: '' },
  });

  const inputs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const code = Object.values(watch()).join('');

  const onSubmit = async (data: FormData) => {
    dispatch(clearError());
    const verificationCode = Object.values(data).join('');
    try {
      const result = await dispatch(
        verifyPhoneLoginCodeThunk({
          verificationId,
          code: verificationCode,
          member: phoneMemberFound,
        }),
      );

      if (verifyPhoneLoginCodeThunk.fulfilled.match(result)) {
        router.replace(ROUTES.HOME);
      }
    } catch (error: any) {
      console.error('Verification failed:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View gradient scrollable>
        <View className="items-center py-6 sm:py-8">
          <View className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full items-center justify-center mb-3 sm:mb-4">
            <Text className="text-3xl sm:text-4xl">🔐</Text>
          </View>
          <Text variant="h2" className="text-center">
            Verify Phone Number
          </Text>
          <Text className="text-center mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-[90%]">
            We&apos;ve sent a 4-digit verification code to
          </Text>
          <Text className="text-center font-semibold text-base sm:text-lg mt-1">
            {phoneNumber}
          </Text>
        </View>

        <Card variant="gradient-soft" className="p-3 sm:p-4 mb-4 sm:mb-6">
          <Text className="text-xs sm:text-sm text-center text-gray-700 dark:text-gray-300">
            Enter the 4-digit code sent to your phone to complete sign in
          </Text>
        </Card>

        {/* 4-digit input */}
        <View className="flex-row justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          {['d1', 'd2', 'd3', 'd4'].map((name, idx) => (
            <Controller
              key={name}
              control={control}
              name={name as keyof FormData}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  ref={inputs[idx]}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text);
                    if (text && idx < 3) inputs[idx + 1].current?.focus();
                  }}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace' && !value && idx > 0) {
                      inputs[idx - 1].current?.focus();
                    }
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-semibold border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                />
              )}
            />
          ))}
        </View>

        <ErrorToast error={error} onClearError={clearError} />

        {/* Verify Button */}
        <AnimatedLoadingButton
          isLoading={isVerifyingPhoneCode}
          disabled={isVerifyingPhoneCode || code.length !== 4}
          loadingText="Verifying..."
          onPress={handleSubmit(onSubmit)}
          className="mb-3 sm:mb-4 w-full"
        >
          Verify & Sign In
        </AnimatedLoadingButton>

        <Button
          onPress={() => router.back()}
          variant="tertiary"
          textVariant="h5"
          color="neutral"
          fullWidth
          className="mb-4 sm:mb-6"
        >
          Back
        </Button>

        {/* Help Card */}
        <Card variant="outlined" className="p-3 sm:p-4">
          <Text className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center leading-relaxed">
            <Text className="font-semibold">Didn&apos;t receive the code? </Text>
            Wait up to 2 minutes, check your spam folder, or go back to request
            a new code.
          </Text>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
