import { useTheme } from '@/src/hooks';
import { Stack } from 'expo-router';

export default function HomeLayout() {
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
      <Stack.Screen
        name="index"
        options={{ title: 'Home', headerShown: false }}
      />
      <Stack.Screen name="notifications" options={{ title: '' }} />
    </Stack>
  );
}
