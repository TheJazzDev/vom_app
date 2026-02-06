import { ROUTES } from '../routes/routes';

export const DIRECTORY_CATEGORIES: DirectoryProps[] = [
  {
    title: 'Members',
    description: 'Connect with fellow church members',
    route: ROUTES.MEMBERS,
    icon: 'person.2.fill',
    gradient: ['#3B82F6', '#1E40AF'],
  },
  {
    title: 'Children',
    description: 'Our precious little ones',
    route: ROUTES.CHILDREN,
    icon: 'figure.2.and.child.holdinghands',
    gradient: ['#10B981', '#047857'],
  },
  {
    title: 'Bands',
    description: 'Stay in touch with your band members',
    route: ROUTES.BANDS,
    icon: 'music.note.list',
    gradient: ['#8B5CF6', '#5B21B6'],
  },
  {
    title: 'Youth Ministry',
    description: 'Connect with our youth fellowship',
    route: ROUTES.YOUTH_MINISTRY,
    icon: 'person.3.fill',
    gradient: ['#14B8A6', '#0F766E'],
  },
  {
    title: 'Departments',
    description: 'Church ministries and departments',
    route: ROUTES.DEPARTMENTS,
    icon: 'building.2.fill',
    gradient: ['#F59E0B', '#D97706'],
  },
];
