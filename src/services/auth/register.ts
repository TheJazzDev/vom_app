import { isEmail } from '@/src/utils';
import { activateExistingMember } from './activateExistingMember';
import { findMember } from './findMember';
import { createGuestAccount } from './createGuestAccount';

export const register = async (
  data: RegistrationProps,
): Promise<RegistrationResult> => {
  try {
    const isEmailRegistration = isEmail(data.emailOrPhone);
    const existingMember = await findMember(data.emailOrPhone);

    // Check if account already has password (for email) or is already verified (for phone)
    if (existingMember?.hasPassword || existingMember?.phoneVerified) {
      throw new Error('Account already exists. Please sign in instead.');
    }

    if (existingMember) {
      // CASE 1 & 2: Existing member (email or phone)
      return await activateExistingMember(
        existingMember,
        data,
        isEmailRegistration,
      );
    } else {
      // CASE 4: New user - create guest account
      return await createGuestAccount(data, isEmailRegistration);
    }
  } catch (error: any) {
    console.error('Registration error:', error);
    throw new Error(error.message || 'Registration failed. Please try again.');
  }
};
