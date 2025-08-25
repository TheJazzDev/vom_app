import { Stack } from 'expo-router';

export default function ProgrammeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='index' options={{ title: 'Programme' }} />
      <Stack.Screen
        name='[id]'
        options={{ title: 'Programme Details', headerBackTitle: 'Back' }}
      />
    </Stack>
  );
}
