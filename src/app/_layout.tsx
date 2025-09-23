import { useTheme } from '@/src/hooks';
import Providers from '@/src/providers/Providers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { DrawerContent } from '../components';
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
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          drawerType: 'front',
          headerTitleAlign: 'center',
          headerTintColor: theme.muted,
          headerTitleStyle: { color: theme.brand },
          drawerStyle: {
            width: '78%',
            borderRightWidth: 1,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderRightColor: theme.border,
            backgroundColor: theme.background,
          },
          headerStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        <Drawer.Screen name="(tabs)" options={{ headerShown: false }} />
        <Drawer.Screen name="auth" options={{ headerShown: false }} />
        <Drawer.Screen name="onboarding" options={{ headerShown: false }} />
      </Drawer>
    </Providers>
  );
}
