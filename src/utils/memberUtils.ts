export const sortMembersByName = (members: UserProfile[]): UserProfile[] => {
  return [...members].sort((a, b) => {
    // Primary sort: First name
    const firstNameComparison = (a.firstName || '').localeCompare(
      b.firstName || '',
    );
    if (firstNameComparison !== 0) {
      return firstNameComparison;
    }

    // Secondary sort: Last name
    return (a.lastName || '').localeCompare(b.lastName || '');
  });
};

export const groupMembersByTitle = (
  members: UserProfile[],
): GroupedMembers[] => {
  // Define the hierarchy order
  const titleOrder: TitleCategory[] = [
    'Pro',
    'Pst',
    'S/M/I/I',
    'M/I/I',
    'Ald',
    'Bro',
    'Sis',
  ];

  // Group members by their exact title
  const grouped = members.reduce(
    (acc, member) => {
      // Use the member's title directly (it should already be one of the 5 categories)
      const category = member.title as TitleCategory;

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(member);
      return acc;
    },
    {} as Record<TitleCategory, UserProfile[]>,
  );

  // Convert to array format following hierarchy order, sort each group by name
  const groupedArray: GroupedMembers[] = titleOrder
    .filter((title) => grouped[title] && grouped[title].length > 0)
    .map((title) => ({
      title,
      members: sortMembersByName(grouped[title]),
      count: grouped[title].length,
    }));

  return groupedArray;
};

export const getTitleDisplayName = (category: TitleCategory): string => {
  const displayNames: Record<TitleCategory, string> = {
    Pro: 'Prophet',
    Pst: 'Pastor',
    'S/M/I/I': 'Senior Mother in Isreal',
    'M/I/I': 'Mother in Isreal',
    Ald: 'Aladura',
    Bro: 'Brother',
    Sis: 'Sister',
  };

  return displayNames[category];
};

export const filterAndGroupMembers = (
  members: UserProfile[],
  searchQuery: string,
): GroupedMembers[] => {
  const query = searchQuery.toLowerCase().trim();

  const filteredMembers = members.filter((member) => {
    if (!query) return true;

    const matchesBasicInfo =
      member.title?.toLowerCase().includes(query) ||
      member.firstName?.toLowerCase().includes(query) ||
      member.lastName?.toLowerCase().includes(query) ||
      member.middleName?.toLowerCase().includes(query) ||
      member.email?.toLowerCase().includes(query) ||
      member.primaryPhone?.toLowerCase().includes(query) ||
      member.secondaryPhone?.toLowerCase().includes(query);

    const matchesPersonalInfo =
      member.gender?.toLowerCase().includes(query) ||
      member.maritalStatus?.toLowerCase().includes(query) ||
      member.occupation?.toLowerCase().includes(query);

    const matchesChurchInfo =
      member.position?.some((pos) => pos.toLowerCase().includes(query)) ||
      member.bandKeys?.some((band) => band.toLowerCase().includes(query)) ||
      member.departmentKeys?.some((dept) => dept.toLowerCase().includes(query));

    const matchesDates =
      member.dob?.includes(query) || member.joinDate?.includes(query);

    return (
      matchesBasicInfo ||
      matchesPersonalInfo ||
      matchesChurchInfo ||
      matchesDates
    );
  });

  return groupMembersByTitle(filteredMembers);
};
