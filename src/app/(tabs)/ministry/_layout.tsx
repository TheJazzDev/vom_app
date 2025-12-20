import { useTheme } from '@/src/hooks';
import { getStackScreenOptions, HIDE_HEADER } from '@/src/utils/navigation.config';
import { Stack } from 'expo-router';

export default function MinistryLayout() {
  const theme = useTheme();

  return (
    <Stack screenOptions={getStackScreenOptions(theme)}>
      <Stack.Screen name="index" options={{ title: 'Ministry', ...HIDE_HEADER }} />
      <Stack.Screen
        name="daily-prayers"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="bible-study" options={{ title: 'Bible Study' }} />
      <Stack.Screen
        name="recent-sermons"
        options={{ title: 'Recent Sermons' }}
      />
      <Stack.Screen
        name="prayer-requests"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="testimonies" options={{ title: 'Testimonies' }} />
    </Stack>
  );
}
