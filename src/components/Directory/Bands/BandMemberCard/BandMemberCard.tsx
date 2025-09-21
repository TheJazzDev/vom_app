import { IconSymbol } from '@/src/components/Icons';
import { IconSymbolName } from '@/src/components/Icons/IconSymbol';
import { getBandRoleDetails } from '@/src/constants/directory';
import React from 'react';
import { TouchableOpacity, useColorScheme, View } from 'react-native';
import { Card, Text } from '../../../UI';
import UserAvatar from '../../../UserAvatar';

interface BandMemberCardProps {
  member: UserProfile;
  onPress: () => void;
  role: BandRole;
}

const BandMemberCard = ({ member, onPress, role }: BandMemberCardProps) => {
  const mode = useColorScheme();
  const roleDetails = getBandRoleDetails(role, mode);
  // const RoleIcon = roleDetails.icon;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Card variant="outlined" className="flex-row mx-4">
        <UserAvatar
          avatar={member.avatar!}
          firstName={member.firstName}
          lastName={member.lastName}
        />

        <View className="flex-1 ml-3">
          <Text className="text-base font-semibold text-gray-900 dark:text-gray-200 mb-1">
            {member.title} {member.firstName} {member.lastName}
          </Text>

          <View className="flex-row items-center mb-1 gap-1">
            <View
              className="w-5 h-5 rounded-full items-center justify-center"
              style={{ backgroundColor: roleDetails.bgColor }}
            >
              <IconSymbol
                name={roleDetails.icon as IconSymbolName}
                size={12}
                color={roleDetails.color}
              />
            </View>

            <Text
              className="text-sm font-medium"
              style={{ color: roleDetails.color }}
            >
              {roleDetails.label}
            </Text>
          </View>
        </View>
        <View className="justify-center items-center pl-2">
          <Text className="text-xs text-purple-600 dark:text-purple-300 font-medium">
            View Profile
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};
export default BandMemberCard;
