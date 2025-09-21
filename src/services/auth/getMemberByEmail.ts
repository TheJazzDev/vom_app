import { membersRef } from '@/src/config';
import { getDocs, query, where } from 'firebase/firestore';

export const getMemberByEmail = async (email: string): Promise<UserProfile> => {
  try {
    const q = query(membersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('Error was thrown from getMemberByEmail');
      throw new Error('Member profile not found!');
    }

    return querySnapshot.docs[0].data() as UserProfile;
  } catch (error) {
    console.error('Get member by email error:', error);
    throw new Error(`${error}`);
  }
};

export const getMemberById = async (id: string): Promise<UserProfile> => {
  try {
    const q = query(membersRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('Member profile not found!');
    }

    return querySnapshot.docs[0].data() as UserProfile;
  } catch (error) {
    console.error('Get member by id error:', error);
    throw new Error(`${error}`);
  }
};
