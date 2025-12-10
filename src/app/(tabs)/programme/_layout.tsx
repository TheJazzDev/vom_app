import { useTheme } from '@/src/hooks';
import { getStackScreenOptions, HIDE_HEADER } from '@/src/utils/navigation.config';
import { Stack } from 'expo-router';

export default function ProgrammeLayout() {
  const theme = useTheme();

  return (
    <Stack screenOptions={getStackScreenOptions(theme)}>
      <Stack.Screen
        name="index"
        options={{ title: 'Programme', ...HIDE_HEADER }}
      />
      <Stack.Screen name="current" options={{ title: '' }} />
      <Stack.Screen
        name="upcoming"
        options={{ title: 'Upcoming Programmes' }}
      />
      <Stack.Screen name="past" options={{ title: 'Past Programmes' }} />
      <Stack.Screen name="[id]" options={{ title: 'Programme Details' }} />
    </Stack>
  );
}
