import { db } from '@/src/config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
export

const getMemberByEmail = async (email: string): Promise<MemberProfile> => {
  try {
    const membersRef = collection(db, 'members');
    const q = query(membersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('Member profile not found');
    }

    return querySnapshot.docs[0].data() as MemberProfile;
  } catch (error) {
    console.error('Get member by email error:', error);
    throw new Error(`${error}`);
  }
};