// import { db } from '@/src/config/firebase';
// import emailjs from '@emailjs/react-native';
// import { sendEmailVerification } from '@firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';

// export const sendEmailVerificationCode = async ({
//   email,
//   firstName,
// }: {
//   email: string;
//   firstName: string;
// }): Promise<{ success: boolean }> => {
//   try {
//     // Generate 6-digit code
//     const verificationCode = Math.floor(
//       100000 + Math.random() * 900000,
//     ).toString();

//     // Store verification code in Firestore (expires in 10 minutes)
//     await setDoc(doc(db, 'email-verifications', email), {
//       code: verificationCode,
//       email: email,
//       createdAt: new Date().toISOString(),
//       expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
//       verified: false,
//     });

//     // TODO: Send email using your email service (SendGrid, AWS SES, etc.)
//     await sendEmailVerification(auth.currentUser!);
//     // await emailjs.send(
//     //   process.env.EXPO_PUBLIC_EMAIL_JS_SERVICE_ID!,
//     //   process.env.EXPO_PUBLIC_EMAIL_JS_TEMPLATE_ID!,
//     //   {
//     //     to_email: email,
//     //     to_name: firstName,
//     //     verification_code: verificationCode,
//     //     app_name: 'VOM Mobile',
//     //   },
//     // );

//     return { success: true };

//     // For development, you might want to store this temporarily or send via SMS
//     // In production, integrate with your email service provider
//   } catch (error) {
//     console.error('Send email verification error:', error);
//     throw new Error('Failed to send verification code');
//   }
// };
