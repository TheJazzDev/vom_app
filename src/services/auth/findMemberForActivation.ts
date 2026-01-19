import { firestore } from '@/src/config';
import {
  isEmail,
  serializeFirestoreData,
  toInternationNigeriaPhone,
} from '@/src/utils';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const findMemberForActivation = async (
  emailOrPhone: string,
): Promise<UserProfile | null> => {
  try {
    const membersRef = collection(firestore, 'members');

    if (isEmail(emailOrPhone)) {
      const q = query(membersRef, where('email', '==', emailOrPhone));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const member = serializeFirestoreData<UserProfile>({
          ...doc.data(),
          id: doc.id,
        });

        if (member && (member.hasPassword || member.phoneVerified)) {
          throw new Error(
            'You already have an account. Please use the login option instead.',
          );
        }

        return member;
      }
    }

    const normalizedPhone = toInternationNigeriaPhone(emailOrPhone);

    const primaryPhoneQuery = query(
      membersRef,
      where('primaryPhone', '==', normalizedPhone),
    );
    const primaryPhoneSnapshot = await getDocs(primaryPhoneQuery);

    if (!primaryPhoneSnapshot.empty) {
      const doc = primaryPhoneSnapshot.docs[0];
      const member = serializeFirestoreData<UserProfile>({
        ...doc.data(),
        id: doc.id,
      });

      if (member.hasPassword || member.phoneVerified) {
        throw new Error(
          'You already have an account. Please use the login option instead.',
        );
      }

      return member;
    }

    const secondaryPhoneQuery = query(
      membersRef,
      where('secondaryPhone', '==', normalizedPhone),
    );
    const secondaryPhoneSnapshot = await getDocs(secondaryPhoneQuery);

    if (!secondaryPhoneSnapshot.empty) {
      const doc = secondaryPhoneSnapshot.docs[0];
      const member = serializeFirestoreData<UserProfile>({
        ...doc.data(),
        id: doc.id,
      });

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
