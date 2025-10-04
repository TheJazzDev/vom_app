import { useTheme } from '@/src/hooks';
import { useAuthSlice } from '@/src/store';
import { getCurrentTimeGreeting, getUserInitials } from '@/src/utils';
import { useRouter } from 'expo-router';
import { Image, Pressable } from 'react-native';
import { HelloWave } from '../../HelloWave';
import { IconSymbol } from '../../Icons';
import { Text, View } from '../../UI';

export function ProfileHeader() {
  const theme = useTheme();
  const router = useRouter();
  const { currentUser, isAuthenticated } = useAuthSlice();

  return (
    <Pressable
      onPress={() => router.push(isAuthenticated ? '/profile' : '/auth')}
      className="mr-4 flex-row gap-2 items-center"
    >
      <View className="w-10 h-10 bg-primary/20 dark:bg-primary/30 rounded-full items-center justify-center">
        {isAuthenticated ? (
          currentUser?.avatar ? (
            <Image
              source={{ uri: currentUser.avatar }}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <Text className="text-sm font-semibold text-primary">
              {getUserInitials(currentUser!.firstName, currentUser!.lastName)}
            </Text>
          )
        ) : (
          <IconSymbol name="person.fill" size={20} color={theme.muted} />
        )}
      </View>
      {isAuthenticated && (
        <>
          <Text>
            {getCurrentTimeGreeting()} {currentUser!.firstName}
          </Text>
          <HelloWave />
        </>
      )}
    </Pressable>
  );
}
