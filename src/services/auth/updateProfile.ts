import { db } from '@/src/config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const updateProfile = async (
  userId: string,
  updates: Partial<MemberProfile | GuestProfile>,
  userType: 'member' | 'guest',
): Promise<Partial<MemberProfile | GuestProfile>> => {
  try {
    const collection = userType === 'member' ? 'members' : 'guests';
    await updateDoc(doc(db, collection, userId), updates);
    return updates;
  } catch (error: any) {
    console.error('Update profile error:', error);
    throw new Error(error.message || 'Failed to update profile');
  }
};
