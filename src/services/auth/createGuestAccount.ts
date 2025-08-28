import { auth, db } from '@/src/config/firebase';
import { generateMemberId } from '@/src/utils';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { sendPhoneVerificationCode } from './sendPhoneVerificationCode';

export async function createGuestAccount(
  data: RegistrationProps,
  isEmailRegistration: boolean,
): Promise<RegistrationResult> {
  if (isEmailRegistration) {
    // Email registration - create Firebase email/password account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.emailOrPhone,
      data.password,
    );

    await updateProfile(userCredential.user, {
      displayName: `${data.firstName} ${data.lastName}`,
    });

    const memberId = generateMemberId();
    const authUid = userCredential.user.uid;

    const newMember: MemberProfile = {
      authUid,
      memberId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.emailOrPhone,
      title: '',
      primaryPhone: '',
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
      hasPassword: true,
      accountType: 'guest',
      authType: 'email',
      emailVerified: true,
      phoneVerified: false,
    };

    await setDoc(doc(db, 'members', memberId), newMember);

    return {
      member: newMember,
      isExistingMember: false,
      requiresEmailVerification: true,
      requiresPhoneVerification: false,
    };
  } else {
    await sendPhoneVerificationCode(data.emailOrPhone);

    return {
      member: null,
      isExistingMember: false,
      requiresPhoneVerification: true,
      requiresEmailVerification: false,
    };
  }
}
