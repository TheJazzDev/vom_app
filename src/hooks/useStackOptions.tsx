import { useTheme } from '@/src/hooks';

export const useStackOptions = () => {
  const theme = useTheme();

  const stackScreenOptions = {
    headerBackTitle: 'Back',
    headerTitleAlign: 'center' as const,
    headerStyle: {
      backgroundColor: theme.background,
    },
    headerTintColor: theme.heading,
    headerTitleStyle: { color: theme.brand },
  };

  return { stackScreenOptions };
};
