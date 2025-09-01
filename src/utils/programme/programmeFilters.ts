import { upcomingPrograms } from '@/src/constants/upcoming';

export const getUpcomingPrograms = () =>
  upcomingPrograms.filter((program) => program.status === 'upcoming');

export const getPastPrograms = () =>
  upcomingPrograms.filter((program) => program.status === 'past');
