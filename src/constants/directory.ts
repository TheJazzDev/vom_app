import { ROUTES } from './routes';

export const DIRECTORY_CATEGORIES: DirectoryProps[] = [
  {
    title: 'Members',
    description: 'Connect with fellow church members',
    route: ROUTES.MEMBERS,
    icon: 'person.2.fill',
    count: '240+',
    gradient: ['#3B82F6', '#1E40AF'],
  },
  {
    title: 'Children',
    description: 'Our precious little ones',
    route: ROUTES.CHILDREN,
    icon: 'figure.2.and.child.holdinghands',
    count: '85+',
    gradient: ['#10B981', '#047857'],
  },
  {
    title: 'Bands',
    description: 'Musical groups and choirs',
    route: ROUTES.BANDS,
    icon: 'music.note.list',
    count: '12',
    gradient: ['#8B5CF6', '#5B21B6'],
  },
  {
    title: 'Departments',
    description: 'Church ministries and departments',
    route: ROUTES.DEPARTMENTS,
    icon: 'building.2.fill',
    count: '8',
    gradient: ['#F59E0B', '#D97706'],
  },
];
