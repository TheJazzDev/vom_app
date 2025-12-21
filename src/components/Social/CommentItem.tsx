import { useTheme } from '@/src/hooks';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../UI/Text';
import { View } from '../UI/View';
import { UserAvatar } from '../UserAvatar';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string | null;
  content: string;
  createdAt: string;
}

interface CommentItemProps {
  comment: Comment;
  currentUserId?: string;
  onDelete?: (commentId: string) => void;
  onReply?: (comment: Comment) => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  currentUserId,
  onDelete,
  onReply,
}) => {
  const theme = useTheme();
  const isOwner = currentUserId === comment.userId;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <View
      className="flex-row py-3"
      style={[
        styles.container,
        { borderBottomColor: theme.isDark ? '#374151' : '#E5E7EB' },
      ]}
    >
      <UserAvatar
        name={comment.userName}
        imageUrl={comment.userAvatar}
        size={36}
      />

      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="font-semibold text-sm">{comment.userName}</Text>
          <Text
            className="text-xs"
            style={{ color: theme.textSecondary }}
          >
            {formatDate(comment.createdAt)}
          </Text>
        </View>

        <Text className="text-sm leading-5" style={{ color: theme.text }}>
          {comment.content}
        </Text>

        <View className="flex-row items-center gap-4 mt-2">
          {onReply && (
            <TouchableOpacity onPress={() => onReply(comment)}>
              <Text
                className="text-xs font-medium"
                style={{ color: theme.brand }}
              >
                Reply
              </Text>
            </TouchableOpacity>
          )}

          {isOwner && onDelete && (
            <TouchableOpacity onPress={() => onDelete(comment.id)}>
              <Text className="text-xs font-medium text-red-500">Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
});

export default CommentItem;
