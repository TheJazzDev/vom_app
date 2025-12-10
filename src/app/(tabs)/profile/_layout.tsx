import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import { useTheme } from '@/src/hooks';
import { Stack, useRouter } from 'expo-router';
import { Platform, Pressable } from 'react-native';

export default function ProfileLayout() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        presentation: 'card',
        headerTitleAlign: 'center',
        headerTintColor: theme.brand,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
        animation: 'slide_from_bottom',
        // iOS optimization: Prevent blank screens during transitions
        animationDuration: Platform.OS === 'ios' ? 300 : 250,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'My Profile',
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginLeft: Platform.OS === 'ios' ? 0 : 16,
              })}
            >
              <IconSymbol name="chevron.left" size={24} color={theme.brand} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => router.push('/profile/edit')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                marginRight: Platform.OS === 'ios' ? 0 : 16,
              })}
            >
              <IconSymbol
                name="square.and.pencil"
                size={22}
                color={theme.brand}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: 'Edit Profile',
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}
