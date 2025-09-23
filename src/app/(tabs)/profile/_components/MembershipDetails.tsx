import { BandBadge, Card, Text, View } from '@/src/components';
import { useAuthSlice } from '@/src/store';
import React from 'react';

const MembershipDetails = () => {
  const { currentUser, id } = useAuthSlice();

  const getStatusColor = (status: string | undefined) => {
    return status === 'active'
      ? 'text-green-600 dark:text-green-400'
      : 'text-orange-600 dark:text-orange-400';
  };

  const getVerificationStatus = () => {
    if (currentUser?.verified) return 'Verified';
    return 'Unverified';
  };

  const getVerificationColor = () => {
    if (currentUser?.verified) return 'text-green-600 dark:text-green-400';
    if (currentUser?.emailVerified || currentUser?.phoneVerified)
      return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <Card className="mb-4">
      <Text variant="h5" className="mb-4 text-gray-900 dark:text-white">
        Membership Details
      </Text>
      <View className="gap-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600 dark:text-gray-400">Member ID</Text>
          <Text className="font-semibold text-gray-900 dark:text-white">
            {id}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600 dark:text-gray-400">Status</Text>
          <Text
            className={`font-semibold capitalize ${getStatusColor(currentUser?.status)}`}
          >
            {currentUser?.status}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600 dark:text-gray-400">Verification</Text>
          <Text className={`font-semibold ${getVerificationColor()}`}>
            {getVerificationStatus()}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600 dark:text-gray-400">Join Date</Text>
          <Text className="font-semibold text-gray-900 dark:text-white">
            {currentUser?.joinDate}
          </Text>
        </View>

        {currentUser?.band && currentUser.band.length > 0 && (
          <View className="py-1">
            <Text className="text-gray-600 dark:text-gray-400 mb-2">Bands</Text>
            <View className="flex-row flex-wrap gap-2">
              {currentUser.band.map((b, index) => (
                <BandBadge key={index} band={b} />
              ))}
            </View>
          </View>
        )}

        {currentUser?.position && currentUser.position.length > 0 && (
          <View className="py-1">
            <Text className="text-gray-600 dark:text-gray-400 mb-2">
              Positions
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {currentUser.position.map((pos, index) => (
                <View
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full"
                >
                  <Text
                    variant="caption"
                    className="text-blue-700 dark:text-blue-300 font-medium"
                  >
                    {pos}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </Card>
  );
};

export default MembershipDetails;
