declare global {
  type Gender = 'all' | 'Male' | 'Female';
  interface Member {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    band: Array<string>;
    roles: Array<string>;
    rank: number;
    image: string;
    phone: Array<string>;
    email: string;
    address: string;
    joinDate: string;
    status: string;
    verified: boolean
    gender: string
    dob: string
  }
}

export {};
