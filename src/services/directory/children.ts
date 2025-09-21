import { childrenRef } from '@/src/config';
import { getDocs } from 'firebase/firestore';

export async function getAllChildren(): Promise<ChildrenProfile[]> {
  const snapshot = await getDocs(childrenRef);

  return snapshot.docs.map((doc) => ({
    ...(doc.data() as ChildrenProfile),
    uid: doc.id,
  }));
}
