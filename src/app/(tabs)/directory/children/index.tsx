import { IconSymbol } from '@/src/components/Icons';
import { SearchInput, Text } from '@/src/components/UI';
import UserAvatar from '@/src/components/UserAvatar';
import { useTheme } from '@/src/hooks';
import { dispatch, useDirectorySlice } from '@/src/store';
import { fetchAllChildrenThunk } from '@/src/store/thunks/directory';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

const AGE_GROUPS = [
  { name: 'All Ages', min: 0, max: 18, color: '#6B7280' },
  { name: 'Tiny Tots (0-3)', min: 0, max: 3, color: '#EC4899' },
  { name: 'Little Angels (4-7)', min: 4, max: 7, color: '#3B82F6' },
  { name: 'Young Disciples (8-11)', min: 8, max: 11, color: '#10B981' },
  { name: 'Teen Warriors (12-15)', min: 12, max: 15, color: '#F59E0B' },
];

export default function DirectoryChildren() {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All Ages');

  // const [visible, setVisible] = useState<boolean>(false);
  // const [childId, setChildId] = useState<string>('');

  const { allChildren } = useDirectorySlice();

  useEffect(() => {
    dispatch(fetchAllChildrenThunk());
  }, []);

  const filteredChildren = allChildren.filter((child) => {
    const matchesSearch =
      child.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.firstName.toLowerCase().includes(searchQuery.toLowerCase());
    child.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.gender.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedAgeGroup === 'All Ages') return matchesSearch;

    // const ageGroup = AGE_GROUPS.find(
    //   (group) => group.name === selectedAgeGroup,
    // );
    // const matchesAge = ageGroup
    //   ? child.age >= ageGroup.min && child.age <= ageGroup.max
    //   : true;

    return matchesSearch;
    // && matchesAge;
  });

  const getAgeGroupColor = (age: number) => {
    const group = AGE_GROUPS.find(
      (g) => age >= g.min && age <= g.max && g.name !== 'All Ages',
    );
    return group?.color || '#6B7280';
  };

  const ChildCard = ({ child }: { child: any }) => (
    <Pressable
      onPress={() => router.push(`/directory/children/${child.id}` as any)}
      style={{
        backgroundColor: theme.card,
        borderWidth: 1,
        borderColor: theme.border,
      }}
      className="rounded-xl p-4 mb-3"
      android_ripple={{ color: 'rgba(59,130,246,0.1)' }}
    >
      <View className="flex-row items-center">
        <View className="relative mr-4">
          <UserAvatar
            avatar={child.avatar}
            firstName={child.firstName}
            lastName={child.lastName}
          />
          <View
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 items-center justify-center"
            style={{
              backgroundColor: getAgeGroupColor(child.age),
              borderColor: theme.background,
            }}
          >
            <Text className="text-white text-xs font-bold">{child.age}</Text>
          </View>
        </View>

        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text
              variant="h5"
              className="font-semibold mr-2"
              style={{ color: theme.heading }}
            >
              {child.title}
            </Text>
            <Text
              variant="h5"
              className="font-semibold mr-2"
              style={{ color: theme.heading }}
            >
              {child.firstName}
            </Text>
            <Text
              variant="h5"
              className="font-semibold mr-2"
              style={{ color: theme.heading }}
            >
              {child.lastName}
            </Text>
            <View
              className="px-2 py-1 rounded-full"
              style={{ backgroundColor: `${getAgeGroupColor(child.age)}15` }}
            >
              <Text
                variant="caption"
                className="font-semibold"
                style={{ color: getAgeGroupColor(child.age) }}
              >
                {child.class}
              </Text>
            </View>
          </View>

          {/* <View className="flex-row items-center mb-1">
            <IconSymbol name="person.fill" size={12} color={theme.muted} />
            <Text
              variant="caption"
              className="ml-1 mr-3"
              style={{ color: theme.muted }}
            >
              Parent: {child.parent}
            </Text>
            <IconSymbol
              name="graduationcap.fill"
              size={12}
              color={theme.muted}
            />
            <Text
              variant="caption"
              className="ml-1"
              style={{ color: theme.muted }}
            >
              {child.grade}
            </Text>
          </View> */}
        </View>

        {/* <IconSymbol name="chevron.right" size={16} color={theme.muted} /> */}
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#EC4899', '#BE185D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 }}
      >
        <View className="flex-row items-center mb-4">
          <View className="bg-white/20 p-2 rounded-full mr-3">
            <IconSymbol
              name="figure.2.and.child.holdinghands"
              size={24}
              color="white"
            />
          </View>
          <View>
            <Text variant="h2" className="text-white font-bold">
              Children Directory
            </Text>
            {searchQuery && filteredChildren.length > 0 && (
              <Text variant="body" className="text-white/90 dark:text-white/80">
                {filteredChildren.length} children found
              </Text>
            )}
          </View>
        </View>

        {/* Quick Stats */}
        <View className="flex-row gap-3">
          <View className="bg-white/20 rounded-lg px-3 py-2">
            <Text variant="h4" className="text-white font-bold">
              {allChildren.length}
            </Text>
            <Text variant="caption" className="text-white/80">
              Total Kids
            </Text>
          </View>
          <View className="bg-white/20 rounded-lg px-3 py-2">
            <Text variant="h4" className="text-white font-bold">
              {AGE_GROUPS.length - 1}
            </Text>
            <Text variant="caption" className="text-white/80">
              Age Groups
            </Text>
          </View>
          <View className="bg-white/20 rounded-lg px-3 py-2">
            <Text variant="h4" className="text-white font-bold">
              {Math.round(
                allChildren.reduce((sum, child) => sum + child.age, 0) /
                  allChildren.length,
              )}
            </Text>
            <Text variant="caption" className="text-white/80">
              Avg Age
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View className="py-4">
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onPress={() => setSearchQuery('')}
          placeholder="Search children name, age"
        />
      </View>

      {/* Age Group Filter */}
      <View className="px-4 mb-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={AGE_GROUPS}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedAgeGroup(item.name)}
              className="mr-3 px-4 py-2 rounded-full"
              style={{
                backgroundColor:
                  selectedAgeGroup === item.name ? item.color : theme.card,
                borderWidth: 1,
                borderColor:
                  selectedAgeGroup === item.name ? item.color : theme.border,
              }}
            >
              <Text
                variant="caption"
                className="font-semibold"
                style={{
                  color: selectedAgeGroup === item.name ? 'white' : theme.muted,
                }}
              >
                {item.name}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Children List */}
      <FlatList
        data={filteredChildren}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChildCard child={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center py-12">
            <IconSymbol
              name="figure.2.and.child.holdinghands"
              size={48}
              color={theme.muted}
            />
            <Text
              variant="h4"
              className="mt-4 font-semibold"
              style={{ color: theme.heading }}
            >
              No children found
            </Text>
            <Text
              variant="body"
              className="mt-2 text-center"
              style={{ color: theme.muted }}
            >
              Try adjusting your search or age group filter
            </Text>
          </View>
        }
      />
    </View>
  );
}
