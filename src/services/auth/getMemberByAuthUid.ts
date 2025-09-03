import { db } from '@/src/config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const getMemberByAuthUid = async (
  uid: string,
): Promise<MemberProfile | null> => {
  try {
    const membersRef = collection(db, 'members');

    const authUidQuery = query(membersRef, where('uid', '==', uid));
    const authUidSnapshot = await getDocs(authUidQuery);

    if (authUidSnapshot.empty) {
      console.log('Error was thrown from getMemberByAuthUid');
      throw new Error('Member profile not found');
    }

    return authUidSnapshot.docs[0].data() as MemberProfile;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
