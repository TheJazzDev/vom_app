import { useTheme } from '@/src/hooks';
import { getStackScreenOptions, HIDE_HEADER } from '@/src/utils/navigation.config';
import { Stack } from 'expo-router';

export default function MoreLayout() {
  const theme = useTheme();

  return (
    <Stack screenOptions={getStackScreenOptions(theme)}>
      <Stack.Screen
        name="index"
        options={{ title: 'More', ...HIDE_HEADER }}
      />
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
    </Stack>
  );
}
