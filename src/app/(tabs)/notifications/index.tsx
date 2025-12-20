import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { ROUTES } from '@/src/constants';
import { useNavigationSource, useTheme } from '@/src/hooks';
import { useAuthSlice, useNotificationSlice } from '@/src/store';
import { AppNotification, NotificationType, NotificationPriority } from '@/src/services/notifications';
import { useRouter } from 'expo-router';
import React, { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { FlatList, Pressable, RefreshControl, View, ActivityIndicator, Platform } from 'react-native';

// Performance constants
const INITIAL_NUM_TO_RENDER = 8;
const MAX_TO_RENDER_PER_BATCH = 5;
const WINDOW_SIZE = 7;

// Fallback mock data for when Firestore is empty
const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'mock-1',
    type: 'announcement',
    title: 'Church Revival: 7 Days of Glory',
    message:
      'Join us for a powerful 7-day revival program starting March 15th. Special guest minister Pastor James Adebayo.',
    timestamp: '2 hours ago',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    priority: 'high',
    sender: 'Church Admin',
    actionRoute: '/more/announcement',
  },
  {
    id: 'mock-2',
    type: 'event',
    title: 'Youth Night Tomorrow',
    message:
      "Don't forget about Youth Night tomorrow at 7:30 PM. Bring a friend and experience God's love together!",
    timestamp: '1 day ago',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    priority: 'medium',
    sender: 'Youth Ministry',
    actionRoute: '/more/events',
  },
  {
    id: 'mock-3',
    type: 'prayer',
    title: 'New Prayer Request',
    message:
      'Sister Grace has submitted a prayer request. Join us in lifting her up in prayer.',
    timestamp: '2 days ago',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: 'medium',
    sender: 'Prayer Ministry',
    actionRoute: '/ministry/prayer-request',
  },
  {
    id: 'mock-4',
    type: 'reminder',
    title: 'Sunday Service Reminder',
    message:
      'Service starts at 9:00 AM tomorrow. Theme: "More Than Conquerors" - Romans 8:37',
    timestamp: '2 days ago',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: 'medium',
    sender: 'Church Calendar',
  },
  {
    id: 'mock-5',
    type: 'update',
    title: 'Profile Update Required',
    message:
      'Please update your contact information to stay connected with church activities.',
    timestamp: '3 days ago',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: 'low',
    sender: 'System',
    actionRoute: '/profile/edit',
  },
  {
    id: 'mock-6',
    type: 'message',
    title: 'Welcome to Valley of Mercy!',
    message:
      "Thank you for joining our church family. We're excited to have you with us on this spiritual journey.",
    timestamp: '1 week ago',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: 'high',
    sender: 'Pastor David Johnson',
  },
];

const getNotificationIcon = (type: NotificationType, mutedColor: string) => {
  switch (type) {
    case 'announcement':
      return { name: 'megaphone.fill', color: '#EF4444' };
    case 'event':
      return { name: 'calendar.badge.plus', color: '#3B82F6' };
    case 'prayer':
      return { name: 'hands.sparkles.fill', color: '#8B5CF6' };
    case 'message':
      return { name: 'envelope.fill', color: '#10B981' };
    case 'reminder':
      return { name: 'clock.fill', color: '#F59E0B' };
    case 'update':
      return { name: 'arrow.clockwise', color: '#06B6D4' };
    default:
      return { name: 'bell.fill', color: mutedColor };
  }
};

const getPriorityColor = (priority: NotificationPriority) => {
  switch (priority) {
    case 'high':
      return '#EF4444';
    case 'medium':
      return '#F59E0B';
    case 'low':
      return '#10B981';
  }
};

const formatTimestamp = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
};

// Memoized notification card component
interface NotificationCardProps {
  notification: AppNotification;
  theme: ReturnType<typeof import('@/src/hooks').useTheme>;
  onPress: (notification: AppNotification) => void;
}

