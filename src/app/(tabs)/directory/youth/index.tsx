import { MemberCard, Spacer } from '@/src/components';
import { MemberCardSkeleton } from '@/src/components/Directory/Members/Card/Skeleton';
import MemberModal from '@/src/components/Directory/Members/Modal/MemberModal';
import { SearchInput, Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { dispatch, useDirectorySlice } from '@/src/store';
import { fetchAllMembersThunk } from '@/src/store/thunks/directory';
import { filterAndGroupMembers, getTitleDisplayName } from '@/src/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, SectionList } from 'react-native';

const isYouthMember = (member: UserProfile): boolean => {
  const ministryMatches =
    member.ministry?.some((ministry) =>
      ministry.toLowerCase().includes('youth'),
    ) ?? false;

  const bandMatches =
    member.bandKeys?.some((bandKey) =>
      bandKey.toLowerCase().includes('youth'),
    ) ?? false;

  return ministryMatches || bandMatches;
};

export default function YouthMinistryScreen() {
  const [visible, setVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [memberId, setMemberId] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const { allMembers, isFetchingMembers } = useDirectorySlice();
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchAllMembersThunk());
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchAllMembersThunk());
    } catch (error) {
      console.error('Error refreshing youth members:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const youthMembers = useMemo(
    () => allMembers.filter(isYouthMember),
    [allMembers],
  );

  const groupedMembers = useMemo(
    () => filterAndGroupMembers(youthMembers, searchQuery),
    [youthMembers, searchQuery],
  );

  const totalFilteredMembers = useMemo(
    () => groupedMembers.reduce((sum, group) => sum + group.count, 0),
    [groupedMembers],
  );

  const renderMember = useCallback(
    ({ item }: { item: UserProfile }) => (
      <MemberCard
        member={item}
        onPress={() => {
          setMemberId(item.id);
          setVisible(true);
        }}
      />
    ),
    [],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: GroupedMembers }) => (
      <View className="bg-gray-100 dark:bg-gray-800 py-2 mb-2 rounded-lg flex-col items-center justify-center">
        <Text variant="h6" className="font-bold">
          {getTitleDisplayName(section.title)}
        </Text>
        <Text variant="caption" color="muted">
          {section.count} member{section.count !== 1 ? 's' : ''}
        </Text>
      </View>
    ),
    [],
  );

  const sectionListData = groupedMembers.map((group) => ({
    title: group.title,
    data: group.members,
    count: group.count,
    members: group.members,
  }));

  return (
    <View gradient>
      <Spacer height={10} />

      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search youth members name, title, band, date of birth etc.."
      />

      {searchQuery && totalFilteredMembers > 0 && (
        <Text
          variant="body"
          color="muted"
          className="font-bold px-4 -mt-2 pb-2"
        >
          {totalFilteredMembers} members found
        </Text>
      )}

      <SectionList
        sections={sectionListData}
        keyExtractor={(item) => item.id}
        renderItem={renderMember}
        renderSectionHeader={renderSectionHeader}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 100 }} />}
        ListEmptyComponent={
          isFetchingMembers ? (
            <View className="flex-1 items-center justify-center">
              {Array.from({ length: 8 }).map((_, index) => (
                <MemberCardSkeleton key={`skeleton-${index}`} />
              ))}
            </View>
          ) : (
            <View className="mx-auto mt-6">
              <Text variant="h4">No youth members found</Text>
            </View>
          )
        }
        stickySectionHeadersEnabled={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
      />

      <MemberModal
        visible={visible}
        onClose={() => setVisible(false)}
        memberId={memberId}
      />
    </View>
  );
}
