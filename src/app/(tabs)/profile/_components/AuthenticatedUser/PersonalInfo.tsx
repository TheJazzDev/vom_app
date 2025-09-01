import { Card, Text, View } from '@/src/components';
import { useAuthSlice } from '@/src/store';
import React from 'react';

const PersonalInfo = () => {
  const { currentMember } = useAuthSlice();

  return (
    <Card className="mb-6">
      <Text variant="h5" className="mb-4">
        Personal Information
      </Text>
      <View className="flex flex-row mb-2">
        {currentMember?.dob && (
          <View className="w-[49%]">
            <Text variant="h6">Date of Birth</Text>
            <Text>{currentMember.dob}</Text>
          </View>
        )}
        {currentMember?.gender && (
          <View className="w-[49%]">
            <Text variant="h6">Gender</Text>
            <Text className="capitalize">{currentMember.gender}</Text>
          </View>
        )}
      </View>
      <View className="flex flex-row mb-2">
        {currentMember?.secondaryPhone && (
          <View>
            <Text variant="h6">Secondary Phone</Text>
            <Text>{currentMember.secondaryPhone}</Text>
          </View>
        )}
      </View>

      {currentMember?.address && (
        <View>
          <Text variant="h6">Address</Text>
          <Text>{currentMember.address}</Text>
        </View>
      )}
    </Card>
  );
};

export default PersonalInfo;
