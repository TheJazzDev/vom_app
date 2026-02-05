import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { IconSymbol } from '@/src/components/Icons';
import { Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { AppNotification } from '@/src/services/notifications';
import {
  getNotificationIcon,
  getPriorityColor,
  formatTimestamp,
} from './utils';

interface NotificationCardProps {
  notification: AppNotification;
  onPress: (notification: AppNotification) => void;
}

export const NotificationCard = memo(
  ({ notification, onPress }: NotificationCardProps) => {
    const theme = useTheme();

    const iconConfig = getNotificationIcon(notification?.type || 'message', theme.muted);
    const displayTimestamp =
      notification?.timestamp || (notification?.createdAt ? formatTimestamp(notification.createdAt) : 'Recently');

    const handlePress = useCallback(() => {
      if (notification) {
        onPress(notification);
      }
    }, [onPress, notification]);

    const containerStyle = useMemo(
      () => ({
        backgroundColor: notification?.read ? theme.card : `${theme.primary}05`,
        borderWidth: 1,
        borderColor: notification?.read ? theme.border : `${theme.primary}20`,
        borderLeftWidth: 4,
        borderLeftColor: getPriorityColor(notification?.priority || 'low'),
      }),
      [
        notification?.read,
        notification?.priority,
        theme.card,
        theme.primary,
        theme.border,
      ],
    );

    const iconContainerStyle = useMemo(
      () => ({
        backgroundColor: `${iconConfig.color}15`,
      }),
      [iconConfig.color],
    );

    // Safety check after hooks
    if (!notification) return null;

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
                numberOfLines={2}
              >
                {notification.title || 'Notification'}
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
              numberOfLines={3}
            >
              {notification.message || 'No message'}
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
  },
);

NotificationCard.displayName = 'NotificationCard';
