import { StackWrapper } from '@/src/components/UI/ScreenOptions/StackScreen';
import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <StackWrapper>
      <Stack.Screen name="index" options={{ title: 'Profile' }} />
    </StackWrapper>
  );
}
