import { RouteValues } from '@/src/constants/routes';

export interface RouteInfo {
  name: string;
  description: string;
}

export const getRouteInfo = (
  path: RouteValues | string,
  routeName?: string,
): RouteInfo => {
  const routeMap: Record<any, RouteInfo> = {
    '/programme/past': {
      name: 'Past Programmes',
      description:
        'Browse through past church events and programmes to stay engaged with the journey so far.',
    },
    '/directory/members': {
      name: 'Members Directory',
      description:
        'Browse our church member directory, view member profiles, and connect with fellow believers.',
    },
    '/directory/children': {
      name: 'Children Directory',
      description:
        'Access children information, classes, and activities for our young church family.',
    },
    '/directory/bands': {
      name: 'Church Bands',
      description:
        'Explore our church bands, their members, and leadership structure.',
    },
    '/directory/departments': {
      name: 'Church Departments',
      description:
        'View all church departments, their activities, and how to get involved.',
    },
    '/ministry/prayer-request': {
      name: 'Prayer Requests',
      description:
        'Submit prayer requests and pray for fellow members in our prayer community.',
    },
    '/ministry/testimonies': {
      name: 'Testimonies',
      description:
        'Share your testimony and read inspiring stories from our church family.',
    },
    '/profile': {
      name: 'Your Profile',
      description:
        'Manage your church profile, update personal information, and track your involvement.',
    },
    '/notifications': {
      name: 'Notifications',
      description:
        'Receive personalized church updates, event reminders, and important announcements.',
    },
    '/settings': {
      name: 'Settings',
      description:
        'Customize your app preferences and manage your account settings.',
    },
  };

  // Return matched route info or fallback
  return (
    routeMap[path as RouteValues] || {
      name: routeName || 'This Content',
      description: 'Access member-exclusive content and features.',
    }
  );
};
