// (info)/events.tsx
import { IconSymbol } from '@/src/components/Icons';
import { IconSymbolName } from '@/src/components/Icons/IconSymbol';
import { Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

// Mock events data
const CHURCH_EVENTS = [
  {
    id: '1',
    title: 'Easter Sunday Celebration',
    description:
      'Join us for a glorious Easter celebration with special music, drama presentation, and powerful ministry.',
    date: '2024-03-31',
    time: '9:00 AM - 12:00 PM',
    location: 'Main Sanctuary',
    category: 'special',
    organizer: 'Programme Department',
    capacity: 500,
    registered: 320,
    price: 'Free',
    requirements: ['Easter outfit encouraged', 'Arrive early for parking'],
    status: 'upcoming',
    featured: true,
  },
  {
    id: '2',
    title: 'Youth Revival Night',
    description:
      'A night of powerful worship, testimonies, and life-changing ministry specifically for our young people.',
    date: '2024-03-22',
    time: '7:00 PM - 10:00 PM',
    location: 'Fellowship Hall',
    category: 'youth',
    organizer: 'Youth Ministry',
    capacity: 200,
    registered: 145,
    price: 'Free',
    requirements: ['Ages 13-30', 'Bring a friend'],
    status: 'upcoming',
    featured: false,
  },
  {
    id: '3',
    title: 'Marriage Enrichment Seminar',
    description:
      'Strengthen your marriage with practical biblical principles. For married couples and those preparing for marriage.',
    date: '2024-03-20',
    time: '10:00 AM - 4:00 PM',
    location: 'Conference Room A',
    category: 'seminar',
    organizer: 'Family Ministry',
    capacity: 50,
    registered: 38,
    price: '₦5,000 per couple',
    requirements: ['Registration required', 'Lunch included'],
    status: 'upcoming',
    featured: false,
  },
  {
    id: '4',
    title: 'Church Planting Conference',
    description:
      'Learn about church planting, evangelism strategies, and community outreach from experienced pastors.',
    date: '2024-03-15',
    time: '9:00 AM - 5:00 PM',
    location: 'Main Sanctuary',
    category: 'conference',
    organizer: 'Evangelism Department',
    capacity: 300,
    registered: 267,
    price: '₦10,000',
    requirements: ['Leaders and aspiring ministers', 'Materials provided'],
    status: 'completed',
    featured: false,
  },
  {
    id: '5',
    title: "Children's Fun Day",
    description:
      'Games, activities, Bible stories, and prizes for all children. Parents are welcome to participate!',
    date: '2024-03-16',
    time: '2:00 PM - 6:00 PM',
    location: 'Church Compound',
    category: 'children',
    organizer: 'Children Ministry',
    capacity: 150,
    registered: 89,
    price: 'Free',
    requirements: ['Ages 3-12', 'Parental supervision required'],
    status: 'upcoming',
    featured: true,
  },
];

const EVENT_CATEGORIES: {
  key: string;
  label: string;
  color: string;
  icon: IconSymbolName;
}[] = [
  {
    key: 'all',
    label: 'All Events',
    color: '#6B7280',
    icon: 'calendar.badge.plus',
  },
  { key: 'special', label: 'Special', color: '#EF4444', icon: 'star.fill' },
  { key: 'youth', label: 'Youth', color: '#3B82F6', icon: 'person.3.fill' },
  { key: 'seminar', label: 'Seminars', color: '#10B981', icon: 'book.fill' },
  {
    key: 'conference',
    label: 'Conferences',
    color: '#F59E0B',
    icon: 'building.2.fill',
  },
  {
    key: 'children',
    label: 'Children',
    color: '#8B5CF6',
    icon: 'figure.2.and.child.holdinghands',
  },
];

export default function InfoEvents() {
  const theme = useTheme();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('upcoming');

  const filteredEvents = CHURCH_EVENTS.filter((event) => {
    const matchesCategory =
      selectedCategory === 'all' || event.category === selectedCategory;
    const matchesStatus = event.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      day: date.getDate(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '#3B82F6';
      case 'completed':
        return '#10B981';
      case 'cancelled':
        return '#EF4444';
      default:
        return theme.muted;
    }
  };

  const getCategoryInfo = (category: string) => {
    return (
      EVENT_CATEGORIES.find((c) => c.key === category) || EVENT_CATEGORIES[0]
    );
  };

  const EventCard = ({ event }: { event: any }) => {
    const dateInfo = formatDate(event.date);
    const categoryInfo = getCategoryInfo(event.category);
    const registrationPercentage = (event.registered / event.capacity) * 100;

    return (
      <Pressable
        onPress={() => router.push(`/info/events/${event.id}` as any)}
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
        {event.featured && (
          <View className="absolute top-0 right-0">
            <View
              className="px-3 py-1 rounded-bl-lg"
              style={{ backgroundColor: '#F59E0B' }}
            >
              <Text variant="caption" className="text-white font-bold">
                FEATURED
              </Text>
            </View>
          </View>
        )}

        {/* Header */}
        <View className="flex-row mb-4">
          {/* Date Block */}
          <View
            className="w-16 h-16 rounded-lg items-center justify-center mr-4"
            style={{ backgroundColor: `${categoryInfo.color}15` }}
          >
            <Text
              variant="caption"
              className="font-semibold uppercase"
              style={{ color: categoryInfo.color }}
            >
              {dateInfo.month}
            </Text>
            <Text
              variant="h3"
              className="font-bold"
              style={{ color: categoryInfo.color }}
            >
              {dateInfo.day}
            </Text>
          </View>

          {/* Event Info */}
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Text
                variant="h4"
                className="font-bold flex-1"
                style={{ color: theme.heading }}
              >
                {event.title}
              </Text>
            </View>

            <View className="flex-row items-center mb-2">
              <IconSymbol
                name={categoryInfo.icon}
                size={14}
                color={categoryInfo.color}
              />
              <Text
                variant="caption"
                className="ml-1 font-semibold capitalize"
                style={{ color: categoryInfo.color }}
              >
                {event.category}
              </Text>
              <Text
                variant="caption"
                className="mx-2"
                style={{ color: theme.muted }}
              >
                •
              </Text>
              <Text variant="caption" style={{ color: theme.muted }}>
                {dateInfo.weekday}
              </Text>
            </View>

            <Text
              variant="body"
              className="leading-5"
              style={{ color: theme.text }}
              numberOfLines={2}
            >
              {event.description}
            </Text>
          </View>
        </View>

        {/* Event Details */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <IconSymbol name="clock" size={16} color={theme.muted} />
            <Text variant="body" className="ml-2" style={{ color: theme.text }}>
              {event.time}
            </Text>
          </View>

          <View className="flex-row items-center mb-2">
            <IconSymbol name="location" size={16} color={theme.muted} />
            <Text variant="body" className="ml-2" style={{ color: theme.text }}>
              {event.location}
            </Text>
          </View>

          <View className="flex-row items-center">
            <IconSymbol name="person.2" size={16} color={theme.muted} />
            <Text variant="body" className="ml-2" style={{ color: theme.text }}>
              {event.registered}/{event.capacity} registered
            </Text>
            <Text
              variant="body"
              className="mx-2"
              style={{ color: theme.muted }}
            >
              •
            </Text>
            <Text variant="body" style={{ color: theme.primary }}>
              {event.price}
            </Text>
          </View>
        </View>

        {/* Registration Progress */}
        {event.status === 'upcoming' && (
          <View className="mb-3">
            <View className="flex-row justify-between mb-1">
              <Text variant="caption" style={{ color: theme.muted }}>
                Registration Progress
              </Text>
              <Text variant="caption" style={{ color: theme.muted }}>
                {Math.round(registrationPercentage)}%
              </Text>
            </View>
            <View
              className="h-2 rounded-full"
              style={{ backgroundColor: `${theme.primary}20` }}
            >
              <View
                className="h-2 rounded-full"
                style={{
                  width: `${registrationPercentage}%`,
                  backgroundColor:
                    registrationPercentage > 80 ? '#EF4444' : theme.primary,
                }}
              />
            </View>
          </View>
        )}

        {/* Footer */}
        <View className="flex-row items-center justify-between">
          <Text variant="caption" style={{ color: theme.muted }}>
            By {event.organizer}
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

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <LinearGradient
        colors={['#3B82F6', '#1E40AF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 }}
      >
        <View className="flex-row items-center mb-4">
          <View className="bg-white/20 p-2 rounded-full mr-3">
            <IconSymbol name="calendar.badge.plus" size={24} color="white" />
          </View>
          <View>
            <Text variant="h2" className="text-white font-bold">
              Church Events
            </Text>
            <Text variant="body" className="text-white/90">
              {filteredEvents.length} {selectedStatus} events
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row space-x-3">
          <View className="bg-white/20 rounded-lg px-3 py-2">
            <Text variant="h4" className="text-white font-bold">
              {CHURCH_EVENTS.filter((e) => e.status === 'upcoming').length}
            </Text>
            <Text variant="caption" className="text-white/80">
              Upcoming
            </Text>
          </View>
          <View className="bg-white/20 rounded-lg px-3 py-2">
            <Text variant="h4" className="text-white font-bold">
              {CHURCH_EVENTS.filter((e) => e.featured).length}
            </Text>
            <Text variant="caption" className="text-white/80">
              Featured
            </Text>
          </View>
          <View className="bg-white/20 rounded-lg px-3 py-2">
            <Text variant="h4" className="text-white font-bold">
              {CHURCH_EVENTS.reduce((sum, e) => sum + e.registered, 0)}
            </Text>
            <Text variant="caption" className="text-white/80">
              Registrations
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Status Filter */}
      <View className="px-4 py-4">
        <View className="flex-row space-x-3 mb-4">
          {['upcoming', 'completed'].map((status) => (
            <Pressable
              key={status}
              onPress={() => setSelectedStatus(status)}
              className="px-4 py-2 rounded-full"
              style={{
                backgroundColor:
                  selectedStatus === status
                    ? getStatusColor(status)
                    : theme.card,
                borderWidth: 1,
                borderColor:
                  selectedStatus === status
                    ? getStatusColor(status)
                    : theme.border,
              }}
            >
              <Text
                variant="caption"
                className="font-semibold capitalize"
                style={{
                  color: selectedStatus === status ? 'white' : theme.muted,
                }}
              >
                {status}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Category Filter */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={EVENT_CATEGORIES}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedCategory(item.key)}
              className="mr-3 px-4 py-2 rounded-full flex-row items-center"
              style={{
                backgroundColor:
                  selectedCategory === item.key ? item.color : theme.card,
                borderWidth: 1,
                borderColor:
                  selectedCategory === item.key ? item.color : theme.border,
              }}
            >
              <IconSymbol
                name={item.icon}
                size={14}
                color={selectedCategory === item.key ? 'white' : item.color}
              />
              <Text
                variant="caption"
                className="font-semibold ml-2"
                style={{
                  color: selectedCategory === item.key ? 'white' : theme.muted,
                }}
              >
                {item.label}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Events List */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center py-12">
            <IconSymbol
              name="calendar.badge.plus"
              size={48}
              color={theme.muted}
            />
            <Text
              variant="h4"
              className="mt-4 font-semibold"
              style={{ color: theme.heading }}
            >
              No events found
            </Text>
            <Text
              variant="body"
              className="mt-2 text-center"
              style={{ color: theme.muted }}
            >
              Try selecting a different category or status
            </Text>
          </View>
        }
      />
    </View>
  );
}
