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
import { LoadingScreen } from '../components';
import { persistor, store } from '../store/store';
import { AuthProvider } from './AuthProvider';

type ProvidersProps = {
  children: ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const colorScheme = useColorScheme();

  // useEffect(() => {
  //   const subscription = Linking.addEventListener('url', async (event) => {
  //     const url = event.url;
  //     const queryParams = Linking.parse(url).queryParams;

  //     if (queryParams?.oobCode && queryParams?.mode === 'verifyEmail') {
  //       try {
  //         const auth = getAuth();
  //         await applyActionCode(auth, queryParams.oobCode as string);
  //         await auth.currentUser?.reload();

  //         if (auth.currentUser?.emailVerified) {
  //           console.log('✅ Email verified successfully!');
  //           // TODO: dispatch Redux action or navigate to "EmailVerified" screen
  //         }
  //       } catch (error) {
  //         console.error('❌ Email verification failed:', error);
  //       }
  //     }
  //   });

  //   return () => {
  //     subscription.remove(); // cleanup on unmount
  //   };
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingScreen />}
        persistor={persistor}
        onBeforeLift={() => {
          console.log('PersistGate: About to lift app');
        }}
      >
        <GestureHandlerRootView>
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
