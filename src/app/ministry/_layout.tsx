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
        name="bible-study"
        options={{
          title: 'Bible Study',
        }}
      />
      <Stack.Screen
        name="prayer-request"
        options={{
          title: 'Prayer Request',
        }}
      />
      <Stack.Screen
        name="recent-sermons"
        options={{
          title: 'Recent Sermons',
        }}
      />
      <Stack.Screen
        name="testimonies"
        options={{
          title: 'Testimonies',
        }}
      />
    </Stack>
  );
}
