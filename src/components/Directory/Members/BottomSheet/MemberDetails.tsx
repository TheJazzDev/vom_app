import { Card, Text, View } from '@/src/components/UI';
import React from 'react';

interface MemberSectionProps {
  member: UserProfile;
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
          <Text className="font-semibold">#{member.id}</Text>
        </View>

        {member.joinDate && (
          <View className="flex-row justify-between items-center py-2">
            <Text className="text-gray-600 dark:text-gray-400">Join Date</Text>
            <Text className="font-semibold">{member.joinDate}</Text>
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
