import { CommentSection } from '@/src/components/Social';
import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { LikeButton } from '@/src/components/Social/LikeButton';
import { useTheme } from '@/src/hooks';
import { useAuthSlice, useDailyPrayerSlice } from '@/src/store/slices';
import {
  fetchDailyPrayerByIdThunk,
  fetchDailyPrayerCommentsThunk,
  toggleDailyPrayerLikeThunk,
  addDailyPrayerCommentThunk,
  deleteDailyPrayerCommentThunk,
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store/store';

export default function DailyPrayerDetailScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuthSlice();
  const {
    currentPrayer,
    comments,
    userLikes,
    isLoadingCurrentPrayer,
    isLoadingComments,
    isAddingComment,
    isDeletingComment,
  } = useDailyPrayerSlice();

  useEffect(() => {
    if (id) {
      dispatch(fetchDailyPrayerByIdThunk({ prayerId: id, userId: user?.id }));
      dispatch(fetchDailyPrayerCommentsThunk(id));
    }
  }, [dispatch, id, user?.id]);

  const handleLikeToggle = useCallback(async () => {
    if (!user?.id || !id) return;
    await dispatch(
      toggleDailyPrayerLikeThunk({ prayerId: id, userId: user.id }),
    );
  }, [dispatch, id, user?.id]);

  const handleAddComment = useCallback(
    async (content: string) => {
      if (!user?.id || !id) return;
      await dispatch(
        addDailyPrayerCommentThunk({
          prayerId: id,
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
        deleteDailyPrayerCommentThunk({ prayerId: id, commentId }),
      );
    },
    [dispatch, id],
  );

  const handleShare = async () => {
    if (!currentPrayer) return;
    try {
      await Share.share({
        title: currentPrayer.title,
        message: `${currentPrayer.title}\n\n"${currentPrayer.scriptureText}" - ${currentPrayer.scriptureReference}\n\n${currentPrayer.content}`,
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

  if (isLoadingCurrentPrayer || !currentPrayer) {
    return (
      <SafeAreaView
        edges={['top']}
        style={{ flex: 1, backgroundColor: theme.background }}
      >
        <Stack.Screen options={{ title: 'Daily Prayer' }} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={theme.brand} />
          <Text variant="body" style={{ color: theme.muted }} className="mt-4">
            Loading prayer...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const isLiked = userLikes[currentPrayer.id] || false;

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <Stack.Screen options={{ title: 'Daily Prayer' }} />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <LinearGradient
          colors={['#F97316', '#EA580C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View className="flex-row items-center gap-2 mb-3">
            <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center">
              <IconSymbol name="sun.max.fill" size={18} color="white" />
            </View>
            <Text className="text-white/90 font-medium">
              {formatDate(currentPrayer.date)}
            </Text>
          </View>
          <Text className="text-white font-bold text-2xl mb-2">
            {currentPrayer.title}
          </Text>
          <Text className="text-white/80 text-sm">
            By {currentPrayer.authorName}
          </Text>
        </LinearGradient>

        {/* Content */}
        <View className="px-4">
          {/* Scripture Box */}
          <View
            style={[
              styles.scriptureBox,
              { backgroundColor: `${theme.brand}08` },
            ]}
          >
            <View className="flex-row items-start gap-2 mb-2">
              <Text className="text-lg">📖</Text>
              <View className="flex-1">
                <Text
                  variant="body"
                  style={{ color: theme.text }}
                  className="italic leading-6"
                >
                  &quot;{currentPrayer.scriptureText}&quot;
                </Text>
              </View>
            </View>
            <Text
              variant="caption"
              style={{ color: theme.brand }}
              className="font-semibold text-right"
            >
              — {currentPrayer.scriptureReference}
            </Text>
          </View>

          {/* Prayer Content */}
          <View className="mb-6">
            <Text
              variant="h4"
              style={{ color: theme.heading }}
              className="font-bold mb-3"
            >
              Today&apos;s Reflection
            </Text>
            <Text
              variant="body"
              style={{ color: theme.text }}
              className="leading-7"
            >
              {currentPrayer.content}
            </Text>
          </View>

          {/* Actions */}
          <View
            style={[styles.actionsContainer, { borderColor: theme.border }]}
          >
            <View className="flex-row items-center gap-6">
              <LikeButton
                liked={isLiked}
                likesCount={currentPrayer.likesCount}
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
                  {currentPrayer.commentsCount}
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

          {/* Comments Section */}
          <View className="mt-6">
            <Text
              variant="h4"
              style={{ color: theme.heading }}
              className="font-bold mb-4"
            >
              Comments ({comments.length})
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
              placeholder="Share your thoughts on this prayer..."
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
  scriptureBox: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});
