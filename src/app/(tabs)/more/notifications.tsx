import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, RefreshControl, View } from 'react-native';

interface Notification {
  id: string;
  type: 'announcement' | 'event' | 'prayer' | 'message' | 'reminder' | 'update';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRoute?: string;
  priority: 'high' | 'medium' | 'low';
  sender?: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'announcement',
    title: 'Church Revival: 7 Days of Glory',
    message:
      'Join us for a powerful 7-day revival program starting March 15th. Special guest minister Pastor James Adebayo.',
    timestamp: '2 hours ago',
    read: false,
    priority: 'high',
    sender: 'Church Admin',
    actionRoute: '/info/announcements/1',
  },
  {
    id: '2',
    type: 'event',
    title: 'Youth Night Tomorrow',
    message:
      "Don't forget about Youth Night tomorrow at 7:30 PM. Bring a friend and experience God's love together!",
    timestamp: '1 day ago',
    read: false,
    priority: 'medium',
    sender: 'Youth Ministry',
    actionRoute: '/info/events/2',
  },
  {
    id: '3',
    type: 'prayer',
    title: 'New Prayer Request',
    message:
      'Sister Grace has submitted a prayer request. Join us in lifting her up in prayer.',
    timestamp: '2 days ago',
    read: true,
    priority: 'medium',
    sender: 'Prayer Ministry',
    actionRoute: '/ministry/prayer-request',
  },
  {
    id: '4',
    type: 'reminder',
    title: 'Sunday Service Reminder',
    message:
      'Service starts at 9:00 AM tomorrow. Theme: "More Than Conquerors" - Romans 8:37',
    timestamp: '2 days ago',
    read: true,
    priority: 'medium',
    sender: 'Church Calendar',
  },
  {
    id: '5',
    type: 'update',
    title: 'Profile Update Required',
    message:
      'Please update your contact information to stay connected with church activities.',
    timestamp: '3 days ago',
    read: true,
    priority: 'low',
    sender: 'System',
    actionRoute: '/profile/edit',
  },
  {
    id: '6',
    type: 'message',
    title: 'Welcome to Valley of Mercy!',
    message:
      "Thank you for joining our church family. We're excited to have you with us on this spiritual journey.",
    timestamp: '1 week ago',
    read: true,
    priority: 'high',
    sender: 'Pastor David Johnson',
  },
];

export default function NotificationsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getNotificationIcon = (type: Notification['type']) => {
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
        return { name: 'bell.fill', color: theme.muted };
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
    }
  };

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
    );

    // Navigate to action route if available
    if (notification.actionRoute) {
      router.push(notification.actionRoute as any);
    }
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // const clearAll = () => {
  //   setNotifications([]);
  // };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const filteredNotifications = notifications.filter(
    (n) => filter === 'all' || !n.read,
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const NotificationCard = ({
    notification,
  }: {
    notification: Notification;
  }) => {
    const iconConfig = getNotificationIcon(notification.type);

    return (
      <Pressable
        onPress={() => handleNotificationPress(notification)}
        style={{
          backgroundColor: notification.read
            ? theme.card
            : `${theme.primary}05`,
          borderWidth: 1,
          borderColor: notification.read ? theme.border : `${theme.primary}20`,
          borderLeftWidth: 4,
          borderLeftColor: getPriorityColor(notification.priority),
        }}
        className="rounded-lg p-4 mb-3"
        android_ripple={{ color: 'rgba(59,130,246,0.1)' }}
      >
        <View className="flex-row items-start">
          <View
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: `${iconConfig.color}15` }}
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
                <Text variant="caption" style={{ color: theme.muted }}>
                  {notification.timestamp}
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
  };

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <View className="px-4 pt-1 pb-3">
        <View className="flex-row items-center justify-between">
          {unreadCount > 0 && (
            <Text variant="body" style={{ color: theme.muted }}>
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </Text>
          )}

          <View className="flex-1" />

          {notifications.length > 0 && (
            <Pressable
              onPress={markAllAsRead}
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
              Unread ({unreadCount})
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationCard notification={item} />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.primary}
            />
          }
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
