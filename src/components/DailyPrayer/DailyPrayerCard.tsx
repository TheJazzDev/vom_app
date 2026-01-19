import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import type { DailyPrayer } from '@/src/services/dailyPrayer';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { LikeButton } from '../Social/LikeButton';

interface DailyPrayerCardProps {
  prayer: DailyPrayer;
  isLiked?: boolean;
  onLikeToggle?: () => Promise<void>;
  showFullContent?: boolean;
}

export const DailyPrayerCard: React.FC<DailyPrayerCardProps> = ({
  prayer,
  isLiked = false,
  onLikeToggle,
  showFullContent = false,
}) => {
  const theme = useTheme();
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  const handlePress = () => {
    router.push(`/ministry/daily-prayers/${prayer.id}` as any);
  };

  const truncatedContent = showFullContent
    ? prayer.content
    : prayer.content.length > 150
      ? `${prayer.content.substring(0, 150)}...`
      : prayer.content;

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      {/* Header */}
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1 mr-3">
          <Text
            variant="caption"
            style={{ color: theme.brand }}
            className="font-semibold mb-1"
          >
            {formatDate(prayer.date)}
          </Text>
          <Text
            variant="h4"
            style={{ color: theme.heading }}
            className="font-bold"
            numberOfLines={2}
          >
            {prayer.title}
          </Text>
        </View>
        <View
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: `${theme.brand}15` }}
        >
          <IconSymbol name="sun.max.fill" size={20} color={theme.brand} />
        </View>
      </View>

      {/* Scripture Reference */}
      <View
        className="rounded-xl p-3 mb-3"
        style={{ backgroundColor: `${theme.brand}08` }}
      >
        <View className="flex-row items-start gap-2">
          <Text className="text-base">📖</Text>
          <View className="flex-1">
            <Text
              variant="body"
              style={{ color: theme.text }}
              className="italic leading-5"
              numberOfLines={showFullContent ? undefined : 2}
            >
              &quot;{prayer.scriptureText}&quot;
            </Text>
            <Text
              variant="caption"
              style={{ color: theme.brand }}
              className="font-semibold mt-1"
            >
              — {prayer.scriptureReference}
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <Text
        variant="body"
        style={{ color: theme.muted }}
        className="leading-6 mb-4"
        numberOfLines={showFullContent ? undefined : 3}
      >
        {truncatedContent}
      </Text>

      {/* Footer */}
      <View className="flex-row items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <View className="flex-row items-center gap-4">
          {onLikeToggle && (
            <LikeButton
              liked={isLiked}
              likesCount={prayer.likesCount}
              onToggle={onLikeToggle}
              size="small"
            />
          )}
          <View className="flex-row items-center gap-1">
            <Text className="text-sm">💬</Text>
            <Text variant="caption" style={{ color: theme.muted }}>
              {prayer.commentsCount}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-1">
          <Text
            variant="caption"
            style={{ color: theme.brand }}
            className="font-medium"
          >
            Read more
          </Text>
          <IconSymbol name="chevron.right" size={14} color={theme.brand} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
});

export default DailyPrayerCard;
