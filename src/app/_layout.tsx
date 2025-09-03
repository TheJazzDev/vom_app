import { useTheme } from '@/src/hooks';
import Providers from '@/src/providers/Providers';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated';
import { DrawerContent, IconSymbol } from '../components';
import { ROUTES } from '../constants';
import './global.css';

export default function RootLayout() {
  const theme = useTheme();
  const router = useRouter();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    SplineSans: require('../assets/fonts/SplineSans-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <Providers>
      <StatusBar style="auto" />
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          drawerType: 'front',
          headerTitleAlign: 'center',
          headerTintColor: theme.heading,
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
              style={{ marginRight: 12 }}
            >
              <IconSymbol size={24} name="bell.fill" color={theme.muted} />
            </TouchableOpacity>
          ),
        }}
      >
        <Drawer.Screen name="index" options={{ title: 'Home' }} />
        <Drawer.Screen name="auth" options={{ title: 'Authentication' }} />
        <Drawer.Screen name="profile" options={{ title: 'Profile', }} />
        <Drawer.Screen name="programme" options={{ title: 'Programme' }} />
        <Drawer.Screen name="members" options={{ title: 'Members' }} />
        <Drawer.Screen name="ministry" options={{ title: 'Ministry' }} />
        <Drawer.Screen name="info" options={{ title: 'Informations' }} />
        <Drawer.Screen name="about" options={{ title: 'About Us' }} />
        <Drawer.Screen name="contact" options={{ title: 'Contact Us' }} />
        <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
        <Drawer.Screen name="onboarding" options={{ headerShown: false }} />
      </Drawer>
    </Providers>
  );
}
