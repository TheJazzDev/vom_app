import { auth } from '@/src/config/firebase';
import { handleLoginError, isEmail } from '@/src/utils';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getMemberByEmail } from './getMemberByEmail';
import { sendPhoneVerificationCode } from './sendPhoneVerificationCode';
import { verifyPhoneCodeAndSignIn } from './verifyPhoneCodeAndSignIn';

export const login = async (
  data: LoginServiceProps,
): Promise<MemberProfile> => {
  const isEmailLogin = isEmail(data.emailOrPhone);

  try {
    if (isEmailLogin) {
      if (!data.password) {
        throw new Error('Password is required for email login');
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.emailOrPhone,
        data.password,
      );

      await userCredential.user.reload();

      if (userCredential.user.emailVerified) {
        const memberProfile = await getMemberByEmail(data.emailOrPhone);

        return memberProfile;
      } else {
        throw new Error('Email is not verified, please verify your email');
      }
    } else {
      if (data.verificationCode) {
        return await verifyPhoneCodeAndSignIn(data.verificationCode);
      } else {
        await sendPhoneVerificationCode(data.emailOrPhone);
        throw new Error('SMS_CODE_SENT');
      }
    }
  } catch (error: any) {
    throw handleLoginError(error, isEmailLogin);
  }
};
