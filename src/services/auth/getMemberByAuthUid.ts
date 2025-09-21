import { membersRef } from '@/src/config';
import { getDocs, query, where } from 'firebase/firestore';

export const getMemberByAuthUid = async (
  uid: string,
): Promise<UserProfile | null> => {
  try {
    const authUidQuery = query(membersRef, where('uid', '==', uid));
    const authUidSnapshot = await getDocs(authUidQuery);

    if (authUidSnapshot.empty) {
      console.log('Error was thrown from getMemberByAuthUid');
      throw new Error('Member profile not found');
    }

    return authUidSnapshot.docs[0].data() as UserProfile;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
