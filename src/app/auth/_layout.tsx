import { useTheme } from '@/src/hooks';
import { Stack } from 'expo-router';

export default function DirectoryLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.brand,
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
      <Stack.Screen name="index" options={{ title: 'Sign In' }} />
      <Stack.Screen
        name="signup"
        options={{
          title: 'Sign Up',
        }}
      />
      <Stack.Screen
        name="find-member"
        options={{
          title: 'Find Account',
        }}
      />
      <Stack.Screen
        name="activate-member-account/index"
        options={{
          title: 'Activate Account',
        }}
      />
      <Stack.Screen
        name="email-link-sent"
        options={{
          headerShown: false,
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
      <Stack.Screen
        name="phone-login"
        options={{
          title: 'Phone Login',
        }}
      />
    </Stack>
  );
}
