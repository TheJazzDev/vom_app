import { firestore } from '@/src/config';
import { handleRegistrationError, isEmail } from '@/src/utils';
import {
  createUserWithEmailAndPassword,
  getAuth,
  PhoneAuthProvider,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

export const activateMemberAccount = async (data: {
  member: UserProfile;
  emailOrPhone: string;
  password?: string;
  recaptchaVerifier?: any;
}): Promise<void | PhoneActivationResult> => {
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

      await updateDoc(doc(firestore, 'members', data.member.id), {
        uid: userCredential.user.uid,
        hasPassword: true,
        emailVerified: false,
        authType: 'email',
      });

      await sendEmailVerification(userCredential.user);

      await auth.signOut();
    } else {
      if (!data.recaptchaVerifier) {
        throw new Error(
          'reCAPTCHA verifier is required for phone authentication',
        );
      }

      const provider = new PhoneAuthProvider(auth);

      const verificationId = await provider.verifyPhoneNumber(
        data.emailOrPhone,
        data.recaptchaVerifier,
      );

      return {
        verificationId,
        phoneNumber: data.emailOrPhone,
        needsCodeVerification: true,
      };
    }
  } catch (error: any) {
    console.error('Activation error:', error);

    if (error.code === 'auth/invalid-phone-number') {
      throw new Error(
        'Invalid phone number format. Please include country code.',
      );
    } else if (error.code === 'auth/quota-exceeded') {
      throw new Error('SMS quota exceeded. Please try again later.');
    } else if (error.code === 'auth/captcha-check-failed') {
      throw new Error('reCAPTCHA verification failed. Please try again.');
    }

    throw handleRegistrationError(error);
  }
};
