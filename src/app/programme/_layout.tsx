import { Stack } from 'expo-router';

export default function ProgrammeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="current" />
      <Stack.Screen name="upcoming" />
      <Stack.Screen name="past" />
    </Stack>
  );
}
