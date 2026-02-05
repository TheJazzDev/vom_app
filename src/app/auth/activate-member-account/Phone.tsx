import {
  AnimatedLoadingButton,
  Button,
  Card,
  ErrorToast,
  FirebaseRecaptchaVerifier,
  Text,
  View,
} from '@/src/components';
import {
  activateMemberAccountThunk,
  dispatch,
  useAuthSlice,
} from '@/src/store';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';

const Phone = ({ handleBackToSearch }: { handleBackToSearch: () => void }) => {
  const router = useRouter();
  const recaptchaVerifier = useRef<any>(null);
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const {
    foundMember,
    error,
    isActivatingMemberAccount,
    clearError,
    phoneVerificationId,
  } = useAuthSlice();

  const handleSendVerificationCode = async () => {
    if (!foundMember) {
      Alert.alert('Error', 'Member information not found');
      return;
    }

    dispatch(clearError());

    try {
      const result = await dispatch(
        activateMemberAccountThunk({
          member: foundMember,
          emailOrPhone: foundMember.primaryPhone,
          recaptchaVerifier: recaptchaVerifier.current,
        }),
      );

      if (activateMemberAccountThunk.fulfilled.match(result)) {
        const payload = result.payload as PhoneActivationResult;
        if (payload?.needsCodeVerification && payload?.verificationId) {
          // Navigate to verification screen
          router.push({
            pathname: '/auth/verify-phone',
            params: {
              phoneNumber: payload.phoneNumber,
              verificationId: payload.verificationId,
            },
          });
        }
      }
    } catch (err: any) {
      console.error('Phone activation error:', err);
    }
  };

  return (
    <View>
      <FirebaseRecaptchaVerifier
        ref={recaptchaVerifier}
        attemptInvisibleVerification
      />

      <Card className="mb-4 sm:mb-6 items-center border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
        <Text className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
          📱
        </Text>
        <Text
          variant="h4"
          className="font-bold mb-2 sm:mb-3 text-blue-800 dark:text-blue-200 text-center"
        >
          Activate with Phone Number
        </Text>
        <Text className="text-sm sm:text-base text-blue-700 dark:text-blue-300 text-center leading-relaxed">
          We&apos;ll send a verification code to your phone number to complete
          the activation.
        </Text>
      </Card>

      <Card variant="outlined" className="mb-4 sm:mb-6">
        <Text variant="h5" className="font-bold mb-3 sm:mb-4 text-center">
          Phone Number
        </Text>
        <View className="bg-gray-100 dark:bg-gray-800 px-3 py-2 sm:px-4 sm:py-3 rounded-lg mb-3 sm:mb-4">
          <Text className="text-base sm:text-lg font-semibold text-center">
            {foundMember?.primaryPhone}
          </Text>
        </View>
        <Text className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center">
          A 4-digit verification code will be sent to this number via SMS
        </Text>
      </Card>

      <ErrorToast error={error} onClearError={clearError} />

      {/* Send Code Button */}
      <AnimatedLoadingButton
        isLoading={isActivatingMemberAccount}
        disabled={isActivatingMemberAccount}
        loadingText="Sending code..."
        onPress={handleSendVerificationCode}
        className="mb-3 sm:mb-4 w-full"
      >
        Send Verification Code
      </AnimatedLoadingButton>

      <Button
        onPress={handleBackToSearch}
        variant="outline"
        textVariant="h5"
        fullWidth
        className="mb-3 sm:mb-4 border-2 border-gray-300 dark:border-gray-600"
      >
        Activate with Email Instead
      </Button>

      <Button
        onPress={() => router.push('/auth')}
        variant="tertiary"
        textVariant="h5"
        color="neutral"
        fullWidth
      >
        Back to Sign In
      </Button>

      {/* Info Card */}
      <Card variant="gradient-soft" className="p-3 sm:p-4 mt-4 sm:mt-6">
        <Text className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center leading-relaxed">
          <Text className="font-semibold">Note: </Text>
          Standard SMS rates may apply. If you don&apos;t receive the code
          within 2 minutes, you can request a new one.
        </Text>
      </Card>
    </View>
  );
};

export default Phone;
