// (info)/weekly-activities.tsx
import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';

// Weekly activities data
const WEEKLY_ACTIVITIES = {
  sunday: [
    {
      id: 'sun-1',
      title: 'Early Morning Prayer',
      time: '6:00 AM - 7:00 AM',
      location: 'Prayer Garden',
      type: 'prayer',
      participants: 'Open to all',
      leader: 'Prayer Team',
    },
    {
      id: 'sun-2',
      title: 'Sunday School',
      time: '8:30 AM - 9:30 AM',
      location: 'Classrooms',
      type: 'teaching',
      participants: 'All ages (separate classes)',
      leader: 'Sunday School Teachers',
    },
    {
      id: 'sun-3',
      title: 'Morning Worship Service',
      time: '9:45 AM - 12:30 PM',
      location: 'Main Sanctuary',
      type: 'worship',
      participants: 'All members and visitors',
      leader: 'Pastor David Johnson',
    },
    {
      id: 'sun-4',
      title: "Children's Church",
      time: '10:30 AM - 12:00 PM',
      location: "Children's Hall",
      type: 'children',
      participants: 'Ages 3-12',
      leader: 'Children Ministry',
    },
  ],
  monday: [
    {
      id: 'mon-1',
      title: 'Morning Devotion',
      time: '6:00 AM - 6:30 AM',
      location: 'Church Hall',
      type: 'devotion',
      participants: 'Open to all',
      leader: 'Elder Samuel',
    },
    {
      id: 'mon-2',
      title: 'Bible Study (Beginners)',
      time: '7:00 PM - 8:30 PM',
      location: 'Conference Room',
      type: 'study',
      participants: 'New believers',
      leader: 'Sister Grace',
    },
  ],
  tuesday: [
    {
      id: 'tue-1',
      title: "Women's Prayer Meeting",
      time: '6:00 PM - 7:30 PM',
      location: 'Fellowship Hall',
      type: 'prayer',
      participants: 'All women',
      leader: 'Women Ministry',
    },
    {
      id: 'tue-2',
      title: 'Choir Rehearsal',
      time: '8:00 PM - 9:30 PM',
      location: 'Main Sanctuary',
      type: 'music',
      participants: 'Choir members',
      leader: 'Minister James',
    },
  ],
  wednesday: [
    {
      id: 'wed-1',
      title: 'Mid-Week Service',
      time: '6:00 PM - 8:00 PM',
      location: 'Main Sanctuary',
      type: 'service',
      participants: 'All members',
      leader: 'Pastor David',
    },
    {
      id: 'wed-2',
      title: 'Youth Bible Study',
      time: '7:00 PM - 8:30 PM',
      location: 'Youth Center',
      type: 'study',
      participants: 'Ages 13-25',
      leader: 'Youth Leaders',
    },
  ],
  thursday: [
    {
      id: 'thu-1',
      title: "Men's Fellowship",
      time: '7:00 PM - 8:30 PM',
      location: 'Conference Room',
      type: 'fellowship',
      participants: 'All men',
      leader: 'Men Ministry',
    },
    {
      id: 'thu-2',
      title: 'Drama Ministry Practice',
      time: '8:00 PM - 9:30 PM',
      location: 'Fellowship Hall',
      type: 'ministry',
      participants: 'Drama team',
      leader: 'Sister Mary',
    },
  ],
  friday: [
    {
      id: 'fri-1',
      title: 'Friday Night Prayer',
      time: '7:00 PM - 9:00 PM',
      location: 'Main Sanctuary',
      type: 'prayer',
      participants: 'All members',
      leader: 'Prayer Team',
    },
    {
      id: 'fri-2',
      title: 'Youth Night',
      time: '7:30 PM - 10:00 PM',
      location: 'Youth Center',
      type: 'youth',
      participants: 'Ages 13-30',
      leader: 'Youth Ministry',
    },
  ],
  saturday: [
    {
      id: 'sat-1',
      title: "Men's Prayer Walk",
      time: '6:00 AM - 8:00 AM',
      location: 'Church Compound',
      type: 'prayer',
      participants: 'All men',
      leader: 'Men Ministry',
    },
    {
      id: 'sat-2',
      title: "Children's Club",
      time: '10:00 AM - 12:00 PM',
      location: "Children's Hall",
      type: 'children',
      participants: 'Ages 3-12',
      leader: 'Children Ministry',
    },
    {
      id: 'sat-3',
      title: 'Marriage Counseling',
      time: '2:00 PM - 4:00 PM',
      location: 'Counseling Room',
      type: 'counseling',
      participants: 'By appointment',
      leader: 'Pastor & Wife',
    },
  ],
};

