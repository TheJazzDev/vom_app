import { Button, Card, IconSymbol, Spacer, Text, View } from '@/src/components';
import { useTheme } from '@/src/hooks';
import { useRouter } from 'expo-router';
import React from 'react';
import MembershipDetails from './MembershipDetails';
import PersonalInfo from './PersonalInfo';
import ProfileHeader from './ProfileHeader';

const AuthenticatedUserProfile = () => {
  const theme = useTheme();
  const router = useRouter();

  const renderQuickActions = () => (
    <Card className="mb-4">
      <Text variant="h5" className="mb-4 text-gray-900 dark:text-white">
        Quick Actions
      </Text>
      <View className="gap-3">
        <Button
          variant="outline"
          onPress={() => router.push('/settings')}
          icon={<IconSymbol name="gear" size={18} color={theme.muted} />}
          className="justify-start"
        >
          <Text className="text-gray-700 dark:text-gray-300">
            Account Settings
          </Text>
        </Button>

        <Button
          variant="outline"
          onPress={() => router.push('/ministry/prayer-request')}
          icon={
            <IconSymbol name="hands.sparkles" size={18} color={theme.muted} />
          }
          className="justify-start"
        >
          <Text className="text-gray-700 dark:text-gray-300">
            Submit Prayer Request
          </Text>
        </Button>

        <Button
          variant="outline"
          onPress={() => router.push('/members')}
          icon={<IconSymbol name="person.2" size={18} color={theme.muted} />}
          className="justify-start"
        >
          <Text className="text-gray-700 dark:text-gray-300">
            Member Directory
          </Text>
        </Button>

        <Button
          variant="outline"
          onPress={() => router.push('/events')}
          icon={<IconSymbol name="calendar" size={18} color={theme.muted} />}
          className="justify-start"
        >
          <Text className="text-gray-700 dark:text-gray-300">
            Upcoming Events
          </Text>
        </Button>
      </View>
    </Card>
  );

  return (
    <View gradient scrollable>
      <Spacer height={12} />
      <ProfileHeader />
      <Spacer height={8} />
      <MembershipDetails />
      <Spacer height={8} />
      <PersonalInfo />

      {/* <View className="py-4">{renderQuickActions()}</View> */}
    </View>
  );
};

export default AuthenticatedUserProfile;
