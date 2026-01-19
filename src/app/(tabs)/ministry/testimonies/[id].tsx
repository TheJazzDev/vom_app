import { CommentSection } from '@/src/components/Social';
import { LikeButton } from '@/src/components/Social/LikeButton';
import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { TESTIMONY_CATEGORIES } from '@/src/services/testimony';
import { useAuthSlice, useTestimonySlice } from '@/src/store/slices';
import {
  fetchTestimonyByIdThunk,
  fetchTestimonyCommentsThunk,
  toggleTestimonyLikeThunk,
  addTestimonyCommentThunk,
  deleteTestimonyCommentThunk,
} from '@/src/store/thunks';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, Stack } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Share,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store/store';

export default function TestimonyDetailScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuthSlice();
  const {
    currentTestimony,
    comments,
    userLikes,
    isLoadingCurrentTestimony,
    isLoadingComments,
    isAddingComment,
    isDeletingComment,
  } = useTestimonySlice();

  useEffect(() => {
    if (id) {
      dispatch(fetchTestimonyByIdThunk({ testimonyId: id, userId: user?.id }));
      dispatch(fetchTestimonyCommentsThunk(id));
    }
  }, [dispatch, id, user?.id]);

  const handleLikeToggle = useCallback(async () => {
    if (!user?.id || !id) return;
    await dispatch(
      toggleTestimonyLikeThunk({ testimonyId: id, userId: user.id }),
    );
  }, [dispatch, id, user?.id]);

  const handleAddComment = useCallback(
    async (content: string) => {
      if (!user?.id || !id) return;
      await dispatch(
        addTestimonyCommentThunk({
          testimonyId: id,
          comment: {
            userId: user.id,
            userName: user.firstName || 'Anonymous',
            userAvatar: user.avatar || null,
            content,
          },
        }),
      );
    },
    [dispatch, id, user],
  );

  const handleDeleteComment = useCallback(
    async (commentId: string) => {
      if (!id) return;
      await dispatch(
        deleteTestimonyCommentThunk({ testimonyId: id, commentId }),
      );
    },
    [dispatch, id],
  );

  const handleShare = async () => {
    if (!currentTestimony) return;
    try {
      await Share.share({
        title: currentTestimony.title,
        message: `Testimony: ${currentTestimony.title}\n\n${currentTestimony.content}\n\nPraise God!`,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoadingCurrentTestimony || !currentTestimony) {
    return (
      <SafeAreaView
        edges={['top']}
        style={{ flex: 1, backgroundColor: theme.background }}
      >
        <Stack.Screen options={{ title: 'Testimony' }} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={theme.brand} />
          <Text variant="body" style={{ color: theme.muted }} className="mt-4">
            Loading testimony...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const isLiked = userLikes[currentTestimony.id] || false;
  const category = TESTIMONY_CATEGORIES[currentTestimony.category];

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <Stack.Screen options={{ title: 'Testimony' }} />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <LinearGradient
          colors={[category.color, category.color + 'DD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View className="flex-row items-center gap-2 mb-3">
            <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center">
              <Text className="text-base">{category.emoji}</Text>
            </View>
            <Text className="text-white/90 font-medium">{category.label}</Text>
          </View>
          <Text className="text-white font-bold text-2xl mb-2">
            {currentTestimony.title}
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-white/80 text-sm">
              {currentTestimony.isAnonymous
                ? 'Anonymous'
                : currentTestimony.authorName}
            </Text>
            <Text className="text-white/60">•</Text>
            <Text className="text-white/80 text-sm">
              {formatDate(currentTestimony.createdAt)}
            </Text>
          </View>
        </LinearGradient>

        {/* Content */}
        <View className="px-4">
          {/* Testimony Content */}
          <View className="mb-6">
            <Text
              variant="h4"
              style={{ color: theme.heading }}
              className="font-bold mb-3"
            >
              Testimony
            </Text>
            <Text
              variant="body"
              style={{ color: theme.text }}
              className="leading-7"
            >
              {currentTestimony.content}
            </Text>
          </View>

          {/* Media Gallery */}
          {currentTestimony.mediaUrls &&
            currentTestimony.mediaUrls.length > 0 && (
              <View className="mb-6">
                <Text
                  variant="h4"
                  style={{ color: theme.heading }}
                  className="font-bold mb-3"
                >
                  Photos
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.mediaScroll}
                >
                  {currentTestimony.mediaUrls.map((url, index) => (
                    <Image
                      key={index}
                      source={{ uri: url }}
                      style={styles.mediaImage}
                    />
                  ))}
                </ScrollView>
              </View>
            )}

          {/* Actions */}
          <View
            style={[styles.actionsContainer, { borderColor: theme.border }]}
          >
            <View className="flex-row items-center gap-6">
              <LikeButton
                liked={isLiked}
                likesCount={currentTestimony.likesCount}
                onToggle={handleLikeToggle}
                size="medium"
              />
              <View className="flex-row items-center gap-1">
                <Text className="text-base">💬</Text>
                <Text
                  variant="body"
                  style={{ color: theme.muted }}
                  className="font-medium"
                >
                  {currentTestimony.commentsCount}
                </Text>
              </View>
            </View>
            <Pressable
              onPress={handleShare}
              className="flex-row items-center gap-1"
            >
              <IconSymbol
                name="square.and.arrow.up"
                size={20}
                color={theme.brand}
              />
              <Text
                variant="body"
                style={{ color: theme.brand }}
                className="font-medium"
              >
                Share
              </Text>
            </Pressable>
          </View>

          {/* Praise Box */}
          <View
            className="rounded-xl p-4 mb-6"
            style={{ backgroundColor: `${theme.brand}08` }}
          >
            <View className="flex-row items-start gap-3">
              <Text className="text-2xl">🙌</Text>
              <View className="flex-1">
                <Text
                  variant="body"
                  style={{ color: theme.text }}
                  className="italic leading-6"
                >
                  &quot;Give thanks to the Lord, for he is good; his love
                  endures forever.&quot;
                </Text>
                <Text
                  variant="caption"
                  style={{ color: theme.brand }}
                  className="font-semibold mt-2"
                >
                  — Psalm 107:1
                </Text>
              </View>
            </View>
          </View>

          {/* Comments Section */}
          <View className="mt-2">
            <Text
              variant="h4"
              style={{ color: theme.heading }}
              className="font-bold mb-4"
            >
              Praise & Encouragement ({comments.length})
            </Text>
            <CommentSection
              comments={comments.map((c) => ({
                id: c.id,
                userId: c.userId,
                userName: c.userName,
                userAvatar: c.userAvatar,
                content: c.content,
                createdAt: c.createdAt,
              }))}
              currentUserId={user?.id}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
              isLoading={isLoadingComments}
              isAddingComment={isAddingComment}
              isDeletingComment={isDeletingComment}
              placeholder="Share your praise or encouragement..."
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  headerGradient: {
    padding: 20,
    marginBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 24,
  },
  mediaScroll: {
    gap: 12,
  },
  mediaImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
});
