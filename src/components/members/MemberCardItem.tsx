import { Badge, Card, Text, View } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface MemberCardItemProps {
  member: MemberProfile;
  onPress: () => void;
}

export const MemberCardItem: React.FC<MemberCardItemProps> = ({
  member,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card className="mb-4 overflow-hidden">
        <View className="p-4">
          {/* Header Section */}
          <View className="flex-row items-start mb-3">
            <View className="relative">
              <Image
                source={{ uri: member?.avatar }}
                className="w-16 h-16 rounded-full"
              />
              {/* Status indicator */}
              <View
                className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800 ${
                  member.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                }`}
              />
            </View>

            <View className="flex-1 ml-4">
              <Text variant="h4" className="font-bold mb-1">
                {member?.title} {member?.firstName} {member?.lastName}
              </Text>

              <View className="flex-row items-center mb-2">
                <View
                  className={`w-2 h-2 rounded-full mr-2 ${
                    member.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                  }`}
                />
                <Text
                  variant="caption"
                  className="text-gray-600 dark:text-gray-400 capitalize"
                >
                  {member.gender}
                </Text>
              </View>

              {member?.department && (
                <Text
                  variant="caption"
                  className="text-blue-600 dark:text-blue-400 font-medium"
                >
                  {member.department} Department
                </Text>
              )}
            </View>

            {/* Action buttons */}
            <View className="flex-row space-x-2">
              <TouchableOpacity
                className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center"
                onPress={() => {
                  /* Handle phone call */
                }}
              >
                <IconSymbol name="phone.fill" size={18} color="#3b82f6" />
              </TouchableOpacity>

              <TouchableOpacity
                className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center"
                onPress={() => {
                  /* Handle message */
                }}
              >
                <IconSymbol name="envelope.fill" size={18} color="#10b981" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Positions/Roles */}
          {member?.position && member.position.length > 0 && (
            <View className="flex-row flex-wrap gap-2 mb-3">
              {member.position.slice(0, 2).map((role, index) => (
                <Badge key={index} variant="secondary" size="sm">
                  {role}
                </Badge>
              ))}
              {member.position.length > 2 && (
                <Badge variant="outline" size="sm">
                  +{member.position.length - 2} more
                </Badge>
              )}
            </View>
          )}

          {/* Bands */}
          {member?.band && member.band.length > 0 && (
            <View className="flex-row items-center">
              <IconSymbol name="music.note" size={14} color="#6b7280" />
              <Text
                variant="caption"
                className="ml-1 text-gray-600 dark:text-gray-400"
              >
                {member.band.slice(0, 2).join(', ')}
                {member.band.length > 2 && ` +${member.band.length - 2} more`}
              </Text>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};
