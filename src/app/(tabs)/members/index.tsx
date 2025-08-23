import {
  MemberCard,
  Spacer,
  Tab,
  ThemedTextInput,
  View,
} from '@/src/components';
import { mockMembers } from '@/src/constants/members';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Platform, TouchableOpacity } from 'react-native';

export default function MembersScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gender, setGender] = useState<Gender>('all');

  const router = useRouter();

  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.roles.some((role) =>
        role.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesGender = gender === 'all' || member.gender === gender;

    return matchesSearch && matchesGender;
  });

  return (
    <View safe gradient>
      <ThemedTextInput
        inputType='search'
        placeholder='Search members, roles, bands, or departments...'
      />

      <Tab<Gender>
        value={gender}
        onChange={setGender}
        variant='pills'
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
        keyExtractor={(member) => member.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/members/${item.id}`)}
            activeOpacity={0.7}>
            <MemberCard member={item} />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 5 }}
        showsHorizontalScrollIndicator={Platform.OS === 'web'}
      />
    </View>
  );
}
