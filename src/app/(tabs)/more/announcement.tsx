import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { useAnnouncementSlice } from '@/src/store/slices';
import { dispatch } from '@/src/store/store';
import { fetchAnnouncementStats, fetchAnnouncements } from '@/src/store/thunks';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, RefreshControl, View } from 'react-native';

const ANNOUNCEMENT_TYPES = [
  { key: 'all', label: 'All', color: '#6B7280' },
  { key: 'event', label: 'Events', color: '#3B82F6' },
  { key: 'info', label: 'Information', color: '#10B981' },
  { key: 'volunteer', label: 'Volunteers', color: '#F59E0B' },
  { key: 'financial', label: 'Financial', color: '#8B5CF6' },
  { key: 'registration', label: 'Registration', color: '#EF4444' },
];

export default function InfoAnnouncements() {
  const theme = useTheme();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'all' | AnnouncementType>(
    'all',
  );

  const {
    announcements,
    isAnnouncementsLoading,
    stats,
    announcementsLastFetch,
  } = useAnnouncementSlice();

  useEffect(() => {
    const fiveMinutes = 5 * 60 * 1000;
    const shouldFetch =
      !announcementsLastFetch ||
      Date.now() - announcementsLastFetch > fiveMinutes;

    if (shouldFetch && !isAnnouncementsLoading) {
      dispatch(fetchAnnouncements());
      dispatch(fetchAnnouncementStats());
    }
  }, [announcementsLastFetch, isAnnouncementsLoading]);

  const onRefresh = useCallback(async () => {
    try {
      await Promise.all([
        dispatch(fetchAnnouncements()).unwrap(),
        dispatch(fetchAnnouncementStats()).unwrap(),
      ]);
    } catch (error) {
      console.error('Error refreshing announcements:', error);
    }
  }, []);

  const filteredAnnouncements = announcements.filter(
    (announcement) =>
      selectedType === 'all' || announcement.type === selectedType,
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return theme.muted;
    }
  };

  const getTypeColor = (type: string) => {
    return ANNOUNCEMENT_TYPES.find((t) => t.key === type)?.color || theme.muted;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const AnnouncementCard = ({ announcement }: { announcement: any }) => (
    <Pressable
      onPress={() =>
        router.push(`/info/announcements/${announcement.id}` as any)
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
      {/* Header */}
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1 mr-3">
          <View className="flex-row items-center mb-2">
            <View
              className="w-3 h-3 rounded-full mr-2"
              style={{
                backgroundColor: getPriorityColor(announcement.priority),
              }}
            />
            <Text
              variant="h4"
              className="font-semibold flex-1"
              style={{ color: theme.heading }}
            >
              {announcement.title}
            </Text>
          </View>

          <View className="flex-row items-center mb-2">
            <Text variant="caption" style={{ color: theme.muted }}>
              {formatDate(announcement.date)} • {announcement.author}
            </Text>
          </View>
        </View>

        <View
          className="px-2 py-1 rounded-full"
          style={{ backgroundColor: `${getTypeColor(announcement.type)}15` }}
        >
          <Text
            variant="caption"
            className="font-semibold capitalize"
            style={{ color: getTypeColor(announcement.type) }}
          >
            {announcement.type}
          </Text>
        </View>
      </View>

      {/* Content */}
      <Text
        variant="body"
        className="mb-3 leading-6"
        style={{ color: theme.text }}
        numberOfLines={3}
      >
        {announcement.content}
      </Text>

      {/* Tags */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row flex-wrap gap-2">
          {announcement.tags.slice(0, 2).map((tag: string, index: number) => (
            <View
              key={index}
              className="px-2 py-1 rounded-full"
              style={{ backgroundColor: `${theme.primary}10` }}
            >
              <Text variant="caption" style={{ color: theme.primary }}>
                #{tag}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-row items-center">
          <IconSymbol name="clock" size={12} color={theme.muted} />
          <Text
            variant="caption"
            className="ml-1"
            style={{ color: theme.muted }}
          >
            {announcement.readTime}
          </Text>
          <IconSymbol name="chevron.right" size={14} color={theme.muted} />
        </View>
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <LinearGradient
        colors={['#EF4444', '#DC2626']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 }}
      >
        <View className="flex-row items-center mb-4">
          <View className="bg-white/20 p-2 rounded-full mr-3">
            <IconSymbol name="megaphone.fill" size={24} color="white" />
          </View>
          <View>
            <Text variant="h2" className="text-white font-bold">
              Announcements
            </Text>
            <Text variant="body" className="text-white/90 dark:text-white/80">
              {filteredAnnouncements.length} announcements
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row gap-4">
          <View className="bg-white/20 rounded-lg px-3 py-2 w-28">
            <Text variant="h4" className="text-white font-bold">
              {stats?.highPriority || 0}
            </Text>
            <Text variant="caption" className="text-white/80">
              High Priority
            </Text>
          </View>
          <View className="bg-white/20 rounded-lg px-3 py-2 w-28">
            <Text variant="h4" className="text-white font-bold">
              {stats?.total || 0}
            </Text>
            <Text variant="caption" className="text-white/80">
              Total
            </Text>
          </View>
          <View className="bg-white/20 rounded-lg px-3 py-2 w-28">
            <Text variant="h4" className="text-white font-bold">
              {stats?.thisWeek || 0}
            </Text>
            <Text variant="caption" className="text-white/80">
              This Week
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Filter Tabs */}
      <View className="px-4 py-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={ANNOUNCEMENT_TYPES}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedType(item.key as AnnouncementType)}
              className="mr-3 px-4 py-2 rounded-full"
              style={{
                backgroundColor:
                  selectedType === item.key ? item.color : theme.card,
                borderWidth: 1,
                borderColor:
                  selectedType === item.key ? item.color : theme.border,
              }}
            >
              <Text
                variant="caption"
                className="font-semibold"
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

      {/* Announcements List */}
      <FlatList
        data={filteredAnnouncements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AnnouncementCard announcement={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isAnnouncementsLoading}
            onRefresh={onRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
        ListEmptyComponent={
          <View className="items-center py-12">
            <IconSymbol name="megaphone" size={48} color={theme.muted} />
            <Text
              variant="h4"
              className="mt-4 font-semibold"
              style={{ color: theme.heading }}
            >
              No announcements found
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
    </View>
  );
}
