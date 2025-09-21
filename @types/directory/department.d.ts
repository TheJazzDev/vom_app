import { DepartmentEnum } from '@/src/enum/detartment';

declare global {
  export type DepartmentRole = 'Head' | 'Assistant' | 'Secretary' | 'Member';

  type DepartmentKeys =
    | INTERPRETATIO
    | PROGRAMME
    | MEDIA
    | TREASURY
    | TECHNICAL
    | DRAMA
    | IT
    | EVANGELISM
    | SANITATION;

  interface DepartmentData {
    name: DepartmentEnum;
    role: DepartmentRole;
  }

  export type DepartmentLeadership = {
    head: string | null;
    assistant: string | null;
    secretary: string | null;
  };

  export interface Department {
    id: DepartmentEnum;
    name: string;
    displayName: string;
    description: string;
    icon1: string;
    icon2: string;
    gradient: GradientColor;
    meetingDay: string;
    createdAt: string;
    isActive: boolean;
    memberCount: number;
    leadership: DepartmentLeadership;
  }

  export interface MemberDepartment {
    departmentId: DepartmentEnum;
    role: DepartmentRole;
    joinedAt: string;
    isActive: boolean;
  }

  interface DepartmentConfigEntry {
    id: string;
    name: string;
    description: string;
    gradient: GradientColor;
    icon: string;
    meetingDay: string;
  }

  export type DepartmentConfigRecord = Record<string, DepartmentConfigEntry>;
}

export {};
