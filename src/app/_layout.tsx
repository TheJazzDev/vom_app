import { ErrorBoundary, OfflineBanner } from '@/src/components';
import { useTheme } from '@/src/hooks';
import Providers from '@/src/providers/Providers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import 'react-native-reanimated';
import '../config/firebase';
import './global.css';

SplashScreen.preventAutoHideAsync();

const ONBOARDING_KEY = 'onboarding_seen';

export default function RootLayout() {
  const theme = useTheme();
  const router = useRouter();
  const hasCheckedOnboarding = useRef(false);
  const [appIsReady, setAppIsReady] = useState(false);

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    SplineSans: require('../assets/fonts/SplineSans-Regular.ttf'),
  });

   useEffect(() => {
    async function prepare() {
      try {
        // wait for fonts
        if (!loaded && !error) return;

        if (error) console.warn('[RootLayout] Font error', error);

        if (!hasCheckedOnboarding.current) {
          const value = await AsyncStorage.getItem(ONBOARDING_KEY);
          if (value === null || value === 'false') {
            router.replace('/onboarding'); // navigate once
          }
          hasCheckedOnboarding.current = true;
        }
      } catch (e) {
        console.warn('[RootLayout] Error:', e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [loaded, error, router]);

  return (
    <ErrorBoundary>
      <Providers>
        <StatusBar style="auto" />
        <OfflineBanner />
        {appIsReady ? (
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
        ) : null}
      </Providers>
    </ErrorBoundary>
  );
}
