import { announcementsRef } from '@/src/config';
import { getDocs } from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

export const getAnnouncements = async (): Promise<Announcement[]> => {
  try {
    // Simple query without orderBy to avoid index requirements
    const snapshot = await getDocs(announcementsRef);

    console.log('Fetched announcements count:', snapshot.size);

    const announcements = snapshot.docs.map((doc) =>
      serializeFirestoreData<Announcement>({
        id: doc.id,
        ...doc.data(),
      })
    );

    // Filter for published announcements and sort by date in memory
    const publishedAnnouncements = announcements.filter(
      (a) => a.status === 'published' || !a.status,
    );

    // Sort by date descending
    publishedAnnouncements.sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      return dateB - dateA;
    });

    console.log('Published announcements:', publishedAnnouncements.length);

    return publishedAnnouncements;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};
