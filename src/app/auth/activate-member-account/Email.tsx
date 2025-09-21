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
import { passwordSchema } from '@/src/constants';
import {
  activateMemberAccountThunk,
  dispatch,
  useAuthSlice,
} from '@/src/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

type MemberActivationFormData = {
  password: string;
  confirmPassword: string;
};

const Email = ({ handleBackToSearch }: { handleBackToSearch: () => void }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { emailOrPhone } = useLocalSearchParams<{
    emailOrPhone: string;
  }>();

  const { foundMember, error, clearError } = useAuthSlice();

  const { control, handleSubmit, watch } = useForm<MemberActivationFormData>({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const [password, confirmPassword] = watch(['password', 'confirmPassword']);

  const isFormValid = useMemo(() => {
    return (
      password &&
      confirmPassword &&
      password === confirmPassword &&
      password.length >= 6
    );
  }, [password, confirmPassword]);

  const onSubmit = async (data: MemberActivationFormData) => {
    setIsSubmitting(true);
    dispatch(clearError());

    try {
      const userData = {
        emailOrPhone,
        password: data.password,
        member: foundMember!,
      };

      const result = await dispatch(activateMemberAccountThunk(userData));

      if (activateMemberAccountThunk.fulfilled.match(result)) {
        router.replace('/auth/email-verify-success');
      } else {
        console.error('Email activation failed:', result);
      }
    } catch (error: any) {
      console.error('Activation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View>
      <Card variant="default" className="rounded-2xl p-6 mb-6 shadow-lg">
        <View className="items-center mb-6">
          <Text variant="h4" className="font-bold mb-2">
            Set Your Password
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-center">
            Create a secure password to protect your account
          </Text>
        </View>

        <View className="space-y-4 mb-6">
          <RHFTextInput
            control={control}
            name="password"
            inputType="password"
            label="Password"
            leftIcon="lock"
            parentVariant="default"
            placeholder="Enter your password"
          />
          <Spacer height={16} />
          <RHFTextInput
            control={control}
            name="confirmPassword"
            inputType="password"
            label="Confirm password"
            leftIcon="lock"
            parentVariant="default"
            placeholder="Confirm your password"
          />

          {password && confirmPassword && (
            <View className="mt-2">
              {password === confirmPassword ? (
                <Text className="text-green-600 dark:text-green-400 text-sm">
                  ✓ Passwords match
                </Text>
              ) : (
                <Text className="text-red-600 dark:text-red-400 text-sm">
                  ✗ Passwords do not match
                </Text>
              )}
            </View>
          )}
        </View>
      </Card>

      <ErrorToast error={error} onClearError={clearError} />

      <AnimatedLoadingButton
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting || !isFormValid}
        isLoading={isSubmitting}
        loadingText="Activating your account..."
        className="mb-4"
      >
        <View className="flex-row items-center justify-center">
          <Text className="mr-2">🚀</Text>
          <Text className="font-semibold text-white">Activate My Account</Text>
        </View>
      </AnimatedLoadingButton>

      <Button
        onPress={handleBackToSearch}
        variant="outline"
        textVariant="h5"
        fullWidth
        className="border-2 border-gray-300 dark:border-gray-600"
      >
        <View className="flex-row items-center justify-center">
          <Text className="mr-2">←</Text>
          <Text>Back to Search</Text>
        </View>
      </Button>

      <View className="items-center mt-8 mb-4">
        <View className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-full px-6 py-3">
          <Text className="text-center text-sm text-gray-600 dark:text-gray-400">
            🔐 Your account will be secured with end-to-end encryption
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Email;
