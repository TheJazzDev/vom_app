import { db } from '@/src/config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const getMemberByAuthUid = async (
  authUid: string,
): Promise<MemberProfile | null> => {
  try {
    const membersRef = collection(db, 'members');

    // First try to find member by their Firebase Auth UID if we store it
    // If you don't store Firebase UID in member profile, you might need to use email instead
    const authUidQuery = query(membersRef, where('authUid', '==', authUid));
    const authUidSnapshot = await getDocs(authUidQuery);

    if (!authUidSnapshot.empty) {
      return {
        ...authUidSnapshot.docs[0].data(),
        id: authUidSnapshot.docs[0].id,
      } as MemberProfile;
    }

    return null;
  } catch (error) {
    console.error('Get member by auth UID error:', error);
    throw new Error('Failed to get member profile');
  }
};
