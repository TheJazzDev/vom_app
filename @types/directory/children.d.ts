declare global {
  interface ChildrenProfile {
    id: string;
    avatar: string;
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: Gender;
    dob: string;
    age: number;
  }
}

export {};
