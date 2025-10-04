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
      <Stack.Screen name="index" options={{ title: 'Ministry', headerShown: false }} />
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
    </Stack>
  );
}
