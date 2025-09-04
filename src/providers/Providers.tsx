import { useColorScheme } from '@/src/hooks';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { UnauthorizedModalProvider } from '../context/UnauthorizedModalProvider';
import { persistor, store } from '../store/store';
import { AuthProvider } from './AuthProvider';
import { LoadingScreen } from '../components';

type ProvidersProps = {
  children: ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingScreen text="redux is loading" />}
        persistor={persistor}
        onBeforeLift={() => {
          console.log('PersistGate: About to lift app');
        }}
      >
        <UnauthorizedModalProvider>
          <GestureHandlerRootView>
            <ThemeProvider
              value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
              <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>
          </GestureHandlerRootView>
        </UnauthorizedModalProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
