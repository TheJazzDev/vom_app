import { StackWrapper } from '@/src/components/ScreenOptions/StackScreen';
import { useStackOptions } from '@/src/hooks/useStackOptions';
import { Stack } from 'expo-router';

export default function DirectoryLayout() {
  const { stackScreenOptions } = useStackOptions();

  return (
    <StackWrapper headerRight={false}>
      <Stack.Screen name='index' options={stackScreenOptions} />
      <Stack.Screen
        name='signup'
        options={{
          title: 'Sign Up',
        }}
      />
      <Stack.Screen
        name='activate-member-account'
        options={{
          title: 'Activate Account',
        }}
      />
      <Stack.Screen
        name='find-member'
        options={{
          title: 'Find Account',
        }}
      />
      <Stack.Screen
        name='verify-email'
        options={{
          title: 'Verify Email',
        }}
      />
      <Stack.Screen
        name='email-verify-success'
        options={{
          title: 'Verificataion Success',
        }}
      />
      <Stack.Screen
        name='verify-phone'
        options={{
          title: 'Verify Phone',
        }}
      />
      <Stack.Screen
        name='forgot-password'
        options={{
          title: 'Reset Password',
        }}
      />
    </StackWrapper>
  );
}
