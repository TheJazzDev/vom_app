import { CommentSection } from '@/src/components/Social';
import { PrayButton } from '@/src/components/Social/PrayButton';
import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { PRAYER_CATEGORIES } from '@/src/services/prayerRequest';
import { useAuthSlice, usePrayerRequestSlice } from '@/src/store/slices';
import {
  fetchPrayerRequestByIdThunk,
  fetchPrayerRequestCommentsThunk,
  togglePrayedThunk,
  addPrayerRequestCommentThunk,
  deletePrayerRequestCommentThunk,
  markAsAnsweredThunk,
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
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store/store';

export default function PrayerRequestDetailScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuthSlice();
  const {
    currentRequest,
    comments,
    userPrayed,
    isLoadingCurrentRequest,
    isLoadingComments,
    isAddingComment,
    isDeletingComment,
    isMarkingAnswered,
  } = usePrayerRequestSlice();

  useEffect(() => {
    if (id) {
      dispatch(
        fetchPrayerRequestByIdThunk({ requestId: id, userId: user?.id })
      );
      dispatch(fetchPrayerRequestCommentsThunk(id));
    }
  }, [dispatch, id, user?.id]);

  const handlePray = useCallback(async () => {
    if (!user?.id || !id) return;
    await dispatch(togglePrayedThunk({ requestId: id, userId: user.id }));
  }, [dispatch, id, user?.id]);

  const handleAddComment = useCallback(
    async (content: string) => {
      if (!user?.id || !id) return;
      await dispatch(
        addPrayerRequestCommentThunk({
          requestId: id,
          comment: {
            userId: user.id,
            userName: user.firstName || 'Anonymous',
            userAvatar: user.profilePic || null,
            content,
          },
        })
      );
    },
    [dispatch, id, user]
  );

  const handleDeleteComment = useCallback(
    async (commentId: string) => {
      if (!id) return;
      await dispatch(deletePrayerRequestCommentThunk({ requestId: id, commentId }));
    },
    [dispatch, id]
  );

  const handleMarkAsAnswered = () => {
    if (!id) return;
    Alert.alert(
      'Mark as Answered',
      'Has God answered this prayer? This will mark your request as answered.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Praise God!',
          onPress: () => dispatch(markAsAnsweredThunk(id)),
        },
      ]
    );
  };

  const handleShare = async () => {
    if (!currentRequest) return;
    try {
      await Share.share({
        title: currentRequest.title,
        message: `Prayer Request: ${currentRequest.title}\n\n${currentRequest.content}\n\nPlease join me in prayer.`,
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

  if (isLoadingCurrentRequest || !currentRequest) {
    return (
      <SafeAreaView
        edges={['top']}
        style={{ flex: 1, backgroundColor: theme.background }}
      >
        <Stack.Screen options={{ title: 'Prayer Request' }} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={theme.brand} />
          <Text
            variant="body"
            style={{ color: theme.textSecondary }}
            className="mt-4"
          >
            Loading prayer request...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const hasPrayed = userPrayed[currentRequest.id] || false;
  const category = PRAYER_CATEGORIES[currentRequest.category];
  const isOwner = currentRequest.authorId === user?.id;

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <Stack.Screen options={{ title: 'Prayer Request' }} />
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
            <Text className="text-white/90 font-medium">
              {category.label}
            </Text>
            {currentRequest.isUrgent && (
              <View className="px-2 py-1 rounded-full bg-white/20">
                <Text className="text-white text-xs font-semibold">Urgent</Text>
              </View>
            )}
            {currentRequest.status === 'answered' && (
              <View className="px-2 py-1 rounded-full bg-green-500">
                <Text className="text-white text-xs font-semibold">✓ Answered</Text>
              </View>
            )}
          </View>
          <Text className="text-white font-bold text-2xl mb-2">
            {currentRequest.title}
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-white/80 text-sm">
              {currentRequest.isAnonymous ? 'Anonymous' : currentRequest.authorName}
            </Text>
            <Text className="text-white/60">•</Text>
            <Text className="text-white/80 text-sm">
              {formatDate(currentRequest.createdAt)}
            </Text>
          </View>
        </LinearGradient>

        {/* Content */}
        <View className="px-4">
          {/* Request Content */}
          <View className="mb-6">
            <Text
              variant="h4"
              style={{ color: theme.heading }}
              className="font-bold mb-3"
            >
              Prayer Request
            </Text>
            <Text
              variant="body"
              style={{ color: theme.text }}
              className="leading-7"
            >
              {currentRequest.content}
            </Text>
          </View>

          {/* Actions */}
          <View
            style={[styles.actionsContainer, { borderColor: theme.border }]}
          >
            <View className="flex-row items-center gap-6">
              <PrayButton
                hasPrayed={hasPrayed}
                prayerCount={currentRequest.prayerCount}
                onPray={handlePray}
                size="medium"
              />
              <View className="flex-row items-center gap-1">
                <Text className="text-base">💬</Text>
                <Text
                  variant="body"
                  style={{ color: theme.textSecondary }}
                  className="font-medium"
                >
                  {currentRequest.commentsCount}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              {isOwner && currentRequest.status === 'active' && (
                <Pressable
                  onPress={handleMarkAsAnswered}
                  disabled={isMarkingAnswered}
                  className="flex-row items-center gap-1 px-3 py-2 rounded-lg"
                  style={{ backgroundColor: '#DCFCE7' }}
                >
                  <IconSymbol name="checkmark.circle.fill" size={18} color="#16A34A" />
                  <Text className="text-sm font-medium" style={{ color: '#16A34A' }}>
                    Answered
                  </Text>
                </Pressable>
              )}
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
          </View>

          {/* Encouragement Box */}
          <View
            className="rounded-xl p-4 mb-6"
            style={{ backgroundColor: `${theme.brand}08` }}
          >
            <View className="flex-row items-start gap-3">
              <Text className="text-2xl">🙏</Text>
              <View className="flex-1">
                <Text
                  variant="body"
                  style={{ color: theme.text }}
                  className="italic leading-6"
                >
                  "Do not be anxious about anything, but in every situation, by prayer
                  and petition, with thanksgiving, present your requests to God."
                </Text>
                <Text
                  variant="caption"
                  style={{ color: theme.brand }}
                  className="font-semibold mt-2"
                >
                  — Philippians 4:6
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
              Words of Encouragement ({comments.length})
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
              placeholder="Share words of encouragement..."
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
});
