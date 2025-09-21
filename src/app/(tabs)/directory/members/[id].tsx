import { MemberProfileDetail, Text, View } from '@/src/components';
import { dispatch, getMemberByIdThunk, useAuthSlice } from '@/src/store';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

const AnimatedLoadingScreen = () => {
  return (
    <View gradient className="flex-1 items-center justify-center">
      <View className="items-center">
        <ActivityIndicator size="large" className="mb-4" />
        <Text variant="h4" className="mb-4">
          Loading Member
        </Text>
        <Text variant="body">Getting the details...</Text>
      </View>
    </View>
  );
};

export default function MemberDetailsPage() {
  const { id } = useLocalSearchParams();
  const { searchedMemberDetails: member, isSearchingMember } = useAuthSlice();

  useEffect(() => {
    const getMember = async () => {
      await dispatch(getMemberByIdThunk(String(id)));
    };

    getMember();
  }, [id]);

  if (isSearchingMember) {
    return <AnimatedLoadingScreen />;
  }

  return <MemberProfileDetail member={member!} />;
}
