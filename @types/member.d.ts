declare global {
  interface Member {
    id: string;
    name: string;
    band: Array<string>;
    roles: Array<string>;
    rank: number;
    department: string;
    image: string;
    bio: string;
    phone: string;
    email: string;
    address: string;
    joinDate: string;
    active: boolean
  }
}

export {};
