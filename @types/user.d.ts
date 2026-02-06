declare global {
  type Gender = 'male' | 'female';
  type AuthType = 'email' | 'phone';
  type AccountType = 'member' | 'guest';
  type Role = 'user' | 'admin' | 'super_admin';
  type Ministry = 'Children Ministry' | 'Youth Fellowship';

  interface UserProfile {
    id: string;
    uid: string;
    avatar: string;
    role: Role;
    firstName: string;
    middleName: string;
    lastName: string;
    maritalStatus: string;
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
    occupation: string;
    departmentKeys: DepartmentKeys[];
    department: DepartmentData[];
    band: BandData[];
    bandKeys: BandKeys[];
    ministry?: Ministry[];
    hasPassword?: boolean;
    authType: AuthType;
    primaryPhone: string;
    secondaryPhone?: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    accountType: AccountType;
    lastLoginAt?: string;
  }
}

export {};
