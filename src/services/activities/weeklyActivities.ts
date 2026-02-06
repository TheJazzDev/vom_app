import { weeklyActivitiesRef } from '@/src/config';
import { getDocs, orderBy, query, where } from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

export const getWeeklyActivities = async (): Promise<WeeklyActivity[]> => {
  const q = query(
    weeklyActivitiesRef,
    where('isActive', '==', true),
    orderBy('dayOfWeekIndex', 'asc'),
    orderBy('time', 'asc'),
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) =>
    serializeFirestoreData<WeeklyActivity>({
      id: doc.id,
      ...(doc.data() as WeeklyActivity),
    }),
  );
};
