declare global {
  interface Member {
    id: string;
    name: string;
    roles: Array<string>;
    band: Array<string>;
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
