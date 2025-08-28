import { auth } from '@/src/config/firebase';
import { isEmail } from '@/src/utils';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getMemberByEmail } from './getMemberByEmail';
import { sendPhoneVerificationCode } from './sendPhoneVerificationCode';
import { verifyPhoneCodeAndSignIn } from './verifyPhoneCodeAndSignIn';

export const login = async (
  data: LoginServiceProps,
): Promise<MemberProfile> => {
  try {
    const isEmailLogin = isEmail(data.emailOrPhone);

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
    console.error('Login error:', error);

    // Don't modify the special SMS code sent error
    if (error.message === 'SMS_CODE_SENT') {
      throw error;
    }

    // Handle Firebase Auth errors
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email');
    }
    if (error.code === 'auth/wrong-password') {
      throw new Error('Invalid password. Please try again');
    }
    if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email format');
    }
    if (error.code === 'auth/user-disabled') {
      throw new Error('Account has been disabled. Contact support');
    }
    if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many failed attempts. Try again later');
    }
    if (error.code === 'auth/invalid-phone-number') {
      throw new Error('Invalid phone number format');
    }

    throw new Error(error.message || 'Login failed. Please try again.');
  }
};
