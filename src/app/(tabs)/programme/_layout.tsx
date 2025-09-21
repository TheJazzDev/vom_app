import { StackWrapper } from '@/src/components/ScreenOptions/StackScreen';
import { Stack } from 'expo-router';

export default function ProgrammeLayout() {
  return (
    <StackWrapper>
      <Stack.Screen name="index" options={{ title: 'Programme' }} />
      <Stack.Screen name="current" options={{ title: 'Current Programme' }} />
      <Stack.Screen name="upcoming" options={{ title: 'Upcoming Programme' }} />
      <Stack.Screen name="past" options={{ title: 'Past Programme' }} />
      <Stack.Screen name="[id]" options={{ title: 'Programme Details' }} />
    </StackWrapper>
  );
}
