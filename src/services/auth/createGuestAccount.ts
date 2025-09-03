import { auth, db } from '@/src/config/firebase';
import { generateMemberId, isEmail } from '@/src/utils';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { sendPhoneVerificationCode } from './sendPhoneVerificationCode';

export async function createGuestAccount(
  data: RegistrationProps,
): Promise<GuestRegistrationResult> {
  const isEmailRegistration = isEmail(data.emailOrPhone);

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

    await auth.signOut();

    const guestId = generateMemberId();
    const uid = userCredential.user.uid;

    const newGuest: GuestProfile = {
      uid,
      guestId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.emailOrPhone,
      title: '',
      primaryPhone: '',
      secondaryPhone: '',
      position: [],
      avatar: '',
      address: '',
      joinDate: '',
      band: [],
      memberSince: '',
      createdAt: new Date().toISOString(),
      status: 'active',
      verified: true,
      gender: '',
      dob: '',
      department: [],
      hasPassword: true,
      accountType: 'guest',
      authType: 'email',
      emailVerified: true,
      phoneVerified: false,
    };

    await setDoc(doc(db, 'guests', guestId), newGuest);

    return {
      guest: newGuest,
      isExistingMember: false,
      requiresEmailVerification: true,
      requiresPhoneVerification: false,
    };
  } else {
    await sendPhoneVerificationCode(data.emailOrPhone);

    return {
      guest: null,
      isExistingMember: false,
      requiresPhoneVerification: true,
      requiresEmailVerification: false,
    };
  }
}
