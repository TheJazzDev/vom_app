import { StackWrapper } from '@/src/components/ScreenOptions/StackScreen';
import { Stack } from 'expo-router';

export default function DirectoryLayout() {
  return (
    <StackWrapper>
      <Stack.Screen name="index" options={{ title: 'Directory' }} />
      <Stack.Screen name="members/index" options={{ title: 'Members' }} />
      <Stack.Screen name="children/index" options={{ title: 'Children' }} />
      <Stack.Screen name="bands/index" options={{ title: 'Bands' }} />
      <Stack.Screen name="bands/[band]" options={{ title: 'Band Members' }} />
      <Stack.Screen
        name="departments/index"
        options={{ title: 'Departments' }}
      />
    </StackWrapper>
  );
}
