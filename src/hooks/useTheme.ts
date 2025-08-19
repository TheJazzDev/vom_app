import { Colors } from '@/src/constants';
import { useColorScheme } from 'react-native';

export const useTheme = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return theme;
};
