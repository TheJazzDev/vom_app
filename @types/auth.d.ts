declare global {
  export interface RegistrationProps {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }

  export interface GuestRegistrationResult {
    guest: GuestProfile | null;
    isExistingMember: boolean;
    requiresEmailVerification: boolean;
  }

  export type LoginFormData = {
    emailOrPhone: string;
    password?: string;
  };

  export type PhoneVerificationFormData = {
    verificationCode: string;
  };

  export type LoginServiceProps = {
    emailOrPhone: string;
    password?: string;
    verificationCode?: string;
  };

  interface PhoneActivationResult {
    verificationId: string;
    phoneNumber: string;
    needsCodeVerification: true;
  }

  interface AuthState {
    // Current user data
    currentUser: UserProfile | null;
    isAuthenticated: boolean;
    // activationResult: ActivationResult | null;
    guestRegistrationResult: GuestRegistrationResult | null;

    // Found member during registration flow
    foundMember: UserProfile | null;
    searchedMemberDetails: UserProfile | null;
    activationResult: any;

    // Phone authentication
    phoneVerificationId: string | null;
    phoneNumber: string | null;
    isWaitingForSMS: boolean;
    // Loading states
    isLoading: boolean;
    isSearchingMember: boolean;
    isfindingMemberForActivation: boolean;
    isActivatingMemberAccount: boolean;
    isCreatingGuestAccount: boolean;
    isVerifyingEmail: boolean;
    isSendingEmailVerificationLink: boolean;
    isLoggingIn: boolean;
    isLoggingOut: boolean;
    // Error states
    error: string | null;
    // Success messages
    successMessage: string | null;
    // Auth persistence
    isInitialized: boolean;
  }
}

export {};
