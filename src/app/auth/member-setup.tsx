import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import * as yup from 'yup';

import { RHFTextInput, Text, View } from '@/src/components';
import { dispatch, useAuthSlice, useMemberSlice } from '@/src/store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { authService } from '../services/authService';

// Schema for member setup
const memberSetupSchema = yup.object().shape({
  verificationCode: yup
    .string()
    .required('Verification code is required')
    .length(6, 'Verification code must be 6 digits'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain uppercase, lowercase, and number',
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

type MemberSetupFormData = {
  verificationCode: string;
  password: string;
  confirmPassword: string;
};

export default function MemberSetupScreen() {
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const { setProfile } = useMemberSlice();
  const { isLoading, loginStart, loginEnd, loginSuccess, loginFailure } =
    useAuthSlice();
  const [isCodeSent, setIsCodeSent] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberSetupFormData>({
    resolver: yupResolver(memberSetupSchema),
    defaultValues: {
      verificationCode: '',
      password: '',
      confirmPassword: '',
    },
  });

  const sendVerificationCode = async () => {
    if (!phone) return;

    dispatch(loginStart());
    try {
      await authService.sendVerificationCode(phone as string);
      setIsCodeSent(true);
      Alert.alert('Success', 'Verification code sent to your phone');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send verification code');
    } finally {
      dispatch(loginEnd());
    }
  };

  const onSubmit = async (data: MemberSetupFormData) => {
    if (!phone) return;

    dispatch(loginStart());

    try {
      // Verify phone and create password for existing member
      const result = await authService.completeMemberSetup({
        phone: phone as string,
        verificationCode: data.verificationCode,
        password: data.password,
      });

      dispatch(
        loginSuccess({
          user: result.user,
          token: result.token,
        }),
      );

      dispatch(setProfile(result.profile));
      router.replace('/profile');
    } catch (error: any) {
      dispatch(loginFailure());
      Alert.alert('Error', error.message || 'Failed to complete setup');
    } finally {
      dispatch(loginEnd());
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View gradient scrollable>
        <View className="items-center py-4 mb-6">
          <Text variant="h3">Welcome Back!</Text>
          <Text className="text-center mt-2">
            We found your membership record. Let's set up your account.
          </Text>
          <Text className="text-blue-600 font-medium mt-1">Phone: {phone}</Text>
        </View>

        {/* Send Code Button */}
        {!isCodeSent && (
          <TouchableOpacity
            disabled={isLoading}
            onPress={sendVerificationCode}
            className={`py-4 rounded-lg mb-6 ${
              isLoading ? 'bg-gray-400' : 'bg-green-500'
            }`}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Form - Show only after code is sent */}
        {isCodeSent && (
          <>
            <View className="mb-6">
              <RHFTextInput
                control={control}
                name="verificationCode"
                inputType="text"
                label="Verification Code"
                leftIcon="shield"
                placeholder="Enter 6-digit code"
                keyboardType="number-pad"
                maxLength={6}
              />

              <RHFTextInput
                control={control}
                name="password"
                inputType="password"
                label="Create Password"
                leftIcon="lock"
                rightIcon="eye"
                placeholder="Enter your password"
              />

              <RHFTextInput
                control={control}
                name="confirmPassword"
                inputType="password"
                label="Confirm Password"
                leftIcon="lock"
                rightIcon="eye"
                placeholder="Confirm your password"
              />
            </View>

            {/* Complete Setup Button */}
            <TouchableOpacity
              disabled={isLoading}
              onPress={handleSubmit(onSubmit)}
              className={`py-4 rounded-lg mb-6 ${
                isLoading ? 'bg-gray-400' : 'bg-blue-500'
              }`}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {isLoading ? 'Setting up...' : 'Complete Setup'}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Back Link */}
        <View className="flex-row justify-center">
          <Text className="text-gray-600">Wrong number? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-blue-500 font-medium">Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
