import { db } from '@/src/config/firebase';
import { generateMemberId } from '@/src/utils';
import { doc, setDoc } from 'firebase/firestore';
import { getMemberByAuthUid } from './getMemberByAuthUid';

export const verifyPhoneCodeAndSignIn = async (
  verificationCode: string,
): Promise<MemberProfile> => {
  try {
    if (!window.phoneConfirmationResult) {
      throw new Error('No phone verification in progress');
    }

    // Step 1: Confirm OTP - Firebase creates or returns Auth user
    const userCredential =
      await window.phoneConfirmationResult.confirm(verificationCode);
    const user = userCredential.user;

    let memberProfile = await getMemberByAuthUid(user.uid);
    const memberId = generateMemberId();
    const uid = user.uid;

    if (!memberProfile) {
      // 🚀 New user - create profile
      memberProfile = {
        memberId,
        uid,
        firstName: '',
        lastName: '',
        email: user.email ?? '',
        title: '',
        primaryPhone: user.phoneNumber ?? '',
        secondaryPhone: '',
        band: [],
        position: [],
        rank: 1,
        avatar: '',
        address: '',
        joinDate: '',
        createdAt: new Date().toISOString(),
        status: 'active',
        verified: true,
        gender: '',
        dob: '',
        memberSince: new Date().getFullYear().toString(),
        department: '',
        hasPassword: false,
        accountType: 'guest',
        authType: 'phone',
        emailVerified: !!user.emailVerified,
        phoneVerified: true,
      };

      await setDoc(doc(db, 'members', memberId), memberProfile);
    }

    // Step 2: Cleanup
    window.phoneConfirmationResult = undefined;
    if (window.recaptchaVerifier) {
      await window.recaptchaVerifier.clear();
      window.recaptchaVerifier = undefined;
    }

    return memberProfile;
  } catch (error: any) {
    console.error('Phone verification error:', error);

    // Cleanup on error
    window.phoneConfirmationResult = undefined;
    if (window.recaptchaVerifier) {
      await window.recaptchaVerifier.clear();
      window.recaptchaVerifier = undefined;
    }

    throw new Error(error.message || 'Phone verification failed');
  }
};
