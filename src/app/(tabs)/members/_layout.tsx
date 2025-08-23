import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import { useTheme } from '@/src/hooks';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function MembersLayout() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: theme.brand,
        headerStyle: {
          backgroundColor: theme.background2,
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
      <Stack.Screen name='index' options={{ title: 'Members' }} />
      <Stack.Screen
        name='[id]'
        options={{ title: 'Details', headerBackTitle: 'Back' }}
      />
    </Stack>
  );
}
