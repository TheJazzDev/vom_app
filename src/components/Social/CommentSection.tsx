import { useTheme } from '@/src/hooks';
import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { Text } from '../UI/Text';
import { View } from '../UI/View';
import { CommentItem } from './CommentItem';
import { CommentInput } from './CommentInput';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string | null;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  comments: Comment[];
  isLoading?: boolean;
  isRefreshing?: boolean;
  currentUserId?: string;
  currentUserName?: string;
  currentUserAvatar?: string | null;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  onAddComment: (content: string) => Promise<void> | void;
  onDeleteComment?: (commentId: string) => Promise<void> | void;
  onReply?: (comment: Comment) => void;
  hasMore?: boolean;
  emptyMessage?: string;
  headerComponent?: React.ReactElement;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  isLoading = false,
  isRefreshing = false,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  onRefresh,
  onLoadMore,
  onAddComment,
  onDeleteComment,
  onReply,
  hasMore = false,
  emptyMessage = 'No comments yet. Be the first to comment!',
  headerComponent,
}) => {
  const theme = useTheme();

  const renderComment = ({ item }: { item: Comment }) => (
    <CommentItem
      comment={item}
      currentUserId={currentUserId}
      onDelete={onDeleteComment}
      onReply={onReply}
    />
  );

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View className="items-center justify-center py-8">
          <ActivityIndicator color={theme.brand} />
          <Text className="mt-2 text-gray-500">Loading comments...</Text>
        </View>
      );
    }

    return (
      <View className="items-center justify-center py-8">
        <Text className="text-4xl mb-3">💬</Text>
        <Text className="text-gray-500 text-center px-4">{emptyMessage}</Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (!hasMore || !onLoadMore) return null;

    return (
      <View className="items-center py-4">
        <ActivityIndicator color={theme.brand} size="small" />
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View>
        {headerComponent}
        <View className="flex-row items-center justify-between px-4 py-3">
          <Text variant="h5" className="font-semibold">
            Comments ({comments.length})
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1">
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={renderComment}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        onEndReached={hasMore ? onLoadMore : undefined}
        onEndReachedThreshold={0.3}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={theme.brand}
            />
          ) : undefined
        }
      />

      <CommentInput
        currentUserName={currentUserName}
        currentUserAvatar={currentUserAvatar}
        onSubmit={onAddComment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
});

export default CommentSection;
