import Providers from '@/src/context/Providers';
import { useTheme } from '@/src/hooks';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated';
import { DrawerContent, IconSymbol } from '../components';
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
      <StatusBar style='auto' />
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          drawerType: 'front',
          headerTitleAlign: 'center',
          headerTintColor: theme.heading,
          drawerStyle: {
            width: '75%',
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
              onPress={() => {
                router.push('/notification');
              }}
              style={{ marginRight: 12 }}>
              <IconSymbol size={24} name='bell.fill' color={theme.muted} />
            </TouchableOpacity>
          ),
        }}>
        <Drawer.Screen
          name='(tabs)'
          options={{
            headerShown: false,
            title: 'Home',
          }}
        />
      </Drawer>
    </Providers>
  );
}
