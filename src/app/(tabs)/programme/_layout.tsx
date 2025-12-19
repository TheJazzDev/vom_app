import { SourceAwareBackButton } from '@/src/components';
import { useTheme } from '@/src/hooks';
import {
  getStackScreenOptions,
  HIDE_HEADER,
} from '@/src/utils/navigation.config';
import { Stack } from 'expo-router';
import React from 'react';

export default function ProgrammeLayout() {
  const theme = useTheme();

  const screenOptions = {
    ...getStackScreenOptions(theme),
    headerLeft: () => <SourceAwareBackButton tintColor={theme.brand} />,
  };

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="index"
        options={{ title: 'Programme', ...HIDE_HEADER }}
      />
      <Stack.Screen name="current" options={{ title: '' }} />
      <Stack.Screen
        name="upcoming"
        options={{ title: 'Upcoming Programmes' }}
      />
      <Stack.Screen name="past" options={{ title: 'Past Programmes' }} />
      <Stack.Screen name="[id]" options={{ title: 'Programme Details' }} />
    </Stack>
  );
}
