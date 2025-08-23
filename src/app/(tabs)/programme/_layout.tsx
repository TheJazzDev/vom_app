import { IconSymbol } from '@/src/components';
import { useTheme } from '@/src/hooks';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function ProgrammeLayout() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: theme.heading,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              router.push('/notification');
            }}
            style={{ marginRight: 12 }}>
            <IconSymbol size={24} name='bell.fill' color={theme.muted} />
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen name='index' options={{ title: 'Programme' }} />
      <Stack.Screen
        name='[id]'
        options={{ title: 'Programme Details', headerBackTitle: 'Back' }}
      />
    </Stack>
  );
}
