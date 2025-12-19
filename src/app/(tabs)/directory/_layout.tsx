import { SourceAwareBackButton } from '@/src/components';
import { useTheme } from '@/src/hooks';
import {
  getStackScreenOptions,
  HIDE_HEADER,
} from '@/src/utils/navigation.config';
import { Stack } from 'expo-router';
import React from 'react';

export default function DirectoryLayout() {
  const theme = useTheme();

  const screenOptions = {
    ...getStackScreenOptions(theme),
    headerLeft: () => <SourceAwareBackButton tintColor={theme.brand} />,
  };

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="index"
        options={{ title: 'Directory', ...HIDE_HEADER }}
      />
      <Stack.Screen name="members/index" options={{ title: 'Members' }} />
      <Stack.Screen name="children/index" options={{ title: 'Children' }} />
      <Stack.Screen name="bands/index" options={{ title: 'Bands' }} />
      <Stack.Screen name="bands/[band]" options={{ title: 'Band Members' }} />
      <Stack.Screen
        name="departments/index"
        options={{ title: 'Departments' }}
      />
      <Stack.Screen
        name="departments/[department]"
        options={{ title: 'Department Members' }}
      />
    </Stack>
  );
}
