import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

// Monthly activities data
const MONTHLY_ACTIVITIES = [
  {
    id: 'monthly-1',
    title: 'First Sunday Communion',
    description: 'Holy Communion service with foot washing ceremony',
    schedule: 'First Sunday of every month',
    time: 'During morning worship',
    location: 'Main Sanctuary',
    type: 'sacrament',
    requirements: ['Church membership', 'Baptized believers'],
    leader: 'Pastor David Johnson',
    nextDate: '2024-04-07',
    frequency: 'Monthly',
  },
  {
    id: 'monthly-2',
    title: 'All Night Prayer',
    description: 'Powerful night of prayer, worship, and breakthrough',
    schedule: 'Third Friday of every month',
    time: '10:00 PM - 6:00 AM',
    location: 'Main Sanctuary',
    type: 'prayer',
    requirements: ['Bring sleeping materials', 'Light refreshments provided'],
    leader: 'Prayer Team',
    nextDate: '2024-03-22',
    frequency: 'Monthly',
  },
  {
    id: 'monthly-3',
    title: 'Family Fun Day',
    description: 'Games, activities, and fellowship for the whole family',
    schedule: 'Second Saturday of every month',
    time: '10:00 AM - 4:00 PM',
    location: 'Church Compound',
    type: 'fellowship',
    requirements: ['All families welcome', 'Bring snacks to share'],
    leader: 'Family Ministry',
    nextDate: '2024-03-16',
    frequency: 'Monthly',
  },
  {
    id: 'monthly-4',
    title: 'Youth Conference',
    description: 'Monthly gathering for spiritual growth and mentorship',
    schedule: 'Last Saturday of every month',
    time: '2:00 PM - 6:00 PM',
    location: 'Youth Center',
    type: 'youth',
    requirements: ['Ages 13-30', 'Registration required'],
    leader: 'Youth Ministry',
    nextDate: '2024-03-30',
    frequency: 'Monthly',
  },
  {
    id: 'monthly-5',
    title: "Men's Breakfast Meeting",
    description: "Fellowship, devotion, and planning for men's activities",
    schedule: 'First Saturday of every month',
    time: '8:00 AM - 10:00 AM',
    location: 'Fellowship Hall',
    type: 'fellowship',
    requirements: ['All men welcome', 'Breakfast provided'],
    leader: 'Men Ministry',
    nextDate: '2024-04-06',
    frequency: 'Monthly',
  },
  {
    id: 'monthly-6',
    title: "Women's Fellowship Tea",
    description: 'Monthly gathering for fellowship, sharing, and prayer',
    schedule: 'Second Saturday of every month',
    time: '3:00 PM - 5:00 PM',
    location: 'Conference Room',
    type: 'fellowship',
    requirements: ['All women welcome', 'Bring a dish'],
    leader: 'Women Ministry',
    nextDate: '2024-03-16',
    frequency: 'Monthly',
  },
  {
    id: 'monthly-7',
    title: 'Church Cleaning Day',
    description: 'Community service day to maintain our church facility',
    schedule: 'Fourth Saturday of every month',
    time: '8:00 AM - 12:00 PM',
    location: 'Entire Church Premises',
    type: 'service',
    requirements: ['Bring cleaning supplies', 'Work clothes'],
    leader: 'Sanitation Department',
    nextDate: '2024-03-23',
    frequency: 'Monthly',
  },
  {
    id: 'monthly-8',
    title: 'New Members Class',
    description: 'Orientation and foundational teaching for new members',
    schedule: 'Third Sunday of every month',
    time: '2:00 PM - 4:00 PM',
    location: 'Conference Room A',
    type: 'teaching',
    requirements: ['New members only', 'Registration required'],
    leader: 'Pastoral Team',
    nextDate: '2024-03-17',
    frequency: 'Monthly',
  },
];

const ACTIVITY_TYPES = [
  {
    key: 'all',
    label: 'All Activities',
    color: '#6B7280',
    icon: 'calendar.circle.fill',
  },
  {
    key: 'sacrament',
    label: 'Sacraments',
    color: '#8B5CF6',
    icon: 'cross.fill',
  },
  { key: 'prayer', label: 'Prayer', color: '#10B981', icon: 'hands.clap.fill' },
  {
    key: 'fellowship',
    label: 'Fellowship',
    color: '#F59E0B',
    icon: 'person.3.fill',
  },
  { key: 'youth', label: 'Youth', color: '#EC4899', icon: 'figure.wave' },
  { key: 'service', label: 'Service', color: '#06B6D4', icon: 'heart.fill' },
  { key: 'teaching', label: 'Teaching', color: '#3B82F6', icon: 'book.fill' },
];

