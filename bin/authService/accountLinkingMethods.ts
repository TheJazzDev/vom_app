import { auth, db } from '@/src/config/firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

// Utility function
const isEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

/**
 * Approach 1: Find and Link Existing Member During Registration
 * When someone registers, check if they match an existing member record
 */
export const findAndLinkExistingMember = async (
  emailOrPhone: string,
  contactType: ContactType,
  userData: { firstName: string; lastName: string; password: string }
): Promise<{ isExistingMember: boolean; memberData?: MemberProfile }> => {
  try {
    const membersRef = collection(db, 'members');
    let queries = [];

    if (contactType === 'email') {
      // Check by email
      queries.push(query(membersRef, where('email', '==', emailOrPhone)));
    } else {
      // Check by phone
      queries.push(query(membersRef, where('phone', 'array-contains', emailOrPhone)));
    }

    // Also try to match by name if no direct contact match
    queries.push(
      query(
        membersRef,
        where('firstName', '==', userData.firstName),
        where('lastName', '==', userData.lastName)
      )
    );

    for (const q of queries) {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const memberData = querySnapshot.docs[0].data() as MemberProfile;
        return {
          isExistingMember: true,
          memberData,
        };
      }
    }

    return { isExistingMember: false };
  } catch (error) {
    console.error('Find existing member error:', error);
    throw new Error('Failed to check for existing member');
  }
};

/**
 * Approach 2: Create User Account and Link to Existing Member
 * Create Firebase Auth account and update existing member record
 */
