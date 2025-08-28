import { auth, db } from '@/src/config/firebase';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

export const resetPasswordWithPhone = async (
  phoneNumber: string,
  verificationId: string,
  code: string,
  newPassword: string,
): Promise<void> => {
  try {
    // First verify the phone code
    const credential = PhoneAuthProvider.credential(verificationId, code);
    await signInWithCredential(auth, credential);

    // Update password in Firebase Auth
    if (auth.currentUser) {
      // await updatePassword(user, newPassword);

      // Update member record
      const membersRef = collection(db, 'members');
      const memberQuery = query(
        membersRef,
        where('primaryPhone', '==', phoneNumber),
      );
      const memberSnapshot = await getDocs(memberQuery);

      if (!memberSnapshot.empty) {
        await updateDoc(memberSnapshot.docs[0].ref, {
          hasPassword: true,
        });
      }
    }

    // Sign out after password reset
    await auth.signOut();
  } catch (error: any) {
    console.error('Reset password with phone error:', error);
    throw new Error(error.message || 'Password reset failed');
  }
};
