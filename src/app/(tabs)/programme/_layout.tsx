import { useTheme } from '@/src/hooks';
import { Stack } from 'expo-router';

export default function ProgrammeLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.brand,
        headerBackTitle: 'Back',
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
      <Stack.Screen
        name="index"
        options={{ title: 'Programme', headerShown: false }}
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
