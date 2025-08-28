import { auth, db } from '@/src/config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

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

    const newMemberId = `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newMember: MemberProfile = {
      id: newMemberId,
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
      joinDate: new Date().toISOString(),
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

    await setDoc(doc(db, 'members', newMemberId), newMember);

    return {
      member: newMember,
      isExistingMember: false,
      requiresEmailVerification: true,
      requiresPhoneVerification: false,
    };
  } else {
    // Phone registration - don't create Firebase account yet
    // Firebase phone auth will happen during phone verification
    const newMemberId = `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const newMember: MemberProfile = {
      id: newMemberId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: '', // No email for phone-only users
      title: '',
      primaryPhone: data.emailOrPhone,
      // Don't include secondaryPhone if it's undefined
      band: [],
      position: [],
      rank: 1,
      avatar: '',
      address: '',
      joinDate: new Date().toISOString(),
      status: 'active',
      verified: true,
      gender: '',
      dob: '',
      memberSince: new Date().getFullYear().toString(),
      department: '',
      hasPassword: false, // No password for phone-only auth
      accountType: 'guest',
      authType: 'phone',
      emailVerified: false,
      phoneVerified: false, // Will be verified next
    };

    await setDoc(doc(db, 'members', newMemberId), newMember);

    return {
      member: newMember,
      isExistingMember: false,
      requiresPhoneVerification: true,
      requiresEmailVerification: false,
    };
  }
}
