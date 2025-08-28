import { sendPhoneVerificationCode } from './sendPhoneVerificationCode';

export const sendForgotPasswordCode = async (
  phoneNumber: string,
): Promise<string> => {
  try {
    // For phone-based password reset, we can reuse the phone verification system
    return await sendPhoneVerificationCode(phoneNumber);
  } catch (error) {
    console.error('Send forgot password code error:', error);
    throw new Error('Failed to send reset code');
  }
};
