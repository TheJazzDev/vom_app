import { useAuthSlice } from '@/src/store';
import { getUserInitials } from '@/src/utils';
import { useRouter } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';
import { IconSymbol } from '../Icons';
import { Text, View } from '../UI';

const UserProfile = () => {
  const router = useRouter();

  const { currentMember, isAuthenticated } = useAuthSlice();

  return (
    <TouchableOpacity
      onPress={() => router.push(isAuthenticated ? '/profile' : '/auth/login')}
    >
      <View className="flex-row items-center">
        <View className="w-16 h-16 bg-primary/20 dark:bg-primary/20 rounded-full items-center justify-center mr-3">
          {currentMember?.avatar ? (
            <Image
              source={{ uri: currentMember.avatar }}
              className="w-16 h-16 rounded-full"
            />
          ) : currentMember?.firstName ? (
            <Text variant="h3">
              {getUserInitials(currentMember.firstName, currentMember.lastName)}
            </Text>
          ) : (
            <IconSymbol name="person" size={20} color="#0084ff" />
          )}
        </View>
        <View className="flex-1">
          {currentMember ? (
            <Text variant="h5">{currentMember?.firstName}</Text>
          ) : (
            <Text variant="h5">Log In</Text>
          )}
          {currentMember && (
            <Text className="text-blue-100 text-sm">
              Member since {currentMember?.memberSince}
            </Text>
          )}

          {/* <Text className="text-gray-600 text-xs underline">View Profile</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserProfile;
