export const ROUTES = {
  // Main drawer routes
  HOME: '/',
  ONBOARDING: '/onboarding',
  SETTINGS: '/settings',
  NOTIFICATIONS: '/notifications',
  ABOUT: '/about',
  CONTACT: '/contact',
  NOT_FOUND: '/+not-found',

  // Auth
  AUTH: '/auth',
  SIGNUP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgot-password',
  VERIFY_PHONE: '/auth/verify-phone',
  FIND_MEMBER: '/auth/find-member',
  EMAIL_LINK_SENT: '/auth/email-link-sent',
  ACTIVATE_ACCOUNT: '/auth/activate-member-account',
  ACTIVATE_SUCCESS: '/auth/activate-member-account-success',

  // Profile
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  PROFILE_SETTINGS: '/profile/settings',

  // Programme
  PROGRAMME: '/programme',
  CURRENT_PROGRAMME: '/programme/current',
  UPCOMING_PROGRAMME: '/programme/upcoming',
  PAST_PROGRAMME: '/programme/past',
  PROGRAMME_DETAILS: '/programme/[id]',

  // Directory
  DIRECTORY: '/directory',
  BANDS: '/directory/bands',
  MEMBERS: '/directory/members',
  CHILDREN: '/directory/children',
  DEPARTMENTS: '/directory/departments',

  // Ministry
  MINISTRY: '/ministry',
  BIBLE_STUDY: '/ministry/bible-study',
  PRAYER_REQUEST: '/ministry/prayer-request',
  RECENT_SERMONS: '/ministry/recent-sermons',
  TESTIMONIES: '/ministry/testimonies',

  // Info
  INFO: '/info',
  EVENTS: '/info/events',
  ANNOUNCEMENT: '/info/announcement',
  WEEKLY_ACTIVITIES: '/info/weekly-activities',
  MONTHLY_ACTIVITIES: '/info/monthly-activities',
} as const;

export type RouteKeys = keyof typeof ROUTES;
export type RouteValues = (typeof ROUTES)[RouteKeys];