const DAYS_OF_WEEK = [
  { key: 'sunday', label: 'Sunday', color: '#EF4444' },
  { key: 'monday', label: 'Monday', color: '#F59E0B' },
  { key: 'tuesday', label: 'Tuesday', color: '#10B981' },
  { key: 'wednesday', label: 'Wednesday', color: '#3B82F6' },
  { key: 'thursday', label: 'Thursday', color: '#8B5CF6' },
  { key: 'friday', label: 'Friday', color: '#EC4899' },
  { key: 'saturday', label: 'Saturday', color: '#6366F1' },
];

const ACTIVITY_TYPES = {
  worship: { icon: 'hands.sparkles.fill', color: '#EF4444' },
  prayer: { icon: 'hands.clap.fill', color: '#10B981' },
  teaching: { icon: 'book.fill', color: '#3B82F6' },
  study: { icon: 'book.circle.fill', color: '#3B82F6' },
  fellowship: { icon: 'person.3.fill', color: '#F59E0B' },
  music: { icon: 'music.note.list', color: '#8B5CF6' },
  youth: { icon: 'figure.wave', color: '#EC4899' },
  children: { icon: 'figure.2.and.child.holdinghands', color: '#06B6D4' },
  service: { icon: 'building.2.fill', color: '#EF4444' },
  ministry: { icon: 'theatermasks.fill', color: '#F59E0B' },
  devotion: { icon: 'sun.and.horizon.fill', color: '#F59E0B' },
  counseling: { icon: 'heart.text.square.fill', color: '#8B5CF6' },
};

