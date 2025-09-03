import {
  AnimatedLoadingButton,
  Button,
  Card,
  ErrorToast,
  RHFTextInput,
  Text,
  View,
} from '@/src/components';
import { memberSearchSchema } from '@/src/constants';
import {
  dispatch,
  findMemberForActivationThunk,
  useAuthSlice,
} from '@/src/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';

type MemberSearchFormData = {
  emailOrPhone: string;
};

export default function ActivateAccountScreen() {
  const router = useRouter();
  const {
    foundMember,
    isfindingMemberForActivation,
    error,
    clearError,
    clearFoundMember,
  } = useAuthSlice();

  const { control, handleSubmit } = useForm<MemberSearchFormData>({
    resolver: yupResolver(memberSearchSchema),
    defaultValues: {
      emailOrPhone: '',
    },
  });

  const onSubmit = async (data: MemberSearchFormData) => {
    dispatch(clearError());

    try {
      const result = await dispatch(
        findMemberForActivationThunk(data.emailOrPhone),
      );

      if (findMemberForActivationThunk.fulfilled.match(result)) {
        if (result.payload) {
          router.push({
            pathname: '/auth/activate-member-account',
            params: {
              email: foundMember?.email,
              authType: 'email',
            },
          });
        }
      }
    } catch (error: any) {
      console.error('Member search failed:', error);
    }
  };

  const handleBackToSignIn = () => {
    dispatch(clearFoundMember());
    dispatch(clearError());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View gradient scrollable>
        <View className="items-center py-6 mb-6">
          <Text variant="h3">Let&apos;s find your Profile</Text>
          <Text className="text-center mt-2 max-w-[90%]">
            Enter your email or phone number to find your VOM member profile
          </Text>
        </View>

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
        </View>

        <ErrorToast error={error} onClearError={clearError} />

        <AnimatedLoadingButton
          isLoading={isfindingMemberForActivation}
          disabled={isfindingMemberForActivation}
          loadingText="Searching..."
          onPress={handleSubmit(onSubmit)}
          className="mb-6"
        >
          Find My Profile
        </AnimatedLoadingButton>

        {/* Information Cards */}
        <Card variant="gradient-soft">
          <Text className="font-semibold mb-2 text-center">
            For VOM Members
          </Text>
          <Text className="text-sm text-center">
            This option is for existing members who submitted their details with
            the IT Department but haven&apos;t set up their account yet.
            We&apos;ll verify your identity and help you create your account.
          </Text>
        </Card>

        <Card variant="outlined" className="mt-4 mb-6">
          <Text className="font-semibold mb-2 text-center">
            Verification Process
          </Text>
          <Text className="text-sm text-center">
            <Text variant="h6">Email:</Text> Create password → Verify email
            {'\n'}
            <Text variant="h6">Phone:</Text> Verify phone → Instant access
          </Text>
        </Card>

        <Button
          onPress={handleBackToSignIn}
          variant="outline"
          textVariant="h5"
          fullWidth
        >
          Back to Sign In
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
