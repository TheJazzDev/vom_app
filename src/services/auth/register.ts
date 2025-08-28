import { handleRegistrationError, isEmail } from '@/src/utils';
import { activateExistingMember } from './activateExistingMember';
import { createGuestAccount } from './createGuestAccount';
import { findMemberSafely } from './findMemberSafely';

export const register = async (
  data: RegistrationProps,
): Promise<RegistrationResult> => {
  try {
    const isEmailRegistration = isEmail(data.emailOrPhone);

    // Use safe search that won't block registration
    const { member: existingMember, searchFailed } = await findMemberSafely(
      data.emailOrPhone,
    );

    // If search failed, log it but continue as new user
    if (searchFailed) {
      console.warn(
        'Member search failed, proceeding with new account creation',
      );
      // Continue to create guest account since we can't verify if member exists
    }

    // Check if account already has password (for email) or is already verified (for phone)
    if (existingMember?.hasPassword || existingMember?.phoneVerified) {
      throw new Error('Account already exists. Please sign in instead.');
    }

    if (existingMember && !searchFailed) {
      // CASE 1 & 2: Existing member found (email or phone)
      return await activateExistingMember(
        existingMember,
        data,
        isEmailRegistration,
      );
    } else {
      // CASE 3: Search failed OR no member found - create guest account
      // Add a flag to indicate if search failed (optional, for logging/analytics)
      const result = await createGuestAccount(data, isEmailRegistration);

      if (searchFailed) {
        // Optionally log this for analytics or manual review
        console.log('Guest account created after search failure', {
          emailOrPhone: data.emailOrPhone,
          timestamp: new Date().toISOString(),
        });
      }

      return result;
    }
  } catch (error: any) {
    throw handleRegistrationError(error);
  }
};
