import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface PushNotificationState {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  permissionStatus: Notifications.PermissionStatus | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to manage push notifications
 *
 * @example
 * const { expoPushToken, notification, requestPermission } = usePushNotifications();
 *
 * useEffect(() => {
 *   if (notification) {
 *     // Handle incoming notification
 *   }
 * }, [notification]);
 */
export function usePushNotifications() {
  const router = useRouter();
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<Notifications.PermissionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const notificationListener = useRef<Notifications.EventSubscription | null>(
    null,
  );
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    // Setup notification channels for Android
    setupNotificationChannels();

    // Get initial permission status
    checkPermissionStatus();

    // Listen for incoming notifications (app in foreground)
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // Listen for notification responses (user tapped notification)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        handleNotificationResponse(response);
      });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, [handleNotificationResponse]);

  const setupNotificationChannels = async () => {
    if (Platform.OS === 'android') {
      // Default channel
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });

      // Announcements channel
      await Notifications.setNotificationChannelAsync('announcements', {
        name: 'Announcements',
        description: 'Church announcements and updates',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
      });

      // Prayers channel
      await Notifications.setNotificationChannelAsync('prayers', {
        name: 'Daily Prayers',
        description: 'Daily prayer notifications',
        importance: Notifications.AndroidImportance.DEFAULT,
      });

      // Events channel
      await Notifications.setNotificationChannelAsync('events', {
        name: 'Events & Programmes',
        description: 'Event reminders and programme updates',
        importance: Notifications.AndroidImportance.HIGH,
      });
    }
  };

  const checkPermissionStatus = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setPermissionStatus(status);
    setIsLoading(false);
  };

  const handleNotificationResponse = useCallback((
    response: Notifications.NotificationResponse,
  ) => {
    const data = response.notification.request.content.data;

    // Navigate based on notification data
    if (data?.route) {
      router.push(data.route as any);
    } else if (data?.type) {
      // Handle different notification types
      switch (data.type) {
        case 'announcement':
          if (data.announcementId) {
            router.push(`/(tabs)/home/announcement/${data.announcementId}`);
          } else {
            router.push('/(tabs)/home');
          }
          break;
        case 'programme':
          if (data.programmeId) {
            router.push(`/(tabs)/ministry/programme/${data.programmeId}`);
          } else {
            router.push('/(tabs)/ministry');
          }
          break;
        case 'prayer':
          router.push('/(tabs)/home/daily-prayers');
          break;
        default:
          // Default to notifications tab
          router.push('/(tabs)/notifications');
      }
    }
  }, [router]);

  /**
   * Request notification permissions and get push token
   */
  const requestPermission = async (): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      if (!Device.isDevice) {
        setError('Push notifications require a physical device');
        setIsLoading(false);
        return null;
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      setPermissionStatus(finalStatus);

      if (finalStatus !== 'granted') {
        setError('Notification permission not granted');
        setIsLoading(false);
        return null;
      }

      // Get Expo project ID
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;

      if (!projectId) {
        setError('Expo project ID not configured');
        setIsLoading(false);
        return null;
      }

      const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
        .data;

      setExpoPushToken(token);
      setIsLoading(false);
      return token;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to get push token';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  };

  /**
   * Schedule a local notification
   */
  const scheduleLocalNotification = async (
    title: string,
    body: string,
    data?: Record<string, unknown>,
    trigger?: Notifications.NotificationTriggerInput,
  ) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
      },
      trigger: trigger ?? null, // null = immediate
    });
  };

  /**
   * Cancel all scheduled notifications
   */
  const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  /**
   * Dismiss all notifications from notification center
   */
  const clearAllNotifications = async () => {
    await Notifications.dismissAllNotificationsAsync();
  };

  /**
   * Get current badge count
   */
  const getBadgeCount = async (): Promise<number> => {
    return await Notifications.getBadgeCountAsync();
  };

  /**
   * Set badge count
   */
  const setBadgeCount = async (count: number) => {
    await Notifications.setBadgeCountAsync(count);
  };

  return {
    expoPushToken,
    notification,
    permissionStatus,
    isLoading,
    error,
    isPermissionGranted: permissionStatus === 'granted',
    requestPermission,
    scheduleLocalNotification,
    cancelAllNotifications,
    clearAllNotifications,
    getBadgeCount,
    setBadgeCount,
  };
}

export default usePushNotifications;
