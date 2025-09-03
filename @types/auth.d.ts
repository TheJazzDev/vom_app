declare global {
  export interface RegistrationProps {
    emailOrPhone: string;
    firstName: string;
    lastName: string;
    password: string;
  }

  // export interface ActivationResult {
  //   member: MemberProfile | null;
  //   requiresPhoneVerification: boolean;
  //   requiresEmailVerification: boolean;
  // }

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

  interface AuthState {
    // Current user data
    currentUser: MemberProfile | GuestProfile | null;
    isAuthenticated: boolean;
    // activationResult: ActivationResult | null;
    guestRegistrationResult: GuestRegistrationResult | null;

    // Found member during registration flow
    foundMember: MemberProfile | null;
    // Phone authentication
    phoneVerificationId: string | null;
    phoneNumber: string | null;
    isWaitingForSMS: boolean;
    // Loading states
    isLoading: boolean;
    isfindingMemberForActivation: boolean;
    isActivatingMemberAccount: boolean;
    isCreatingGuestAccount: boolean;
    isVerifyingEmail: boolean;
    // isSendingEmailCode: boolean;
    isSendingEmailVerificationLink: boolean;
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
