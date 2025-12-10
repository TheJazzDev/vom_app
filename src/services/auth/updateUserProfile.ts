import { auth, db } from '@/src/config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

interface UpdateProfileData {
  primaryPhone?: string;
  secondaryPhone?: string;
  address?: string;
}

export async function updateUserProfile(data: UpdateProfileData) {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No authenticated user found');
    }

    // Update member document in Firestore
    const memberRef = doc(db, 'members', user.uid);

    await updateDoc(memberRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}