export const createAccountAndLinkMember = async (data: {
  emailOrPhone: string;
  contactType: ContactType;
  password: string;
  firstName: string;
  lastName: string;
  existingMemberData?: MemberProfile;
}): Promise<AuthResponse> => {
  try {
    // Determine email for Firebase Auth
    let authEmail: string;
    if (data.contactType === 'email') {
      authEmail = data.emailOrPhone;
    } else {
      // Use existing member's email or generate one
      authEmail = data.existingMemberData?.email ||
        `${data.firstName.toLowerCase()}.${data.lastName.toLowerCase()}@member.local`;
    }

    // Create Firebase Auth account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      authEmail,
      data.password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: `${data.firstName} ${data.lastName}`,
    });

    let memberProfile: MemberProfile;

    if (data.existingMemberData) {
      // Update existing member record with auth info
      memberProfile = {
        ...data.existingMemberData,
        // Link Firebase Auth
        authUid: user.uid, // Add this field to link
        email: authEmail,
        hasPassword: true,
        verified: true,
        accountLinked: true,
        accountLinkedAt: new Date().toISOString(),
        // Update contact info based on registration
        ...(data.contactType === 'email' && { email: data.emailOrPhone }),
        ...(data.contactType === 'phone' && {
          phone: [...(data.existingMemberData.phone || []), data.emailOrPhone]
        }),
        primaryContact: data.contactType,
        emailVerified: data.contactType === 'email',
        phoneVerified: data.contactType === 'phone',
      };

      // Update the existing member document with auth info
      await updateDoc(doc(db, 'members', data.existingMemberData.id), {
        authUid: user.uid,
        email: authEmail,
        hasPassword: true,
        verified: true,
        accountLinked: true,
        accountLinkedAt: new Date().toISOString(),
        ...(data.contactType === 'email' && { email: data.emailOrPhone }),
        ...(data.contactType === 'phone' && {
          phone: [...(data.existingMemberData.phone || []), data.emailOrPhone]
        }),
      });

      // Also create a user document with Firebase Auth UID for quick lookups
      await setDoc(doc(db, 'users', user.uid), {
        memberId: data.existingMemberData.id,
        email: authEmail,
        linkedAt: new Date().toISOString(),
      });

    } else {
      // Create new member record
      const newMemberId = `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      memberProfile = {
        id: newMemberId,
        authUid: user.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: authEmail,
        title: '',
        phone: data.contactType === 'phone' ? [data.emailOrPhone] : [],
        band: [],
        role: 'member',
        position: [],
        rank: 1,
        avatar: '',
        address: '',
        joinDate: new Date().toISOString(),
        status: 'active',
        verified: true,
        gender: '',
        dob: '',
        memberSince: new Date().getFullYear().toString(),
        department: '',
        hasPassword: true,
        accountType: 'new_member',
        primaryContact: data.contactType,
        emailVerified: data.contactType === 'email',
        phoneVerified: data.contactType === 'phone',
        accountLinked: false,
      };

      await setDoc(doc(db, 'members', newMemberId), memberProfile);
      await setDoc(doc(db, 'users', user.uid), {
        memberId: newMemberId,
        email: authEmail,
        createdAt: new Date().toISOString(),
      });
    }

    const token = await user.getIdToken();

    return {
      user: {
        id: user.uid,
        email: user.email!,
        firstName: memberProfile.firstName,
        lastName: memberProfile.lastName,
        phone: memberProfile.phone[0] || data.emailOrPhone,
        role: memberProfile.role,
      },
      profile: memberProfile,
      token,
    };
  } catch (error: any) {
    console.error('Create account and link member error:', error);
    throw new Error(error.message || 'Failed to create account and link member');
  }
};

/**
 * Approach 3: Get Member Profile by Auth UID
 * Helper function to get member data using Firebase Auth UID
 */
export const getMemberByAuthUid = async (authUid: string): Promise<MemberProfile | null> => {
  try {
    // First check if user document exists
    const userDoc = await getDoc(doc(db, 'users', authUid));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const memberDoc = await getDoc(doc(db, 'members', userData.memberId));

      if (memberDoc.exists()) {
        return memberDoc.data() as MemberProfile;
      }
    }

    // Fallback: search members by authUid (slower but works if user doc doesn't exist)
    const membersRef = collection(db, 'members');
    const q = query(membersRef, where('authUid', '==', authUid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as MemberProfile;
    }

    return null;
  } catch (error) {
    console.error('Get member by auth UID error:', error);
    return null;
  }
};

/**
 * Approach 4: Manual Account Linking (Admin Function)
 * Allow admins to manually link accounts
 */
export const manualLinkAccount = async (
  authUid: string,
  memberId: string,
  adminUserId: string
): Promise<boolean> => {
  try {
    // Verify admin permissions (implement your admin check logic)
    const adminMember = await getMemberByAuthUid(adminUserId);
    if (!adminMember || !['admin', 'superadmin'].includes(adminMember.role)) {
      throw new Error('Insufficient permissions for manual linking');
    }

    // Get member document
    const memberDoc = await getDoc(doc(db, 'members', memberId));
    if (!memberDoc.exists()) {
      throw new Error('Member not found');
    }

    // Update member with auth UID
    await updateDoc(doc(db, 'members', memberId), {
      authUid: authUid,
      accountLinked: true,
      accountLinkedAt: new Date().toISOString(),
      linkedBy: adminUserId,
    });

    // Create/update user document
    await setDoc(doc(db, 'users', authUid), {
      memberId: memberId,
      linkedAt: new Date().toISOString(),
      linkedBy: adminUserId,
    });

    return true;
  } catch (error: any) {
    console.error('Manual link account error:', error);
    throw new Error(error.message || 'Failed to manually link account');
  }
};

/**
 * Approach 5: Bulk Account Linking
 * For migrating existing members to have user accounts
 */
export const bulkCreateAccountsForMembers = async (
  members: Array<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  }>,
  defaultPassword: string = 'TempPassword123!'
): Promise<{ success: number; errors: Array<{ memberId: string; error: string }> }> => {
  const results = { success: 0, errors: [] as Array<{ memberId: string; error: string }> };

  for (const member of members) {
    try {
      // Create Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        member.email,
        defaultPassword
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${member.firstName} ${member.lastName}`,
      });

      // Update member record
      await updateDoc(doc(db, 'members', member.id), {
        authUid: user.uid,
        hasPassword: true,
        accountLinked: true,
        accountLinkedAt: new Date().toISOString(),
      });

      // Create user document
      await setDoc(doc(db, 'users', user.uid), {
        memberId: member.id,
        email: member.email,
        createdAt: new Date().toISOString(),
        bulkCreated: true,
      });

      results.success++;
    } catch (error: any) {
      results.errors.push({
        memberId: member.id,
        error: error.message,
      });
    }
  }

  return results;
};