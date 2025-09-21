interface ErrorContext {
  operation?: string;
  isEmailLogin?: boolean;
  isPhoneLogin?: boolean;
}

export const handleFirebaseError = (
  error: any,
  context: ErrorContext = {},
): Error => {
  console.error('Firebase error:', error);

  // Preserve special error messages that are part of app flow
  if (
    error.message === 'SMS_CODE_SENT' ||
    error.message === 'VERIFICATION_CODE_SENT'
  ) {
    return error;
  }

  const { operation = 'operation', isEmailLogin = false } = context;

  // Authentication errors
  if (error.code === 'auth/invalid-credential') {
    return new Error(
      `Incorrect ${isEmailLogin ? 'email' : 'phone'} or password`,
    );
  }

  if (error.code === 'auth/user-not-found') {
    return new Error('No account found with this email or phone number');
  }

  if (error.code === 'auth/wrong-password') {
    return new Error('Incorrect password. Please try again');
  }

  if (error.code === 'auth/invalid-email') {
    return new Error('Please enter a valid email address');
  }

  if (error.code === 'auth/email-already-in-use') {
    return new Error(
      'An account with this email already exists. Please sign in instead',
    );
  }

  if (error.code === 'auth/weak-password') {
    return new Error('Password is too weak. Please choose a stronger password');
  }

  if (error.code === 'auth/user-disabled') {
    return new Error('This account has been disabled. Please contact support');
  }

  if (error.code === 'auth/too-many-requests') {
    return new Error(
      'Too many failed attempts. Please try again in a few minutes',
    );
  }

  // Phone authentication errors
  if (error.code === 'auth/invalid-phone-number') {
    return new Error('Please enter a valid phone number');
  }

  if (error.code === 'auth/phone-number-already-exists') {
    return new Error('An account with this phone number already exists');
  }

  if (error.code === 'auth/invalid-verification-code') {
    return new Error('Invalid verification code. Please check and try again');
  }

  if (error.code === 'auth/code-expired') {
    return new Error('Verification code has expired. Please request a new one');
  }

  if (error.code === 'auth/maximum-second-factor-count-exceeded') {
    return new Error('Too many verification attempts. Please try again later');
  }

  if (error.code === 'auth/quota-exceeded') {
    return new Error(
      'SMS quota exceeded. Please try again later or use email login',
    );
  }

  // Network and connectivity errors
  if (error.code === 'auth/network-request-failed') {
    return new Error(
      'Network error. Please check your internet connection and try again',
    );
  }

  if (error.code === 'auth/timeout') {
    return new Error(
      'Request timed out. Please check your connection and try again',
    );
  }

  // Firestore errors
  if (error.code === 'firestore/permission-denied') {
    return new Error('Access denied. Please sign in and try again');
  }

  if (error.code === 'firestore/unavailable') {
    return new Error('Service temporarily unavailable. Please try again later');
  }

  if (error.code === 'firestore/not-found') {
    return new Error('User profile not found. Please contact support');
  }

  if (error.code === 'firestore/already-exists') {
    return new Error('This record already exists');
  }

  // Custom validation errors (from our app)
  if (error.message === 'EMAIL_NOT_VERIFIED') {
    return new Error('Email is not verified, please verify your email');
  }

  if (error.message === 'Password is required for email login') {
    return new Error('Password is required for email login');
  }

  if (error.message === 'No member found with this phone number') {
    return new Error('No account found with this phone number');
  }

  if (error.message === 'Account not activated. Please register first.') {
    return new Error(
      'Account not activated. Please complete your registration first',
    );
  }

  if (error.message === 'Member profile not found') {
    return new Error('User profile not found. Please contact support');
  }

  // Password reset errors
  if (error.code === 'auth/user-not-found' && operation === 'password-reset') {
    return new Error('No account found with this email address');
  }

  // Generic fallback with operation context
  const operationMessages = {
    login: 'Sign in failed. Please check your credentials and try again',
    register: 'Registration failed. Please try again',
    'password-reset': 'Failed to send password reset email. Please try again',
    'update-profile': 'Failed to update profile. Please try again',
    logout: 'Sign out failed. Please try again',
    'phone-verification': 'Phone verification failed. Please try again',
    'email-verification': 'Email verification failed. Please try again',
  };

  const defaultMessage =
    operationMessages[operation as keyof typeof operationMessages] ||
    `${operation} failed. Please try again`;

  return new Error(error.message || defaultMessage);
};

export const handleLoginError = (
  error: any,
  isEmailLogin: boolean = false,
): Error => {
  return handleFirebaseError(error, { operation: 'login', isEmailLogin });
};

export const handleRegistrationError = (error: any): Error => {
  return handleFirebaseError(error, { operation: 'register' });
};

export const handleVerifyEmailError = (error: any): Error => {
  return handleFirebaseError(error, { operation: 'verify-email' });
};

export const handlePhoneVerificationError = (error: any): Error => {
  return handleFirebaseError(error, { operation: 'phone-verification' });
};

export const handlePasswordResetError = (error: any): Error => {
  return handleFirebaseError(error, { operation: 'password-reset' });
};

export const handleProfileUpdateError = (error: any): Error => {
  return handleFirebaseError(error, { operation: 'update-profile' });
};
