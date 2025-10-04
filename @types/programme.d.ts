declare global {
  interface ProgrammeStats {
    total: number;
    upcoming: number;
    past: number;
    drafts: number;
    thisWeek: number
    thisMonth: number;
  }

  type ServiceSections = 'Current' | 'Upcoming' | 'Past';

  // 🎯 Shared fields across all programmes
  interface BaseProgramme {
    id: string;
    status: string;
    type: string;
    date: string;
    theme: string;
    topic: string;
    lesson: string;
    openingPrayer: number[];
  }

  // 🎯 Hymns can vary, so we make base + extend
  interface BaseHymns {
    opening: string;
    sermon: string;
    thanksgiving?: string | string[];
    prayer?: string;
    introit?: string;
    vesper?: string;
    recessional?: string;
    processional?: string;
  }

  // 🎯 Officiating roles differ by programme
  interface SundayOfficiating {
    lesson: string;
    band: string[];
    preacher: string;
    worshipLeader: string;
    intercessoryPrayer1: string;
    intercessoryPrayer2: string;
    intercessoryPrayer3: string;
    workersPrayerLeader: string;
    prayerMinistration: string;
    thanksgivingPrayer: string;
    alternateWorshipLeader: string;
    sundaySchoolTeacher: string;
    ministers: string[];
  }

  interface ShilohOfficiating {
    revivalist: string;
    preparatoryPrayer: string;
    lesson: string;
    preacher: string;
    worshipLeader: string;
    prayerMinistration: string;
  }

  interface VigilOfficiating {
    lesson: string;
    preacher: string;
    worshipLeader: string;
    prayerMinistration: string;
  }

  // 🎯 Specific programme types extend BaseProgramme
  interface SundayProgramme extends BaseProgramme {
    callToWorship: string;
    callToWorshipText: string;
    officiating: SundayOfficiating;
    hymns: {
      processional: string;
      introit: string;
      opening: string;
      thanksgiving: string[];
      sermon: string;
      vesper: string;
      recessional: string;
    };
  }

  interface ShilohProgramme extends BaseProgramme {
    officiating: ShilohOfficiating;
    hymns: {
      opening: string;
      sermon: string;
      prayer: string;
      thanksgiving: string;
    };
  }

  interface VigilProgramme extends BaseProgramme {
    officiating: VigilOfficiating;
    hymns: {
      opening: string;
      sermon: string;
      prayer: string;
      thanksgiving: string;
    };
  }

  // 🎯 Union type
  type AllProgrammes =
    | SundayProgramme
    | ShilohProgramme
    | VigilProgramme
    | null;

  interface ProgrammeState {
    // Past programmes
    pastProgrammes: AllProgrammes[];
    isPastProgrammesLoading: boolean;
    pastProgrammesError: string | null;

    // Upcoming programmes
    upcomingProgrammes: AllProgrammes[];
    isUpcomingProgrammesLoading: boolean;
    upcomingProgrammesError: string | null;

    // // Current programme (happening now)
    // currentProgramme: AllProgrammes | null;
    // isCurrentProgrammeLoading: boolean;
    // currentProgrammeError: string | null;

    // // Next programme (upcoming next)
    // nextProgramme: AllProgrammes | null;
    // isNextProgrammeLoading: boolean;
    // nextProgrammeError: string | null;

    // Single programme by ID
    programmeById: AllProgrammes | null;
    isProgrammeByIdLoading: boolean;
    programmeByIdError: string | null;

    // Programme stats
    stats: ProgrammeStats | null;
    isStatsLoading: boolean;
    statsError: string | null;

    // Cache timestamps for smart refetching
    pastProgrammesLastFetch: number | null;
    upcomingProgrammesLastFetch: number | null;
    // currentProgrammeLastFetch: number | null;
    // nextProgrammeLastFetch: number | null;
    statsLastFetch: number | null;
  }
}

export {};
