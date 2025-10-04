import { useTheme } from '@/src/hooks';
import Providers from '@/src/providers/Providers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import '../config/firebase';
import './global.css';

SplashScreen.preventAutoHideAsync();

const ONBOARDING_KEY = 'onboarding_seen';

export default function RootLayout() {
  const theme = useTheme();
  const router = useRouter();
  const [appIsReady, setAppIsReady] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    SplineSans: require('../assets/fonts/SplineSans-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        if (!loaded) return;

        const value = await AsyncStorage.getItem(ONBOARDING_KEY);

        if (value === null || value === 'false') {
          await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
          router.replace('/onboarding');
        }

        setAppIsReady(true);
      } catch (e) {
        console.warn('Error loading app state:', e);
        setAppIsReady(true);
      } finally {
        if (loaded) {
          await SplashScreen.hideAsync();
        }
      }
    }

    prepare();
  }, [loaded, router]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Providers>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerTintColor: theme.brand,
          headerStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}
