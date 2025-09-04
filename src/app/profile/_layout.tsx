import { ProtectedRoute } from '@/src/components/RouteProtection/ProtectedRoute';
import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <ProtectedRoute
      requireAuth={true}
      fallbackRoute="/auth/login"
      // showUnauthorized={true}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="edit"
          options={{ headerShown: true, title: 'Edit Profile' }}
        />
        <Stack.Screen
          name="settings"
          options={{ headerShown: true, title: 'Settings' }}
        />
      </Stack>
    </ProtectedRoute>
  );
}
