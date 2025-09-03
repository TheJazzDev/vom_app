export const ROUTES = {
  // Main drawer routes
  HOME: '/',
  AUTH: '/auth',
  PROFILE: '/profile',
  PROGRAMME: '/programme',
  DIRECTORY: '/directory',
  MINISTRY: '/ministry',
  INFO: '/info',
  ONBOARDING: '/onboarding',
  ABOUT: '/about',
  CONTACT: '/contact',
  NOTIFICATIONS: '/notifications',
  SETTINGS: '/settings',
  NOT_FOUND: '/+not-found',

  // Auth sub-routes
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgot-password',
  VERIFY_EMAIL: '/auth/verify-email',
  VERIFY_PHONE: '/auth/verify-phone',

  // Profile sub-routes
  PROFILE_EDIT: '/profile/edit',
  PROFILE_SETTINGS: '/profile/settings',

  // Programme sub-routes
  PROGRAMME_LIST: '/programme/list',
  PROGRAMME_DETAILS: '/programme/[id]',

  // Directory
  BANDS: '/directory/bands',
  MEMBERS: '/directory/members',
  CHILDREN: '/directory/children',
  DEPARTMENTS: '/directory/departments',

  // Ministry sub-routes
  BIBLE_STUDY: '/ministry/bible-study',
  PRAYER_REQUEST: '/ministry/prayer-request',
  RECENT_SERMONS: '/ministry/recent-sermons',
  TESTIMONIES: '/ministry/testimonies',

  // Info sub-routes
  ANNOUNCEMENT: '/info/announcement',
  EVENTS: '/info/events',
} as const;

export type RouteKeys = keyof typeof ROUTES;
export type RouteValues = (typeof ROUTES)[RouteKeys];
