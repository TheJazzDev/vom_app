import { Button, Card, Spacer, Text, View } from '@/src/components';
import { useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

/**
 * Phone Login Screen
 *
 * Note: Phone authentication requires Firebase Phone Auth with reCAPTCHA verification.
 * This feature is prepared but requires additional backend setup:
 * 1. Enable Phone Authentication in Firebase Console
 * 2. Configure reCAPTCHA for iOS and Android
 * 3. Set up Firebase Cloud Functions for SMS sending (optional)
 *
 * The services and thunks are already implemented:
 * - findMemberByPhone
 * - sendPhoneLoginCode
 * - verifyPhoneLoginCode
 */

export default function PhoneLoginScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleActivateAccount = () => {
    router.push('/auth/find-member');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View gradient scrollable>
        <View className="items-center py-8 mb-6">
          <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Text className="text-4xl">📱</Text>
          </View>
          <Text variant="h2" className="text-center">
            Phone Login
          </Text>
          <Text className="text-center mt-3 text-gray-600 dark:text-gray-300 px-4">
            Phone login will be available soon!
          </Text>
        </View>

        <Card variant="gradient-soft" className="p-5 mb-6">
          <Text variant="h5" className="font-semibold mb-3 text-center">
            Coming Soon
          </Text>
          <Text className="text-gray-700 dark:text-gray-300 text-sm text-center leading-relaxed">
            We&apos;re working on enabling phone number login for a more
            convenient sign-in experience. In the meantime, please use email
            login or activate your account through the member activation flow.
          </Text>
        </Card>

        <Card variant="outlined" className="p-4 mb-6">
          <Text className="text-gray-700 dark:text-gray-300 text-sm text-center">
            <Text className="font-semibold">Existing members: </Text>
            If you&apos;ve previously activated your account with your phone
            number, please use the email login option for now.
          </Text>
        </Card>

        <Button
          onPress={handleActivateAccount}
          variant="primary"
          textVariant="h5"
          fullWidth
          className="mb-4"
        >
          Activate My Account
        </Button>

        <Button
          onPress={handleBack}
          variant="tertiary"
          textVariant="h5"
          color="neutral"
          fullWidth
        >
          Back to Sign In
        </Button>

        <Spacer height={24} />

        <Card variant="outlined" className="p-4">
          <Text className="text-gray-700 dark:text-gray-300 text-sm text-center">
            <Text className="font-semibold">Need help? </Text>
            Contact the church office for assistance with your account.
          </Text>
        </Card>

        <Spacer />
      </View>
    </KeyboardAvoidingView>
  );
}
