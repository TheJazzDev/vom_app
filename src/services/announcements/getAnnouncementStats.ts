import { announcementsRef } from '@/src/config';
import { getDocs, query, where } from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

export const getAnnouncementStats = async (): Promise<AnnouncementStats> => {
  const publishedQuery = query(
    announcementsRef,
    where('status', '==', 'published'),
  );

  const snapshot = await getDocs(publishedQuery);
  const announcements = snapshot.docs.map((doc) =>
    serializeFirestoreData<Announcement>({
      id: doc.id,
      ...doc.data(),
    })
  );

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const highPriority = announcements.filter((a) => a.priority === 'high').length;
  const thisWeek = announcements.filter(
    (a) => new Date(a.date) >= oneWeekAgo,
  ).length;
  const thisMonth = announcements.filter(
    (a) => new Date(a.date) >= startOfMonth,
  ).length;

  const byType: Record<AnnouncementType, number> = {
    event: 0,
    info: 0,
    volunteer: 0,
    financial: 0,
    registration: 0,
    general: 0,
  };

  announcements.forEach((announcement) => {
    byType[announcement.type] = (byType[announcement.type] || 0) + 1;
  });

  return {
    total: announcements.length,
    highPriority,
    thisWeek,
    thisMonth,
    byType,
  };
};
