import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Badge, Card, Text } from '../../UI';

interface MemberCardProps {
  member: MemberProfile;
  onPress: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card className="flex flex-row mb-3">
        <Image
          source={{ uri: member?.avatar }}
          className="w-12 h-12 rounded-full mr-4"
        />

        <View className="flex-1">
          <Text variant="h4" color="heading" className="mb-1">
            {member?.title.slice(0, 3)} {member?.firstName} {member?.lastName}
          </Text>
          <View className="flex-row items-center gap-2">
            <Badge size="md">{member?.position[0]}</Badge>
            {member?.position.length > 1 && (
              <Text>+{member.position.length - 1} more</Text>
            )}
          </View>
        </View>

        <View>
          <View className="flex flex-row items-center gap-1">
            <View
              className={`w-2 h-2 rounded-full ${member.gender === 'Male' ? 'bg-blue-400' : 'bg-pink-400'}`}
            />
            <Text variant="overline">{member.gender}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default MemberCard;
