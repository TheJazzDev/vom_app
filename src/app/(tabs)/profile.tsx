import { Button, Card, IconSymbol, Spacer, Text, View } from '@/src/components';
import { useRouter } from 'expo-router';
import React from 'react';

const guestFeatures = [
  'View all church services and events',
  'Access church activities and ministries',
];

const accountFeatures = [
  'Personal profile and preferences',
  "Service notifications when you're scheduled",
  'Prayer request submissions',
  'Browse member directory',
  'Community interaction features',
];

const ProfileScreen = () => {
  const router = useRouter();

  return (
    <View gradient scrollable>
      <Spacer height={20} />
      <View className="mx-auto bg-primary/20 dark:bg-primary/20 p-6 rounded-full">
        <IconSymbol name="person" size={40} color="#0084ff" />
      </View>
      <Text variant="h2" color="heading" className="text-center my-2">
        Welcome, Guest
      </Text>
      <Text variant="paragraph" className="text-center max-w-[85vw] mx-auto">
        Sign in to access your profile, get notification, and connect with the
        community
      </Text>

      <View className="flex-col gap-3 my-6">
        <Button
          onPress={() => router.push('/auth/phone-entry')}
          variant="primary"
          textVariant="h5"
        >
          Sign In
        </Button>
        <Button
          onPress={() => router.push('/auth/member-setup')}
          variant="outline"
          textVariant="h5"
        >
          Create Account
        </Button>
      </View>

      <Card>
        <Text variant="h5" color="heading">
          As a guest, you can:
        </Text>
        {guestFeatures.map((feature, index) => (
          <Text key={index} color="body">
            <>&bull;{'  '}</>
            {feature}
          </Text>
        ))}
        <Text variant="h5" color="heading" className="mt-2">
          With an account, you can:
        </Text>
        {accountFeatures.map((feature, index) => (
          <Text key={index} color="body">
            <>&bull;{'  '}</>
            {feature}
          </Text>
        ))}
      </Card>
      <Text variant="paragraph" className="mt-4">
        Core members can sign in with their phone number to verify and set a
        password. Guests can create an account to receive notifications and
        participate in our community.
      </Text>
    </View>
  );
};

export default ProfileScreen;
