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

    await updateProfile(userCredential.user, {
      displayName: `${member.firstName} ${member.lastName}`,
    });

    // Sign out immediately - user needs to verify email first
    await auth.signOut();

    // Update member document
    const updatedMember: MemberProfile = {
      ...member,
      email: data.emailOrPhone,
      hasPassword: true,
      verified: false, // Will be true after email verification
      emailVerified: false, // Will be true after email verification
      authType: 'email',
    };

    await updateDoc(doc(db, 'members', member.id), {
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
    // Don't create Firebase account yet - just update member record
    // Firebase phone auth will happen during phone verification step

    const updatedMember: MemberProfile = {
      ...member,
      // Keep existing email (empty if they don't have one)
      primaryPhone: member.primaryPhone || data.emailOrPhone,
      verified: true,
      phoneVerified: false, // Will be verified in next step
      authType: 'phone',
      // Note: hasPassword stays false for phone-only auth
    };

    await updateDoc(doc(db, 'members', member.id), {
      primaryPhone: member.primaryPhone || data.emailOrPhone,
      verified: true,
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
