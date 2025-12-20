import { SourceAwareBackButton } from '@/src/components';
import { useTheme } from '@/src/hooks';
import {
  getStackScreenOptions,
  HIDE_HEADER,
} from '@/src/utils/navigation.config';
import { Stack } from 'expo-router';
import React from 'react';

export default function MoreLayout() {
  const theme = useTheme();

  const screenOptions = {
    ...getStackScreenOptions(theme),
    headerLeft: () => <SourceAwareBackButton tintColor={theme.brand} />,
  };

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={{ title: 'More', ...HIDE_HEADER }} />
      <Stack.Screen name="announcement" options={{ title: 'Announcements' }} />
      <Stack.Screen name="events" options={{ title: 'Events' }} />
      <Stack.Screen name="birthdays" options={{ title: 'Birthdays' }} />
      <Stack.Screen name="about" options={{ title: 'About Us' }} />
      <Stack.Screen name="contact" options={{ title: 'Contact' }} />
      <Stack.Screen
        name="monthly-activities"
        options={{ title: 'Monthly Activities' }}
      />
      <Stack.Screen
        name="weekly-activities"
        options={{ title: 'Weekly Activities' }}
      />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      <Stack.Screen name="leaderboard" options={{ title: 'Leaderboard' }} />
    </Stack>
  );
}
