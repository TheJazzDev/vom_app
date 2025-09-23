import * as SplashScreen from 'expo-splash-screen';
import { ReactNode } from 'react';
import { useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useTheme } from '../hooks';
import { persistor, store } from '../store/store';
import { LoadingProvider } from './LoadingProvider';
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

  const handleBeforeLift = async () => {
    await SplashScreen.hideAsync();
  };

  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={<PersistGateLoading />}
        onBeforeLift={handleBeforeLift}
      >
        <LoadingProvider>
          <UnauthorizedModalProvider>
            <GestureHandlerRootView
              style={{ flex: 1, backgroundColor: theme.background }}
            >
              {children}
            </GestureHandlerRootView>
          </UnauthorizedModalProvider>
        </LoadingProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
