import { auth } from '@/src/config/firebase';
import { signInWithPhoneNumber } from 'firebase/auth';
import { initializePhoneAuth } from './initializePhoneAuth';

export const sendPhoneVerificationCode = async (
  phoneNumber: string,
): Promise<string> => {
  try {
    // Clean up any existing verifier first
    if (window.recaptchaVerifier) {
      await window.recaptchaVerifier.clear();
      window.recaptchaVerifier = undefined;
    }

    const recaptchaVerifier = initializePhoneAuth();
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier,
    );

    // Store the confirmation result for later use
    window.phoneConfirmationResult = confirmationResult;

    return confirmationResult.verificationId;
  } catch (error: any) {
    console.error('Send phone verification error:', error);

    // Clean up on error
    if (window.recaptchaVerifier) {
      await window.recaptchaVerifier.clear();
      window.recaptchaVerifier = undefined;
    }

    throw new Error(error.message || 'Failed to send verification code');
  }
};
