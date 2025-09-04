import { useTheme } from '@/src/hooks';
import { Slot, Stack } from 'expo-router';

export default function DirectoryLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.heading,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Directory', headerShown: false }}
      />
      <Stack.Screen name="members" options={{ title: 'Members Directory' }} />
      <Slot />
      <Stack.Screen name="children" options={{ title: 'Children Directory' }} />
      <Stack.Screen name="bands" options={{ title: 'Church Bands' }} />
      <Stack.Screen name="departments" options={{ title: 'Departments' }} />
      <Stack.Screen name="[id]" options={{ title: 'Details' }} />
    </Stack>
  );
}
