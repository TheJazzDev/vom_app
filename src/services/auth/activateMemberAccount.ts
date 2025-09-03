import { db } from '@/src/config/firebase';
import { handleRegistrationError, isEmail } from '@/src/utils';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

export const activateMemberAccount = async (data: {
  member: MemberProfile;
  emailOrPhone: string;
  password?: string;
}): Promise<void> => {
  try {
    const auth = getAuth();
    const isEmailActivation = isEmail(data.emailOrPhone);

    if (isEmailActivation) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.emailOrPhone,
        data.password!,
      );

      await updateProfile(userCredential.user, {
        displayName: `${data.member.firstName} ${data.member.lastName}`,
      });

      await updateDoc(doc(db, 'members', data.member.memberId), {
        uid: userCredential.user.uid,
        hasPassword: true,
        emailVerified: false,
        authType: 'email',
      });

      await sendEmailVerification(userCredential.user);

      await auth.signOut();
    } else {
      await updateDoc(doc(db, 'members', data.member.memberId), {
        primaryPhone: data.member.primaryPhone || data.emailOrPhone,
        phoneVerified: false,
        authType: 'phone',
      });
    }
  } catch (error: any) {
    throw handleRegistrationError(error);
  }
};
