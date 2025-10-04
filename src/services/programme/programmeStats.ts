import { programmesRef } from '@/src/config';
import { getDocs } from 'firebase/firestore';

// Get programme statistics - single query approach
export const getProgrammeStats = async (): Promise<ProgrammeStats> => {
  try {
    const snapshot = await getDocs(programmesRef);

    const now = new Date();
    const nowISO = now.toISOString();

    // Calculate this month boundaries
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );
    const startOfMonthISO = startOfMonth.toISOString();
    const endOfMonthISO = endOfMonth.toISOString();

    let total = 0;
    let upcoming = 0;
    let past = 0;
    let drafts = 0;
    let thisWeek = 0;
    let thisMonth = 0;

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      const programmeDate = data.date;

      total++;

      // Count by status and date
      if (data.status === 'draft') {
        drafts++;
      } else if (programmeDate > nowISO) {
        upcoming++;
      } else if (programmeDate <= nowISO) {
        past++;
      }

      // Count this month's programmes
      if (programmeDate >= startOfMonthISO && programmeDate <= endOfMonthISO) {
        thisMonth++;
      }
    });

    return {
      total,
      upcoming,
      past,
      drafts,
      thisWeek,
      thisMonth,
    };
  } catch (error) {
    console.error('Error getting programme stats:', error);
    throw new Error('Failed to get programme statistics');
  }
};
