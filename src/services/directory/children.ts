import { childrenRef } from '@/src/config';
import { getDocs } from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

export async function getAllChildren(): Promise<ChildrenProfile[]> {
  const snapshot = await getDocs(childrenRef);

  return snapshot.docs.map((doc) =>
    serializeFirestoreData<ChildrenProfile>({
      ...(doc.data() as ChildrenProfile),
      uid: doc.id,
    }),
  );
}
