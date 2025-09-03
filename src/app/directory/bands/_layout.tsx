import { Stack } from 'expo-router';

export default function BandsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Bands' }} />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Band Details',
          presentation: 'modal',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}
