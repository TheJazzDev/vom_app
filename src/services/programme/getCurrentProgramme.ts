import { programmesRef } from '@/src/config';
import { getDocs, limit, query, where } from 'firebase/firestore';

export const getCurrentProgramme = async (): Promise<AllProgrammes | null> => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(startOfDay.getDate() + 1);

  const q = query(
    programmesRef,
    where('status', '==', 'published'),
    where('date', '>=', startOfDay.toISOString()),
    where('date', '<', endOfDay.toISOString()),
    limit(1),
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  } as AllProgrammes;
};
