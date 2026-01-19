import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  Platform,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/src/components/UI';
import { ROUTES } from '@/src/constants';
import { useNavigationSource, useTheme } from '@/src/hooks';
import { useAuthSlice, useNotificationSlice } from '@/src/store';
import { AppNotification } from '@/src/services/notifications';
import {
  NotificationCard,
  NotificationsHeader,
  EmptyState,
  INITIAL_NUM_TO_RENDER,
  MAX_TO_RENDER_PER_BATCH,
  WINDOW_SIZE,
} from '@/src/components/notifications';

export default function NotificationsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { setSourceRoute } = useNavigationSource();
  const { currentUser } = useAuthSlice();
  const {
    notifications,
    isLoadingNotifications,
    loadNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useNotificationSlice();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [refreshing, setRefreshing] = useState(false);

  // Load notifications on mount
  useEffect(() => {
    if (currentUser?.id) {
      loadNotifications(currentUser.id);
    }
  }, [currentUser?.id, loadNotifications]);

  const handleNotificationPress = useCallback(
    (notification: AppNotification) => {
      // Mark as read if not already
      if (!notification.read && !notification.id.startsWith('mock-')) {
        markNotificationAsRead(notification.id);
      }

      // Navigate to action route if available
      if (notification.actionRoute) {
        setSourceRoute(ROUTES.NOTIFICATIONS);
        router.push(notification.actionRoute as any);
      }
    },
    [markNotificationAsRead, setSourceRoute, router],
  );

  const handleMarkAllAsRead = useCallback(() => {
    if (currentUser?.id) {
      markAllNotificationsAsRead(currentUser.id);
    }
  }, [currentUser?.id, markAllNotificationsAsRead]);

  const onRefresh = useCallback(async () => {
    if (!currentUser?.id) return;

    setRefreshing(true);
    try {
      await loadNotifications(currentUser.id);
    } finally {
      setRefreshing(false);
    }
  }, [currentUser?.id, loadNotifications]);

  const filteredNotifications = useMemo(
    () => notifications?.filter((n) => filter === 'all' || !n.read) || [],
    [notifications, filter],
  );

  const unreadCount = useMemo(
    () => notifications?.filter((n) => !n.read).length || 0,
    [notifications],
  );

  const renderItem = useCallback(
    ({ item }: { item: AppNotification }) => (
      <NotificationCard notification={item} onPress={handleNotificationPress} />
    ),
    [handleNotificationPress],
  );

  const keyExtractor = useCallback((item: AppNotification) => item.id, []);

  // Show loading state on initial load
  if (
    isLoadingNotifications &&
    (!notifications || notifications.length === 0)
  ) {
    return (
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: theme.background }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
        <Text variant="body" className="mt-4" style={{ color: theme.muted }}>
          Loading notifications...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <NotificationsHeader
        unreadCount={unreadCount}
        totalCount={notifications?.length || 0}
        filter={filter}
        onFilterChange={setFilter}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      {filteredNotifications.length > 0 ? (
        <FlatList
          data={filteredNotifications}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.primary}
            />
          }
          // Performance optimizations
          initialNumToRender={INITIAL_NUM_TO_RENDER}
          maxToRenderPerBatch={MAX_TO_RENDER_PER_BATCH}
          windowSize={WINDOW_SIZE}
          removeClippedSubviews={Platform.OS === 'android'}
        />
      ) : (
        <EmptyState
          filter={filter}
          hasNotifications={(notifications?.length || 0) > 0}
          onShowAll={() => setFilter('all')}
        />
      )}
    </View>
  );
}
