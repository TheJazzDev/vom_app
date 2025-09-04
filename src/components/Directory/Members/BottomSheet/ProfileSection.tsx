import { Text, View } from '../../../UI';
import React from 'react';
import { Image } from 'react-native';

interface ProfileSectionProps {
  member: MemberProfile;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ member }) => {
  return (
    <View className="items-center py-6">
      <View className="relative mb-4">
        <View className="w-24 h-24 bg-primary/20 dark:bg-primary/10 rounded-full items-center justify-center border-4 border-white dark:border-gray-600 shadow-lg">
          {member.avatar ? (
            <Image
              source={{ uri: member.avatar }}
              className="w-24 h-24 rounded-full"
            />
          ) : (
            <Text className="text-3xl text-primary dark:text-primary-light">
              {member.firstName[0]}
              {member.lastName[0]}
            </Text>
          )}
        </View>

        {/* Status indicator */}
        <View
          className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 ${
            member.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
          }`}
        />
      </View>

      <Text variant="h2" className="text-center mb-2">
        {member.title} {member.firstName} {member.lastName}
      </Text>

      <View className="flex-row items-center">
        <View
          className={`w-3 h-3 rounded-full mr-2 ${
            member.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'
          }`}
        />
        <Text
          variant="body"
          className="capitalize text-gray-600 dark:text-gray-400"
        >
          {member.gender}
        </Text>
      </View>
    </View>
  );
};

export default ProfileSection;
