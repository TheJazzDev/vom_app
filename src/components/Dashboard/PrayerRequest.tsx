import { ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { usePrayerRequestSlice } from '@/src/store/slices/prayerRequestSlice';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { IconSymbol } from '../Icons';
import { Card, Text, View } from '../UI';

const PrayerRequest = () => {
  const theme = useTheme();
  const router = useRouter();
  const { requests, isLoadingRequests } = usePrayerRequestSlice();

  // Show only the first 2 prayer requests - filter out null values
  const displayRequests =
    requests && requests.length > 0
      ? requests.filter((r) => r != null).slice(0, 2)
      : [];

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days}d ago`;
    }
  };

  const getUserDisplayName = (request: any) => {
    if (!request) return 'Anonymous';
    if (request.createdBy?.firstName && request.createdBy?.lastName) {
      return `${request.createdBy.firstName} ${request.createdBy.lastName.charAt(0)}.`;
    }
    return 'Anonymous';
  };

  // Don't show if no requests and not loading
  // if (displayRequests.length === 0 && !isLoadingRequests) {
  //   return null;
  // }

  return (
    <Card variant="outlined" className="mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: '#8B5CF615' }}
          >
            <IconSymbol name="hands.sparkles.fill" size={18} color="#8B5CF6" />
          </View>
          <Text variant="h4" color="heading" className="font-bold">
            Prayer Requests
          </Text>
        </View>
        {displayRequests.length > 0 && (
          <Link href={ROUTES.PRAYER_REQUEST}>
            <Text variant="body" style={{ color: theme.primary }}>
              View all
            </Text>
          </Link>
        )}
      </View>

      {isLoadingRequests && displayRequests.length === 0 ? (
        <View className="items-center justify-center py-4">
          <ActivityIndicator size="small" color={theme.primary} />
          <Text
            variant="caption"
            className="mt-1.5"
            style={{ color: theme.muted }}
          >
            Loading prayer requests...
          </Text>
        </View>
      ) : displayRequests.length === 0 ? (
        <View className="items-center justify-center py-5">
          <IconSymbol name="hands.sparkles" size={28} color={theme.muted} />
          <Text
            variant="body"
            className="mt-1.5 text-sm"
            style={{ color: theme.muted }}
          >
            No prayer requests
          </Text>
          <Text
            variant="caption"
            className="mt-0.5 text-center"
            style={{ color: theme.muted }}
          >
            Recent prayer requests will appear here
          </Text>
        </View>
      ) : (
        displayRequests.map((request, index) => (
          <Pressable
            key={request.id}
            onPress={() =>
              router.push(`/(tabs)/ministry/prayer-requests/${request.id}` as any)
            }
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 12,
              padding: 16,
              marginBottom: index < displayRequests.length - 1 ? 12 : 0,
            }}
            android_ripple={{ color: 'rgba(139,92,246,0.1)' }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text
                  color="heading"
                  className="font-semibold mb-1"
                  numberOfLines={2}
                >
                  {request.title}
                </Text>
                <Text variant="body" style={{ color: theme.muted }}>
                  {getUserDisplayName(request)} •{' '}
                  {formatTimeAgo(request.createdAt)}
                </Text>
              </View>
              <Text variant="caption" style={{ color: theme.primary }}>
                {request.prayerCount || 0}{' '}
                {request.prayerCount === 1 ? 'prayer' : 'prayers'}
              </Text>
            </View>
          </Pressable>
        ))
      )}

      {!isLoadingRequests &&
        displayRequests.length > 0 &&
        requests.length > 2 && (
          <Link href={ROUTES.PRAYER_REQUEST} asChild>
            <Pressable
              className="mt-3 py-2 rounded-lg"
              style={{ backgroundColor: '#8B5CF610' }}
              android_ripple={{ color: 'rgba(139,92,246,0.1)' }}
            >
              <View className="flex-row items-center justify-center">
                <Text
                  variant="body"
                  className="font-medium"
                  style={{ color: '#8B5CF6' }}
                >
                  View all {requests.length} prayer requests
                </Text>
                <IconSymbol name="chevron.right" size={14} color="#8B5CF6" />
              </View>
            </Pressable>
          </Link>
        )}
    </Card>
  );
};

export default PrayerRequest;
