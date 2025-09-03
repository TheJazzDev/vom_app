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
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';

type MemberActivationFormData = {
  password: string;
  confirmPassword: string;
};

export default function ActivateAccountScreen() {
  const router = useRouter();
  const { authType } = useLocalSearchParams<{
    authType?: string;
  }>();

  const {
    foundMember,
    error,
    clearError,
    clearFoundMember,
    isSendingEmailVerificationLink,
    isActivatingMemberAccount,
  } = useAuthSlice();

  const { control, handleSubmit, watch, formState } =
    useForm<MemberActivationFormData>({
      resolver: yupResolver(passwordSchema),
      defaultValues: {
        password: '',
        confirmPassword: '',
      },
    });

  // Watch both fields and memoize the values to prevent excessive re-renders
  const [password, confirmPassword] = watch(['password', 'confirmPassword']);

  // Memoize password strength calculation
  // const passwordStrength = useMemo(() => {
  //   return getPasswordStrength(password || '');
  // }, [password]);

  // Memoize form validation
  const isFormValid = useMemo(() => {
    return (
      password &&
      confirmPassword &&
      password === confirmPassword &&
      password.length >= 6 &&
      !formState.isSubmitting
    );
  }, [password, confirmPassword, formState.isSubmitting]);

  const onSubmit = async (data: MemberActivationFormData) => {
    dispatch(clearError());

    try {
      if (authType === 'email') {
        const userData = {
          emailOrPhone: foundMember!.email,
          password: data.password,
          member: foundMember!,
        };

        const result = await dispatch(activateMemberAccountThunk(userData));

        if (activateMemberAccountThunk.fulfilled.match(result)) {
          router.push('/auth/activate-memeber-account-success');
        }
      }
    } catch (error: any) {
      console.error('Member search failed:', error);
    }
  };

  const handleBackToSearch = () => {
    dispatch(clearFoundMember());
    dispatch(clearError());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"
    >
      <View gradient scrollable className="pt-20">
        {/* Header with Animation */}
        <View className="items-center py-4 mb-1">
          <Text variant="h3" className="font-bold">
            Member Found!
          </Text>
          <Text className="text-center mt-1 text-gray-600 dark:text-gray-400 max-w-[90%]">
            We found your member profile in our database
          </Text>
        </View>

        {/* Enhanced Member Profile Card */}
        <Card
          variant="outlined"
          className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-2 border-blue-200 dark:border-blue-800"
        >
          <View className="items-center">
            <Text variant="h4" className="font-bold mb-2 text-center">
              {foundMember?.title} {foundMember?.firstName}{' '}
              {foundMember?.lastName}
            </Text>

            {foundMember?.department && (
              <View className="flex-row flex-wrap justify-center gap-2 mb-3">
                {foundMember?.position.map((pos: string, index: number) => (
                  <View
                    key={index}
                    className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full"
                  >
                    <Text className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                      {pos}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            <View className="bg-white dark:bg-gray-700 px-4 py-2 rounded-full shadow-sm">
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Member since: {foundMember?.memberSince}
              </Text>
            </View>
          </View>
        </Card>

        {/* Enhanced Form Section */}
        <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg">
          <View className="items-center mb-6">
            <Text
              variant="h4"
              className="font-bold text-gray-800 dark:text-gray-200 mb-2"
            >
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
              placeholder="Enter your password"
            />
            <Spacer height={16} />
            <RHFTextInput
              control={control}
              name="confirmPassword"
              inputType="password"
              label="Confirm password"
              leftIcon="lock"
              placeholder="Confirm your password"
            />

            {/* Password Match Indicator */}
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

            {/* Enhanced Password Strength Indicator */}
            {/* {password && (
              <View className="mt-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <Text className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Password Strength
                </Text>
                <View className="h-3 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mb-2">
                  <View
                    style={{
                      width: `${(passwordStrength.score / 4) * 100}%`,
                    }}
                    className={`
                      h-3 rounded-full transition-all duration-500
                      ${passwordStrength.score <= 1 ? 'bg-red-500' : ''}
                      ${passwordStrength.score === 2 ? 'bg-yellow-500' : ''}
                      ${passwordStrength.score === 3 ? 'bg-blue-500' : ''}
                      ${passwordStrength.score === 4 ? 'bg-green-500' : ''}
                    `}
                  />
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {passwordStrength.label}
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    {passwordStrength.score}/4
                  </Text>
                </View>
              </View>
            )} */}
          </View>
        </View>

        <ErrorToast error={error} onClearError={clearError} />

        {/* Enhanced Action Buttons */}
        <AnimatedLoadingButton
          isLoading={
            isActivatingMemberAccount || isSendingEmailVerificationLink
          }
          disabled={!isFormValid}
          loadingText="Activating your account..."
          onPress={handleSubmit(onSubmit)}
          className={`mb-4 shadow-lg ${
            isFormValid
              ? 'bg-gradient-to-r from-blue-600 to-purple-600'
              : 'bg-gray-400 dark:bg-gray-600'
          }`}
        >
          <View className="flex-row items-center justify-center">
            <Text className="text-white font-bold mr-2">🚀</Text>
            <Text className="text-white font-semibold">
              Activate My Account
            </Text>
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

        {/* Bottom decorative element */}
        <View className="items-center mt-8 mb-4">
          <View className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-full px-6 py-3">
            <Text className="text-center text-sm text-gray-600 dark:text-gray-400">
              🔐 Your account will be secured with end-to-end encryption
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
