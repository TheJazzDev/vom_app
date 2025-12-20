/**
 * Error Handler Utility
 *
 * Maps technical errors to user-friendly messages and provides
 * consistent error handling across the application.
 */

export type ErrorCategory =
  | 'network'
  | 'auth'
  | 'validation'
  | 'server'
  | 'permission'
  | 'not_found'
  | 'unknown';

export interface AppError {
  code: string;
  message: string;
  userMessage: string;
  category: ErrorCategory;
  originalError?: unknown;
}

/**
 * Firebase Auth error codes mapped to user-friendly messages
 */
const FIREBASE_AUTH_ERRORS: Record<string, string> = {
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled. Please contact support.',
  'auth/user-not-found': 'No account found with this email. Please sign up.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please check your connection.',
  'auth/invalid-credential': 'Invalid credentials. Please check and try again.',
  'auth/invalid-verification-code': 'Invalid verification code. Please try again.',
  'auth/code-expired': 'Verification code has expired. Please request a new one.',
  'auth/popup-closed-by-user': 'Sign-in was cancelled. Please try again.',
  'auth/requires-recent-login': 'Please log in again to complete this action.',
  'auth/invalid-phone-number': 'Please enter a valid phone number.',
};

/**
 * Firebase Firestore error codes mapped to user-friendly messages
 */
const FIREBASE_FIRESTORE_ERRORS: Record<string, string> = {
  'permission-denied': "You don't have permission to perform this action.",
  'not-found': 'The requested item was not found.',
  unavailable: 'Service temporarily unavailable. Please try again.',
  'deadline-exceeded': 'Request timed out. Please try again.',
  cancelled: 'Request was cancelled.',
  'data-loss': 'Data could not be saved. Please try again.',
  'already-exists': 'This item already exists.',
  'resource-exhausted': 'Too many requests. Please wait a moment.',
  'failed-precondition': 'Operation failed. Please refresh and try again.',
  aborted: 'Operation was aborted. Please try again.',
  'out-of-range': 'Invalid data provided.',
  unimplemented: 'This feature is not yet available.',
  internal: 'An internal error occurred. Please try again.',
  unauthenticated: 'Please log in to continue.',
};

/**
 * Network error messages
 */
const NETWORK_ERRORS: Record<string, string> = {
  'Network Error': 'Unable to connect. Please check your internet connection.',
  'Network request failed': 'Connection failed. Please try again.',
  timeout: 'Request timed out. Please try again.',
  ECONNREFUSED: 'Unable to reach the server. Please try again later.',
  ETIMEDOUT: 'Connection timed out. Please check your network.',
};

/**
 * Determines the error category based on error characteristics
 */
function categorizeError(error: unknown): ErrorCategory {
  if (!error) return 'unknown';

  const errorString = String(error).toLowerCase();
  const errorCode = (error as any)?.code?.toLowerCase() || '';

  // Network errors
  if (
    errorString.includes('network') ||
    errorString.includes('connection') ||
    errorString.includes('offline') ||
    errorCode.includes('network')
  ) {
    return 'network';
  }

  // Auth errors
  if (errorCode.startsWith('auth/') || errorString.includes('unauthorized')) {
    return 'auth';
  }

  // Permission errors
  if (
    errorCode.includes('permission') ||
    errorString.includes('permission') ||
    errorString.includes('forbidden')
  ) {
    return 'permission';
  }

  // Not found
  if (errorCode.includes('not-found') || errorString.includes('not found')) {
    return 'not_found';
  }

  // Validation errors
  if (
    errorString.includes('invalid') ||
    errorString.includes('validation') ||
    errorString.includes('required')
  ) {
    return 'validation';
  }

  // Server errors
  if (errorString.includes('server') || errorString.includes('500')) {
    return 'server';
  }

  return 'unknown';
}

/**
 * Extracts error code from various error formats
 */
function extractErrorCode(error: unknown): string {
  if (!error) return 'UNKNOWN_ERROR';

  if (typeof error === 'string') return error;

  const err = error as any;
  return (
    err.code ||
    err.errorCode ||
    err.name ||
    err.type ||
    'UNKNOWN_ERROR'
  );
}

/**
 * Extracts error message from various error formats
 */
function extractErrorMessage(error: unknown): string {
  if (!error) return 'An unknown error occurred';

  if (typeof error === 'string') return error;

  const err = error as any;
  return (
    err.message ||
    err.errorMessage ||
    err.description ||
    err.error?.message ||
    String(error)
  );
}

/**
 * Gets a user-friendly message for the error
 */
function getUserFriendlyMessage(code: string, message: string, category: ErrorCategory): string {
  // Check Firebase Auth errors
  if (FIREBASE_AUTH_ERRORS[code]) {
    return FIREBASE_AUTH_ERRORS[code];
  }

  // Check Firebase Firestore errors
  const firestoreCode = code.replace('firestore/', '');
  if (FIREBASE_FIRESTORE_ERRORS[firestoreCode]) {
    return FIREBASE_FIRESTORE_ERRORS[firestoreCode];
  }

  // Check network errors
  for (const [key, value] of Object.entries(NETWORK_ERRORS)) {
    if (message.includes(key) || code.includes(key)) {
      return value;
    }
  }

  // Category-based fallback messages
  const fallbackMessages: Record<ErrorCategory, string> = {
    network: 'Unable to connect. Please check your internet connection.',
    auth: 'Authentication failed. Please try logging in again.',
    validation: 'Please check your input and try again.',
    server: 'Something went wrong on our end. Please try again later.',
    permission: "You don't have permission to perform this action.",
    not_found: 'The requested item could not be found.',
    unknown: 'Something went wrong. Please try again.',
  };

  return fallbackMessages[category];
}

/**
 * Main error handler function
 * Converts any error into a standardized AppError object
 */
export function handleError(error: unknown): AppError {
  const code = extractErrorCode(error);
  const message = extractErrorMessage(error);
  const category = categorizeError(error);
  const userMessage = getUserFriendlyMessage(code, message, category);

  const appError: AppError = {
    code,
    message,
    userMessage,
    category,
    originalError: error,
  };

  // Log error in development
  if (__DEV__) {
    console.error('[Error Handler]', {
      code: appError.code,
      category: appError.category,
      message: appError.message,
      userMessage: appError.userMessage,
    });
  }

  return appError;
}

/**
 * Helper to check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  return categorizeError(error) === 'network';
}

/**
 * Helper to check if error is an auth error
 */
export function isAuthError(error: unknown): boolean {
  return categorizeError(error) === 'auth';
}

/**
 * Helper to get just the user message from an error
 */
export function getErrorMessage(error: unknown): string {
  return handleError(error).userMessage;
}

export default handleError;
