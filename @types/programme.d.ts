declare global {
  type ServiceSections = 'Current' | 'Upcoming' | 'Past';

  export interface UpcomingProgramme {
    id: string;
    date: string;
    topic: string;
    time: string;
    status: 'upcoming' | 'past';
    type: 'shilo' | 'sunday' | 'vigil';
  }

  interface SundayProgramme {
    type: string;
    date: string;
    theme: string;
    topic: string;
    lesson: string;
    callToWorship: string;
    callToWorshipText: string;
    openingPrayer: number[];
    officiating: {
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
    };
    hynms: {
      processional: string;
      introit: string;
      opening: string;
      thanksgiving: string[];
      sermon: string;
      vesper: string;
      recessional: string;
    };
  }

  interface ShiloProgramme {
    type: string;
    date: string;
    theme: string;
    topic: string;
    lesson: string;
    openingPrayer: number[];
    officiating: {
      revivalist: string;
      preparatoryPrayer: string;
      lesson: string;
      preacher: string;
      worshipLeader: string;
      prayerMinistration: string;
    };
    hynms: {
      opening: string;
      sermon: string;
      prayer: string;
      thanksgiving: string;
    };
  }

  interface VigilProgramme {
    type: string;
    date: string;
    theme: string;
    topic: string;
    lesson: string;
    openingPrayer: number[];
    officiating: {
      lesson: string;
      preacher: string;
      worshipLeader: string;
      prayerMinistration: string;
    };
    hynms: {
      opening: string;
      sermon: string;
      prayer: string;
      thanksgiving: string;
    };
  }
}

export {};
