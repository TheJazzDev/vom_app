import { firestore } from '@/src/config';
import { handleRegistrationError } from '@/src/utils';
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  updateProfile,
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

export const verifyPhoneCodeAndSignIn = async (data: {
  member: UserProfile;
  verificationId: string;
  code: string;
}): Promise<UserProfile> => {
  try {
    const auth = getAuth();

    const credential = PhoneAuthProvider.credential(
      data.verificationId,
      data.code,
    );

    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: `${data.member.firstName} ${data.member.lastName}`,
    });

    await updateDoc(doc(firestore, 'members', data.member.id), {
      uid: user.uid,
      verified: true,
      phoneVerified: true,
      authType: 'phone',
      lastLoginAt: new Date().toISOString(),
    });

    return {
      ...data.member,
      uid: user.uid,
      verified: true,
      phoneVerified: true,
      lastLoginAt: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error('Phone verification failed:', error);
    throw (
      handleRegistrationError(error) || new Error('Phone verification failed')
    );
  }
};
