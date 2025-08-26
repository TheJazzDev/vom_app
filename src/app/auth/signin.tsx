import { RHFTextInput, Text, View } from '@/src/components';
import { signInSchema } from '@/src/constants';
import { dispatch, useAuthSlice, useMemberSlice } from '@/src/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { authService } from '../services/authService';

export default function GuestSignUpScreen() {
  const router = useRouter();
  const { setProfile } = useMemberSlice();
  const { isLoading, loginStart, loginEnd, loginSuccess, loginFailure } =
    useAuthSlice();

  const { control, handleSubmit } = useForm<SignInData>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInData) => {
    dispatch(loginStart());

    try {
      // Uncomment and implement the actual auth service call

      const signInData = {
        phone: data.phone,
        password: data.password,
      };

      const result = await authService.signIn(signInData);
      console.log(result);

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
      Alert.alert('Error', error.message || 'Failed to create account');
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
          <Text variant="h3">Sign In</Text>
          <Text className="text-center mt-2">
            Join our community and stay connected with church events
          </Text>
        </View>

        {/* Form */}
        <View className="mb-6">
          <RHFTextInput
            control={control}
            name="phone"
            inputType="text"
            label="Phone number"
            leftIcon="phone"
            placeholder="Enter your phone number"
          />

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

        {/* Sign Up Button */}
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}
          className={`py-4 rounded-lg mb-6 ${
            isLoading ? 'bg-gray-400' : 'bg-blue-500'
          }`}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {isLoading ? 'Please wait...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        {/* Back Link */}
        <View className="flex-row justify-center mb-8">
          <Text className="text-gray-600">Done have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/guest-signup')}>
            <Text className="text-blue-500 font-medium">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
