import { IconSymbol } from '@/src/components';
import { useTheme } from '@/src/hooks';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function AuthLayout() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.heading,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        // headerLeft: ({ canGoBack }) => {
        //   if (canGoBack) {
        //     return (
        //       <TouchableOpacity onPress={() => router.back()}>
        //         <IconSymbol
        //           size={16}
        //           name="chevron.left"
        //           color={theme.heading}
        //         />
        //       </TouchableOpacity>
        //     );
        //   }
        //   return null;
        // },

        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.push('/(tabs)');
              }
            }}
            style={{ marginRight: 12 }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <IconSymbol size={20} name="arrow.backward" color={theme.muted} />
            </TouchableOpacity>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Create Account',
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
  );
}
