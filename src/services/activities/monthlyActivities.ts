import { monthlyActivitiesRef } from '@/src/config';
import { getDocs, orderBy, query, where } from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

export const getMonthlyActivities = async (): Promise<MonthlyActivity[]> => {
  const q = query(
    monthlyActivitiesRef,
    where('isActive', '==', true),
    orderBy('weekOfMonthIndex', 'asc'),
    orderBy('dayOfWeekIndex', 'asc'),
    orderBy('time', 'asc'),
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) =>
    serializeFirestoreData<MonthlyActivity>({
      id: doc.id,
      ...(doc.data() as MonthlyActivity),
    }),
  );
};
