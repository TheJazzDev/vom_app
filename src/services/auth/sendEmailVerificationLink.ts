import { getAuth, sendEmailVerification } from 'firebase/auth';

export const sendEmailVerificationLink = async (): Promise<{
  success: boolean;
}> => {
  try {
    const auth = getAuth();

    if (!auth.currentUser) {
      throw new Error('No authenticated user found');
    }

    await sendEmailVerification(auth.currentUser);

    return { success: true };
  } catch (error) {
    console.error('Send email verification error:', error);
    throw new Error('Failed to send verification email');
  }
};
