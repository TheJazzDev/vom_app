import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{presentation: 'modal'}}>
      <Stack.Screen
        name="index"
        options={{ title: 'Profile', presentation: 'modal' }}
      />
    </Stack>
  );
}
