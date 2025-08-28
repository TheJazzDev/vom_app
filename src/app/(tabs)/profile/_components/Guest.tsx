import { Button, Card, IconSymbol, Spacer, Text, View } from '@/src/components';
import { useRouter } from 'expo-router';
import React from 'react';

const GUEST_FEATURES = [
  'View all church services and events',
  'Access church activities and ministries',
  'Browse upcoming programs',
] as const;

const ACCOUNT_FEATURES = [
  'Personal profile and preferences',
  "Service notifications when you're scheduled",
  'Prayer request submissions',
  'Browse member directory',
  'Community interaction features',
  'Event RSVPs and attendance tracking',
] as const;

const GuestProfile = () => {
  const router = useRouter();

  const renderFeatureList = (features: readonly string[], title: string) => (
    <>
      <Text variant="h5" color="heading" className="mb-2">
        {title}
      </Text>
      <View className="mb-4">
        {features.map((feature, index) => (
          <View key={index} className="flex-row items-start mb-1">
            <Text color="body" className="mr-2">
              •
            </Text>
            <Text color="body" className="flex-1">
              {feature}
            </Text>
          </View>
        ))}
      </View>
    </>
  );

  const renderAuthButtons = () => (
    <View className="flex-col gap-3 my-6">
      <Button
        onPress={() => router.push('/auth/login')}
        variant="primary"
        textVariant="h5"
        fullWidth
      >
        Log In
      </Button>
      <Button
        onPress={() => router.push('/auth/register')}
        variant="outline"
        textVariant="h5"
        fullWidth
      >
        Create Account
      </Button>
    </View>
  );

  const renderWelcomeHeader = () => (
    <>
      <Spacer height={20} />
      <View className="mx-auto bg-primary/20 dark:bg-primary/20 p-6 rounded-full">
        <IconSymbol name="person" size={40} color="#0084ff" />
      </View>
      <Text variant="h2" color="heading" className="text-center my-2">
        Welcome, Guest
      </Text>
      <Text
        variant="paragraph"
        className="text-center max-w-[85vw] mx-auto mb-2"
      >
        Sign in to access your profile, get notifications, and connect with our
        community
      </Text>
    </>
  );

  const renderInfoFooter = () => (
    <Card variant="outlined" className="mt-4">
      <Text variant="paragraph" className="text-center">
        <Text className="font-medium">Core members:</Text> Sign in with your
        phone number to verify and set a password.{'\n\n'}
        <Text className="font-medium">New visitors:</Text> Create an account to
        receive notifications and participate in our community.
      </Text>
    </Card>
  );

  return (
    <View gradient scrollable>
      {renderWelcomeHeader()}
      {renderAuthButtons()}

      <Card>
        {renderFeatureList(GUEST_FEATURES, 'As a guest, you can:')}
        {renderFeatureList(ACCOUNT_FEATURES, 'With an account, you can:')}
      </Card>

      {renderInfoFooter()}
    </View>
  );
};

export default GuestProfile;
