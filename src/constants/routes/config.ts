// src/constants/routeConfig.ts
import { ROUTES, RouteValues } from './routes';

export type RouteAccess = 'public' | 'auth-required' | 'guest-only';

export interface RouteConfig {
  path: RouteValues;
  access: RouteAccess;
  fallbackRoute?: RouteValues;
  showUnauthorized?: boolean;
  description?: string;
}

export const ROUTE_CONFIGS: RouteConfig[] = [
  // Public routes (accessible to everyone)
  {
    path: ROUTES.HOME,
    access: 'public',
    description: 'Homepage - accessible to all users',
  },
  {
    path: ROUTES.PROGRAMME,
    access: 'public',
    description: 'Programme index - public information',
  },
  {
    path: ROUTES.CURRENT_PROGRAMME,
    access: 'public',
    description: 'Current programme - public',
  },
  {
    path: ROUTES.UPCOMING_PROGRAMME,
    access: 'public',
    description: 'Upcoming programmes - public',
  },
  {
    path: ROUTES.PAST_PROGRAMME,
    access: 'public',
    description: 'Past programmes - public',
  },
  {
    path: ROUTES.PROGRAMME_DETAILS,
    access: 'public',
    description: 'Programme details - public',
  },
  {
    path: ROUTES.DIRECTORY,
    access: 'public',
    description: 'Directory overview - public categories',
  },
  {
    path: ROUTES.MINISTRY,
    access: 'public',
    description: 'Ministry overview - public information',
  },
  {
    path: ROUTES.BIBLE_STUDY,
    access: 'public',
    description: 'Bible study info - public',
  },
  {
    path: ROUTES.RECENT_SERMONS,
    access: 'public',
    description: 'Sermon list - public',
  },
  {
    path: ROUTES.INFO,
    access: 'public',
    description: 'Church info overview - public',
  },
  {
    path: ROUTES.ANNOUNCEMENT,
    access: 'public',
    description: 'Public announcements',
  },
  {
    path: ROUTES.EVENTS,
    access: 'public',
    description: 'Church events - public',
  },
  {
    path: ROUTES.WEEKLY_ACTIVITIES,
    access: 'public',
    description: 'Weekly activities - public schedule',
  },
  {
    path: ROUTES.MONTHLY_ACTIVITIES,
    access: 'public',
    description: 'Monthly activities - public schedule',
  },
  {
    path: ROUTES.ABOUT,
    access: 'public',
    description: 'About church - public info',
  },
  {
    path: ROUTES.CONTACT,
    access: 'public',
    description: 'Contact information - public',
  },
  {
    path: ROUTES.SETTINGS,
    access: 'public',
    description: 'App settings - user settings',
  },

  // Auth-required routes (members only)
  {
    path: ROUTES.PROFILE,
    access: 'auth-required',
    fallbackRoute: ROUTES.AUTH,
    showUnauthorized: true,
    description: 'User profile - members only',
  },
  {
    path: ROUTES.PROFILE_EDIT,
    access: 'auth-required',
    fallbackRoute: ROUTES.AUTH,
    showUnauthorized: true,
    description: 'Edit profile - members only',
  },
  {
    path: ROUTES.PROFILE_SETTINGS,
    access: 'auth-required',
    fallbackRoute: ROUTES.AUTH,
    showUnauthorized: true,
    description: 'Profile settings - members only',
  },
  {
    path: ROUTES.MEMBERS,
    access: 'auth-required',
    fallbackRoute: ROUTES.AUTH,
    showUnauthorized: true,
    description: 'Members directory - authenticated users only',
  },
  {
    path: ROUTES.CHILDREN,
    access: 'auth-required',
    fallbackRoute: ROUTES.AUTH,
    showUnauthorized: true,
    description: 'Children directory - members only',
  },
  {
    path: ROUTES.BANDS,
    access: 'auth-required',
    fallbackRoute: ROUTES.AUTH,
    showUnauthorized: true,
    description: 'Bands directory - members only',
  },
  {
    path: ROUTES.DEPARTMENTS,
    access: 'auth-required',
    fallbackRoute: ROUTES.AUTH,
    showUnauthorized: true,
    description: 'Departments directory - members only',
  },
  {
    path: ROUTES.PRAYER_REQUEST,
    access: 'auth-required',
    fallbackRoute: ROUTES.AUTH,
    showUnauthorized: true,
    description: 'Prayer requests - members only',
  },
  {
    path: ROUTES.TESTIMONIES,
    access: 'auth-required',
    fallbackRoute: ROUTES.AUTH,
    showUnauthorized: true,
    description: 'Testimonies - members only',
  },
  {
    path: ROUTES.NOTIFICATIONS,
    access: 'auth-required',
    fallbackRoute: ROUTES.AUTH,
    showUnauthorized: true,
    description: 'Personal notifications - members only',
  },

  // Guest-only routes (unauthenticated users only)
  {
    path: ROUTES.AUTH,
    access: 'guest-only',
    fallbackRoute: ROUTES.HOME,
    description: 'Auth landing - guests only',
  },
  {
    path: ROUTES.SIGNUP,
    access: 'guest-only',
    fallbackRoute: ROUTES.HOME,
    description: 'Signup screen - guests only',
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    access: 'guest-only',
    fallbackRoute: ROUTES.HOME,
    description: 'Password reset - guests only',
  },
  {
    path: ROUTES.VERIFY_EMAIL,
    access: 'guest-only',
    fallbackRoute: ROUTES.HOME,
    description: 'Email verification - guests only',
  },
  {
    path: ROUTES.VERIFY_PHONE,
    access: 'guest-only',
    fallbackRoute: ROUTES.HOME,
    description: 'Phone verification - guests only',
  },
  {
    path: ROUTES.FIND_MEMBER,
    access: 'guest-only',
    fallbackRoute: ROUTES.HOME,
    description: 'Find member - guests only',
  },
  {
    path: ROUTES.ACTIVATE_ACCOUNT,
    access: 'guest-only',
    fallbackRoute: ROUTES.HOME,
    description: 'Activate account - guests only',
  },
  {
    path: ROUTES.ACTIVATE_SUCCESS,
    access: 'guest-only',
    fallbackRoute: ROUTES.HOME,
    description: 'Activation success - guests only',
  },
  {
    path: ROUTES.ONBOARDING,
    access: 'guest-only',
    fallbackRoute: ROUTES.HOME,
    description: 'App onboarding - new users only',
  },
];

// Helper functions
export function getRouteConfig(path: string): RouteConfig | undefined {
  // Find exact match first
  const exactMatch = ROUTE_CONFIGS.find((config) => config.path === path);
  if (exactMatch) return exactMatch;

  // Find pattern match for dynamic routes
  const patternMatch = ROUTE_CONFIGS.find((config) => {
    const configParts = config.path.split('/');
    const pathParts = path.split('/');

    if (configParts.length !== pathParts.length) return false;

    return configParts.every(
      (part, index) =>
        part === pathParts[index] ||
        (part.startsWith('[') && part.endsWith(']')),
    );
  });

  return patternMatch;
}

export function isPublicRoute(path: string): boolean {
  const config = getRouteConfig(path);
  return config?.access === 'public' || !config; // Default to public if not configured
}

export function requiresAuth(path: string): boolean {
  const config = getRouteConfig(path);
  return config?.access === 'auth-required';
}

export function requiresGuest(path: string): boolean {
  const config = getRouteConfig(path);
  return config?.access === 'guest-only';
}
