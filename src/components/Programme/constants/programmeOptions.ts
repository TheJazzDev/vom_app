import { ROUTES } from '@/src/constants';

export const programmeOptions = [
  {
    title: 'Current Programme',
    description: "View what's happening right now",
    route: ROUTES.CURRENT_PROGRAMME,
    icon: 'play.circle.fill',
    status: 'Live',
    color: '#10B981',
  },
  {
    title: 'Upcoming Programmes',
    description: "See what's coming up next",
    route: ROUTES.UPCOMING_PROGRAMME,
    icon: 'calendar.badge.plus',
    status: 'Coming Up',
    color: '#3B82F6',
  },
  {
    title: 'Past Programmes',
    description: 'Browse our previous programmes and recordings',
    route: ROUTES.PAST_PROGRAMME,
    icon: 'clock.arrow.circlepath',
    status: 'View History',
    color: '#EF4444',
  },
];
