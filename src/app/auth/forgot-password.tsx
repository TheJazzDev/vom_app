import {
  AnimatedLoadingButton,
  Button,
  Card,
  ErrorToast,
  RHFTextInput,
  Spacer,
  Text,
  View,
} from '@/src/components';
import { forgotPasswordSchema } from '@/src/constants';
import {
  dispatch,
  sendPasswordResetEmailThunk,
  useAuthSlice,
} from '@/src/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';
import * as yup from 'yup';

type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const {
    error,
    isSendingPasswordResetEmail,
    passwordResetEmailSent,
    clearError,
    clearPasswordResetState,
  } = useAuthSlice();

  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema) as Resolver<ForgotPasswordFormData>,
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    // Clear state when unmounting
    return () => {
      dispatch(clearPasswordResetState());
      dispatch(clearError());
    };
  }, [clearError, clearPasswordResetState]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    dispatch(clearError());
    await dispatch(sendPasswordResetEmailThunk(data.email));
  };

  const handleBackToLogin = () => {
    dispatch(clearPasswordResetState());
    router.back();
  };

  if (passwordResetEmailSent) {
    return (
      <View gradient scrollable>
        <View className="items-center py-8 mb-6">
          <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4">
            <Text className="text-4xl">📧</Text>
          </View>
          <Text variant="h2" className="text-center">
            Check Your Email
          </Text>
          <Text className="text-center mt-3 text-gray-600 px-4">
            We&apos;ve sent a password reset link to your email address. Please
            check your inbox and follow the instructions to reset your password.
          </Text>
        </View>

        <Card variant="outlined" className="p-4 mb-6">
          <Text className="text-gray-700 text-sm text-center">
            <Text className="font-semibold">Didn&apos;t receive the email? </Text>
            Check your spam folder or request a new reset link.
          </Text>
        </Card>

        <Button
          onPress={handleBackToLogin}
          variant="primary"
          textVariant="h5"
          fullWidth
          className="mb-4"
        >
          Back to Sign In
        </Button>

        <Button
          onPress={() => dispatch(clearPasswordResetState())}
          variant="outline"
          textVariant="h5"
          fullWidth
        >
          Request New Link
        </Button>

        <Spacer />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View gradient scrollable>
        <View className="items-center py-6 mb-6">
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Text className="text-3xl">🔐</Text>
          </View>
          <Text variant="h2" className="text-center">
            Reset Password
          </Text>
          <Text className="text-center mt-2 text-gray-600 px-4">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </Text>
        </View>

        <View className="mb-6">
          <RHFTextInput
            control={control}
            name="email"
            inputType="text"
            label="Email Address"
            leftIcon="envelope"
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <ErrorToast error={error} onClearError={clearError} />

        <AnimatedLoadingButton
          isLoading={isSendingPasswordResetEmail}
          disabled={isSendingPasswordResetEmail}
          loadingText="Sending..."
          onPress={handleSubmit(onSubmit)}
          className="mb-6"
        >
          Send Reset Link
        </AnimatedLoadingButton>

        <Button
          onPress={handleBackToLogin}
          variant="tertiary"
          textVariant="h5"
          color="neutral"
          fullWidth
        >
          Back to Sign In
        </Button>

        <Spacer height={24} />

        <Card variant="gradient-soft" className="p-4">
          <Text className="text-gray-700 text-sm text-center">
            <Text className="font-semibold">Remember your password? </Text>
            Go back to sign in and access your account.
          </Text>
        </Card>

        <Spacer />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
