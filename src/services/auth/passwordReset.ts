import { auth } from '@/src/config/firebase';
import { handlePasswordResetError } from '@/src/utils';
import { sendPasswordResetEmail as firebaseSendPasswordResetEmail } from 'firebase/auth';

/**
 * Send a password reset email to the user
 * @param email - The user's email address
 * @returns Promise with success status
 */
export const sendPasswordResetEmail = async (
  email: string,
): Promise<{ success: boolean }> => {
  try {
    await firebaseSendPasswordResetEmail(auth, email, {
      // URL to redirect to after password reset
      url: 'https://vom.church/auth/login',
      handleCodeInApp: false,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Password reset error:', error);
    throw handlePasswordResetError(error);
  }
};
