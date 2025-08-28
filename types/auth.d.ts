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
    member: MemberProfile;
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
    id: string;
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
}

export {};
