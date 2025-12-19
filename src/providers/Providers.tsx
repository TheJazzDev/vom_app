import { NavigationGuard } from '@/src/components/RouteProtection/NavigationGuard';
import { ReactNode } from 'react';
import { useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useTheme } from '../hooks';
import { persistor, store } from '../store/store';
import { LoadingProvider } from './LoadingProvider';
import { NavigationSourceProvider } from './NavigationSourceProvider';
import { ThemeProvider } from './ThemeProvider';
import { UnauthorizedModalProvider } from './UnauthorizedModalProvider';

type ProvidersProps = {
  children: ReactNode;
};

const PersistGateLoading = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const backgroundColor = isDark ? '#0D0D2B' : '#E5F2FF';

  return <View style={{ backgroundColor, flex: 1 }} />;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<PersistGateLoading />}>
        <NavigationGuard />
        <ThemeProvider>
          <LoadingProvider>
            <UnauthorizedModalProvider>
              <NavigationSourceProvider>
                <GestureHandlerRootView
                  style={{ flex: 1, backgroundColor: theme.background }}
                >
                  {children}
                </GestureHandlerRootView>
              </NavigationSourceProvider>
            </UnauthorizedModalProvider>
          </LoadingProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
