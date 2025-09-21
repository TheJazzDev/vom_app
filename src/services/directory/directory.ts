import {
  bandsRef,
  childrenRef,
  departmentsRef,
  guestsRef,
  membersRef,
} from '@/src/config';
import { getDocs } from 'firebase/firestore';

export async function getDirectoryStats() {
  const stats = {
    membersCount: 0,
    guestsCount: 0,
    bandsCount: 0,
    departmentsCount: 0,
    childrenCount: 0,
  };

  try {
    const [guestsSnap, membersSnap, childrenSnap, bandsSnap, departmentsSnap] =
      await Promise.all([
        getDocs(guestsRef),
        getDocs(membersRef),
        getDocs(childrenRef),
        getDocs(bandsRef),
        getDocs(departmentsRef),
      ]);

    stats.guestsCount = guestsSnap.size;
    stats.membersCount = membersSnap.size;
    stats.childrenCount = childrenSnap.size;
    stats.bandsCount = bandsSnap.size - 1;
    stats.departmentsCount = departmentsSnap.size;

    return stats;
  } catch (error) {
    console.error('Error fetching directory stats:', error);
    return stats;
  }
}
