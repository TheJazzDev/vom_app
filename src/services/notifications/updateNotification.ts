import { notificationsRef } from '@/src/config';
import { doc, updateDoc, writeBatch, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/src/config/firebase';

/**
 * Mark a single notification as read
 */
export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  try {
    const notificationDoc = doc(notificationsRef, notificationId);
    await updateDoc(notificationDoc, {
      read: true,
      readAt: new Date().toISOString(),
    });
    console.log('[NotificationsService] Marked notification as read:', notificationId);
  } catch (error) {
    console.error('[NotificationsService] Error marking notification as read:', error);
    throw error;
  }
};

/**
 * Mark all notifications as read for a user
 */
export const markAllNotificationsAsRead = async (userId: string): Promise<void> => {
  try {
    // Get all unread notifications for this user
    const userQuery = query(
      notificationsRef,
      where('userId', '==', userId),
      where('read', '==', false)
    );

    const globalQuery = query(
      notificationsRef,
      where('isGlobal', '==', true),
      where('read', '==', false)
    );

    const [userSnapshot, globalSnapshot] = await Promise.all([
      getDocs(userQuery),
      getDocs(globalQuery),
    ]);

    const batch = writeBatch(firestore);
    const now = new Date().toISOString();

    userSnapshot.docs.forEach((docSnapshot) => {
      batch.update(docSnapshot.ref, { read: true, readAt: now });
    });

    globalSnapshot.docs.forEach((docSnapshot) => {
      batch.update(docSnapshot.ref, { read: true, readAt: now });
    });

    await batch.commit();
    console.log('[NotificationsService] Marked all notifications as read for user:', userId);
  } catch (error) {
    console.error('[NotificationsService] Error marking all as read:', error);
    throw error;
  }
};

/**
 * Delete a notification
 */
export const deleteNotification = async (notificationId: string): Promise<void> => {
  try {
    const { deleteDoc } = await import('firebase/firestore');
    const notificationDoc = doc(notificationsRef, notificationId);
    await deleteDoc(notificationDoc);
    console.log('[NotificationsService] Deleted notification:', notificationId);
  } catch (error) {
    console.error('[NotificationsService] Error deleting notification:', error);
    throw error;
  }
};

/**
 * Clear all notifications for a user
 */
export const clearAllNotifications = async (userId: string): Promise<void> => {
  try {
    const { deleteDoc } = await import('firebase/firestore');
    const userQuery = query(notificationsRef, where('userId', '==', userId));
    const snapshot = await getDocs(userQuery);

    const batch = writeBatch(firestore);
    snapshot.docs.forEach((docSnapshot) => {
      batch.delete(docSnapshot.ref);
    });

    await batch.commit();
    console.log('[NotificationsService] Cleared all notifications for user:', userId);
  } catch (error) {
    console.error('[NotificationsService] Error clearing notifications:', error);
    throw error;
  }
};
