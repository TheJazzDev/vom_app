import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Pressable, TextInput, View } from 'react-native';

// Mock children data
const CHILDREN = [
  {
    id: '1',
    name: 'Emma Johnson',
    age: 8,
    grade: '3rd Grade',
    parent: 'Sarah Johnson',
    parentPhone: '+234 801 234 5678',
    class: 'Little Angels',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    birthday: '2016-05-15',
    allergies: 'None',
    emergencyContact: 'John Johnson - +234 901 234 5678',
  },
  {
    id: '2',
    name: 'David Wilson',
    age: 12,
    grade: '7th Grade',
    parent: 'Michael Wilson',
    parentPhone: '+234 801 234 5679',
    class: 'Young Disciples',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    birthday: '2012-03-22',
    allergies: 'Peanuts',
    emergencyContact: 'Grace Wilson - +234 901 234 5679',
  },
  {
    id: '3',
    name: 'Sophia Brown',
    age: 6,
    grade: '1st Grade',
    parent: 'Lisa Brown',
    parentPhone: '+234 801 234 5680',
    class: 'Tiny Tots',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    birthday: '2018-09-10',
    allergies: 'Dairy',
    emergencyContact: 'Mark Brown - +234 901 234 5680',
  },
  {
    id: '4',
    name: 'Joshua Davis',
    age: 15,
    grade: '10th Grade',
    parent: 'Rachel Davis',
    parentPhone: '+234 801 234 5681',
    class: 'Teen Warriors',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    birthday: '2009-11-08',
    allergies: 'None',
    emergencyContact: 'Paul Davis - +234 901 234 5681',
  },
  {
    id: '5',
    name: 'Grace Miller',
    age: 4,
    grade: 'Pre-K',
    parent: 'Jennifer Miller',
    parentPhone: '+234 801 234 5682',
    class: 'Tiny Tots',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    birthday: '2020-02-14',
    allergies: 'Shellfish',
    emergencyContact: 'Robert Miller - +234 901 234 5682',
  },
  {
    id: '6',
    name: 'Caleb Thompson',
    age: 10,
    grade: '5th Grade',
    parent: 'Amanda Thompson',
    parentPhone: '+234 801 234 5683',
    class: 'Young Disciples',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    birthday: '2014-07-20',
    allergies: 'None',
    emergencyContact: 'Steven Thompson - +234 901 234 5683',
  },
];

const AGE_GROUPS = [
  { name: 'All Ages', min: 0, max: 18, color: '#6B7280' },
  { name: 'Tiny Tots (3-5)', min: 3, max: 5, color: '#EC4899' },
  { name: 'Little Angels (6-8)', min: 6, max: 8, color: '#3B82F6' },
  { name: 'Young Disciples (9-12)', min: 9, max: 12, color: '#10B981' },
  { name: 'Teen Warriors (13-17)', min: 13, max: 17, color: '#F59E0B' },
];

export default function DirectoryChildren() {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All Ages');

  const filteredChildren = CHILDREN.filter((child) => {
    const matchesSearch =
      child.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      child.parent.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedAgeGroup === 'All Ages') return matchesSearch;

    const ageGroup = AGE_GROUPS.find(
      (group) => group.name === selectedAgeGroup,
    );
    const matchesAge = ageGroup
      ? child.age >= ageGroup.min && child.age <= ageGroup.max
      : true;

    return matchesSearch && matchesAge;
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
          <Image
            source={{ uri: child.avatar }}
            className="w-14 h-14 rounded-full"
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
              variant="h4"
              className="font-semibold mr-2"
              style={{ color: theme.heading }}
            >
              {child.name}
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

          <View className="flex-row items-center mb-1">
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
          </View>

          {child.allergies !== 'None' && (
            <View className="flex-row items-center">
              <IconSymbol
                name="exclamationmark.triangle.fill"
                size={12}
                color="#EF4444"
              />
              <Text variant="caption" className="ml-1 text-red-600">
                Allergies: {child.allergies}
              </Text>
            </View>
          )}
        </View>

        <IconSymbol name="chevron.right" size={16} color={theme.muted} />
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
            <Text variant="body" className="text-white/90">
              {filteredChildren.length} children found
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="flex-row space-x-3">
          <View className="bg-white/20 rounded-lg px-3 py-2">
            <Text variant="h4" className="text-white font-bold">
              {CHILDREN.length}
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
                CHILDREN.reduce((sum, child) => sum + child.age, 0) /
                  CHILDREN.length,
              )}
            </Text>
            <Text variant="caption" className="text-white/80">
              Avg Age
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View className="px-4 py-4">
        <View
          className="flex-row items-center rounded-lg px-4 py-3"
          style={{
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <IconSymbol name="magnifyingglass" size={20} color={theme.muted} />
          <TextInput
            placeholder="Search children or parents..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3"
            style={{ color: theme.text }}
            placeholderTextColor={theme.muted}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <IconSymbol
                name="xmark.circle.fill"
                size={20}
                color={theme.muted}
              />
            </Pressable>
          )}
        </View>
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

      {/* Add Child FAB */}
      <View className="absolute bottom-6 right-6">
        <Pressable
          onPress={() => router.push('/directory/children/add' as any)}
          className="w-14 h-14 rounded-full items-center justify-center shadow-lg"
          style={{ backgroundColor: theme.primary }}
          android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
        >
          <IconSymbol name="plus" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