export default function MonthlyActivities() {
  const theme = useTheme();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('all');

  const filteredActivities = MONTHLY_ACTIVITIES.filter(
    (activity) => selectedType === 'all' || activity.type === selectedType,
  );

  const getTypeInfo = (type: string) => {
    return ACTIVITY_TYPES.find((t) => t.key === type) || ACTIVITY_TYPES[0];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Past';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  const ActivityCard = ({ activity }: { activity: any }) => {
    const typeInfo = getTypeInfo(activity.type);
    const daysUntil = getDaysUntil(activity.nextDate);
    const isUpcoming = daysUntil !== 'Past';

    return (
      <Pressable
        onPress={() =>
          router.push(`/info/monthly-activities/${activity.id}` as any)
        }
        style={{
          backgroundColor: theme.card,
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          position: 'relative',
          overflow: 'hidden',
        }}
        android_ripple={{ color: 'rgba(59,130,246,0.1)' }}
      >
        {/* Type Badge */}
        <View className="absolute top-0 right-0">
          <View
            className="px-3 py-1 rounded-bl-lg"
            style={{ backgroundColor: typeInfo.color }}
          >
            <Text
              variant="caption"
              className="text-white font-semibold capitalize"
            >
              {activity.type}
            </Text>
          </View>
        </View>

        {/* Header */}
        <View className="flex-row items-start mb-4 pr-16">
          <View
            className="w-12 h-12 rounded-full items-center justify-center mr-4"
            style={{ backgroundColor: `${typeInfo.color}15` }}
          >
            <IconSymbol
              name={typeInfo.icon as any}
              size={20}
              color={typeInfo.color}
            />
          </View>

          <View className="flex-1">
            <Text
              variant="h4"
              className="font-bold mb-1"
              style={{ color: theme.heading }}
            >
              {activity.title}
            </Text>
            <Text
              variant="body"
              className="leading-5 mb-2"
              style={{ color: theme.text }}
              numberOfLines={2}
            >
              {activity.description}
            </Text>
          </View>
        </View>

        {/* Schedule Info */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <IconSymbol name="calendar" size={16} color={theme.muted} />
            <Text variant="body" className="ml-2" style={{ color: theme.text }}>
              {activity.schedule}
            </Text>
          </View>

          <View className="flex-row items-center mb-2">
            <IconSymbol name="clock" size={16} color={theme.muted} />
            <Text variant="body" className="ml-2" style={{ color: theme.text }}>
              {activity.time}
            </Text>
          </View>

          <View className="flex-row items-center">
            <IconSymbol name="location" size={16} color={theme.muted} />
            <Text variant="body" className="ml-2" style={{ color: theme.text }}>
              {activity.location}
            </Text>
          </View>
        </View>

        {/* Next Event Info */}
        <View
          className="rounded-lg p-3 mb-4"
          style={{
            backgroundColor: isUpcoming
              ? `${typeInfo.color}10`
              : `${theme.muted}10`,
          }}
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text variant="caption" style={{ color: theme.muted }}>
                Next Event
              </Text>
              <Text
                variant="h5"
                className="font-semibold"
                style={{ color: isUpcoming ? typeInfo.color : theme.muted }}
              >
                {formatDate(activity.nextDate)}
              </Text>
            </View>
            <View className="items-end">
              <Text variant="caption" style={{ color: theme.muted }}>
                {daysUntil === 'Past' ? 'Passed' : daysUntil}
              </Text>
              <Text
                variant="body"
                className="font-semibold"
                style={{ color: isUpcoming ? typeInfo.color : theme.muted }}
              >
                {isUpcoming ? 'Upcoming' : 'Next Month'}
              </Text>
            </View>
          </View>
        </View>

        {/* Requirements */}
        <View className="mb-4">
          <Text
            variant="caption"
            className="mb-2"
            style={{ color: theme.muted }}
          >
            Requirements:
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {activity.requirements
              .slice(0, 2)
              .map((req: string, index: number) => (
                <View
                  key={index}
                  className="px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${theme.primary}10` }}
                >
                  <Text variant="caption" style={{ color: theme.primary }}>
                    {req}
                  </Text>
                </View>
              ))}
          </View>
        </View>

        {/* Footer */}
        <View className="flex-row items-center justify-between">
          <Text variant="caption" style={{ color: theme.muted }}>
            Led by {activity.leader}
          </Text>

          <View className="flex-row items-center">
            <Text
              variant="caption"
              className="mr-2"
              style={{ color: theme.muted }}
            >
              View Details
            </Text>
            <IconSymbol name="chevron.right" size={14} color={theme.muted} />
          </View>
        </View>
      </Pressable>
    );
  };

  const upcomingCount = MONTHLY_ACTIVITIES.filter(
    (a) => getDaysUntil(a.nextDate) !== 'Past',
  ).length;
  const thisMonthCount = MONTHLY_ACTIVITIES.filter((a) => {
    const eventDate = new Date(a.nextDate);
    const currentDate = new Date();
    return (
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear()
    );
  }).length;

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <LinearGradient
        colors={['#F59E0B', '#D97706']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 }}
      >
        <View className="flex-row items-center mb-4">
          <View className="bg-white/20 p-2 rounded-full mr-3">
            <IconSymbol name="calendar.circle.fill" size={24} color="white" />
          </View>
          <View>
            <Text variant="h2" className="text-white font-bold">
              Monthly Activities
            </Text>
            <Text variant="body" className="text-white/90 dark:text-white/80">
              Special monthly programs and gatherings
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row space-x-3">
          <View className="bg-white/20 rounded-lg px-3 py-2">
            <Text variant="h4" className="text-white font-bold">
              {MONTHLY_ACTIVITIES.length}
            </Text>
            <Text variant="caption" className="text-white/80">
              Total Activities
            </Text>
          </View>
          <View className="bg-white/20 rounded-lg px-3 py-2">
            <Text variant="h4" className="text-white font-bold">
              {upcomingCount}
            </Text>
            <Text variant="caption" className="text-white/80">
              Upcoming
            </Text>
          </View>
          <View className="bg-white/20 rounded-lg px-3 py-2">
            <Text variant="h4" className="text-white font-bold">
              {thisMonthCount}
            </Text>
            <Text variant="caption" className="text-white/80">
              This Month
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Filter Tabs */}
      <View className="px-4 py-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={ACTIVITY_TYPES}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedType(item.key)}
              className="mr-3 px-4 py-2 rounded-full flex-row items-center"
              style={{
                backgroundColor:
                  selectedType === item.key ? item.color : theme.card,
                borderWidth: 1,
                borderColor:
                  selectedType === item.key ? item.color : theme.border,
              }}
            >
              <IconSymbol
                name={item.icon as any}
                size={14}
                color={selectedType === item.key ? 'white' : item.color}
              />
              <Text
                variant="caption"
                className="font-semibold ml-2"
                style={{
                  color: selectedType === item.key ? 'white' : theme.muted,
                }}
              >
                {item.label}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Activities List */}
      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActivityCard activity={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center py-12">
            <IconSymbol
              name="calendar.circle.fill"
              size={48}
              color={theme.muted}
            />
            <Text
              variant="h4"
              className="mt-4 font-semibold"
              style={{ color: theme.heading }}
            >
              No activities found
            </Text>
            <Text
              variant="body"
              className="mt-2 text-center"
              style={{ color: theme.muted }}
            >
              Try selecting a different category
            </Text>
          </View>
        }
      />

      {/* Bottom Info Card */}
      <View className="mx-4 mb-4">
        <View
          className="rounded-xl p-4"
          style={{
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <View className="flex-row items-center mb-3">
            <IconSymbol
              name="info.circle.fill"
              size={20}
              color={theme.primary}
            />
            <Text
              variant="h4"
              className="ml-3 font-semibold"
              style={{ color: theme.heading }}
            >
              Activity Information
            </Text>
          </View>
          <Text
            variant="body"
            className="leading-6 mb-4"
            style={{ color: theme.muted }}
          >
            Monthly activities run on a regular schedule. Dates may occasionally
            change due to special events or holidays.
          </Text>
          <View className="flex-row justify-between">
            <Pressable
              onPress={() => router.push('/info/weekly-activities' as any)}
              className="items-center flex-1"
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: `${theme.primary}15` }}
              >
                <IconSymbol
                  name="clock.badge.checkmark"
                  size={16}
                  color={theme.primary}
                />
              </View>
              <Text
                variant="caption"
                className="text-center"
                style={{ color: theme.text }}
              >
                Weekly Activities
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/info/events' as any)}
              className="items-center flex-1"
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center mb-2"
                style={{
                  backgroundColor: `${theme.secondary || theme.primary}15`,
                }}
              >
                <IconSymbol
                  name="calendar.badge.plus"
                  size={16}
                  color={theme.secondary || theme.primary}
                />
              </View>
              <Text
                variant="caption"
                className="text-center"
                style={{ color: theme.text }}
              >
                Special Events
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/contact' as any)}
              className="items-center flex-1"
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: '#10B98115' }}
              >
                <IconSymbol name="phone.fill" size={16} color="#10B981" />
              </View>
              <Text
                variant="caption"
                className="text-center"
                style={{ color: theme.text }}
              >
                Get Help
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
