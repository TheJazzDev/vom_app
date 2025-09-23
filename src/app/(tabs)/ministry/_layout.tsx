import { StackWrapper } from '@/src/components/UI/ScreenOptions/StackScreen';
import { Stack } from 'expo-router';

export default function MinistryLayout() {
  return (
    <StackWrapper>
      <Stack.Screen name="index" options={{ title: 'Ministry' }} />
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
    </StackWrapper>
  );
}
