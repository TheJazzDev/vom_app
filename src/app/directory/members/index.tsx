// directory/members.tsx
import { IconSymbol } from '@/src/components/Icons';
import { ProtectedRoute } from '@/src/components/RouteProtection/ProtectedRoute';
import { Text } from '@/src/components/UI';
import { ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Pressable, TextInput, View } from 'react-native';

// Mock data - replace with actual data
const MEMBERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+234 801 234 5678',
    band: 'Love Divine',
    department: 'Youth Ministry',
    role: 'Member',
    joinDate: '2020-05-15',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+234 801 234 5679',
    band: 'Queen Esther',
    department: 'Women Ministry',
    role: 'Captain',
    joinDate: '2019-03-20',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '+234 801 234 5680',
    band: 'Daniel',
    department: 'Men Ministry',
    role: 'Vice Captain',
    joinDate: '2021-01-10',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
];

export default function MembersScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBand, setFilterBand] = useState('All');

  const filteredMembers = MEMBERS.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBand = filterBand === 'All' || member.band === filterBand;
    return matchesSearch && matchesBand;
  });

  const bands = [
    'All',
    'Love Divine',
    'Queen Esther',
    'Daniel',
    'Deborah',
    'Good Women',
    'Warden',
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Captain':
        return '#EF4444';
      case 'Vice Captain':
        return '#F59E0B';
      case 'Secretary':
        return '#3B82F6';
      default:
        return theme.muted;
    }
  };

  const MemberCard = ({ member }: { member: any }) => (
    <Pressable
      onPress={() => router.push(`/directory/${member.id}` as any)}
      style={{
        backgroundColor: theme.card,
        borderWidth: 1,
        borderColor: theme.border,
      }}
      className="rounded-xl p-4 mb-3"
      android_ripple={{ color: 'rgba(59,130,246,0.1)' }}
    >
      <View className="flex-row items-center">
        <Image
          source={{ uri: member.avatar }}
          className="w-12 h-12 rounded-full mr-4"
        />

        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <Text
              variant="h4"
              className="font-semibold mr-2"
              style={{ color: theme.heading }}
            >
              {member.name}
            </Text>
            {member.role !== 'Member' && (
              <View
                className="px-2 py-1 rounded-full"
                style={{ backgroundColor: `${getRoleColor(member.role)}15` }}
              >
                <Text
                  variant="caption"
                  className="font-semibold"
                  style={{ color: getRoleColor(member.role) }}
                >
                  {member.role}
                </Text>
              </View>
            )}
          </View>

          <Text variant="body" className="mb-1" style={{ color: theme.muted }}>
            {member.email}
          </Text>

          <View className="flex-row items-center">
            <View className="flex-row items-center mr-4">
              <IconSymbol name="person.3.fill" size={14} color={theme.muted} />
              <Text
                variant="caption"
                className="ml-1"
                style={{ color: theme.muted }}
              >
                {member.band}
              </Text>
            </View>
            <View className="flex-row items-center">
              <IconSymbol
                name="building.2.fill"
                size={14}
                color={theme.muted}
              />
              <Text
                variant="caption"
                className="ml-1"
                style={{ color: theme.muted }}
              >
                {member.department}
              </Text>
            </View>
          </View>
        </View>

        <IconSymbol name="chevron.right" size={16} color={theme.muted} />
      </View>
    </Pressable>
  );

  return (
    <ProtectedRoute
      requireAuth={true}
      // showUnauthorized={true}
      fallbackRoute={ROUTES.AUTH}
    >
      <View className="flex-1" style={{ backgroundColor: theme.background }}>
        {/* Header */}
        <View className="px-4 pt-4 pb-2">
          <Text
            variant="h2"
            className="font-bold mb-2"
            style={{ color: theme.heading }}
          >
            Members Directory
          </Text>
          <Text variant="body" style={{ color: theme.muted }}>
            {filteredMembers.length} members found
          </Text>
        </View>

        {/* Search Bar */}
        <View className="px-4 mb-4">
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
              placeholder="Search members..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-3"
              style={{ color: theme.text }}
              placeholderTextColor={theme.muted}
            />
          </View>
        </View>

        {/* Band Filter */}
        <View className="px-4 mb-4">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={bands}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setFilterBand(item)}
                className="mr-3 px-4 py-2 rounded-full"
                style={{
                  backgroundColor:
                    filterBand === item ? theme.primary : theme.card,
                  borderWidth: 1,
                  borderColor:
                    filterBand === item ? theme.primary : theme.border,
                }}
              >
                <Text
                  variant="caption"
                  className="font-semibold"
                  style={{
                    color: filterBand === item ? 'white' : theme.muted,
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>

        {/* Members List */}
        <FlatList
          data={filteredMembers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MemberCard member={item} />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ProtectedRoute>
  );
}
