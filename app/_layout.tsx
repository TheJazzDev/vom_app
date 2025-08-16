import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants';
import { useColorScheme } from '@/hooks';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated';

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style='auto' />
      <Stack
        screenOptions={{
          headerShown: true,
          title: 'Vallery of Mercy',
          headerTitleAlign: 'center',
          // headerTintColor: theme.navBackground,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.push('/notification');
              }}
              style={{ marginRight: 16 }}>
              <IconSymbol
                size={28}
                name='bell.fill'
                color={Colors[colorScheme ?? 'light'].icon}
              />
            </TouchableOpacity>
          ),
        }}>
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='+not-found' />
        <Stack.Screen name='notification' />
      </Stack>
    </ThemeProvider>
  );
}
