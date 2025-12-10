declare global {
  type AnnouncementType =
    | 'event'
    | 'info'
    | 'volunteer'
    | 'financial'
    | 'registration'
    | 'general';

  type AnnouncementPriority = 'high' | 'medium' | 'low';

  interface Announcement {
    id: string;
    title: string;
    content: string;
    type: AnnouncementType;
    priority: AnnouncementPriority;
    date: string;
    author: string;
    readTime: string;
    tags: string[];
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    status?: 'published' | 'draft' | 'archived';
  }

  interface AnnouncementStats {
    total: number;
    highPriority: number;
    thisWeek: number;
    thisMonth: number;
    byType: Record<AnnouncementType, number>;
  }

  interface AnnouncementState {
    announcements: Announcement[];
    isAnnouncementsLoading: boolean;
    announcementsError: string | null;

    announcementById: Announcement | null;
    isAnnouncementByIdLoading: boolean;
    announcementByIdError: string | null;

    stats: AnnouncementStats | null;
    isStatsLoading: boolean;
    statsError: string | null;

    announcementsLastFetch: number | null;
    statsLastFetch: number | null;
  }
}

export {};
