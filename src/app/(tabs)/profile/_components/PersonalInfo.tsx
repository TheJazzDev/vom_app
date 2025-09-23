import { Card, Text, View } from '@/src/components';
import { useAuthSlice } from '@/src/store';
import React from 'react';

const PersonalInfo = () => {
  const { currentUser } = useAuthSlice();

  return (
    <Card className="mb-6">
      <Text variant="h5" className="mb-4">
        Personal Information
      </Text>
      <View className="flex flex-row mb-2">
        {currentUser?.dob && (
          <View className="w-[49%]">
            <Text variant="h6">Date of Birth</Text>
            <Text>{currentUser.dob}</Text>
          </View>
        )}
        {currentUser?.gender && (
          <View className="w-[49%]">
            <Text variant="h6">Gender</Text>
            <Text className="capitalize">{currentUser.gender}</Text>
          </View>
        )}
      </View>
      <View className="flex flex-row mb-2">
        {currentUser?.secondaryPhone && (
          <View>
            <Text variant="h6">Secondary Phone</Text>
            <Text>{currentUser.secondaryPhone}</Text>
          </View>
        )}
      </View>

      {currentUser?.address && (
        <View>
          <Text variant="h6">Address</Text>
          <Text>{currentUser.address}</Text>
        </View>
      )}
    </Card>
  );
};

export default PersonalInfo;
