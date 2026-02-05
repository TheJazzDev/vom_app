export const ROUTES = {
  // Main drawer routes
  HOME: '/',
  ONBOARDING: '/onboarding',
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
  PROFILE: '/(tabs)/profile',
  PROFILE_EDIT: '/(tabs)/profile/edit',
  PROFILE_SETTINGS: '/(tabs)/profile/settings',

  // Programme
  PROGRAMME: '/(tabs)/programme',
  CURRENT_PROGRAMME: '/(tabs)/programme/current',
  UPCOMING_PROGRAMME: '/(tabs)/programme/upcoming',
  PAST_PROGRAMME: '/(tabs)/programme/past',
  PROGRAMME_DETAILS: '/(tabs)/programme/[id]',

  // Directory
  DIRECTORY: '/(tabs)/directory',
  BANDS: '/(tabs)/directory/bands',
  MEMBERS: '/(tabs)/directory/members',
  CHILDREN: '/(tabs)/directory/children',
  DEPARTMENTS: '/(tabs)/directory/departments',

  // Ministry
  MINISTRY: '/(tabs)/ministry',
  BIBLE_STUDY: '/(tabs)/ministry/bible-study',
  DAILY_PRAYERS: '/(tabs)/ministry/daily-prayers',
  PRAYER_REQUEST: '/(tabs)/ministry/prayer-requests',
  RECENT_SERMONS: '/(tabs)/ministry/recent-sermons',
  TESTIMONIES: '/(tabs)/ministry/testimonies',

  // Info
  MORE: '/(tabs)/more',
  SETTINGS: '/(tabs)/more/settings',
  NOTIFICATIONS: '/(tabs)/notifications',
  ABOUT: '/(tabs)/more/about',
  CONTACT: '/(tabs)/more/contact',
  EVENTS: '/(tabs)/more/events',
  ANNOUNCEMENT: '/(tabs)/more/announcement',
  BIRTHDAYS: '/(tabs)/more/birthdays',
  FIRST_TIMERS: '/(tabs)/more/first-timers',
} as const;

export type RouteKeys = keyof typeof ROUTES;
export type RouteValues = (typeof ROUTES)[RouteKeys];
