// screens/MembersScreen.tsx
import {
  IconSymbol,
  MemberBottomSheet,
  MemberCard,
  SearchInput,
  Spacer,
  Tab,
  Text,
  View,
} from '@/src/components';
import { mockMembers } from '@/src/constants/members';
import { useMemberFilters } from '@/src/hooks/useMemberFilters';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

export default function MembersScreen() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [gender, setGender] = useState<Gender | 'all'>('all');
  const [selectedMember, setSelectedMember] = useState<MemberProfile | null>(
    null,
  );
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const tabBarHeight = useBottomTabBarHeight();

  // Use custom hook for filtering logic
  const filteredMembers = useMemberFilters(mockMembers, searchTerm, gender);

  // Handle member press to show bottom sheet
  const handleMemberPress = useCallback((member: MemberProfile) => {
    setSelectedMember(member);
    setBottomSheetVisible(true);
  }, []);

  const closeBottomSheet = useCallback(() => {
    setBottomSheetVisible(false);
    setTimeout(() => setSelectedMember(null), 300);
  }, []);

  const renderMemberItem = useCallback(
    ({ item }: { item: MemberProfile }) => (
      <MemberCard member={item} onPress={() => handleMemberPress(item)} />
    ),
    [handleMemberPress],
  );

  const renderEmptyState = useCallback(
    () => (
      <View className="flex-1 items-center justify-center py-20">
        <IconSymbol name="person.2.slash" size={48} color="#9ca3af" />
        <Text variant="h4" className="mt-4 text-gray-500">
          No members found
        </Text>
        <Text variant="body" className="mt-2 text-gray-400 text-center px-8">
          Try adjusting your search terms or filters
        </Text>
      </View>
    ),
    [],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View gradient paddingHorizontal={10}>
        <Spacer height={10} />

        {/* Search Input */}
        <SearchInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Search members, roles, bands, or departments..."
        />

        {/* Gender Filter Tabs */}
        <Tab<Gender | 'all'>
          value={gender}
          onChange={setGender}
          variant="pills"
          tabs={[
            { label: 'All', value: 'all', count: mockMembers.length },
            {
              label: 'Male',
              value: 'male',
              count: mockMembers.filter((m) => m.gender === 'male').length,
            },
            {
              label: 'Female',
              value: 'female',
              count: mockMembers.filter((m) => m.gender === 'female').length,
            },
          ]}
        />
        <Spacer height={10} />

        {/* Members List */}
        <FlatList
          data={filteredMembers}
          keyExtractor={(member) => member.memberId}
          renderItem={renderMemberItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: tabBarHeight + 50,
            flexGrow: 1,
          }}
          showsHorizontalScrollIndicator={Platform.OS === 'web'}
          removeClippedSubviews={Platform.OS === 'android'}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={8}
          ListEmptyComponent={renderEmptyState}
        />

        {/* Member Bottom Sheet */}
        <MemberBottomSheet
          member={selectedMember}
          visible={bottomSheetVisible}
          onClose={closeBottomSheet}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
