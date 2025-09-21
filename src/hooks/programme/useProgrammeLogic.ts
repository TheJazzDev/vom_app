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

  // Set the actual start time based on programme date + start hour/minute
  const startTime = new Date(programmeDate);
  startTime.setHours(config.startHour, config.startMinute, 0, 0);

  // Calculate end time
  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + Math.floor(config.durationHours));
  endTime.setMinutes(endTime.getMinutes() + (config.durationHours % 1) * 60);

  // Check if current time is between start and end
  return now >= startTime && now <= endTime;
}

function getCurrentProgramme(
  programmes: AllProgrammes[],
): AllProgrammes | null {
  return programmes.find(isCurrentlyActive) || null;
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

      const startTime = new Date(programmeDate);
      startTime.setHours(config.startHour, config.startMinute, 0, 0);

      return startTime > now;
    })
    .sort((a, b) => new Date(a!.date).getTime() - new Date(b!.date).getTime());

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
