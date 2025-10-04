import { useTheme } from '@/src/hooks';
import { Stack } from 'expo-router';

export default function MinistryLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.brand,
        headerTitleStyle: {
          fontSize: 14,
        },
        headerBackTitleStyle: {
          fontSize: 14,
        },
        headerStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'More', headerShown: false }}
      />
      <Stack.Screen name="announcement" options={{ title: 'Announcements' }} />
      <Stack.Screen name="events" options={{ title: 'Events' }} />
      <Stack.Screen
        name="monthly-activities"
        options={{ title: 'Monthly Activities' }}
      />
      <Stack.Screen
        name="weekly-activities"
        options={{ title: 'Weekly Activities' }}
      />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
