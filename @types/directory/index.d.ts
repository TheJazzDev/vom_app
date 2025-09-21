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
}
