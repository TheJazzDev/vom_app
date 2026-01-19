import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useAuthSlice, useNotificationSlice } from '../store';
import { Platform, AppState, AppStateStatus } from 'react-native';

// Configure how notifications are handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

interface NotificationContextValue {
  requestPermission: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

interface NotificationProviderProps {
  children: ReactNode;
}

/**
 * Provider that handles push notification initialization and management.
 * Automatically registers for notifications when user is authenticated.
 */
export function NotificationProvider({ children }: NotificationProviderProps) {
  const router = useRouter();
  const { isAuthenticated, currentUser } = useAuthSlice();
  const {
    registerNotifications,
    setPermissionStatus,
    incrementUnreadCount,
    loadNotifications,
  } = useNotificationSlice();

  const hasRegistered = useRef(false);
  const notificationListener = useRef<Notifications.EventSubscription | null>(
    null,
  );
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  // Setup notification channels for Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      setupAndroidChannels();
    }
  }, []);

  // Register for notifications when authenticated
  useEffect(() => {
    if (isAuthenticated && currentUser?.id && !hasRegistered.current) {
      hasRegistered.current = true;
      registerNotifications(currentUser.id);
    }

    // Reset flag when user logs out
    if (!isAuthenticated) {
      hasRegistered.current = false;
    }
  }, [isAuthenticated, currentUser?.id]);

  // Setup notification listeners
  useEffect(() => {
    // Check initial permission status
    checkPermissionStatus();

    // Listen for incoming notifications (app in foreground)
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        // Increment unread count when notification received
        incrementUnreadCount();

        // Reload notifications to include the new one
        if (currentUser?.id) {
          loadNotifications(currentUser.id);
        }
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
  }, [currentUser?.id, incrementUnreadCount, loadNotifications]);

  // Re-check permission status when app comes to foreground
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        // App has come to foreground, re-check permission status
        // This catches cases where user went to settings and enabled notifications
        const previousStatus = await Notifications.getPermissionsAsync();
        await checkPermissionStatus();

        // If user just enabled notifications, attempt to register
        if (previousStatus.status !== 'granted' && currentUser?.id) {
          const newStatus = await Notifications.getPermissionsAsync();
          if (newStatus.status === 'granted') {
            console.log(
              '[NotificationProvider] Permission granted, registering...',
            );
            await registerNotifications(currentUser.id);
          }
        }

        console.log('[NotificationProvider] App active, rechecked permissions');
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [currentUser?.id, registerNotifications]);

  const setupAndroidChannels = async () => {
    await Promise.all([
      Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      }),
      Notifications.setNotificationChannelAsync('announcements', {
        name: 'Announcements',
        description: 'Church announcements and updates',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
      }),
      Notifications.setNotificationChannelAsync('prayers', {
        name: 'Daily Prayers',
        description: 'Daily prayer notifications',
        importance: Notifications.AndroidImportance.DEFAULT,
      }),
      Notifications.setNotificationChannelAsync('events', {
        name: 'Events & Programmes',
        description: 'Event reminders and programme updates',
        importance: Notifications.AndroidImportance.HIGH,
      }),
    ]);
  };

  const checkPermissionStatus = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status === 'granted') {
      setPermissionStatus('granted');
    } else if (status === 'denied') {
      setPermissionStatus('denied');
    } else {
      setPermissionStatus('undetermined');
    }
  };

  const handleNotificationResponse = (
    response: Notifications.NotificationResponse,
  ) => {
    const data = response.notification.request.content.data;

    // Navigate based on notification data
    if (data?.route) {
      router.push(data.route as any);
    } else if (data?.type) {
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
          router.push('/(tabs)/notifications');
      }
    }
  };

  const requestPermission = async () => {
    if (currentUser?.id) {
      await registerNotifications(currentUser.id);
    }
  };

  return (
    <NotificationContext.Provider value={{ requestPermission }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationProvider() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotificationProvider must be used within NotificationProvider',
    );
  }
  return context;
}

export default NotificationProvider;
