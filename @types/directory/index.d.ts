import { IconSymbolName } from '@/src/components/Icons/IconSymbol';
import { RouteValues } from '@/src/constants';

declare global {
  type DirectoryProps = {
    title: string;
    description: string;
    route: RouteValues;
    icon: IconSymbolName;
    gradient: GradientColor;
  };

  type DirectoryStats = {
    membersCount: number;
    guestsCount: number;
    bandsCount: number;
    departmentsCount: number;
    childrenCount: number;
  };

  interface DirectoryState {
    directoryStats: DirectoryStats;
    allMembers: UserProfile[];
    allChildren: ChildrenProfile[];
    allBands: Band[];
    bandWithMembers: BandWithMembers | null;
    isFetchingBandWithMembers: boolean;
    isFetchingDirectoryStats: boolean;
    isFetchingBands: boolean;
    isFetchingMembers: boolean;
    isFetchingChildren: boolean;
    error: string | null;
    allDepartments: Department[];
    departmentWithMembers: DepartmentWithMembers | null;
    isFetchingAllDepartment: boolean;
    isFetchingDepartmentWithMembers: boolean;
  }
}

export {};
