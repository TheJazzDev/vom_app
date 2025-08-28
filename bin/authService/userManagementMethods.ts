import { db } from '@/src/config/firebase';
import { isEmail } from '@/src/utils';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

/**
 * Check if user exists by email or phone (email takes priority)
 */
export const checkUserExists = async (
  emailOrPhone: string,
  contactType: ContactType,
): Promise<CheckUserResult> => {
  try {
    const membersRef = collection(db, 'members');
    let q;

    if (contactType === 'email') {
      // Check email first
      q = query(membersRef, where('email', '==', emailOrPhone));
    } else {
      // Check phone number
      q = query(membersRef, where('phone', 'array-contains', emailOrPhone));
    }

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data() as MemberProfile;
      return {
        found: true,
        userData,
        contactType,
      };
    }

    // If checking email and not found, also check if it might be a phone number
    if (contactType === 'email' && !isEmail(emailOrPhone)) {
      const phoneQuery = query(
        membersRef,
        where('phone', 'array-contains', emailOrPhone),
      );
      const phoneSnapshot = await getDocs(phoneQuery);

      if (!phoneSnapshot.empty) {
        const userData = phoneSnapshot.docs[0].data() as MemberProfile;
        return {
          found: true,
          userData,
          contactType: 'phone',
        };
      }
    }

    return { found: false, contactType };
  } catch (error) {
    console.error('Check user exists error:', error);
    throw new Error('Failed to check user existence');
  }
};

/**
 * Get current user profile
 */
export const getCurrentUserProfile = async (
  userId: string,
): Promise<MemberProfile | null> => {
  try {
    const memberDoc = await getDoc(doc(db, 'members', userId));
    if (memberDoc.exists()) {
      return memberDoc.data() as MemberProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

/**
 * Update member profile
 */
export const updateMemberProfile = async (
  userId: string,
  updates: Partial<MemberProfile>,
): Promise<Partial<MemberProfile>> => {
  try {
    await updateDoc(doc(db, 'members', userId), updates);
    return updates;
  } catch (error: any) {
    console.error('Update member profile error:', error);
    throw new Error(error.message || 'Failed to update profile');
  }
};

/**
 * Update user role (admin function)
 */
export const updateUserRole = async (
  userId: string,
  newRole: Role,
): Promise<void> => {
  try {
    await updateDoc(doc(db, 'members', userId), { role: newRole });
  } catch (error: any) {
    console.error('Update user role error:', error);
    throw new Error(error.message || 'Failed to update user role');
  }
};

/**
 * Get member by phone number
 */
export const getMemberByPhone = async (
  phone: string,
): Promise<MemberProfile | null> => {
  try {
    const membersRef = collection(db, 'members');
    const q = query(membersRef, where('phone', 'array-contains', phone));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    return querySnapshot.docs[0].data() as MemberProfile;
  } catch (error) {
    console.error('Get member by phone error:', error);
    return null;
  }
};

/**
 * Get member by email
 */
export const getMemberByEmail = async (
  email: string,
): Promise<MemberProfile | null> => {
  try {
    const membersRef = collection(db, 'members');
    const q = query(membersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    return querySnapshot.docs[0].data() as MemberProfile;
  } catch (error) {
    console.error('Get member by email error:', error);
    return null;
  }
};
