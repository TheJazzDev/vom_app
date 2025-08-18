import {
  MemberCard,
  ThemedText,
  ThemedTextInput,
  ThemedView,
} from '@/components';
import MemberBottomSheet from '@/components/members/MemberBottomSheet';
import { mockMembers } from '@/constants/members';
import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, Platform, StyleSheet } from 'react-native';

export default function ChurchMembersScreen() {
  const [searchText, setSearchText] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Filter members based on search
  const filteredMembers = useMemo(() => {
    return mockMembers
      .filter(
        (member) =>
          member.name.toLowerCase().includes(searchText.toLowerCase()) ||
          // member.position.toLowerCase().includes(searchText.toLowerCase()) ||
          member.department.toLowerCase().includes(searchText.toLowerCase())
      )
      .sort((a, b) => a.rank - b.rank);
  }, [searchText]);

  const handleMemberPress = useCallback((member: Member) => {
    setSelectedMember(member);
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <ThemedView safe={true}>
      <ThemedView>
        <ThemedText className='text-green-700'>Total Members count: {filteredMembers.length}</ThemedText>
      </ThemedView>

      <ThemedTextInput
        inputType='search'
        style={{ marginTop: 10 }}
        placeholder='Search members, roles, bands, or departments...'
      />

      <FlatList
        data={filteredMembers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MemberCard item={item} handleMemberPress={handleMemberPress} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={Platform.OS === 'web'}
      />

      {/* Bottom Sheet */}
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
