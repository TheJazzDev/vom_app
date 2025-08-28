import { FieldValue } from 'firebase/firestore';

declare global {
  type Gender = 'Male' | 'Female';
  type Role = 'member' | 'guest' | 'admin';
  type AuthType = 'email' | 'phone';

  export interface RegistrationProps {
    emailOrPhone: string;
    firstName: string;
    lastName: string;
    password: string;
  }

  export interface RegistrationResult {
    member: MemberProfile | null;
    isExistingMember: boolean;
    requiresPhoneVerification: boolean;
    requiresEmailVerification: boolean;
  }

  export type LoginFormData = {
    emailOrPhone: string;
    password: string;
  };

  export type PhoneVerificationFormData = {
    verificationCode: string;
  };

  export type LoginServiceProps = {
    emailOrPhone: string;
    password?: string;
    verificationCode?: string;
  };

  interface MemberProfile {
    memberId: string;
    authUid: string;
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    band: string[];
    position: string[];
    rank: number;
    address: string;
    joinDate: string;
    createdAt: string;
    status: 'active' | 'inactive';
    verified: boolean;
    gender: string;
    dob: string;
    memberSince: string;
    department: string;
    hasPassword?: boolean;
    accountType: 'member' | 'guest' | 'admin';
    authType: AuthType;
    primaryPhone: string;
    secondaryPhone?: string;
    emailVerified: boolean;
    phoneVerified: boolean;
  }

  interface AuthState {
    // Current user data
    currentMember: MemberProfile | null;
    isAuthenticated: boolean;
    registrationResult: RegistrationResult | null;
    // Found member during registration flow
    foundMember: MemberProfile | null;
    // Phone authentication
    phoneVerificationId: string | null;
    phoneNumber: string | null;
    isWaitingForSMS: boolean;
    // Loading states
    isLoading: boolean;
    isRegistering: boolean;
    isVerifyingEmail: boolean;
    isSendingEmailCode: boolean;
    isLoggingIn: boolean;
    isSigningOut: boolean;
    isResettingPassword: boolean;
    isUpdatingProfile: boolean;
    isSendingPhoneCode: boolean;
    // Error states
    error: string | null;
    // Success messages
    successMessage: string | null;
    // Auth persistence
    isInitialized: boolean;
  }
}

export {};
