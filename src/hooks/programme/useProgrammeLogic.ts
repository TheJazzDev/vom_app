import {
  shiloProgramme,
  sundayProgramme,
  vigilProgramme,
} from '@/src/constants';
import { getProgrammeTimes } from '@/src/utils';
import { useCallback, useEffect, useState } from 'react';

const mockDataFromDB = [
  sundayProgramme,
  shiloProgramme,
  vigilProgramme,
  shiloProgramme,
  sundayProgramme,
  sundayProgramme,
  vigilProgramme,
  shiloProgramme,
];

export const useProgrammeLogic = () => {
  const [currentProgramme, setCurrentProgramme] = useState<
    SundayProgramme | ShiloProgramme | VigilProgramme | null
  >(null);

  // Function to check if a programme is currently ongoing
  const isCurrentlyOngoing = (programme: any): boolean => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.getHours() * 60 + now.getMinutes();

    if (programme.date !== currentDate) {
      return false;
    }

    const serviceTimes = getProgrammeTimes();
    const serviceType = programme.type.toLowerCase();
    const timeRange = serviceTimes[serviceType as keyof typeof serviceTimes];

    if (!timeRange) {
      return false;
    }

    // Special handling for vigil that crosses midnight
    if (serviceType === 'vigil') {
      return currentTime >= timeRange.start || currentTime <= 2 * 60;
    }

    return currentTime >= timeRange.start && currentTime <= timeRange.end;
  };

  const findCurrentProgramme = useCallback(():
    | SundayProgramme
    | ShiloProgramme
    | VigilProgramme
    | null => {
    const currentProg = mockDataFromDB.find((programme) =>
      isCurrentlyOngoing(programme),
    );
    return currentProg || null;
  }, []);

  useEffect(() => {
    const updateCurrentProgramme = () => {
      const current = findCurrentProgramme();
      setCurrentProgramme(current);
    };

    updateCurrentProgramme();
    const interval = setInterval(updateCurrentProgramme, 60000);

    return () => clearInterval(interval);
  }, [findCurrentProgramme]);

  return { currentProgramme };
};
