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

      // Direct Firebase Auth sign in with email/password
      await signInWithEmailAndPassword(auth, data.emailOrPhone, data.password);

      // Get member profile by email
      const memberProfile = await getMemberByEmail(data.emailOrPhone);

      return memberProfile;
    } else {
      // PHONE LOGIN FLOW
      if (data.verificationCode) {
        // Step 2: Verify SMS code and complete login
        return await verifyPhoneCodeAndSignIn(data.verificationCode);
      } else {
        // Step 1: Send SMS verification code
        await sendPhoneVerificationCode(data.emailOrPhone);

        // Return special indication that SMS was sent
        throw new Error('SMS_CODE_SENT');
      }
    }
  } catch (error: any) {
    throw handleLoginError(error, isEmailLogin);
  }
};
