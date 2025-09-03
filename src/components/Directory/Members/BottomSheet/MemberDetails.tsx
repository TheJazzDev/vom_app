import React from 'react';
import { Card, Text, View } from '../../UI';

interface MemberSectionProps {
  member: MemberProfile;
}

const MemberDetails: React.FC<MemberSectionProps> = ({ member }) => {
  return (
    <Card variant="outlined" className="mb-6">
      <Text variant="h4" className="mb-4 font-bold">
        Member Details
      </Text>

      <View className="space-y-3">
        <View className="flex-row justify-between items-center py-2">
          <Text className="text-gray-600 dark:text-gray-400">Member ID</Text>
          <Text className="font-semibold">#{member.memberId}</Text>
        </View>

        {member.memberSince && (
          <View className="flex-row justify-between items-center py-2">
            <Text className="text-gray-600 dark:text-gray-400">
              Member Since
            </Text>
            <Text className="font-semibold">{member.memberSince}</Text>
          </View>
        )}

        <View className="flex-row justify-between items-center py-2">
          <Text className="text-gray-600 dark:text-gray-400">Status</Text>
          <Text
            className={`font-semibold capitalize ${
              member.status === 'active'
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {member.status}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default MemberDetails;
