declare global {
  type Gender = 'Male' | 'Female';

  type Role = 'member' | 'guest' | 'admin';

  export interface SignInData {
    phone: string;
    password: string;
  }

  export interface GuestSignUpData extends SignInData {
    // email: string;
    firstName: string;
    lastName: string;
  }

  // export interface GuestSignUpData extends SignUpData {
  //   role: 'guest';
  // }

  export interface MemberSetupData {
    phone: string;
    verificationCode: string;
    password: string;
  }

  interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    } | null;
    token: string | null;
  }

  export interface AuthResponse {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      role: Role;
    };
    profile: MemberProfile;
    token: string;
  }
  interface MemberProfile {
    id: string;
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    phone: string[];
    band: string[];
    role: Role;
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
    accountType: 'member' | 'guest';
  }
}

export {};
