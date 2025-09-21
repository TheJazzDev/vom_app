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
    title: 'Bands',
    description: 'Musical groups and choirs',
    route: ROUTES.BANDS,
    icon: 'music.note.list',
    gradient: ['#8B5CF6', '#5B21B6'],
  },
  {
    title: 'Children',
    description: 'Our precious little ones',
    route: ROUTES.CHILDREN,
    icon: 'figure.2.and.child.holdinghands',
    gradient: ['#10B981', '#047857'],
  },
  {
    title: 'Departments',
    description: 'Church ministries and departments',
    route: ROUTES.DEPARTMENTS,
    icon: 'building.2.fill',
    gradient: ['#F59E0B', '#D97706'],
  },
];
