import { StackWrapper } from '@/src/components/UI/ScreenOptions/StackScreen';
import { Stack } from 'expo-router';

export default function MinistryLayout() {
  return (
    <StackWrapper>
      <Stack.Screen name="index" options={{ title: 'Informations' }} />
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
    </StackWrapper>
  );
}
