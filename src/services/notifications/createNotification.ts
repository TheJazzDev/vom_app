import { notificationsRef } from '@/src/config';
import { addDoc } from 'firebase/firestore';
import { CreateNotificationInput } from './types';

/**
 * Create a new notification
 * Can be used by admin or system to send notifications to users
 */
export const createNotification = async (
  input: CreateNotificationInput,
): Promise<string> => {
  try {
    const now = new Date().toISOString();

    const notificationData = {
      type: input.type,
      title: input.title,
      message: input.message,
      priority: input.priority || 'medium',
      sender: input.sender || 'System',
      actionRoute: input.actionRoute || null,
      userId: input.userId || null,
      isGlobal: input.isGlobal || false,
      referenceId: input.referenceId || null,
      referenceType: input.referenceType || null,
      read: false,
      timestamp: now,
      createdAt: now,
    };

    const docRef = await addDoc(notificationsRef, notificationData);
    console.log('[NotificationsService] Created notification:', docRef.id);

    return docRef.id;
  } catch (error) {
    console.error('[NotificationsService] Error creating notification:', error);
    throw error;
  }
};

/**
 * Create a notification for a specific user
 */
export const createUserNotification = async (
  userId: string,
  input: Omit<CreateNotificationInput, 'userId' | 'isGlobal'>,
): Promise<string> => {
  return createNotification({
    ...input,
    userId,
    isGlobal: false,
  });
};

/**
 * Create a global notification for all users
 */
export const createGlobalNotification = async (
  input: Omit<CreateNotificationInput, 'userId' | 'isGlobal'>,
): Promise<string> => {
  return createNotification({
    ...input,
    isGlobal: true,
  });
};

/**
 * Create notification from an announcement
 */
export const createAnnouncementNotification = async (announcement: {
  id: string;
  title: string;
  content?: string;
}): Promise<string> => {
  return createGlobalNotification({
    type: 'announcement',
    title: announcement.title,
    message: announcement.content || 'New church announcement',
    priority: 'high',
    sender: 'Church Admin',
    actionRoute: `/more/announcement`,
    referenceId: announcement.id,
    referenceType: 'announcement',
  });
};

/**
 * Create notification for an upcoming event/programme
 */
export const createProgrammeNotification = async (
  programme: { id: string; title: string; date?: string },
  userId?: string,
): Promise<string> => {
  const createFn = userId
    ? createUserNotification.bind(null, userId)
    : createGlobalNotification;

  return createFn({
    type: 'event',
    title: programme.title,
    message: programme.date
      ? `Upcoming event on ${programme.date}`
      : 'Upcoming church event',
    priority: 'medium',
    sender: 'Church Calendar',
    actionRoute: `/programme/${programme.id}`,
    referenceId: programme.id,
    referenceType: 'programme',
  });
};
