import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { LikeButton } from '@/src/components/Social/LikeButton';
import { useTheme } from '@/src/hooks';
import type { Testimony } from '@/src/services/testimony';
import { TESTIMONY_CATEGORIES } from '@/src/services/testimony';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Image } from 'react-native';

interface TestimonyCardProps {
  testimony: Testimony;
  isLiked?: boolean;
  onLikeToggle?: () => Promise<void>;
  showFullContent?: boolean;
}

export const TestimonyCard: React.FC<TestimonyCardProps> = ({
  testimony,
  isLiked = false,
  onLikeToggle,
  showFullContent = false,
}) => {
  const theme = useTheme();
  const router = useRouter();

  const category = TESTIMONY_CATEGORIES[testimony.category];

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
    router.push(`/ministry/testimonies/${testimony.id}` as any);
  };

  const truncatedContent = showFullContent
    ? testimony.content
    : testimony.content.length > 150
      ? `${testimony.content.substring(0, 150)}...`
      : testimony.content;

  return (
    <Pressable
      onPress={handlePress}
      className="rounded-2xl p-4 mb-3"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
        borderWidth: 1,
      }}
    >
      {/* Header */}
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-row items-center gap-2 flex-1">
          {/* Author Avatar */}
          {testimony.isAnonymous ? (
            <View
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: `${theme.textSecondary}20` }}
            >
              <IconSymbol name="person.fill.questionmark" size={18} color={theme.textSecondary} />
            </View>
          ) : testimony.authorAvatar ? (
            <Image
              source={{ uri: testimony.authorAvatar }}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <View
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: `${category.color}20` }}
            >
              <Text className="text-lg font-bold" style={{ color: category.color }}>
                {testimony.authorName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View className="flex-1">
            <Text
              variant="body"
              style={{ color: theme.heading }}
              className="font-semibold"
              numberOfLines={1}
            >
              {testimony.isAnonymous ? 'Anonymous' : testimony.authorName}
            </Text>
            <Text variant="caption" style={{ color: theme.textSecondary }}>
              {formatDate(testimony.createdAt)}
            </Text>
          </View>
        </View>

        {/* Category Badge */}
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
      </View>

      {/* Title */}
      <Text
        variant="h4"
        style={{ color: theme.heading }}
        className="font-bold mb-2"
        numberOfLines={2}
      >
        {testimony.title}
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

      {/* Media Preview */}
      {testimony.mediaUrls && testimony.mediaUrls.length > 0 && (
        <View className="flex-row gap-2 mb-4">
          {testimony.mediaUrls.slice(0, 3).map((url, index) => (
            <Image
              key={index}
              source={{ uri: url }}
              className="w-15 h-15 rounded-lg"
            />
          ))}
          {testimony.mediaUrls.length > 3 && (
            <View
              className="w-15 h-15 rounded-lg items-center justify-center"
              style={{ backgroundColor: theme.border }}
            >
              <Text className="font-semibold" style={{ color: theme.textSecondary }}>
                +{testimony.mediaUrls.length - 3}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Footer */}
      <View className="flex-row items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <View className="flex-row items-center gap-4">
          {onLikeToggle && (
            <LikeButton
              liked={isLiked}
              likesCount={testimony.likesCount}
              onToggle={onLikeToggle}
              size="small"
            />
          )}
          <View className="flex-row items-center gap-1">
            <Text className="text-sm">💬</Text>
            <Text variant="caption" style={{ color: theme.textSecondary }}>
              {testimony.commentsCount}
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

export default TestimonyCard;
