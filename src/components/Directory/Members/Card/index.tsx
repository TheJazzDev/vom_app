import UserAvatar from '@/src/components/UserAvatar';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card, Text } from '../../../UI';
import { BandBadge } from '../../Bands';

interface MemberCardProps {
  member: UserProfile;
  onPress: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card
        variant="default"
        className="flex flex-row mb-3 border border-border dark:border-dark-border"
      >
        <UserAvatar
          avatar={member.avatar}
          firstName={member.firstName}
          lastName={member.lastName}
        />

        <View className="ml-4 flex-1">
          <Text variant="h6" color="heading" className="mb-1">
            {member?.title} {member?.firstName} {member?.lastName}
          </Text>
          <View className="flex-row items-center gap-2">
            {member?.bandKeys?.length > 0 && (
              <BandBadge variant="outlined" band={member?.bandKeys?.[0]} />
            )}
            {member?.bandKeys?.length > 1 && (
              <BandBadge variant="outlined" band={member?.bandKeys?.[1]} />
            )}
            {member?.bandKeys?.length > 2 && (
              <Text variant="overline" style={{ fontSize: 8 }}>
                +{member.bandKeys.length - 2} more
              </Text>
            )}
          </View>
          {/* {member?.bandKeys?.[0] !== BandKeysEnum.UNASSIGNED && (

          )} */}
        </View>

        <View>
          <View className="flex flex-row items-center gap-1">
            <View
              className={`w-2 h-2 rounded-full ${member.gender === 'male' ? 'bg-blue-400' : 'bg-pink-400'}`}
            />
            <Text variant="overline">{member.gender}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default MemberCard;
