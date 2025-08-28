import { db } from '@/src/config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getMemberByEmail } from './getMemberByEmail';
import { isEmail } from '@/src/utils';

export const findMember = async (
  emailOrPhone: string,
): Promise<MemberProfile | null> => {
  try {
    const membersRef = collection(db, 'members');

    if (isEmail(emailOrPhone)) {
      getMemberByEmail(emailOrPhone);
    } else {
      // Check primary phone number first
      const primaryPhoneQuery = query(
        membersRef,
        where('primaryPhone', '==', emailOrPhone),
      );
      const primaryPhoneSnapshot = await getDocs(primaryPhoneQuery);

      if (!primaryPhoneSnapshot.empty) {
        return {
          ...primaryPhoneSnapshot.docs[0].data(),
          id: primaryPhoneSnapshot.docs[0].id,
        } as MemberProfile;
      }

      // Only check secondary phone if we have members with primary phones that don't match
      // This ensures we only check secondary when there's actually a primary phone
      const membersWithPrimaryPhoneQuery = query(
        membersRef,
        where('primaryPhone', '!=', ''),
        where('secondaryPhone', '==', emailOrPhone),
      );
      const secondaryPhoneSnapshot = await getDocs(
        membersWithPrimaryPhoneQuery,
      );

      if (!secondaryPhoneSnapshot.empty) {
        return {
          ...secondaryPhoneSnapshot.docs[0].data(),
          id: secondaryPhoneSnapshot.docs[0].id,
        } as MemberProfile;
      }
    }

    return null;
  } catch (error) {
    console.error('Find member error:', error);
    throw new Error('Failed to search for existing member');
  }
};
