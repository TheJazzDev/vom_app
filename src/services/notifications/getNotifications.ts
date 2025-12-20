import { notificationsRef } from '@/src/config';
import { serializeFirestoreData } from '@/src/utils';
import { getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { AppNotification } from './types';

/**
 * Get notifications for a specific user
 * Fetches both user-specific and global notifications
 */
export const getNotifications = async (
  userId: string,
  limitCount: number = 50
): Promise<AppNotification[]> => {
  try {
    // Fetch user-specific notifications
    const userQuery = query(
      notificationsRef,
      where('userId', '==', userId),
      limit(limitCount)
    );

    // Fetch global notifications
    const globalQuery = query(
      notificationsRef,
      where('isGlobal', '==', true),
      limit(limitCount)
    );

    const [userSnapshot, globalSnapshot] = await Promise.all([
      getDocs(userQuery),
      getDocs(globalQuery),
    ]);

    const userNotifications = userSnapshot.docs.map((doc) =>
      serializeFirestoreData<AppNotification>({
        id: doc.id,
        ...doc.data(),
      })
    );

    const globalNotifications = globalSnapshot.docs.map((doc) =>
      serializeFirestoreData<AppNotification>({
        id: doc.id,
        ...doc.data(),
      })
    );

    // Combine and deduplicate (in case a notification is both user-specific and global)
    const allNotifications = [...userNotifications];
    const userNotificationIds = new Set(userNotifications.map((n) => n.id));

    for (const notification of globalNotifications) {
      if (!userNotificationIds.has(notification.id)) {
        allNotifications.push(notification);
      }
    }

    // Sort by timestamp descending (newest first)
    allNotifications.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.timestamp || 0).getTime();
      const dateB = new Date(b.createdAt || b.timestamp || 0).getTime();
      return dateB - dateA;
    });

    console.log('[NotificationsService] Fetched notifications:', allNotifications.length);

    return allNotifications;
  } catch (error) {
    console.error('[NotificationsService] Error fetching notifications:', error);
    throw error;
  }
};

/**
 * Get unread notification count for a user
 */
export const getUnreadCount = async (userId: string): Promise<number> => {
  try {
    const notifications = await getNotifications(userId);
    return notifications.filter((n) => !n.read).length;
  } catch (error) {
    console.error('[NotificationsService] Error getting unread count:', error);
    return 0;
  }
};
