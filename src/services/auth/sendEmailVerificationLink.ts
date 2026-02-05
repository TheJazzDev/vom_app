import { getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';

export const sendEmailVerificationLink = async (credentials?: {
  email: string;
  password: string;
}): Promise<{
  success: boolean;
}> => {
  try {
    const auth = getAuth();
    let user = auth.currentUser;

    // If no current user but credentials provided, sign in temporarily
    if (!user && credentials) {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      );
      user = userCredential.user;
    }

    if (!user) {
      throw new Error('No authenticated user found. Please provide login credentials.');
    }

    await sendEmailVerification(user);

    // If we signed in temporarily, sign out
    if (credentials) {
      await auth.signOut();
    }

    return { success: true };
  } catch (error: any) {
    console.error('Send email verification error:', error);

    if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many requests. Please try again later.');
    }

    if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
      throw new Error('Invalid credentials provided.');
    }

    throw new Error('Failed to send verification email');
  }
};
