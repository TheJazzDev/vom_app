import { useTheme } from '@/src/hooks';
import Providers from '@/src/providers/Providers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated';
import { DrawerContent, IconSymbol } from '../components';
import SplashScreenComponent from '../components/ScreenOptions/SplashScreen';
import '../config/firebase';
import { ROUTES } from '../constants';
import './global.css';

SplashScreen.preventAutoHideAsync();

// Configuration for splash screen timing
const SPLASH_CONFIG = {
  MIN_DISPLAY_TIME: 3000,
  MAX_DISPLAY_TIME: 10000,
};
const ONBOARDING_KEY = 'has_completed_onboarding';

export default function RootLayout() {
  const theme = useTheme();
  const router = useRouter();
  const [appIsReady, setAppIsReady] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const [shouldNavigateToOnboarding, setShouldNavigateToOnboarding] =
    useState(false);
  const [splashStartTime] = useState(Date.now());

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    SplineSans: require('../assets/fonts/SplineSans-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        if (!loaded) return;

        // Check onboarding status
        const value = await AsyncStorage.getItem(ONBOARDING_KEY);
        if (value === null || value === 'false') {
          setShouldNavigateToOnboarding(true);
        }

        // Ensure minimum splash duration
        const elapsedTime = Date.now() - splashStartTime;
        const remainingTime = Math.max(
          0,
          SPLASH_CONFIG.MIN_DISPLAY_TIME - elapsedTime,
        );

        if (remainingTime > 0) {
          await new Promise((res) => setTimeout(res, remainingTime));
        }

        setAppIsReady(true);
      } catch (e) {
        console.warn('Error during app initialization:', e);
        setAppIsReady(true);
      } finally {
        // Hide Expo's splash screen
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [loaded, splashStartTime]);

  useEffect(() => {
    if (appIsReady && shouldNavigateToOnboarding && !showCustomSplash) {
      // Small delay to ensure navigation context is ready
      const timer = setTimeout(() => {
        router.replace('/onboarding');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [appIsReady, shouldNavigateToOnboarding, showCustomSplash, router]);

  const handleSplashFinish = () => {
    setShowCustomSplash(false);
  };

  // Show custom splash screen
  if (showCustomSplash || !appIsReady) {
    return (
      <SplashScreenComponent
        onFinish={handleSplashFinish}
        duration={SPLASH_CONFIG.MIN_DISPLAY_TIME}
      />
    );
  }

  // if (!appIsReady) {
  //   return null;
  // }

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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push(ROUTES.NOTIFICATIONS)}
              style={{ marginRight: 11 }}
            >
              <IconSymbol size={24} name="bell.fill" color={theme.muted} />
            </TouchableOpacity>
          ),
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{ title: 'VOM', headerShown: false }}
        />
        <Drawer.Screen name="auth" options={{ headerShown: false }} />
        <Drawer.Screen name="profile" options={{ title: 'Profile' }} />
        <Drawer.Screen name="info" options={{ headerShown: false }} />
        <Drawer.Screen name="about" options={{ title: 'About Us' }} />
        <Drawer.Screen name="contact" options={{ title: 'Contact Us' }} />
        <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
        <Drawer.Screen name="onboarding" options={{ headerShown: false }} />
      </Drawer>
    </Providers>
  );
}
