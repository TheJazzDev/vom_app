import { Button, Card, IconSymbol, Text, View } from '@/src/components';
import { useTheme } from '@/src/hooks';
import { useAuthSlice } from '@/src/store';
import { useRouter } from 'expo-router';
import React from 'react';

const AuthenticatedUserProfile = () => {
  const theme = useTheme();
  const router = useRouter();
  const { currentMember } = useAuthSlice();

  const renderProfileHeader = () => (
    <View className="items-center py-6">
      <View className="bg-primary/20 p-6 rounded-full mb-4">
        <IconSymbol name="person.fill" size={48} color="#0084ff" />
      </View>
      <Text variant="h2" color="heading" className="text-center">
        {currentMember?.firstName} {currentMember?.lastName}
      </Text>
      {currentMember?.email && (
        <Text variant="body" color="muted" className="text-center">
          {currentMember.email}
        </Text>
      )}
      {currentMember?.primaryPhone && (
        <Text variant="body" color="muted" className="text-center">
          {currentMember.primaryPhone}
        </Text>
      )}
    </View>
  );

  const renderQuickActions = () => (
    <Card className="mb-4">
      <Text variant="h5" className="mb-3">
        Quick Actions
      </Text>
      <View className="gap-3">
        <Button
          variant="outline"
          onPress={() => router.push('/settings')}
          icon={<IconSymbol name="gear" size={16} color={theme.muted} />}
        >
          Account Settings
        </Button>
        <Button
          variant="outline"
          onPress={() => router.push('/ministry/prayer-request')}
          icon={
            <IconSymbol name="hands.sparkles" size={16} color={theme.muted} />
          }
        >
          Submit Prayer Request
        </Button>
        <Button
          variant="outline"
          onPress={() => router.push('/members')}
          icon={<IconSymbol name="person.2" size={16} color={theme.muted} />}
        >
          Member Directory
        </Button>
      </View>
    </Card>
  );

  const renderAccountInfo = () => (
    <Card className="mb-4">
      <Text variant="h5" className="mb-3">
        Account Information
      </Text>
      <View className="gap-2">
        <View className="flex-row justify-between">
          <Text color="muted">Member Type</Text>
          <Text>{currentMember?.accountType || 'Guest'}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text color="muted">Member Since</Text>
          <Text>{currentMember?.joinDate || 'N/A'}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text color="muted">Status</Text>
          <Text className="text-green-600">Active</Text>
        </View>
      </View>
    </Card>
  );

  const renderLogoutButton = () => (
    <Button variant="outline" onPress={() => {}} className="border-red-500">
      <Text className="text-red-500">Sign Out</Text>
    </Button>
  );

  return (
    <View scrollable gradient>
      {renderProfileHeader()}
      {renderQuickActions()}
      {renderAccountInfo()}
      {renderLogoutButton()}
    </View>
  );
};

export default AuthenticatedUserProfile;
