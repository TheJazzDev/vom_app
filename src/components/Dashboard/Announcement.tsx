import { ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { useAnnouncementSlice } from '@/src/store/slices';
import { truncateText } from '@/src/utils';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { IconSymbol } from '../Icons';
import { Badge, Card, Text, View } from '../UI';

const Announcement = () => {
  const theme = useTheme();
  const router = useRouter();

  const { announcements, isAnnouncementsLoading, announcementsError } =
    useAnnouncementSlice();

  const latestAnnouncements =
    announcements && announcements.length > 0
      ? announcements.filter((a) => a != null).slice(0, 2)
      : [];

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

  const getPriorityLabel = (priority: string) => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <Card variant="outlined" className="mb-4">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: '#EF444415' }}
          >
            <IconSymbol name="megaphone.fill" size={18} color="#EF4444" />
          </View>
          <Text variant="h4" color="heading" className="font-bold">
            Announcements
          </Text>
        </View>
        <Link href={ROUTES.ANNOUNCEMENT}>
          <Text variant="body" style={{ color: theme.primary }}>
            View all
          </Text>
        </Link>
      </View>

      {announcementsError ? (
        <View className="items-center justify-center py-8">
          <IconSymbol
            name="exclamationmark.triangle"
            size={32}
            color="#EF4444"
          />
          <Text
            variant="body"
            className="mt-2 text-center"
            style={{ color: '#EF4444' }}
          >
            Failed to load announcements
          </Text>
          <Text
            variant="caption"
            className="mt-1 text-center"
            style={{ color: theme.muted }}
          >
            {announcementsError}
          </Text>
        </View>
      ) : isAnnouncementsLoading && announcements.length === 0 ? (
        <View className="items-center justify-center py-8">
          <ActivityIndicator size="small" color={theme.primary} />
          <Text
            variant="caption"
            className="mt-2"
            style={{ color: theme.muted }}
          >
            Loading announcements...
          </Text>
        </View>
      ) : latestAnnouncements.length === 0 ? (
        <View className="items-center justify-center py-8">
          <IconSymbol name="megaphone" size={32} color={theme.muted} />
          <Text variant="body" className="mt-2" style={{ color: theme.muted }}>
            No announcements yet
          </Text>
        </View>
      ) : (
        latestAnnouncements.map((announcement) => (
          <Pressable
            key={announcement.id}
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
              borderLeftWidth: 4,
              borderLeftColor: getPriorityColor(announcement.priority),
            }}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-1 mr-3">
                <Text color="heading" className="font-semibold mb-2">
                  {announcement.title}
                </Text>
                <Text variant="body" style={{ color: theme.muted }}>
                  {truncateText(announcement.content, 80)}
                </Text>
              </View>
              <Badge>{getPriorityLabel(announcement.priority)}</Badge>
            </View>
          </Pressable>
        ))
      )}
    </Card>
  );
};

export default Announcement;
