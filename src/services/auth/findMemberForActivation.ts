import { db } from '@/src/config/firebase';
import { isEmail } from '@/src/utils';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const findMemberForActivation = async (
  emailOrPhone: string,
): Promise<MemberProfile | null> => {
  try {
    const membersRef = collection(db, 'members');

    if (isEmail(emailOrPhone)) {
      const q = query(membersRef, where('email', '==', emailOrPhone));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const member = querySnapshot.docs[0].data() as MemberProfile;

        if (member && (member.hasPassword || member.phoneVerified)) {
          throw new Error(
            'You already have an account. Please use the login option instead.',
          );
        }

        return member;
      }
    }

    const primaryPhoneQuery = query(
      membersRef,
      where('primaryPhone', '==', emailOrPhone),
    );
    const primaryPhoneSnapshot = await getDocs(primaryPhoneQuery);

    if (!primaryPhoneSnapshot.empty) {
      const doc = primaryPhoneSnapshot.docs[0];
      const member = { ...doc.data(), memberId: doc.id } as MemberProfile;

      if (member.hasPassword || member.phoneVerified) {
        throw new Error(
          'You already have an account. Please use the login option instead.',
        );
      }

      return member;
    }

    const secondaryPhoneQuery = query(
      membersRef,
      where('secondaryPhone', '==', emailOrPhone),
    );
    const secondaryPhoneSnapshot = await getDocs(secondaryPhoneQuery);

    if (!secondaryPhoneSnapshot.empty) {
      const doc = secondaryPhoneSnapshot.docs[0];
      const member = { ...doc.data(), memberId: doc.id } as MemberProfile;

      if (member.hasPassword || member.phoneVerified) {
        throw new Error(
          'You already have an account. Please use the login option instead.',
        );
      }

      return member;
    }

    return null;
  } catch (error: any) {
    if (error.message.includes('already have an account')) {
      throw error;
    }

    console.error('Critical error in findMember:', error);
    return null;
  }
};
