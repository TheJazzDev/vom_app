import { db } from '@/src/config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const updateMemberProfile = async (
  memberId: string,
  updates: Partial<MemberProfile>,
): Promise<MemberProfile> => {
  try {
    // Update member document
    await updateDoc(doc(db, 'members', memberId), updates);

    // Return the updates (caller should merge with existing profile)
    return updates as MemberProfile;
  } catch (error: any) {
    console.error('Update profile error:', error);
    throw new Error(error.message || 'Failed to update profile');
  }
};
