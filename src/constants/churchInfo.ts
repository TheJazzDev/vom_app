import { ROUTES } from './routes/routes';

export const INFO_CATEGORIES: ChurchInfoProps[] = [
  {
    title: 'Announcements',
    description: 'Latest church news and important updates',
    route: ROUTES.ANNOUNCEMENT,
    icon: 'megaphone.fill',
    badge: '3 New',
    gradient: ['#EF4444', '#DC2626'],
  },
  {
    title: 'Church Events',
    description: 'Upcoming special events and celebrations',
    route: ROUTES.EVENTS,
    icon: 'calendar.badge.plus',
    badge: '5 Upcoming',
    gradient: ['#3B82F6', '#1E40AF'],
  },
  {
    title: 'Weekly Activities',
    description: 'Regular weekly church programs and meetings',
    route: ROUTES.WEEKLY_ACTIVITIES,
    icon: 'clock.badge.checkmark',
    badge: 'This Week',
    gradient: ['#10B981', '#047857'],
  },
  {
    title: 'Monthly Activities',
    description: 'Special monthly programs and fellowship events',
    route: ROUTES.MONTHLY_ACTIVITIES,
    icon: 'calendar.circle.fill',
    badge: 'This Month',
    gradient: ['#F59E0B', '#D97706'],
  },
];

export const QUICK_INFO: QuickInfoProps[] = [
  {
    title: 'Service Times',
    items: [
      'Sunday Worship: 9:00 AM',
      'Wednesday Prayer: 6:00 PM',
      'Friday Youth: 7:00 PM',
    ],
    icon: 'clock.fill',
  },
  {
    title: 'Contact Info',
    items: [
      '+234 901 234 5678',
      'info@vomchurch.com',
      '123 Church Street, Lagos',
    ],
    icon: 'info.circle.fill',
  },
];
