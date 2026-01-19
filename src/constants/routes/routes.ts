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
  DAILY_PRAYERS: '/ministry/daily-prayers',
  PRAYER_REQUEST: '/ministry/prayer-requests',
  RECENT_SERMONS: '/ministry/recent-sermons',
  TESTIMONIES: '/ministry/testimonies',

  // Info
  MORE: '/more',
  SETTINGS: '/more/settings',
  NOTIFICATIONS: '/notifications',
  ABOUT: '/more/about',
  CONTACT: '/more/contact',
  EVENTS: '/more/events',
  ANNOUNCEMENT: '/more/announcement',
  WEEKLY_ACTIVITIES: '/more/weekly-activities',
  MONTHLY_ACTIVITIES: '/more/monthly-activities',
  BIRTHDAYS: '/more/birthdays',
  FIRST_TIMERS: '/more/first-timers',
} as const;

export type RouteKeys = keyof typeof ROUTES;
export type RouteValues = (typeof ROUTES)[RouteKeys];
