import { useTheme } from '@/src/hooks';
import { ActivityIndicator } from 'react-native';
import { View } from './View';

const LoadingScreen = () => {
  const theme = useTheme();

  return (
    <View gradient scrollable className="h-screen flex-col items-center justify-center">
      <ActivityIndicator size="large" color={theme.text} />
    </View>
  );
};

export default LoadingScreen;