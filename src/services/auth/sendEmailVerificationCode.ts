import { db } from '@/src/config/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const sendEmailVerificationCode = async (
  email: string,
): Promise<void> => {
  try {
    // Generate 6-digit code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    // Store verification code in Firestore (expires in 10 minutes)
    await setDoc(doc(db, 'emailVerifications', email), {
      code: verificationCode,
      email: email,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
      verified: false,
    });

    // TODO: Send email using your email service (SendGrid, AWS SES, etc.)
    console.log(`Email verification code for ${email}: ${verificationCode}`);

    // For development, you might want to store this temporarily or send via SMS
    // In production, integrate with your email service provider
  } catch (error) {
    console.error('Send email verification error:', error);
    throw new Error('Failed to send verification code');
  }
};
