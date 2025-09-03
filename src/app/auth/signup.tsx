import {
  AnimatedLoadingButton,
  Card,
  ErrorToast,
  ProgressIndicator,
  Text,
  View,
} from '@/src/components';
import { NameField, PasswordField, RegTypeField } from '@/src/components/Forms';
import { registrationSchema } from '@/src/constants';
import { useRegistrationProgress } from '@/src/hooks/forms';
import { createGuestAccountThunk, dispatch, useAuthSlice } from '@/src/store';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function RegistrationScreen() {
  const router = useRouter();
  const { error, isCreatingGuestAccount, clearError } = useAuthSlice();

  const { control, handleSubmit, watch } = useForm<RegistrationProps>({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      emailOrPhone: '',
      password: '',
    },
  });

  const formValues = watch();
  const { progressSteps, currentStep } = useRegistrationProgress(formValues);

  const onSubmit = async (data: RegistrationProps) => {
    dispatch(clearError());

    try {
      const result = await dispatch(createGuestAccountThunk(data));

      if (createGuestAccountThunk.fulfilled.match(result)) {
        const registrationResult = result.payload;

        if (registrationResult.requiresPhoneVerification) {
          router.push('/auth/verify-phone');
        } else if (registrationResult.requiresEmailVerification) {
          router.push('/auth/verify-email');
        }
      }
    } catch (error: any) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <View gradient style={{ paddingHorizontal: 16 }}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={220}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          {/* Header */}
          <View className="items-center py-4 mb-6">
            <Text variant="h3">Join Our Community</Text>
            <Text className="text-center mt-2 text-gray-600 max-w-[90%]">
              Create your account to get started
            </Text>
          </View>

          {/* Progress Indicator */}
          <ProgressIndicator
            steps={progressSteps}
            currentStep={currentStep}
            className="mx-4"
          />

          {/* Registration Form */}
          <View className="mb-4">
            <RegTypeField control={control} value={formValues.emailOrPhone} />

            <NameField
              control={control}
              name="firstName"
              value={formValues.firstName}
              label="First Name"
              placeholder="Enter your first name"
            />

            <NameField
              control={control}
              name="lastName"
              value={formValues.lastName}
              label="Last Name"
              placeholder="Enter your last name"
            />

            <PasswordField control={control} value={formValues.password} />
          </View>

          <Card variant="outlined" className="mb-8">
            <Text className="text-gray-700 text-sm text-center">
              We&apos;ll check if you&apos;re already a member and set up your
              account accordingly. New users will be created as guest accounts.
            </Text>
          </Card>

          <ErrorToast error={error} />

          {/* Submit Button */}
          <AnimatedLoadingButton
            onPress={handleSubmit(onSubmit)}
            isLoading={isCreatingGuestAccount}
            loadingText="Creating Account..."
            className="mb-6"
          >
            Create Account
          </AnimatedLoadingButton>

          <View className="flex-row items-center justify-center mb-8">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth')}>
              <RNText className="text-blue-500 font-medium">Sign In</RNText>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </KeyboardAwareScrollView>
    </View>
  );
}
