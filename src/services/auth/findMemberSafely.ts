import { db } from '@/src/config/firebase';
import { isEmail } from '@/src/utils';
import { collection, getDocs, query, where } from 'firebase/firestore';

const find = async (emailOrPhone: string): Promise<MemberProfile | null> => {
  try {
    const membersRef = collection(db, 'members');

    // --- Case 1: Search by email ---
    if (isEmail(emailOrPhone)) {
      try {
        const membersRef = collection(db, 'members');
        const q = query(membersRef, where('email', '==', emailOrPhone));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs[0].data() as MemberProfile;
      } catch (error) {
        console.warn(
          'Email search failed, continuing with phone search:',
          error,
        );
        // Don't throw, just continue to phone search in case it's a phone number that looks like email
      }
    }

    // --- Case 2: Search by primary phone ---
    try {
      const primaryPhoneQuery = query(
        membersRef,
        where('primaryPhone', '==', emailOrPhone),
      );
      const primaryPhoneSnapshot = await getDocs(primaryPhoneQuery);

      if (!primaryPhoneSnapshot.empty) {
        const doc = primaryPhoneSnapshot.docs[0];
        return { ...doc.data(), memberId: doc.id } as MemberProfile;
      }
    } catch (error) {
      console.warn('Primary phone search failed:', error);
      // Continue to secondary phone search
    }

    // --- Case 3: Search by secondary phone ---
    try {
      const secondaryPhoneQuery = query(
        membersRef,
        where('secondaryPhone', '==', emailOrPhone),
      );
      const secondaryPhoneSnapshot = await getDocs(secondaryPhoneQuery);

      if (!secondaryPhoneSnapshot.empty) {
        const doc = secondaryPhoneSnapshot.docs[0];
        return { ...doc.data(), memberId: doc.id } as MemberProfile;
      }
    } catch (error) {
      console.warn('Secondary phone search failed:', error);
      // Continue to return null
    }

    // --- Case 4: Not found ---
    return null;
  } catch (error) {
    console.error('Critical error in findMember:', error);

    // Log the error but don't block registration
    // Return null so registration can continue as new user
    console.warn('Member search failed completely, treating as new user');
    return null;
  }
};

export const findMemberSafely = async (
  emailOrPhone: string,
): Promise<{ member: MemberProfile | null; searchFailed: boolean }> => {
  try {
    const member = await find(emailOrPhone);
    return { member, searchFailed: false };
  } catch (error) {
    console.error('Member search failed:', error);
    return { member: null, searchFailed: true };
  }
};
