import {
  activateMemberAccount,
  createGuestAccount,
  findMemberByPhone,
  findMemberForActivation,
  getMemberByAuthUid,
  getMemberByEmail,
  login,
  logout,
  sendPasswordResetEmail,
  sendPhoneLoginCode,
  sendEmailVerificationLink,
  updateUserProfile,
  verifyPhoneCodeAndSignIn,
  verifyPhoneLoginCode,
} from '@/src/services/auth';
import { getMemberById } from '@/src/services/auth/getMemberByEmail';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createGuestAccountThunk = createAsyncThunk(
  'auth/createGuestAccount',
  async (data: RegistrationProps, { rejectWithValue }) => {
    try {
      const result = await createGuestAccount(data);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const findMemberForActivationThunk = createAsyncThunk(
  'auth/findMemberForActivation',
  async (emailOrPhone: string, { rejectWithValue }) => {
    try {
      const member = await findMemberForActivation(emailOrPhone);
      return member;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const activateMemberAccountThunk = createAsyncThunk(
  'auth/activateMemberAccount',
  async (
    data: {
      member: UserProfile;
      emailOrPhone: string;
      password?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const result = await activateMemberAccount(data);

      if (result && 'needsVerification' in result) {
        return result as PhoneActivationResult;
      }

      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Register thunk (main registration)
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (data: LoginServiceProps, { rejectWithValue }) => {
    try {
      const result = await login(data);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Get member by Auth UID thunk
export const getMemberByAuthUidThunk = createAsyncThunk(
  'auth/getMemberByAuthUid',
  async (uid: string, { rejectWithValue }) => {
    try {
      const member = await getMemberByAuthUid(uid);
      return member;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Get member by email thunk (fallback)
export const getMemberByEmailThunk = createAsyncThunk(
  'auth/getMemberByEmail',
  async (email: string, { rejectWithValue }) => {
    try {
      const member = await getMemberByEmail(email);
      return member;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const verifyPhoneAndSignInThunk = createAsyncThunk(
  'auth/verifyPhoneAndSignIn',
  async (
    data: {
      member: UserProfile;
      verificationId: string;
      code: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const result = await verifyPhoneCodeAndSignIn(data);

      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Phone verification failed');
    }
  },
);

// Get member by id thunk
export const getMemberByIdThunk = createAsyncThunk(
  'auth/getMemberById',
  async (email: string, { rejectWithValue }) => {
    try {
      const member = await getMemberById(email);
      return member;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Send email verification code thunk
export const sendEmailVerificationLinkThunk = createAsyncThunk<
  { success: boolean },
  void,
  { rejectValue: string }
>('auth/sendEmailVerificationLink', async (_, { rejectWithValue }) => {
  try {
    await sendEmailVerificationLink();
    return { success: true };
  } catch (error: any) {
    return rejectWithValue(
      error.message ?? 'Failed to send email verification link',
    );
  }
});

export const updateUserProfileThunk = createAsyncThunk(
  'auth/updateUserProfile',
  async (
    data: { primaryPhone?: string; secondaryPhone?: string; address?: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      // Update the profile in the database
      await updateUserProfile(data);

      // Refetch the updated user data
      const authUser = await import('@/src/config/firebase').then(
        (m) => m.auth.currentUser,
      );

      if (authUser) {
        const updatedUser = await dispatch(
          getMemberByAuthUidThunk(authUser.uid),
        ).unwrap();
        return updatedUser;
      }

      return { success: true };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logout();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Send password reset email thunk
export const sendPasswordResetEmailThunk = createAsyncThunk<
  { success: boolean },
  string,
  { rejectValue: string }
>('auth/sendPasswordResetEmail', async (email, { rejectWithValue }) => {
  try {
    await sendPasswordResetEmail(email);
    return { success: true };
  } catch (error: any) {
    return rejectWithValue(
      error.message ?? 'Failed to send password reset email',
    );
  }
});

// Find member by phone thunk
export const findMemberByPhoneThunk = createAsyncThunk(
  'auth/findMemberByPhone',
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      const member = await findMemberByPhone(phoneNumber);
      return member;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Send phone login code thunk
export const sendPhoneLoginCodeThunk = createAsyncThunk(
  'auth/sendPhoneLoginCode',
  async (
    data: { phoneNumber: string; recaptchaVerifier: any },
    { rejectWithValue },
  ) => {
    try {
      const result = await sendPhoneLoginCode(
        data.phoneNumber,
        data.recaptchaVerifier,
      );
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Verify phone login code thunk
export const verifyPhoneLoginCodeThunk = createAsyncThunk(
  'auth/verifyPhoneLoginCode',
  async (
    data: {
      verificationId: string;
      code: string;
      member?: UserProfile | null;
    },
    { rejectWithValue },
  ) => {
    try {
      const result = await verifyPhoneLoginCode(
        data.verificationId,
        data.code,
        data.member,
      );
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Phone verification failed');
    }
  },
);
