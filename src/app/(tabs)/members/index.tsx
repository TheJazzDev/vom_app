import { MemberCard, Spacer, Tab, TextInput, View } from '@/src/components';
import { mockMembers } from '@/src/constants/members';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Platform, TouchableOpacity } from 'react-native';

export default function MembersScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gender, setGender] = useState<Gender | 'all'>('all');

  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();

  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.some((role: string) =>
        role.toLowerCase().includes(searchTerm.toLowerCase()),
      );

    const matchesGender = member.gender === gender || 'all';

    return matchesSearch && matchesGender;
  });

  return (
    <View gradient paddingHorizontal={10}>
      <Spacer height={10} />
      <TextInput
        inputType="search"
        onChange={(value) => setSearchTerm(String(value))}
        placeholder="Search members, roles, bands, or departments..."
      />

      <Tab<Gender | 'all'>
        value={gender}
        onChange={setGender}
        variant="pills"
        tabs={[
          { label: 'All', value: 'all', count: mockMembers.length },
          {
            label: 'Male',
            value: 'Male',
            count: mockMembers.filter((m) => m.gender === 'Male').length,
          },
          {
            label: 'Female',
            value: 'Female',
            count: mockMembers.filter((m) => m.gender === 'Female').length,
          },
        ]}
      />

      <Spacer height={14} />

      <FlatList
        data={filteredMembers}
        keyExtractor={(member) => member.memberId}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/members/${item.memberId}`)}
            activeOpacity={0.7}
          >
            <MemberCard member={item} />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 50 }}
        showsHorizontalScrollIndicator={Platform.OS === 'web'}
      />
    </View>
  );
}