export default function WeeklyActivities() {
  const theme = useTheme();
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState('sunday');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Simulate API call - replace with actual API call when available
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error refreshing weekly activities:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const getCurrentDay = () => {
    const today = new Date().getDay();
    const dayMap = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    return dayMap[today];
  };

  const currentDay = getCurrentDay();
  const selectedActivities =
    WEEKLY_ACTIVITIES[selectedDay as keyof typeof WEEKLY_ACTIVITIES] || [];

  const ActivityCard = ({ activity }: { activity: any }) => {
    const typeInfo =
      ACTIVITY_TYPES[activity.type as keyof typeof ACTIVITY_TYPES] ||
      ACTIVITY_TYPES.worship;

    return (
      <Pressable
        onPress={() =>
          router.push(`/info/weekly-activities/${activity.id}` as any)
        }
        style={{
          backgroundColor: theme.card,
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
        }}
        android_ripple={{ color: 'rgba(59,130,246,0.1)' }}
      >
        <View className="flex-row items-start">
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
              className="font-semibold mb-1"
              style={{ color: theme.heading }}
            >
              {activity.title}
            </Text>

            <View className="flex-row items-center mb-2">
              <IconSymbol name="clock" size={14} color={theme.muted} />
              <Text
                variant="body"
                className="ml-2 mr-4"
                style={{ color: theme.text }}
              >
                {activity.time}
              </Text>
              <IconSymbol name="location" size={14} color={theme.muted} />
              <Text
                variant="body"
                className="ml-2"
                style={{ color: theme.text }}
              >
                {activity.location}
              </Text>
            </View>

            <View className="flex-row items-center mb-2">
              <IconSymbol name="person.2" size={14} color={theme.muted} />
              <Text
                variant="body"
                className="ml-2"
                style={{ color: theme.muted }}
              >
                {activity.participants}
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <Text variant="caption" style={{ color: theme.muted }}>
                Led by {activity.leader}
              </Text>
              <IconSymbol name="chevron.right" size={14} color={theme.muted} />
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const totalActivities = Object.values(WEEKLY_ACTIVITIES).reduce(
    (sum, day) => sum + day.length,
    0,
  );
  const todayActivities =
    WEEKLY_ACTIVITIES[currentDay as keyof typeof WEEKLY_ACTIVITIES]?.length ||
    0;

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <LinearGradient
        colors={['#10B981', '#047857']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 }}
      >
        <View className="flex-row items-center mb-4">
          <View className="bg-white/20 p-2 rounded-full mr-3">
            <IconSymbol name="clock.badge.checkmark" size={24} color="white" />
          </View>
          <View>
            <Text variant="h2" className="text-white font-bold">
              Weekly Activities
            </Text>
            <Text variant="body" className="text-white/90 dark:text-white/80">
              Regular church programs and meetings
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row space-x-3">
          <View className="bg-white/20 rounded-lg px-3 py-2">
            <Text variant="h4" className="text-white font-bold">
              {totalActivities}
            </Text>
            <Text variant="caption" className="text-white/80">
              Total Weekly
            </Text>
          </View>
          <View className="bg-white/20 rounded-lg px-3 py-2">
            <Text variant="h4" className="text-white font-bold">
              {todayActivities}
            </Text>
            <Text variant="caption" className="text-white/80">
              Today
            </Text>
          </View>
          <View className="bg-white/20 rounded-lg px-3 py-2">
            <Text variant="h4" className="text-white font-bold">
              7
            </Text>
            <Text variant="caption" className="text-white/80">
              Days Active
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Day Selector */}
      <View className="px-4 py-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={DAYS_OF_WEEK}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            const isToday = item.key === currentDay;
            const isSelected = item.key === selectedDay;

            return (
              <Pressable
                onPress={() => setSelectedDay(item.key)}
                className="mr-3 px-4 py-3 rounded-xl relative"
                style={{
                  backgroundColor: isSelected ? item.color : theme.card,
                  borderWidth: isToday ? 2 : 1,
                  borderColor: isToday
                    ? item.color
                    : isSelected
                      ? item.color
                      : theme.border,
                }}
              >
                {isToday && (
                  <View className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full" />
                )}
                <Text
                  variant="caption"
                  className="font-semibold"
                  style={{
                    color: isSelected ? 'white' : theme.text,
                  }}
                >
                  {item.label}
                </Text>
                <Text
                  variant="caption"
                  style={{
                    color: isSelected ? 'rgba(255,255,255,0.8)' : theme.muted,
                  }}
                >
                  {WEEKLY_ACTIVITIES[item.key as keyof typeof WEEKLY_ACTIVITIES]
                    ?.length || 0}{' '}
                  activities
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {/* Activities List */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
      >
        <Text
          variant="h3"
          className="font-semibold mb-4"
          style={{ color: theme.heading }}
        >
          {DAYS_OF_WEEK.find((d) => d.key === selectedDay)?.label} Activities
        </Text>

        {selectedActivities.length > 0 ? (
          selectedActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <View className="items-center py-12">
            <IconSymbol
              name="calendar.badge.exclamationmark"
              size={48}
              color={theme.muted}
            />
            <Text
              variant="h4"
              className="mt-4 font-semibold"
              style={{ color: theme.heading }}
            >
              No activities scheduled
            </Text>
            <Text
              variant="body"
              className="mt-2 text-center"
              style={{ color: theme.muted }}
            >
              This day has no regular weekly activities
            </Text>
          </View>
        )}

        {/* Quick Access Card */}
        <View
          className="mt-6 rounded-xl p-6"
          style={{
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Text
            variant="h4"
            className="font-semibold mb-3"
            style={{ color: theme.heading }}
          >
            Quick Access
          </Text>
          <View className="flex-row justify-between">
            <Pressable
              onPress={() => router.push('/info/events' as any)}
              className="items-center flex-1"
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: `${theme.primary}15` }}
              >
                <IconSymbol
                  name="calendar.badge.plus"
                  size={20}
                  color={theme.primary}
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
              onPress={() => router.push('/info/monthly-activities' as any)}
              className="items-center flex-1"
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: `${theme.secondary}15` }}
              >
                <IconSymbol
                  name="calendar.circle.fill"
                  size={20}
                  color={theme.secondary || theme.primary}
                />
              </View>
              <Text
                variant="caption"
                className="text-center"
                style={{ color: theme.text }}
              >
                Monthly Activities
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push('/contact' as any)}
              className="items-center flex-1"
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: '#10B98115' }}
              >
                <IconSymbol name="phone.fill" size={20} color="#10B981" />
              </View>
              <Text
                variant="caption"
                className="text-center"
                style={{ color: theme.text }}
              >
                Contact Us
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
