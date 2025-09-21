import { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../store/store';
import { LoadingProvider } from './LoadingProvider';
import { UnauthorizedModalProvider } from './UnauthorizedModalProvider';

type ProvidersProps = {
  children: ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LoadingProvider>
          <UnauthorizedModalProvider>
            <GestureHandlerRootView>{children}</GestureHandlerRootView>
          </UnauthorizedModalProvider>
        </LoadingProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
