declare global {
  type Gender = 'male' | 'female';
  type Role = 'member' | 'guest' | 'admin';
  type AuthType = 'email' | 'phone';

  interface CommonDetails {
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
    band: string[];
    memberSince: string;
    hasPassword?: boolean;
    authType: AuthType;
    primaryPhone: string;
    secondaryPhone?: string;
    emailVerified: boolean;
    phoneVerified: boolean;
  }

  interface MemberProfile extends CommonDetails {
    accountType: 'member';
    memberId: string;
  }

  interface GuestProfile extends CommonDetails {
    accountType: 'guest';
    guestId: string;
  }

  type UserProfile = MemberProfile | GuestProfile;
}

export {};
