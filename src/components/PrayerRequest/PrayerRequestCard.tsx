import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { PrayButton } from '@/src/components/Social/PrayButton';
import { useTheme } from '@/src/hooks';
import type { PrayerRequest } from '@/src/services/prayerRequest';
import { PRAYER_CATEGORIES } from '@/src/services/prayerRequest';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

interface PrayerRequestCardProps {
  request: PrayerRequest;
  hasPrayed?: boolean;
  onPray?: () => Promise<void>;
  showFullContent?: boolean;
}

export const PrayerRequestCard: React.FC<PrayerRequestCardProps> = ({
  request,
  hasPrayed = false,
  onPray,
  showFullContent = false,
}) => {
  const theme = useTheme();
  const router = useRouter();

  const category = PRAYER_CATEGORIES[request.category];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handlePress = () => {
    router.push(`/ministry/prayer-requests/${request.id}` as any);
  };

  const truncatedContent = showFullContent
    ? request.content
    : request.content.length > 120
      ? `${request.content.substring(0, 120)}...`
      : request.content;

  return (
    <Pressable
      onPress={handlePress}
      className="rounded-2xl p-4 mb-3"
      style={{
        backgroundColor: theme.card,
        borderColor: request.isUrgent ? '#EF4444' : theme.border,
        borderWidth: request.isUrgent ? 2 : 1,
      }}
    >
      {/* Header */}
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-row items-center gap-2 flex-1">
          {/* Author Avatar or Anonymous */}
          {request.isAnonymous ? (
            <View
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: `${theme.textSecondary}20` }}
            >
              <IconSymbol name="person.fill.questionmark" size={18} color={theme.textSecondary} />
            </View>
          ) : (
            <View
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: `${category.color}20` }}
            >
              <Text className="text-lg">{category.emoji}</Text>
            </View>
          )}
          <View className="flex-1">
            <Text
              variant="body"
              style={{ color: theme.heading }}
              className="font-semibold"
              numberOfLines={1}
            >
              {request.isAnonymous ? 'Anonymous' : request.authorName}
            </Text>
            <Text variant="caption" style={{ color: theme.textSecondary }}>
              {formatDate(request.createdAt)}
            </Text>
          </View>
        </View>

        {/* Urgent Badge */}
        {request.isUrgent && (
          <View
            className="px-2 py-1 rounded-full flex-row items-center gap-1"
            style={{ backgroundColor: '#FEE2E2' }}
          >
            <IconSymbol name="exclamationmark.triangle.fill" size={12} color="#EF4444" />
            <Text className="text-xs font-semibold" style={{ color: '#EF4444' }}>
              Urgent
            </Text>
          </View>
        )}
      </View>

      {/* Category Badge */}
      <View className="flex-row items-center gap-2 mb-2">
        <View
          className="px-2 py-1 rounded-full"
          style={{ backgroundColor: `${category.color}15` }}
        >
          <Text
            className="text-xs font-medium"
            style={{ color: category.color }}
          >
            {category.emoji} {category.label}
          </Text>
        </View>
        {request.status === 'answered' && (
          <View
            className="px-2 py-1 rounded-full"
            style={{ backgroundColor: '#DCFCE7' }}
          >
            <Text className="text-xs font-medium" style={{ color: '#16A34A' }}>
              ✓ Answered
            </Text>
          </View>
        )}
      </View>

      {/* Title */}
      <Text
        variant="h4"
        style={{ color: theme.heading }}
        className="font-bold mb-2"
        numberOfLines={2}
      >
        {request.title}
      </Text>

      {/* Content */}
      <Text
        variant="body"
        style={{ color: theme.textSecondary }}
        className="leading-6 mb-4"
        numberOfLines={showFullContent ? undefined : 3}
      >
        {truncatedContent}
      </Text>

      {/* Footer */}
      <View className="flex-row items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <View className="flex-row items-center gap-4">
          {onPray && (
            <PrayButton
              hasPrayed={hasPrayed}
              prayerCount={request.prayerCount}
              onPray={onPray}
              size="small"
            />
          )}
          <View className="flex-row items-center gap-1">
            <Text className="text-sm">💬</Text>
            <Text variant="caption" style={{ color: theme.textSecondary }}>
              {request.commentsCount}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-1">
          <Text
            variant="caption"
            style={{ color: theme.brand }}
            className="font-medium"
          >
            View request
          </Text>
          <IconSymbol name="chevron.right" size={14} color={theme.brand} />
        </View>
      </View>
    </Pressable>
  );
};

export default PrayerRequestCard;
