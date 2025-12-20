import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';

interface NotificationsHeaderProps {
  unreadCount: number;
  totalCount: number;
  filter: 'all' | 'unread';
  onFilterChange: (filter: 'all' | 'unread') => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsHeader = ({
  unreadCount,
  totalCount,
  filter,
  onFilterChange,
  onMarkAllAsRead,
}: NotificationsHeaderProps) => {
  const theme = useTheme();

  return (
    <View className="px-4 pt-1 pb-3">
      <View className="flex-row items-center justify-between">
        {unreadCount > 0 && (
          <Text variant="body" style={{ color: theme.muted }}>
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </Text>
        )}

        <View className="flex-1" />

        {totalCount > 0 && unreadCount > 0 && (
          <Pressable
            onPress={onMarkAllAsRead}
            className="px-3 py-2 rounded-lg"
            style={{ backgroundColor: `${theme.primary}10` }}
          >
            <Text
              variant="caption"
              className="font-semibold"
              style={{ color: theme.primary }}
            >
              Mark All Read
            </Text>
          </Pressable>
        )}
      </View>

      {/* Filter Tabs */}
      <View className="flex-row gap-3 mt-2">
        <Pressable
          onPress={() => onFilterChange('all')}
          className="px-4 py-2 rounded-full"
          style={{
            backgroundColor: filter === 'all' ? theme.primary : theme.card,
            borderWidth: 1,
            borderColor: filter === 'all' ? theme.primary : theme.border,
          }}
        >
          <Text
            variant="caption"
            className="font-semibold"
            style={{
              color: filter === 'all' ? 'white' : theme.muted,
            }}
          >
            All ({totalCount})
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onFilterChange('unread')}
          className="px-4 py-2 rounded-full"
          style={{
            backgroundColor: filter === 'unread' ? theme.primary : theme.card,
            borderWidth: 1,
            borderColor: filter === 'unread' ? theme.primary : theme.border,
          }}
        >
          <Text
            variant="caption"
            className="font-semibold"
            style={{
              color: filter === 'unread' ? 'white' : theme.muted,
            }}
          >
            Unread ({unreadCount})
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
