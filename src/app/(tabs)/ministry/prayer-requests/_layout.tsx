import { useTheme } from '@/src/hooks';
import { getStackScreenOptions } from '@/src/utils/navigation.config';
import { Stack } from 'expo-router';

export default function PrayerRequestsLayout() {
  const theme = useTheme();

  return (
    <Stack screenOptions={getStackScreenOptions(theme)}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Prayer Requests',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Prayer Request',
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: 'New Prayer Request',
          presentation: 'fullScreenModal',
          animation: 'fade',
        }}
      />
    </Stack>
  );
}
