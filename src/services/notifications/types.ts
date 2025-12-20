export type NotificationType =
  | 'announcement'
  | 'event'
  | 'prayer'
  | 'message'
  | 'reminder'
  | 'update';

export type NotificationPriority = 'high' | 'medium' | 'low';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  createdAt: string;
  read: boolean;
  actionRoute?: string;
  priority: NotificationPriority;
  sender?: string;
  // User-specific fields
  userId?: string;
  // For global notifications
  isGlobal?: boolean;
  // Reference to related entity
  referenceId?: string;
  referenceType?: 'announcement' | 'programme' | 'prayer' | 'member';
}

export interface CreateNotificationInput {
  type: NotificationType;
  title: string;
  message: string;
  priority?: NotificationPriority;
  sender?: string;
  actionRoute?: string;
  userId?: string;
  isGlobal?: boolean;
  referenceId?: string;
  referenceType?: 'announcement' | 'programme' | 'prayer' | 'member';
}
