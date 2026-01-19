import { ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { useSermonSlice } from '@/src/store/slices/sermonSlice';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { IconSymbol } from '../Icons';
import { Card, Text, View } from '../UI';

const RecentSermons = () => {
  const theme = useTheme();
  const router = useRouter();
  const { sermons, isLoadingSermons } = useSermonSlice();

  // Show only the first 2 sermons - filter out null values
  const displaySermons =
    sermons && sermons.length > 0
      ? sermons.filter((s) => s != null).slice(0, 2)
      : [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  // Don't show if no sermons and not loading
  // if (displaySermons.length === 0 && !isLoadingSermons) {
  //   return null;
  // }

  return (
    <Card variant="outlined" className="mb-4">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: '#10B98115' }}
          >
            <IconSymbol name="book.fill" size={18} color="#10B981" />
          </View>
          <Text variant="h4" color="heading" className="font-bold">
            Recent Sermons
          </Text>
        </View>
        {displaySermons.length > 0 && (
          <Link href={ROUTES.RECENT_SERMONS}>
            <Text variant="body" style={{ color: theme.primary }}>
              View all
            </Text>
          </Link>
        )}
      </View>

      {isLoadingSermons && displaySermons.length === 0 ? (
        <View className="items-center justify-center py-4">
          <ActivityIndicator size="small" color={theme.primary} />
          <Text
            variant="caption"
            className="mt-1.5"
            style={{ color: theme.muted }}
          >
            Loading sermons...
          </Text>
        </View>
      ) : displaySermons.length === 0 ? (
        <View className="items-center justify-center py-5">
          <IconSymbol name="book" size={28} color={theme.muted} />
          <Text
            variant="body"
            className="mt-1.5 text-sm"
            style={{ color: theme.muted }}
          >
            No sermons available
          </Text>
          <Text
            variant="caption"
            className="mt-0.5 text-center"
            style={{ color: theme.muted }}
          >
            Recent sermons will appear here
          </Text>
        </View>
      ) : (
        displaySermons.map((sermon, index) => (
          <Pressable
            key={sermon.id}
            onPress={() =>
              router.push(`/ministry/recent-sermons/${sermon.id}` as any)
            }
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 12,
              padding: 16,
              marginBottom: index < displaySermons.length - 1 ? 12 : 0,
            }}
            android_ripple={{ color: 'rgba(16,185,129,0.1)' }}
          >
            <View className="flex-row items-center">
              <View
                className="w-12 h-12 rounded-full items-center justify-center mr-4"
                style={{
                  backgroundColor: index === 0 ? '#3B82F615' : '#10B98115',
                }}
              >
                <IconSymbol
                  name="play.circle.fill"
                  size={24}
                  color={index === 0 ? '#3B82F6' : '#10B981'}
                />
              </View>
              <View className="flex-1">
                <Text color="heading" className="font-semibold mb-1">
                  {sermon.title}
                </Text>
                <Text variant="body" style={{ color: theme.muted }}>
                  {sermon.preacher}
                  {sermon.duration && ` • ${formatDuration(sermon.duration)}`}
                </Text>
                <Text variant="caption" style={{ color: theme.primary }}>
                  {formatDate(sermon.date)}
                  {sermon.views !== undefined && ` • ${sermon.views} views`}
                </Text>
              </View>
            </View>
          </Pressable>
        ))
      )}

      {!isLoadingSermons && displaySermons.length > 0 && sermons.length > 2 && (
        <Link href={ROUTES.RECENT_SERMONS} asChild>
          <Pressable
            className="mt-3 py-2 rounded-lg"
            style={{ backgroundColor: '#10B98110' }}
            android_ripple={{ color: 'rgba(16,185,129,0.1)' }}
          >
            <View className="flex-row items-center justify-center">
              <Text
                variant="body"
                className="font-medium"
                style={{ color: '#10B981' }}
              >
                View all {sermons.length} sermons
              </Text>
              <IconSymbol name="chevron.right" size={14} color="#10B981" />
            </View>
          </Pressable>
        </Link>
      )}
    </Card>
  );
};

export default RecentSermons;
