import { firstTimersRef } from '@/src/config';
import { getDocs } from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

/**
 * Get active first timers (created within the last 48 hours)
 * Filters in-memory to avoid complex Firestore indexes
 */
export const getActiveFirstTimers = async (): Promise<FirstTimer[]> => {
  try {
    // Fetch all first timers (simple query to avoid index requirements)
    const snapshot = await getDocs(firstTimersRef);

    console.log('Fetched first timers count:', snapshot.size);

    const firstTimers = snapshot.docs.map((doc) =>
      serializeFirestoreData<FirstTimer>({
        id: doc.id,
        ...doc.data(),
      }),
    );

    // Calculate 48 hours ago
    const fortyEightHoursAgo = new Date();
    fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);
    const cutoffTime = fortyEightHoursAgo.getTime();

    // Filter in memory for active first timers within 48-hour window
    const activeFirstTimers = firstTimers.filter((ft) => {
      // Must have 'active' status
      if (ft.status !== 'active') {
        return false;
      }

      // Must have been created within last 48 hours
      const createdAt = new Date(ft.createdAt).getTime();
      return createdAt >= cutoffTime;
    });

    // Sort by most recent first
    activeFirstTimers.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    console.log('Active first timers (48hrs):', activeFirstTimers.length);

    return activeFirstTimers;
  } catch (error) {
    console.error('Error fetching active first timers:', error);
    throw error;
  }
};
