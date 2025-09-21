import { useMemo } from 'react';

export const useMemberFilters = (
  members: UserProfile[],
  searchTerm: string,
  gender: Gender | 'all',
): UserProfile[] => {
  return useMemo(() => {
    return members.filter((member) => {
      const searchLower = searchTerm.toLowerCase();

      // Search matching logic
      const matchesSearch =
        !searchTerm ||
        member.firstName.toLowerCase().includes(searchLower) ||
        member.lastName.toLowerCase().includes(searchLower) ||
        member.position.some((role: string) =>
          role.toLowerCase().includes(searchLower),
        ) ||
        (member.department &&
          member.department.some((dept: string) =>
            dept.toLowerCase().includes(searchLower),
          )) ||
        (member.band &&
          member.band.some((band: string) =>
            band.toLowerCase().includes(searchLower),
          ));

      // Gender filtering logic
      const matchesGender = gender === 'all' || member.gender === gender;

      return matchesSearch && matchesGender;
    });
  }, [members, searchTerm, gender]);
};
