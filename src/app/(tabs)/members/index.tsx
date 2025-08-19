import {
  MemberCard,
  Spacer,
  ThemedTextInput,
  ThemedView,
} from '@/src/components';
import MemberBottomSheet from '@/src/components/members/MemberBottomSheet';
import { Tabs } from '@/src/components/Tab';
import { mockMembers } from '@/src/constants/members';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, Platform, StyleSheet } from 'react-native';

type Gender = 'all' | 'Male' | 'Female';

export default function ChurchMembersScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<Gender>('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.roles.some((role) =>
        role.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesGender =
      genderFilter === 'all' || member.gender === genderFilter;

    return matchesSearch && matchesGender;
  });

  const handleMemberPress = useCallback((member: Member) => {
    setSelectedMember(member);
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <ThemedView safe={true}>
      <ThemedTextInput
        inputType='search'
        style={{ marginTop: 10 }}
        placeholder='Search members, roles, bands, or departments...'
      />

      <Tabs<Gender>
        value={genderFilter}
        onChange={setGenderFilter}
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

      {/*
        <Button
          variant={genderFilter === 'all' ? 'primary' : 'outline'}
          size='sm'
          onPress={() => setGenderFilter('all')}
          className='flex-1'>
          All ({mockMembers.length})
        </Button>

     */}

      <FlatList
        data={filteredMembers}
        keyExtractor={(member) => member.id}
        renderItem={({ item }) => (
          <MemberCard member={item} handleMemberPress={handleMemberPress} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={Platform.OS === 'web'}
      />

      <MemberBottomSheet
        bottomSheetRef={bottomSheetRef}
        selectedMember={selectedMember}
        setSelectedMember={setSelectedMember}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 5,
  },
});
