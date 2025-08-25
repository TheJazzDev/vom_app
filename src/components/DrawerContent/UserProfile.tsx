import { useRouter } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';
import { Text, View } from '../UI';

const UserProfile = () => {
  const router = useRouter();

  const user = {
    name: 'John Doe',
    avatar: null,
    memberSince: '2020',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <View className='flex-row items-center mb-'>
      <View className='w-16 h-16 bg-primary/20 dark:bg-primary/20 rounded-full items-center justify-center mr-3'>
        {user.avatar ? (
          <Image
            source={{ uri: user.avatar }}
            className='w-16 h-16 rounded-full'
          />
        ) : (
          <Text variant='h3'>{getInitials(user.name)}</Text>
        )}
      </View>
      <View className='flex-1'>
        <Text variant='h5'>{user.name}</Text>
        <Text className='text-blue-100 text-sm'>
          Member since {user.memberSince}
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/profile')}
          className='mt-1'>
          <Text className='text-gray-600 text-xs underline'>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfile;
