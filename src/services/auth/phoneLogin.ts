import { auth, firestore } from '@/src/config/firebase';
import { handleFirebaseError, toInternationNigeriaPhone } from '@/src/utils';
import {
  PhoneAuthProvider,
  signInWithCredential,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
} from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

/**
 * Find member by phone number for phone login
 * @param phoneNumber - The phone number to search
 * @returns The member profile or null
 */
export const findMemberByPhone = async (
  phoneNumber: string,
): Promise<UserProfile | null> => {
  try {
    const membersRef = collection(firestore, 'members');
    const normalizedPhone = toInternationNigeriaPhone(phoneNumber);

    // Check primary phone
    const primaryPhoneQuery = query(
      membersRef,
      where('primaryPhone', '==', normalizedPhone),
    );
    const primaryPhoneSnapshot = await getDocs(primaryPhoneQuery);

    if (!primaryPhoneSnapshot.empty) {
      const docData = primaryPhoneSnapshot.docs[0];
      return serializeFirestoreData<UserProfile>({
        ...docData.data(),
        id: docData.id,
      });
    }

    // Check secondary phone
    const secondaryPhoneQuery = query(
      membersRef,
      where('secondaryPhone', '==', normalizedPhone),
    );
    const secondaryPhoneSnapshot = await getDocs(secondaryPhoneQuery);

    if (!secondaryPhoneSnapshot.empty) {
      const docData = secondaryPhoneSnapshot.docs[0];
      return serializeFirestoreData<UserProfile>({
        ...docData.data(),
        id: docData.id,
      });
    }

    return null;
  } catch (error: any) {
    console.error('Find member by phone error:', error);
    return null;
  }
};

/**
 * Send verification code for phone login
 * @param phoneNumber - The phone number to verify
 * @param recaptchaVerifier - The reCAPTCHA verifier
 * @returns The verification ID
 */
export const sendPhoneLoginCode = async (
  phoneNumber: string,
  recaptchaVerifier: any,
): Promise<{ verificationId: string; phoneNumber: string }> => {
  try {
    if (!recaptchaVerifier) {
      throw new Error('reCAPTCHA verifier is required for phone authentication');
    }

    const normalizedPhone = toInternationNigeriaPhone(phoneNumber);
    const provider = new PhoneAuthProvider(auth);

    const verificationId = await provider.verifyPhoneNumber(
      normalizedPhone,
      recaptchaVerifier,
    );

    return {
      verificationId,
      phoneNumber: normalizedPhone,
    };
  } catch (error: any) {
    console.error('Send phone login code error:', error);
    throw handleFirebaseError(error, { operation: 'phone-verification' });
  }
};

/**
 * Verify phone code and sign in the user
 * @param verificationId - The verification ID from sendPhoneLoginCode
 * @param code - The verification code entered by the user
 * @param member - The member profile (optional, for existing members)
 * @returns The user profile
 */
export const verifyPhoneLoginCode = async (
  verificationId: string,
  code: string,
  member?: UserProfile | null,
): Promise<UserProfile> => {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;

    if (member) {
      // Update existing member profile
      await updateProfile(user, {
        displayName: `${member.firstName} ${member.lastName}`,
      });

      await updateDoc(doc(firestore, 'members', member.id), {
        uid: user.uid,
        verified: true,
        phoneVerified: true,
        authType: 'phone',
        lastLoginAt: new Date().toISOString(),
      });

      return {
        ...member,
        uid: user.uid,
        verified: true,
        phoneVerified: true,
        lastLoginAt: new Date().toISOString(),
      };
    } else {
      // Try to find member by UID
      const membersRef = collection(firestore, 'members');
      const uidQuery = query(membersRef, where('uid', '==', user.uid));
      const uidSnapshot = await getDocs(uidQuery);

      if (!uidSnapshot.empty) {
        const docData = uidSnapshot.docs[0];
        const memberData = serializeFirestoreData<UserProfile>({
          ...docData.data(),
          id: docData.id,
        });

        // Update last login
        await updateDoc(doc(firestore, 'members', memberData.id), {
          lastLoginAt: new Date().toISOString(),
        });

        return {
          ...memberData,
          lastLoginAt: new Date().toISOString(),
        };
      }

      throw new Error(
        'No member profile found. Please activate your account first.',
      );
    }
  } catch (error: any) {
    console.error('Verify phone login code error:', error);
    throw handleFirebaseError(error, { operation: 'phone-verification' });
  }
};
