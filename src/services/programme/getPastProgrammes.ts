import { programmesRef } from '@/src/config';
import { getDocs, orderBy, query, where } from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

export const getPastProgrammes = async (): Promise<AllProgrammes[]> => {
  const now = new Date().toISOString();
  const q = query(
    programmesRef,
    where('date', '<', now),
    where('status', '==', 'published'),
    orderBy('date', 'desc'),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) =>
    serializeFirestoreData<AllProgrammes>({
      id: doc.id,
      ...doc.data(),
    }),
  );
};
