import { programmesRef } from '@/src/config';
import { getDocs, orderBy, query, where } from 'firebase/firestore';

export const getProgrammesByDateRange = async (
  startISO: string,
  endISO: string,
): Promise<AllProgrammes[]> => {
  const q = query(
    programmesRef,
    where('status', '==', 'published'),
    where('date', '>=', startISO),
    where('date', '<=', endISO),
    orderBy('date', 'asc'),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<AllProgrammes, 'id'>),
  }));
};
