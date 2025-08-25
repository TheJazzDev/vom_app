import { Stack } from 'expo-router';

export default function MembersLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='index' options={{ title: 'Members' }} />
      <Stack.Screen
        name='[id]'
        options={{ title: 'Member Details', headerBackTitle: 'Back' }}
      />
    </Stack>
  );
}
