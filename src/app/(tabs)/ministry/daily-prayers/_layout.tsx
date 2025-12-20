import { useTheme } from '@/src/hooks';
import { getStackScreenOptions } from '@/src/utils/navigation.config';
import { Stack } from 'expo-router';

export default function DailyPrayersLayout() {
  const theme = useTheme();

  return (
    <Stack screenOptions={getStackScreenOptions(theme)}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Daily Prayers',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Daily Prayer',
        }}
      />
    </Stack>
  );
}
