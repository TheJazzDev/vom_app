import { IconSymbol } from '@/components/ui/IconSymbol';
import Providers from '@/context/Providers';
import { useTheme } from '@/hooks';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
  const theme = useTheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    SplineSans: require('../assets/fonts/SplineSans-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <Providers>
      <StatusBar style='auto' />
      <Stack
        screenOptions={{
          headerShown: false,
          title: 'VOM',
          headerTitleAlign: 'center',
          headerTintColor: theme.text,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // router.push('/notification');
              }}
              style={{ marginRight: 16 }}>
              <IconSymbol size={28} name='bell.fill' color={theme.icon} />
            </TouchableOpacity>
          ),
        }}>
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='+not-found' />
        <Stack.Screen name='notification' />
      </Stack>
    </Providers>
  );
}
