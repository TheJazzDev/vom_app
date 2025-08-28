// User Management Functions
import {
  checkUserExists,
  getCurrentUserProfile,
  getMemberByEmail,
  getMemberByPhone,
  updateMemberProfile,
  updateUserRole,
} from './userManagementMethods';

// Registration Functions
import {
  completeRegistrationWithVerification,
  createNewUser,
  linkExistingUser,
  signUp,
} from './registrationMethods';

// Authentication Functions
import { signInWithEmailOrPhone, userSignOut } from './authenticationMethods';

// Verification Functions
import {
  checkEmailVerificationStatus,
  resendVerificationCode,
  sendEmailVerificationToCurrentUser,
  sendPasswordReset,
  sendVerificationCode,
} from './verificationMethods';

// Convenience object if you prefer object-style imports
export const authService = {
  // User Management
  checkUserExists,
  getCurrentUserProfile,
  updateMemberProfile,
  updateUserRole,
  getMemberByPhone,
  getMemberByEmail,

  // Registration
  createNewUser,
  linkExistingUser,
  completeRegistrationWithVerification,
  signUp,

  // Authentication
  signInWithEmailOrPhone,
  signOut: userSignOut,

  // Verification
  sendVerificationCode,
  resendVerificationCode,
  sendPasswordReset,
  checkEmailVerificationStatus,
  sendEmailVerificationToCurrentUser,
};
