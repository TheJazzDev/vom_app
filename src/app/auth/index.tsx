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
import { loginSchema } from '@/src/constants';
import { dispatch, loginThunk, useAuthSlice } from '@/src/store';
import { isEmail } from '@/src/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';

const APP_FEATURES = [
  'View church services and events',
  'Access ministries and activities',
  'Prayer request submissions',
  'Member directory access',
  'Event notifications',
  'Community interaction features',
] as const;

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
          router.replace('/');
        }
      }
    } catch (error: any) {
      console.error('Login failed:', error);
    }
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  const renderFeatureList = (features: readonly string[]) => (
    <View>
      <Text variant="h5" className="mb-3 font-semibold text-center">
        With the VOM app, you can:
      </Text>
      <View className="gap-2">
        {features.map((feature, index) => (
          <View key={index} className="flex-row items-start">
            <Text className="mr-2 text-blue-500">•</Text>
            <Text className="flex-1 text-sm">{feature}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View gradient scrollable>
        <View className="items-center py-6 mb-6">
          <Text variant="h2">Welcome Back</Text>
          <Text className="text-center mt-2 text-gray-600">
            Sign in to access your account
          </Text>
        </View>

        {/* Login Form */}
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

        <ErrorToast error={error} onClearError={clearError} />

        {/* Forgot Password Link */}
        <TouchableOpacity onPress={handleForgotPassword} className="mb-6">
          <Text className="text-blue-500 text-center">
            Forgot your password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <AnimatedLoadingButton
          isLoading={isLoggingIn}
          disabled={isLoggingIn}
          loadingText="Signing in..."
          onPress={handleSubmit(onSubmit)}
          className="mb-6"
        >
          Sign In
        </AnimatedLoadingButton>

        {/* Alternative Options */}
        <View className="gap-3 mb-6">
          <View className="flex-row items-center mb-2">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500">
              Don&apos;t have an account?
            </Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          <Button
            onPress={() => router.push('/auth/find-member')}
            variant="secondary"
            textVariant="h5"
            fullWidth
          >
            I&apos;m a Member - Begin Activation
          </Button>

          <Button
            onPress={() => router.push('/auth/signup')}
            variant="outline"
            textVariant="h5"
            fullWidth
          >
            Create New Account
          </Button>
          <Button
            onPress={() => router.push('/onboarding')}
            variant="outline"
            textVariant="h5"
            fullWidth
          >
            onbor
          </Button>
        </View>

        {/* App Features */}
        <Card variant="default" className="p-4 mb-4">
          {renderFeatureList(APP_FEATURES)}
        </Card>

        {/* Help Section */}
        <Card variant="outlined" className="p-4">
          <Text className="text-gray-700 text-sm text-center">
            <Text className="font-semibold">Need help choosing? </Text>
            If you&apos;re an existing VOM member without an account, use
            &quot;Activate Account&quot;. New to VOM? Use &quot;Create New
            Account&quot;. For phone login, we&apos;ll send you a verification
            code.
          </Text>
        </Card>
        <Spacer />
      </View>
    </KeyboardAvoidingView>
  );
}
