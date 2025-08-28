import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Profile',
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="guest"
        options={{
          title: 'Guest Profile',
          headerBackTitle: 'Back',
          headerShown: true,
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="authenticated"
        options={{
          title: 'My Profile',
          headerBackTitle: 'Back',
          headerShown: true,
          presentation: 'card',
        }}
      /> */}
      {/* <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerBackTitle: 'Profile',
          headerShown: true,
          presentation: 'modal',
        }}
      /> */}
    </Stack>
  );
}
