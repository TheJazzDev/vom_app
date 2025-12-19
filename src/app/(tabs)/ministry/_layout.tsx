import { SourceAwareBackButton } from '@/src/components';
import { useTheme } from '@/src/hooks';
import {
  getStackScreenOptions,
  HIDE_HEADER,
} from '@/src/utils/navigation.config';
import { Stack } from 'expo-router';
import React from 'react';

export default function MinistryLayout() {
  const theme = useTheme();

  const screenOptions = {
    ...getStackScreenOptions(theme),
    headerLeft: () => <SourceAwareBackButton tintColor={theme.brand} />,
  };

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="index"
        options={{ title: 'Ministry', ...HIDE_HEADER }}
      />
      <Stack.Screen name="bible-study" options={{ title: 'Bible Study' }} />
      <Stack.Screen
        name="recent-sermons"
        options={{ title: 'Recent Sermons' }}
      />
      <Stack.Screen
        name="prayer-request"
        options={{ title: 'Prayer Requests' }}
      />
      <Stack.Screen name="testimonies" options={{ title: 'Testimonies' }} />
    </Stack>
  );
}
