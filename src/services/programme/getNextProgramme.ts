import { programmesRef } from '@/src/config';
import { getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

export const getNextProgramme = async (): Promise<AllProgrammes | null> => {
  const now = new Date().toISOString();
  const q = query(
    programmesRef,
    where('status', '==', 'published'),
    where('date', '>', now),
    orderBy('date', 'asc'),
    limit(1),
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  return serializeFirestoreData<AllProgrammes>({
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  });
};
