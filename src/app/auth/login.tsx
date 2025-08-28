import {
  AnimatedLoadingButton,
  Card,
  ErrorToast,
  RHFTextInput,
  Spacer,
  Text,
  View,
} from '@/src/components';
import { loginSchema } from '@/src/constants';
import { dispatch, loginThunk, useAuthSlice } from '@/src/store';
import { isEmail } from '@/src/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Text as RNText,
  TouchableOpacity,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { error, isLoggingIn, clearError } = useAuthSlice();

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      emailOrPhone: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    dispatch(clearError());

    const isPhoneLogin = !isEmail(data.emailOrPhone);

    try {
      if (isPhoneLogin) {
        // Phone login - send SMS
        const result = await dispatch(
          loginThunk({
            emailOrPhone: data.emailOrPhone,
          }),
        );

        if (loginThunk.rejected.match(result)) {
          const errorMessage = result.payload as string;
          if (errorMessage === 'SMS_CODE_SENT') {
            // Navigate to verify phone screen
            router.push({
              pathname: '/auth/verify-phone',
              params: {
                phoneNumber: data.emailOrPhone,
              },
            });
          }
        }
      } else {
        // Email login - direct sign in
        const result = await dispatch(
          loginThunk({
            emailOrPhone: data.emailOrPhone,
            password: data.password,
          }),
        );

        if (loginThunk.fulfilled.match(result)) {
          router.push('/profile');
          console.log('Email sign in successful');
          // Navigation handled by auth state management
        }
      }
    } catch (error: any) {
      console.error('Login failed:', error);
    }
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View gradient scrollable>
        <View className="items-center py-6 mb-8">
          <Text variant="h2">Welcome Back</Text>
          <Text className="text-center mt-2 text-gray-600">
            Sign in with your email or phone number
          </Text>
        </View>

        {/* Sign In Form */}
        <View className="mb-6">
          <RHFTextInput
            control={control}
            name="emailOrPhone"
            inputType="text"
            label="Email or Phone Number"
            leftIcon="envelope"
            placeholder="Enter your email or phone number"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Spacer height={16} />
          <RHFTextInput
            control={control}
            name="password"
            inputType="password"
            label="Password"
            leftIcon="lock"
            rightIcon="eye"
            placeholder="Enter your password"
          />
        </View>

        <ErrorToast error={error} />

        {/* Forgot Password Link */}
        <TouchableOpacity onPress={handleForgotPassword} className="mb-6">
          <Text className="text-blue-500 text-center">
            Forgot your password?
          </Text>
        </TouchableOpacity>

        {/* Login In Button */}
        <AnimatedLoadingButton
          isLoading={isLoggingIn}
          disabled={isLoggingIn}
          loadingText="Please wait..."
          onPress={handleSubmit(onSubmit)}
        >
          Log In
        </AnimatedLoadingButton>

        {/* Sign Up Link */}
        <View className="flex-row items-center justify-center mb-8">
          <Text className="text-gray-600">Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <RNText className="text-blue-500 font-medium">
              Create Account
            </RNText>
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <Card variant="outlined">
          <Text className="text-gray-700 text-sm text-center">
            <Text className="font-semibold">Need help? </Text>
            You can sign in with either your email address or phone number. For
            phone login, we&apos;ll send you a verification code. If you&apos;re
            a member and haven&apos;t created an account yet, use &quot;Create
            Account&quot; above.
          </Text>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}
