declare global {
  type Gender = 'male' | 'female';
  type Role = 'member' | 'guest' | 'admin';
  type AuthType = 'email' | 'phone';

  export interface RegistrationProps {
    emailOrPhone: string;
    firstName: string;
    lastName: string;
    password: string;
  }

  export interface MemberRegistrationResult {
    member: MemberProfile | null;
    isExistingMember: boolean;
    requiresPhoneVerification: boolean;
    requiresEmailVerification: boolean;
  }

  export interface GuestRegistrationResult {
    guest: GuestProfile | null;
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

  interface CommonUserDetails {
    uid: string;
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    position: string[];
    address: string;
    joinDate: string;
    createdAt: string;
    status: 'active' | 'inactive';
    verified: boolean;
    gender: string;
    dob: string;
    department: string[];
    hasPassword?: boolean;
    accountType: 'member' | 'guest' | 'admin';
    authType: AuthType;
    primaryPhone: string;
    secondaryPhone?: string;
    emailVerified: boolean;
    phoneVerified: boolean;
  }

  interface MemberProfile extends CommonUserDetails {
    memberId: string;
    band: string[];
    memberSince: string;
  }
  interface GuestProfile extends CommonUserDetails {
    guestId: string;
  }

  interface AuthState {
    // Current user data
    currentMember: MemberProfile | null;
    isAuthenticated: boolean;
    registrationResult: MemberRegistrationResult | null;
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
    isLoggingOut: boolean;
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
