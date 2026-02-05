import {
  AnimatedLoadingButton,
  Button,
  Card,
  ErrorToast,
  FirebaseRecaptchaVerifier,
  RHFTextInput,
  Spacer,
  Text,
  View,
} from '@/src/components';
import { ROUTES } from '@/src/constants';
import {
  dispatch,
  findMemberByPhoneThunk,
  sendPhoneLoginCodeThunk,
  useAuthSlice,
} from '@/src/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';
import * as yup from 'yup';

const phoneLoginSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^(\+234|0)[789]\d{9}$/,
      'Please enter a valid Nigerian phone number',
    ),
});

type FormData = yup.InferType<typeof phoneLoginSchema>;

export default function PhoneLoginScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const recaptchaVerifier = useRef<any>(null);

  const {
    error,
    isFindingMemberByPhone,
    isSendingPhoneCode,
    phoneMemberFound,
    clearError,
  } = useAuthSlice();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(phoneLoginSchema),
    defaultValues: {
      phoneNumber: (params.phoneNumber as string) || '',
    },
  });

  const handleBack = () => {
    router.back();
  };

  const handleActivateAccount = () => {
    router.push('/auth/find-member');
  };

  const onSubmit = async (data: FormData) => {
    dispatch(clearError());

    try {
      // First, find member by phone
      const memberResult = await dispatch(
        findMemberByPhoneThunk(data.phoneNumber),
      );

      if (findMemberByPhoneThunk.fulfilled.match(memberResult)) {
        const member = memberResult.payload;

        if (!member) {
          dispatch(clearError());
          throw new Error(
            'No account found with this phone number. Please activate your account first.',
          );
        }

        if (!member.verified || !member.phoneVerified) {
          throw new Error(
            'Your account is not activated. Please complete activation first.',
          );
        }

        // Send verification code
        const codeResult = await dispatch(
          sendPhoneLoginCodeThunk({
            phoneNumber: data.phoneNumber,
            recaptchaVerifier: recaptchaVerifier.current,
          }),
        );

        if (sendPhoneLoginCodeThunk.fulfilled.match(codeResult)) {
          // Navigate to verification screen
          router.push({
            pathname: '/auth/verify-phone-login' as any,
            params: {
              phoneNumber: codeResult.payload.phoneNumber,
              verificationId: codeResult.payload.verificationId,
            },
          });
        }
      }
    } catch (err: any) {
      console.error('Phone login error:', err);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View gradient scrollable>
        <FirebaseRecaptchaVerifier
          ref={recaptchaVerifier}
          attemptInvisibleVerification
        />

        <View className="items-center py-6 sm:py-8 mb-4 sm:mb-6">
          <View className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full items-center justify-center mb-3 sm:mb-4">
            <Text className="text-3xl sm:text-4xl">📱</Text>
          </View>
          <Text variant="h2" className="text-center">
            Phone Login
          </Text>
          <Text className="text-center mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 px-4">
            Sign in using your registered phone number
          </Text>
        </View>

        <Card variant="gradient-soft" className="p-4 sm:p-5 mb-4 sm:mb-6">
          <Text variant="h5" className="font-semibold mb-2 sm:mb-3 text-center">
            How it works
          </Text>
          <View className="gap-2">
            <View className="flex-row items-start">
              <Text className="mr-2 text-blue-500">1.</Text>
              <Text className="flex-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                Enter your registered phone number
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-blue-500">2.</Text>
              <Text className="flex-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                We&apos;ll send you a 4-digit verification code via SMS
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="mr-2 text-blue-500">3.</Text>
              <Text className="flex-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                Enter the code to sign in
              </Text>
            </View>
          </View>
        </Card>

        {/* Phone Number Input */}
        <View className="mb-4 sm:mb-6">
          <RHFTextInput
            control={control}
            name="phoneNumber"
            inputType="text"
            label="Phone Number"
            leftIcon="phone"
            placeholder="080XXXXXXXX or +234XXXXXXXXXX"
            keyboardType="phone-pad"
          />
        </View>

        <ErrorToast error={error} onClearError={clearError} />

        {/* Login Button */}
        <AnimatedLoadingButton
          isLoading={isFindingMemberByPhone || isSendingPhoneCode}
          disabled={isFindingMemberByPhone || isSendingPhoneCode}
          loadingText={
            isFindingMemberByPhone ? 'Checking account...' : 'Sending code...'
          }
          onPress={handleSubmit(onSubmit)}
          className="mb-3 sm:mb-4 w-full"
        >
          Send Verification Code
        </AnimatedLoadingButton>

        <Button
          onPress={handleActivateAccount}
          variant="outline"
          textVariant="h5"
          fullWidth
          className="mb-3 sm:mb-4 border-2 border-gray-300 dark:border-gray-600"
        >
          Activate My Account
        </Button>

        <Button
          onPress={handleBack}
          variant="tertiary"
          textVariant="h5"
          color="neutral"
          fullWidth
        >
          Back to Sign In
        </Button>

        <Spacer height={16} />

        <Card variant="outlined" className="p-3 sm:p-4">
          <Text className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center">
            <Text className="font-semibold">Don&apos;t have an account? </Text>
            If you&apos;re a VOM member, use &quot;Activate My Account&quot; to
            get started. Standard SMS rates may apply.
          </Text>
        </Card>

        <Spacer />
      </View>
    </KeyboardAvoidingView>
  );
}
