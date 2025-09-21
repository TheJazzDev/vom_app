import { useTheme } from '@/src/hooks';
import { ActivityIndicator } from 'react-native';
import { Text } from './Text';
import { View } from './View';

const LoadingScreen = ({ text }: { text?: string }) => {
  const theme = useTheme();

  return (
    <View gradient className="h-screen flex-col items-center justify-center">
      <ActivityIndicator size="large" color={theme.text} />
      <Text>{text}</Text>
    </View>
  );
};

export default LoadingScreen;