const NotificationCard = memo(({ notification, theme, onPress }: NotificationCardProps) => {
  const iconConfig = getNotificationIcon(notification.type, theme.muted);
  const displayTimestamp = notification.timestamp || formatTimestamp(notification.createdAt);

  const handlePress = useCallback(() => {
    onPress(notification);
  }, [onPress, notification]);

  const containerStyle = useMemo(() => ({
    backgroundColor: notification.read ? theme.card : `${theme.primary}05`,
    borderWidth: 1,
    borderColor: notification.read ? theme.border : `${theme.primary}20`,
    borderLeftWidth: 4,
    borderLeftColor: getPriorityColor(notification.priority),
  }), [notification.read, notification.priority, theme.card, theme.primary, theme.border]);

  const iconContainerStyle = useMemo(() => ({
    backgroundColor: `${iconConfig.color}15`,
  }), [iconConfig.color]);

  return (
    <Pressable
      onPress={handlePress}
      style={containerStyle}
      className="rounded-lg p-4 mb-3"
      android_ripple={{ color: 'rgba(59,130,246,0.1)' }}
    >
      <View className="flex-row items-start">
        <View
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
          style={iconContainerStyle}
        >
          <IconSymbol
            name={iconConfig.name as any}
            size={18}
            color={iconConfig.color}
          />
        </View>

        <View className="flex-1">
          <View className="flex-row items-start justify-between mb-1">
            <Text
              variant="h5"
              className="font-semibold flex-1"
              style={{ color: theme.heading }}
            >
              {notification.title}
            </Text>
            {!notification.read && (
              <View
                className="w-2 h-2 rounded-full ml-2 mt-1"
                style={{ backgroundColor: theme.primary }}
              />
            )}
          </View>

          <Text
            variant="body"
            className="mb-2 leading-5"
            style={{ color: theme.text }}
          >
            {notification.message}
          </Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              {notification.sender && (
                <>
                  <Text variant="caption" style={{ color: theme.muted }}>
                    {notification.sender}
                  </Text>
                  <Text
                    variant="caption"
                    className="mx-2"
                    style={{ color: theme.muted }}
                  >
                    •
                  </Text>
                </>
              )}
              <Text variant="caption" style={{ color: theme.muted }}>
                {displayTimestamp}
              </Text>
            </View>

            {notification.actionRoute && (
              <View className="flex-row items-center">
                <Text variant="caption" style={{ color: theme.primary }}>
                  View
                </Text>
                <IconSymbol
                  name="chevron.right"
                  size={12}
                  color={theme.primary}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
});

NotificationCard.displayName = 'NotificationCard';

export default function NotificationsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { setSourceRoute } = useNavigationSource();
  const { currentUser } = useAuthSlice();
  const {
    notifications: reduxNotifications,
    isLoadingNotifications,
    unreadCount,
    loadNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useNotificationSlice();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [refreshing, setRefreshing] = useState(false);

  // Use Redux notifications if available, otherwise use mock data
  const notifications = reduxNotifications.length > 0 ? reduxNotifications : MOCK_NOTIFICATIONS;

  // Load notifications on mount
  useEffect(() => {
    if (currentUser?.id) {
      loadNotifications(currentUser.id);
    }
  }, [currentUser?.id]);

  const handleNotificationPress = useCallback((notification: AppNotification) => {
    // Mark as read if not already
    if (!notification.read && !notification.id.startsWith('mock-')) {
      markNotificationAsRead(notification.id);
    }

    // Navigate to action route if available
    if (notification.actionRoute) {
      setSourceRoute(ROUTES.NOTIFICATIONS);
      router.push(notification.actionRoute as any);
    }
  }, [markNotificationAsRead, setSourceRoute, router]);

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
    () => notifications.filter((n) => filter === 'all' || !n.read),
    [notifications, filter]
  );

  const actualUnreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const renderItem = useCallback(
    ({ item }: { item: AppNotification }) => (
      <NotificationCard
        notification={item}
        theme={theme}
        onPress={handleNotificationPress}
      />
    ),
    [theme, handleNotificationPress]
  );

  const keyExtractor = useCallback((item: AppNotification) => item.id, []);

  // Show loading state on initial load
  if (isLoadingNotifications && notifications.length === 0) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text variant="body" className="mt-4" style={{ color: theme.muted }}>
          Loading notifications...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <View className="px-4 pt-1 pb-3">
        <View className="flex-row items-center justify-between">
          {actualUnreadCount > 0 && (
            <Text variant="body" style={{ color: theme.muted }}>
              {actualUnreadCount} unread notification{actualUnreadCount !== 1 ? 's' : ''}
            </Text>
          )}

          <View className="flex-1" />

          {notifications.length > 0 && actualUnreadCount > 0 && (
            <Pressable
              onPress={handleMarkAllAsRead}
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
            onPress={() => setFilter('all')}
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
              All ({notifications.length})
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setFilter('unread')}
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
              Unread ({actualUnreadCount})
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Notifications List */}
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

          {notifications.length > 0 && filter === 'unread' && (
            <Pressable
              onPress={() => setFilter('all')}
              className="mt-6 px-6 py-3 rounded-lg"
              style={{ backgroundColor: theme.primary }}
            >
              <Text variant="button" className="text-white font-semibold">
                View All Notifications
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}
