import { useAuthSlice } from '@/src/store';
import { getUserInitials } from '@/src/utils';
import { useRouter } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';
import { IconSymbol } from '../Icons';
import { Text, View } from '../UI';

const UserProfile = () => {
  const router = useRouter();
  const { currentUser, isAuthenticated } = useAuthSlice();

  return (
    <TouchableOpacity
      onPress={() => router.push(isAuthenticated ? '/profile' : '/auth')}
    >
      <View className="flex-row items-center">
        <View className="w-16 h-16 bg-primary/20 dark:bg-primary/20 rounded-full items-center justify-center mr-3">
          {currentUser?.avatar ? (
            <Image
              source={{ uri: currentUser.avatar }}
              className="w-16 h-16 rounded-full"
            />
          ) : currentUser?.firstName ? (
            <Text variant="h3">
              {getUserInitials(currentUser.firstName, currentUser.lastName)}
            </Text>
          ) : (
            <IconSymbol name="person" size={20} color="#0084ff" />
          )}
        </View>
        <View className="flex-1">
          {currentUser ? (
            <Text variant="h5">{currentUser?.firstName}</Text>
          ) : (
            <Text variant="h5">Log In</Text>
          )}
          {currentUser && (
            <>
              <Text className="text-blue-100 text-sm">
                Member since {currentUser?.memberSince}
              </Text>
              <Text className="text-gray-600 text-xs underline">
                View Profile
              </Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserProfile;
