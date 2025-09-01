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
        name="about"
        options={{
          title: 'About Us',
        }}
      />
      <Stack.Screen
        name="announcements"
        options={{
          title: 'Announcements',
        }}
      />
      <Stack.Screen
        name="bands"
        options={{
          title: 'Bands',
        }}
      />
      <Stack.Screen
        name="contact"
        options={{
          title: 'Contact Us',
        }}
      />
      <Stack.Screen
        name="events"
        options={{
          title: 'Events',
        }}
      />
      <Stack.Screen
        name="notification"
        options={{
          title: 'Notifications',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Stack>
  );
}
