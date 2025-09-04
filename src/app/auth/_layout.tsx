import { ProtectedRoute } from '@/src/components/RouteProtection/ProtectedRoute';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <ProtectedRoute requireGuest={true} fallbackRoute="/">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Sign In',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            title: 'Create Account',
          }}
        />
        <Stack.Screen
          name="activate-member-account"
          options={{
            title: 'Create Account',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="verify-email"
          options={{
            title: 'Verify Email',
          }}
        />
        <Stack.Screen
          name="verify-phone"
          options={{
            title: 'Verify Phone',
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            title: 'Reset Password',
          }}
        />
      </Stack>
    </ProtectedRoute>
  );
}
