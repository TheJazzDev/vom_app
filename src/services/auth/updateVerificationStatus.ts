import { db } from '@/src/config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const updateVerificationStatus = async (uid: string) => {
  try {
    const memberRef = doc(db, 'members', uid);

    await updateDoc(memberRef, {
      emailVerified: true,
      verified: true,
      updatedAt: new Date().toISOString(),
    });

    console.log('✅ Member verification status updated successfully');
  } catch (error) {
    console.error('❌ Error updating verification status:', error);
    throw error;
  }
};
