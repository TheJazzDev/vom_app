import { RHFTextInput, Text, View } from '@/src/components';
import { guestSignupSchema } from '@/src/constants';
import { dispatch, useAuthSlice, useMemberSlice } from '@/src/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams, useRouter } from 'expo-router';
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
  const { phone } = useLocalSearchParams();
  const { setProfile } = useMemberSlice();
  const { isLoading, loginStart, loginEnd, loginSuccess, loginFailure } =
    useAuthSlice();

  const { control, handleSubmit } = useForm<GuestSignUpData>({
    resolver: yupResolver(guestSignupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      // email: '',
      phone: (phone as string) || '',
      password: '',
    },
  });

  const onSubmit = async (data: GuestSignUpData) => {
    dispatch(loginStart());

    try {
      // Uncomment and implement the actual auth service call

      const signUpData = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        password: data.password,
        role: 'guest',
      };

      const result = await authService.signUpGuest(signUpData);
      console.log(result);

      dispatch(
        loginSuccess({
          user: result.user,
          token: result.token,
        }),
      );
      dispatch(setProfile(result.profile));
      // router.replace('/profile');

      // Show welcome message for guests
      Alert.alert(
        'Welcome!',
        'Your guest account has been created. You will receive notifications about church events and activities.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/profile'),
          },
        ],
      );
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
          <Text variant="h3">Create Guest Account</Text>
          <Text className="text-center mt-2">
            Join our community and stay connected with church events
          </Text>
          <Text className="text-blue-600 font-medium mt-1">Phone: {phone}</Text>
        </View>

        {/* Form */}
        <View className="mb-6">
          <RHFTextInput
            control={control}
            name="firstName"
            inputType="text"
            label="First Name"
            leftIcon="person"
            placeholder="Enter your first name"
          />

          <RHFTextInput
            control={control}
            name="lastName"
            inputType="text"
            label="Last Name"
            leftIcon="person"
            placeholder="Enter your last name"
          />

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

        {/* Guest Info */}
        <View className="bg-yellow-50 p-4 rounded-lg mb-6">
          <Text className="text-yellow-800 text-sm">
            <Text className="font-semibold">Guest Account: </Text>
            You'll receive notifications about church events and can participate
            in community activities. Church members can upgrade your account for
            full access.
          </Text>
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
            {isLoading ? 'Creating Account...' : 'Create Guest Account'}
          </Text>
        </TouchableOpacity>

        {/* Back Link */}
        <View className="flex-row justify-center mb-8">
          <Text className="text-gray-600">Wrong number? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-blue-500 font-medium">Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
