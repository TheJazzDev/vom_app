import { auth, db } from '@/src/config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

export async function activateExistingMember(
  member: MemberProfile,
  data: RegistrationProps,
  isEmailRegistration: boolean,
): Promise<RegistrationResult> {
  if (isEmailRegistration) {
    // CASE 1: Existing member with email registration
    // Create Firebase account but don't authenticate yet - requires email verification
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.emailOrPhone,
      data.password,
    );

    const authUid = userCredential.user.uid;

    await updateProfile(userCredential.user, {
      displayName: `${member.firstName} ${member.lastName}`,
    });

    // Sign out immediately - user needs to verify email first
    await auth.signOut();

    // Update member document
    const updatedMember: MemberProfile = {
      ...member,
      authUid,
      email: data.emailOrPhone,
      hasPassword: true,
      verified: false,
      emailVerified: false,
      authType: 'email',
    };

    await updateDoc(doc(db, 'members', member.memberId), {
      authUid,
      email: data.emailOrPhone,
      hasPassword: true,
      verified: false,
      emailVerified: false,
      authType: 'email',
    });

    return {
      member: updatedMember,
      isExistingMember: true,
      requiresPhoneVerification: false,
      requiresEmailVerification: true,
    };
  } else {
    // CASE 2: Existing member with phone registration
    // Firebase phone auth will happen during phone verification step
    const updatedMember: MemberProfile = {
      ...member,
      primaryPhone: member.primaryPhone || data.emailOrPhone,
      verified: false,
      phoneVerified: false,
      authType: 'phone',
    };

    await updateDoc(doc(db, 'members', member.memberId), {
      primaryPhone: member.primaryPhone || data.emailOrPhone,
      verified: false,
      phoneVerified: false,
      authType: 'phone',
    });

    return {
      member: updatedMember,
      isExistingMember: true,
      requiresPhoneVerification: true,
      requiresEmailVerification: false,
    };
  }
}
