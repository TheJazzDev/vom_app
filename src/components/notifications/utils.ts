import { NotificationType, NotificationPriority } from '@/src/services/notifications';

export const getNotificationIcon = (type: NotificationType, mutedColor: string) => {
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

export const getPriorityColor = (priority: NotificationPriority) => {
  switch (priority) {
    case 'high':
      return '#EF4444';
    case 'medium':
      return '#F59E0B';
    case 'low':
      return '#10B981';
  }
};

export const formatTimestamp = (dateString: string): string => {
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

// Performance constants
export const INITIAL_NUM_TO_RENDER = 8;
export const MAX_TO_RENDER_PER_BATCH = 5;
export const WINDOW_SIZE = 7;
