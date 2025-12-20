import { SourceAwareBackButton } from '@/src/components';
import { useTheme } from '@/src/hooks';
import { getStackScreenOptions } from '@/src/utils/navigation.config';
import { Stack } from 'expo-router';
import React from 'react';

export default function NotificationsLayout() {
  const theme = useTheme();

  const screenOptions = {
    ...getStackScreenOptions(theme),
    headerLeft: () => <SourceAwareBackButton tintColor={theme.brand} />,
  };

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={{ title: 'Notifications' }} />
    </Stack>
  );
}
