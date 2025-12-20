import React from 'react';
import { Pressable, View } from 'react-native';
import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';

interface EmptyStateProps {
  filter: 'all' | 'unread';
  hasNotifications: boolean;
  onShowAll: () => void;
}

export const EmptyState = ({ filter, hasNotifications, onShowAll }: EmptyStateProps) => {
  const theme = useTheme();

  return (
    <View className="flex-1 justify-center items-center px-6">
      <View
        className="w-20 h-20 rounded-full items-center justify-center mb-6"
        style={{ backgroundColor: `${theme.muted}15` }}
      >
        <IconSymbol
          name={filter === 'unread' ? 'checkmark.circle' : 'bell'}
          size={40}
          color={theme.muted}
        />
      </View>
      <Text
        variant="h4"
        className="font-semibold mb-2 text-center"
        style={{ color: theme.heading }}
      >
        {filter === 'unread' ? 'All caught up!' : 'No notifications'}
      </Text>
      <Text
        variant="body"
        className="text-center leading-6"
        style={{ color: theme.muted }}
      >
        {filter === 'unread'
          ? 'You have no unread notifications. Check back later for updates.'
          : "You haven't received any notifications yet. We'll notify you about important church updates."}
      </Text>

      {hasNotifications && filter === 'unread' && (
        <Pressable
          onPress={onShowAll}
          className="mt-6 px-6 py-3 rounded-lg"
          style={{ backgroundColor: theme.primary }}
        >
          <Text variant="button" className="text-white font-semibold">
            View All Notifications
          </Text>
        </Pressable>
      )}
    </View>
  );
};
