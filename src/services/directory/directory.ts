import {
  bandsRef,
  childrenRef,
  departmentsRef,
  guestsRef,
  membersRef,
} from '@/src/config';
import { isYouthBandDoc } from '@/src/services/directory/bands';
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
    const filteredBands = bandsSnap.docs.filter((doc) => {
      if (doc.id === 'UNASSIGNED') return false;

      const data = doc.data() as { name?: string; displayName?: string };
      return !isYouthBandDoc({
        id: doc.id,
        name: data?.name,
        displayName: data?.displayName,
      });
    });

    stats.bandsCount = filteredBands.length;
    stats.departmentsCount = departmentsSnap.size;

    return stats;
  } catch (error) {
    console.error('Error fetching directory stats:', error);
    return stats;
  }
}
