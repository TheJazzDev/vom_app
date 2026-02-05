import { ROUTES } from '@/src/constants';
import { useTheme } from '@/src/hooks';
import { useTestimonySlice } from '@/src/store/slices/testimonySlice';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { IconSymbol } from '../Icons';
import { Card, Text, View } from '../UI';

const TestimoniesWidget = () => {
  const theme = useTheme();
  const router = useRouter();
  const { testimonies, isLoadingTestimonies } = useTestimonySlice();

  // Show only the first testimony (featured or most recent)
  const displayTestimony =
    testimonies && testimonies.length > 0 ? testimonies[0] : null;

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
      if (days < 7) {
        return `${days}d ago`;
      } else if (days < 30) {
        const weeks = Math.floor(days / 7);
        return `${weeks}w ago`;
      } else {
        const months = Math.floor(days / 30);
        return `${months}mo ago`;
      }
    }
  };

  const getUserDisplayName = (testimony: any) => {
    if (!testimony) return 'Anonymous';
    if (testimony.createdBy?.firstName && testimony.createdBy?.lastName) {
      return `${testimony.createdBy.firstName} ${testimony.createdBy.lastName}`;
    }
    return 'Anonymous';
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card variant="ghost" className="mb-4 relative overflow-hidden">
      <LinearGradient
        colors={['#10B98115', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <View className="relative z-10">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center flex-1">
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: '#10B98120' }}
            >
              <IconSymbol name="quote.bubble.fill" size={22} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text variant="h4" color="heading" className="font-bold">
                Latest Testimony
              </Text>
              <Text variant="caption" style={{ color: theme.muted }}>
                Inspiring stories from our community
              </Text>
            </View>
          </View>
          <Link href={ROUTES.TESTIMONIES}>
            <View className="flex-row items-center">
              <Text
                variant="body"
                className="font-medium mr-1"
                style={{ color: '#10B981' }}
              >
                View All
              </Text>
              <IconSymbol name="arrow.right" size={14} color="#10B981" />
            </View>
          </Link>
        </View>

        {isLoadingTestimonies && !displayTestimony ? (
          <View className="items-center justify-center py-4">
            <ActivityIndicator size="small" color={theme.primary} />
            <Text
              variant="caption"
              className="mt-1.5"
              style={{ color: theme.muted }}
            >
              Loading testimonies...
            </Text>
          </View>
        ) : !displayTestimony ? (
          <View className="items-center justify-center py-5">
            <IconSymbol name="quote.bubble" size={28} color={theme.muted} />
            <Text
              variant="body"
              className="mt-1.5 text-sm"
              style={{ color: theme.muted }}
            >
              No testimonies yet
            </Text>
            <Text
              variant="caption"
              className="mt-0.5 text-center"
              style={{ color: theme.muted }}
            >
              Be the first to share your testimony
            </Text>
          </View>
        ) : (
          <Pressable
            onPress={() =>
              router.push(`/(tabs)/ministry/testimonies/${displayTestimony.id}` as any)
            }
            style={{
              backgroundColor: theme.card,
              borderWidth: 1,
              borderColor: '#10B98130',
              borderLeftWidth: 4,
              borderLeftColor: '#10B981',
              borderRadius: 12,
              padding: 16,
            }}
            android_ripple={{ color: 'rgba(16,185,129,0.1)' }}
          >
            <View className="flex-row items-start mb-3">
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: '#10B98115' }}
              >
                <IconSymbol name="person.fill" size={18} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text
                  color="heading"
                  className="font-bold mb-1"
                  numberOfLines={1}
                >
                  {getUserDisplayName(displayTestimony)}
                </Text>
                <Text variant="caption" style={{ color: theme.muted }}>
                  {formatTimeAgo(displayTestimony.createdAt)}
                  {displayTestimony.category &&
                    ` • ${displayTestimony.category}`}
                </Text>
              </View>
              {displayTestimony.isFeatured && (
                <View
                  className="px-2 py-1 rounded-full"
                  style={{ backgroundColor: '#F59E0B20' }}
                >
                  <Text
                    variant="caption"
                    className="font-semibold"
                    style={{ color: '#F59E0B' }}
                  >
                    Featured
                  </Text>
                </View>
              )}
            </View>

            <Text
              color="heading"
              className="font-semibold mb-2 text-base"
              numberOfLines={2}
            >
              {displayTestimony.title}
            </Text>

            <View
              className="rounded-lg p-3 mb-3"
              style={{ backgroundColor: '#10B98108' }}
            >
              <Text
                variant="body"
                style={{ color: theme.body, lineHeight: 20 }}
                numberOfLines={3}
              >
                {truncateText(displayTestimony.content, 120)}
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                <View className="flex-row items-center">
                  <IconSymbol
                    name="hand.thumbsup.fill"
                    size={14}
                    color={theme.muted}
                  />
                  <Text
                    variant="caption"
                    className="ml-1"
                    style={{ color: theme.muted }}
                  >
                    {displayTestimony.likes || 0}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <IconSymbol
                    name="text.bubble.fill"
                    size={14}
                    color={theme.muted}
                  />
                  <Text
                    variant="caption"
                    className="ml-1"
                    style={{ color: theme.muted }}
                  >
                    {displayTestimony.commentsCount || 0}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center">
                <Text
                  variant="caption"
                  className="font-semibold"
                  style={{ color: '#10B981' }}
                >
                  Read More
                </Text>
                <IconSymbol
                  name="chevron.right"
                  size={12}
                  color="#10B981"
                  style={{ marginLeft: 2 }}
                />
              </View>
            </View>
          </Pressable>
        )}

        {/* Quick Action */}
        <Pressable
          onPress={() => router.push('/create-testimony' as any)}
          className="mt-3 py-2.5 rounded-lg flex-row items-center justify-center"
          style={{ backgroundColor: '#10B98110' }}
          android_ripple={{ color: 'rgba(16,185,129,0.1)' }}
        >
          <IconSymbol name="plus.circle.fill" size={16} color="#10B981" />
          <Text
            variant="body"
            className="ml-2 font-semibold"
            style={{ color: '#10B981' }}
          >
            Share Your Testimony
          </Text>
        </Pressable>
      </View>
    </Card>
  );
};

export default TestimoniesWidget;
