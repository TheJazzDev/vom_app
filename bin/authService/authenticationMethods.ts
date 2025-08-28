import { auth, db } from '@/src/config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { checkUserExists } from './userManagementMethods';

/**
 * Sign in with email or phone
 */
export const signInWithEmailOrPhone = async (
  data: SignInData,
): Promise<AuthResponse> => {
  try {
    // First, find the user by email or phone
    const userResult = await checkUserExists(
      data.emailOrPhone,
      data.contactType,
    );

    if (!userResult.found || !userResult.userData) {
      throw new Error(
        'Account not found. Please check your email/phone number or create an account.',
      );
    }

    const userData = userResult.userData;

    // Check if user has completed setup
    if (!userData.hasPassword) {
      throw new Error(
        'Account setup not completed. Please complete your registration first.',
      );
    }

    // Check if user is verified
    if (!userData.verified) {
      throw new Error(
        'Account not verified. Please check your email/phone for verification code.',
      );
    }

    // Sign in with Firebase Auth using email
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userData.email,
      data.password,
    );
    const user = userCredential.user;

    // Get updated profile
    const memberDoc = await getDoc(doc(db, 'members', user.uid));
    const profile = memberDoc.exists()
      ? (memberDoc.data() as MemberProfile)
      : userData;

    const token = await user.getIdToken();

    return {
      user: {
        id: user.uid,
        email: user.email!,
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone[0] || '',
        role: profile.role,
      },
      profile,
      token,
    };
  } catch (error: any) {
    console.error('Sign in error:', error);

    // Handle Firebase Auth errors
    if (error.code === 'auth/user-not-found') {
      throw new Error(
        'Account not found. Please check your credentials or create an account.',
      );
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password. Please try again.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email format.');
    } else if (error.code === 'auth/user-disabled') {
      throw new Error(
        'This account has been disabled. Please contact support.',
      );
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many failed attempts. Please try again later.');
    }

    throw new Error(error.message || 'Sign in failed');
  }
};

/**
 * Sign out user
 */
export const userSignOut = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Sign out error:', error);
    throw new Error(error.message || 'Sign out failed');
  }
};
