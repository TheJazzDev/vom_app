import { StackWrapper } from '@/src/components/UI/ScreenOptions/StackScreen';
import { Stack } from 'expo-router';

export default function DirectoryLayout() {
  return (
    <StackWrapper headerRight={false}>
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
    </StackWrapper>
  );
}
