import { Text, View } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface MemberListItemProps {
  member: MemberProfile;
  onPress: () => void;
}

export const MemberListItem: React.FC<MemberListItemProps> = ({
  member,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View className="bg-white dark:bg-gray-800 p-4 mb-2 rounded-lg flex-row items-center shadow-sm">
        {/* <View className="relative">
          <Image
            source={{ uri: member?.avatar }}
            className="w-12 h-12 rounded-full"
          />
          <View
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
              member.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
            }`}
          />
        </View> */}

        {/* <View className="flex-1 ml-4">
          <View className="flex-row items-center justify-between mb-1">
            <Text variant="body" className="font-semibold">
              {member?.title} {member?.firstName} {member?.lastName}
            </Text>

            <View className="flex-row items-center">
              <View
                className={`w-2 h-2 rounded-full mr-2 ${
                  member.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                }`}
              />
              <Text variant="caption" className="text-gray-500 capitalize">
                {member.gender}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              {member?.position && member.position.length > 0 && (
                <Text
                  variant="caption"
                  className="text-gray-600 dark:text-gray-400"
                >
                  {member.position[0]}
                  {member.position.length > 1 &&
                    ` +${member.position.length - 1} more`}
                </Text>
              )}
            </View>

            <View className="flex-row space-x-3">
              <TouchableOpacity onPress={() => {}}>
                <IconSymbol name="phone" size={16} color="#6b7280" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <IconSymbol name="envelope" size={16} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};
