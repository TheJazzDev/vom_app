declare global {
  type ServiceSections = 'Current' | 'Upcoming' | 'Past';

  export interface UpcomingProgramme {
    id: string;
    date: string;
    topic: string;
    time: string;
    status: 'upcoming' | 'past';
    type: 'shilo' | 'sunday';
  }

  interface SundayProgramme {
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
}

export {};
