import { useColorScheme } from '@/hooks';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type ProvidersProps = {
  children: ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {children}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default Providers;
