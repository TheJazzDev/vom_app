import { db } from '@/src/config/firebase';
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

export const verifyEmailCode = async (
  email: string,
  code: string,
): Promise<boolean> => {
  try {
    const verificationDoc = await getDocs(
      query(collection(db, 'email-verifications'), where('email', '==', email)),
    );

    if (verificationDoc.empty) {
      throw new Error('No verification code found');
    }

    const verification = verificationDoc.docs[0].data();

    // Check if expired
    if (new Date() > new Date(verification.expiresAt)) {
      throw new Error('Verification code has expired');
    }

    // Check if already verified
    if (verification.verified) {
      throw new Error('Code has already been used');
    }

    // Check if code matches
    if (verification.code !== code) {
      throw new Error('Invalid verification code');
    }

    // Mark as verified
    await updateDoc(verificationDoc.docs[0].ref, {
      verified: true,
      verifiedAt: new Date().toISOString(),
    });

    // Update member record
    const membersRef = collection(db, 'members');
    const memberQuery = query(membersRef, where('email', '==', email));
    const memberSnapshot = await getDocs(memberQuery);

    if (!memberSnapshot.empty) {
      await updateDoc(memberSnapshot.docs[0].ref, {
        emailVerified: true,
        verified: true,
      });
    }

    return true;
  } catch (error: any) {
    console.error('Verify phone code error:', error);
    throw new Error(error.message || 'Phone verification failed');
  }
};
