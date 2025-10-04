import { useProgrammeSlice } from '@/src/store';
import { useMemo } from 'react';

// Service start times and durations
export const SERVICE_CONFIG = {
  sunday: { startHour: 9, startMinute: 0, durationHours: 5 }, // 9 AM - 2 PM
  shiloh: { startHour: 9, startMinute: 0, durationHours: 4.5 }, // 9 AM - 1:30 PM
  vigil: { startHour: 21, startMinute: 0, durationHours: 8 }, // 9 PM - 5 AM next day
};

function isCurrentlyActive(programme: AllProgrammes): boolean {
  if (!programme || !programme.date || programme.status !== 'published') {
    return false;
  }

  const now = new Date();
  const programmeDate = new Date(programme.date);
  const config =
    SERVICE_CONFIG[programme.type.toLowerCase() as keyof typeof SERVICE_CONFIG];

  if (!config) return false;

  // Create start time by using the programme date and adding the service start time
  const startTime = new Date(programmeDate);
  startTime.setUTCHours(config.startHour, config.startMinute, 0, 0);

  // Calculate end time
  const endTime = new Date(startTime);
  const totalMinutes = config.durationHours * 60;
  endTime.setTime(endTime.getTime() + totalMinutes * 60 * 1000);

  // Check if current time is between start and end
  return now >= startTime && now <= endTime;
}

function getCurrentProgramme(
  programmes: AllProgrammes[],
): AllProgrammes | null {
  const currentActive = programmes.find(isCurrentlyActive);
  return currentActive || null;
}

function getNextProgramme(programmes: AllProgrammes[]): AllProgrammes | null {
  const now = new Date();

  // Filter programmes that haven't started yet and sort by date
  const futureProgrammes = programmes
    .filter((programme) => {
      if (!programme || !programme.date || programme.status !== 'published') {
        return false;
      }

      const programmeDate = new Date(programme.date);
      const config =
        SERVICE_CONFIG[
          programme.type.toLowerCase() as keyof typeof SERVICE_CONFIG
        ];
      if (!config) return false;

      // Create start time using UTC to match your stored dates
      const startTime = new Date(programmeDate);
      startTime.setUTCHours(config.startHour, config.startMinute, 0, 0);

      const isFuture = startTime > now;

      return isFuture;
    })
    .sort((a, b) => {
      const dateA = new Date(a!.date);
      const dateB = new Date(b!.date);
      const configA =
        SERVICE_CONFIG[a!.type.toLowerCase() as keyof typeof SERVICE_CONFIG];
      const configB =
        SERVICE_CONFIG[b!.type.toLowerCase() as keyof typeof SERVICE_CONFIG];

      if (configA && configB) {
        dateA.setUTCHours(configA.startHour, configA.startMinute, 0, 0);
        dateB.setUTCHours(configB.startHour, configB.startMinute, 0, 0);
      }

      return dateA.getTime() - dateB.getTime();
    });

  return futureProgrammes[0] || null;
}

export function useProgrammeLogic() {
  // Get both upcoming AND past programmes to check for current active ones
  const { upcomingProgrammes, pastProgrammes } = useProgrammeSlice();

  const currentProgramme = useMemo(() => {
    // Check both upcoming and past programmes for currently active ones
    // A programme might be in pastProgrammes if its date has passed but it's still running
    const allProgrammes = [...upcomingProgrammes, ...pastProgrammes];
    return getCurrentProgramme(allProgrammes);
  }, [upcomingProgrammes, pastProgrammes]);

  const nextProgramme = useMemo(() => {
    return getNextProgramme(upcomingProgrammes);
  }, [upcomingProgrammes]);

  return {
    currentProgramme,
    nextProgramme,
    isCurrentlyActive,
  };
}
