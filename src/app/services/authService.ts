import { auth, db } from '@/src/config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  PhoneAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  query,
  where,
  collection,
  getDocs,
  updateDoc
} from 'firebase/firestore';

// Type definitions


class AuthService {

  /**
   * Check if phone number exists in the member database
   */
  async checkPhoneExists(phone: string): Promise<boolean> {
    try {
      // Query Firestore for existing member with this phone number
      const membersRef = collection(db, 'members');
      const q = query(membersRef, where('phone', 'array-contains', phone));
      const querySnapshot = await getDocs(q);

      return !querySnapshot.empty;
    } catch (error) {
      console.error('Check phone exists error:', error);
      throw new Error('Failed to check phone number');
    }
  }

  /**
   * Send verification code to phone number
   * Note: For production, you'll need to set up Firebase Phone Auth properly
   * This is a simplified version for development
   */
  async sendVerificationCode(phone: string): Promise<string> {
    try {
      // In a real app, you'd use Firebase Phone Auth
      // For now, we'll simulate sending a code and return a verification ID

      // TODO: Implement actual Firebase Phone Auth
      // const phoneProvider = new PhoneAuthProvider(auth);
      // const verificationId = await phoneProvider.verifyPhoneNumber(
      //   phone,
      //   recaptchaVerifier // You'll need to set this up
      // );

      // For development/testing, return a mock verification ID
      console.log(`Sending verification code to ${phone}`);

      // Store the phone number temporarily for verification
      const mockVerificationId = `mock_${Date.now()}`;

      // In production, you'd get this from Firebase Phone Auth
      return mockVerificationId;
    } catch (error) {
      console.error('Send verification code error:', error);
      throw new Error('Failed to send verification code');
    }
  }

  /**
   * Complete member setup (verify phone + create password)
   * For existing members in the database
   */
  async completeMemberSetup(setupData: MemberSetupData): Promise<AuthResponse> {
    try {
      const { phone, verificationCode, password } = setupData;

      // First, find the existing member by phone number
      const membersRef = collection(db, 'members');
      const q = query(membersRef, where('phone', 'array-contains', phone));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('Member not found with this phone number');
      }

      const memberDoc = querySnapshot.docs[0];
      const existingMember = memberDoc.data() as MemberProfile;

      // Verify the code (in production, you'd verify with Firebase Phone Auth)
      // For now, we'll accept any 6-digit code
      if (verificationCode.length !== 6) {
        throw new Error('Invalid verification code');
      }

      // Create email from member data if not exists
      const email = existingMember.email || `${existingMember.firstName.toLowerCase()}.${existingMember.lastName.toLowerCase()}@churchmember.com`;

      // Create Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, {
        displayName: `${existingMember.firstName} ${existingMember.lastName}`,
      });

      // Update the existing member document with Firebase user ID and email
      const updatedMember: MemberProfile = {
        ...existingMember,
        id: user.uid,
        email: email,
        hasPassword: true,
        accountType: 'member',
        role: existingMember.role || 'member',
        verified: true,
      };

      // Delete old document and create new one with Firebase UID
      await setDoc(doc(db, 'members', user.uid), updatedMember);

      // If the old document had a different ID, you might want to delete it
      if (memberDoc.id !== user.uid) {
        // Optional: Delete the old document if it has a different ID
        // await deleteDoc(memberDoc.ref);
      }

      const token = await user.getIdToken();

      return {
        user: {
          id: user.uid,
          email: user.email!,
          firstName: updatedMember.firstName,
          lastName: updatedMember.lastName,
          phone: updatedMember.phone[0] || phone,
          role: updatedMember.role,
        },
        profile: updatedMember,
        token,
      };
    } catch (error: any) {
      console.error('Complete member setup error:', error);
      throw new Error(error.message || 'Failed to complete member setup');
    }
  }

  /**
   * Sign up new guest user
   * For users not in the member database
   */
  async signUpGuest(signUpData: GuestSignUpData): Promise<AuthResponse> {
    try {
      const { email, password, firstName, lastName, phone } = signUpData;

      // Create Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      // Create guest profile in Firestore
      const guestProfile: MemberProfile = {
        id: user.uid,
        firstName,
        lastName,
        email,
        title: '',
        phone: [phone],
        band: [],
        role: 'guest', // Guest role
        position: [],
        rank: 1,
        address: '',
        joinDate: new Date().toISOString(),
        status: 'active',
        verified: true, // Guests are verified upon signup
        gender: '',
        dob: '',
        memberSince: new Date().getFullYear().toString(),
        department: '',
        avatar: '',
        hasPassword: true,
        accountType: 'guest',
      };

      // Save to Firestore
      await setDoc(doc(db, 'members', user.uid), guestProfile);

      const token = await user.getIdToken();

      return {
        user: {
          id: user.uid,
          email: user.email!,
          firstName,
          lastName,
          phone,
          role: 'guest',
        },
        profile: guestProfile,
        token,
      };
    } catch (error: any) {
      console.error('Guest signup error:', error);
      throw new Error(error.message || 'Failed to create guest account');
    }
  }

  /**
   * Regular sign in for existing users
   */
  async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      const { email, password } = data;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Get member profile from Firestore
      const memberDoc = await getDoc(doc(db, 'members', user.uid));

      if (!memberDoc.exists()) {
        throw new Error('User profile not found');
      }

      const profile = memberDoc.data() as MemberProfile;
      const token = await user.getIdToken();

      return {
        user: {
          id: user.uid,
          email: user.email!,
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phone[0] || '',
          role: profile.role,
        },
        profile,
        token,
      };
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Sign in failed');
    }
  }

  /**
   * Sign out user
   */
  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'Sign out failed');
    }
  }

  /**
   * Get current user profile
   */
  async getCurrentUserProfile(userId: string): Promise<MemberProfile | null> {
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
  }

  /**
   * Update member profile
   */
  async updateMemberProfile(userId: string, updates: Partial<MemberProfile>): Promise<Partial<MemberProfile>> {
    try {
      await updateDoc(doc(db, 'members', userId), updates);
      return updates;
    } catch (error: any) {
      console.error('Update member profile error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  }

  /**
   * Legacy signup method - now redirects to guest signup
   * Kept for backward compatibility
   */
  // async signUp(data: SignUpData): Promise<AuthResponse> {
  //   return this.signUpGuest({ ...data, role: 'guest' });
  // }

  /**
   * Update user role (admin function)
   */
  async updateUserRole(userId: string, newRole: Role): Promise<void> {
    try {
      await updateDoc(doc(db, 'members', userId), { role: newRole });
    } catch (error: any) {
      console.error('Update user role error:', error);
      throw new Error(error.message || 'Failed to update user role');
    }
  }

  /**
   * Get member by phone number
   */
  async getMemberByPhone(phone: string): Promise<MemberProfile | null> {
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
  }
}

export const authService = new AuthService();