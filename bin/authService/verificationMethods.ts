import { auth } from '@/src/config/firebase';
import { isEmail } from '@/src/utils';
import { sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { getMemberByPhone } from './userManagementMethods';

/**
 * Send verification code (email or phone)
 */
export const sendVerificationCode = async (
  emailOrPhone: string,
  contactType: ContactType,
): Promise<string> => {
  try {
    if (contactType === 'email') {
      // For email verification, we'll use Firebase's built-in email verification
      // For now, generate a mock code for development
      const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(
        `Mock email verification code for ${emailOrPhone}: ${mockCode}`,
      );

      // TODO: Implement actual email sending service (SendGrid, AWS SES, etc.)
      // await sendCustomEmailVerification(emailOrPhone, mockCode);

      return mockCode;
    } else {
      // For phone verification
      const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(
        `Mock SMS verification code for ${emailOrPhone}: ${mockCode}`,
      );

      // TODO: Implement actual SMS service (Twilio, AWS SNS, etc.)
      // await sendSMSVerification(emailOrPhone, mockCode);

      return mockCode;
    }
  } catch (error) {
    console.error('Send verification code error:', error);
    throw new Error('Failed to send verification code');
  }
};

/**
 * Resend verification code
 */
export const resendVerificationCode = async (
  emailOrPhone: string,
  contactType: ContactType,
): Promise<void> => {
  try {
    await sendVerificationCode(emailOrPhone, contactType);
  } catch (error: any) {
    console.error('Resend verification error:', error);
    throw new Error(error.message || 'Failed to resend verification code');
  }
};

/**
 * Reset password - send reset instructions
 */
export const sendPasswordReset = async (
  emailOrPhone: string,
): Promise<void> => {
  try {
    // First check if it's email or phone
    const isEmailFormat = isEmail(emailOrPhone);
    let email: string;

    if (isEmailFormat) {
      email = emailOrPhone;
    } else {
      // Find user by phone and get their email
      const user = await getMemberByPhone(emailOrPhone);
      if (!user) {
        throw new Error('Account not found with this phone number');
      }
      email = user.email;
    }

    // Use Firebase's built-in password reset
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Password reset error:', error);
    throw new Error(error.message || 'Failed to send password reset');
  }
};

/**
 * Check if current user email is verified
 */
export const checkEmailVerificationStatus = async (): Promise<boolean> => {
  try {
    const user = auth.currentUser;
    if (!user) return false;

    await user.reload(); // Refresh user data
    return user.emailVerified;
  } catch (error) {
    console.error('Check email verification error:', error);
    return false;
  }
};

/**
 * Send email verification to current user
 */
export const sendEmailVerificationToCurrentUser = async (): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No authenticated user found');
    }

    await sendEmailVerification(user);
  } catch (error: any) {
    console.error('Send email verification error:', error);
    throw new Error(error.message || 'Failed to send email verification');
  }
};
