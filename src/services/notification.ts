import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { Platform } from 'react-native';
import { firestore } from '../config/firebase';

const MEMBERS_COLLECTION = 'members';

export interface NotificationSettings {
  enabled: boolean;
  announcements: boolean;
  programmes: boolean;
  prayers: boolean;
  reminders: boolean;
}

export interface UserNotificationData {
  expoPushToken: string | null;
  settings: NotificationSettings;
  lastTokenUpdate: Date | null;
  deviceInfo: {
    platform: string;
    model: string | null;
  };
}

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: true,
  announcements: true,
  programmes: true,
  prayers: true,
  reminders: true,
};

/**
 * Register push notification token with Firestore
 */
export async function registerPushToken(userId: string, token: string): Promise<void> {
  if (!userId || !token) {
    console.warn('[NotificationService] Missing userId or token');
    return;
  }

  try {
    const memberRef = doc(firestore, MEMBERS_COLLECTION, userId);

    await setDoc(
      memberRef,
      {
        expoPushToken: token,
        notificationSettings: DEFAULT_SETTINGS,
        lastTokenUpdate: serverTimestamp(),
        deviceInfo: {
          platform: Platform.OS,
          model: Device.modelName,
        },
      },
      { merge: true }
    );

    console.log('[NotificationService] Token registered successfully');
  } catch (error) {
    console.error('[NotificationService] Failed to register token:', error);
    throw error;
  }
}

/**
 * Remove push notification token from Firestore
 */
export async function unregisterPushToken(userId: string): Promise<void> {
  if (!userId) {
    console.warn('[NotificationService] Missing userId');
    return;
  }

  try {
    const memberRef = doc(firestore, MEMBERS_COLLECTION, userId);

    await updateDoc(memberRef, {
      expoPushToken: null,
      lastTokenUpdate: serverTimestamp(),
    });

    console.log('[NotificationService] Token unregistered successfully');
  } catch (error) {
    console.error('[NotificationService] Failed to unregister token:', error);
    throw error;
  }
}

/**
 * Get notification settings for a user
 */
export async function getNotificationSettings(userId: string): Promise<NotificationSettings> {
  if (!userId) {
    return DEFAULT_SETTINGS;
  }

  try {
    const memberRef = doc(firestore, MEMBERS_COLLECTION, userId);
    const memberDoc = await getDoc(memberRef);

    if (memberDoc.exists()) {
      const data = memberDoc.data();
      return data.notificationSettings || DEFAULT_SETTINGS;
    }

    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error('[NotificationService] Failed to get notification settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Update notification settings for a user
 */
export async function updateNotificationSettings(
  userId: string,
  settings: Partial<NotificationSettings>
): Promise<void> {
  if (!userId) {
    console.warn('[NotificationService] Missing userId');
    return;
  }

  try {
    const memberRef = doc(firestore, MEMBERS_COLLECTION, userId);
    const currentSettings = await getNotificationSettings(userId);

    await updateDoc(memberRef, {
      notificationSettings: {
        ...currentSettings,
        ...settings,
      },
    });

    console.log('[NotificationService] Settings updated successfully');
  } catch (error) {
    console.error('[NotificationService] Failed to update settings:', error);
    throw error;
  }
}

/**
 * Request permissions and get push token
 */
export async function requestPushNotificationToken(): Promise<string | null> {
  if (!Device.isDevice) {
    console.warn('[NotificationService] Must use physical device for push notifications');
    return null;
  }

  // Setup Android notification channels
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('[NotificationService] Permission not granted');
    return null;
  }

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;

  if (!projectId) {
    console.error('[NotificationService] No Expo project ID found');
    return null;
  }

  const pushToken = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  return pushToken;
}

/**
 * Full registration flow: request permission + register token
 */
export async function registerForPushNotifications(userId: string): Promise<string | null> {
  const token = await requestPushNotificationToken();

  if (token && userId) {
    await registerPushToken(userId, token);
  }

  return token;
}

export default {
  registerPushToken,
  unregisterPushToken,
  getNotificationSettings,
  updateNotificationSettings,
  requestPushNotificationToken,
  registerForPushNotifications,
};
