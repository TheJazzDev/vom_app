import {
  findMember,
  getMemberByAuthUid,
  login,
  register,
  resetPasswordWithPhone,
  sendEmailVerificationCode,
  sendForgotPasswordCode,
  sendPhoneVerificationCode,
  verifyEmailCode,
  verifyPhoneCodeAndSignIn,
} from '@/src/services/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Register thunk (main registration)
export const registerThunk = createAsyncThunk(
  'auth/register',
  async (data: RegistrationProps, { rejectWithValue }) => {
    try {
      const result = await register(data);
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
  async (authUid: string, { rejectWithValue }) => {
    try {
      const member = await getMemberByAuthUid(authUid);
      return member;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Get member by email thunk (fallback)
// export const getMemberByEmailThunk = createAsyncThunk(
//   'auth/getMemberByEmail',
//   async (email: string, { rejectWithValue }) => {
//     try {
//       const member = await getMemberByEmail(email);
//       return member;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

// Find member thunk (for search functionality)
export const findMemberThunk = createAsyncThunk(
  'auth/findMember',
  async (emailOrPhone: string, { rejectWithValue }) => {
    try {
      const member = await findMember(emailOrPhone);
      return member;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Send email verification code thunk
export const sendEmailVerificationThunk = createAsyncThunk(
  'auth/sendEmailVerification',
  async (email: string, { rejectWithValue }) => {
    try {
      await sendEmailVerificationCode(email);
      return { email };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Verify email code thunk
export const verifyEmailThunk = createAsyncThunk(
  'auth/verifyEmail',
  async (
    { email, code }: { email: string; code: string },
    { rejectWithValue },
  ) => {
    try {
      const success = await verifyEmailCode(email, code);
      return { email, success };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Send phone verification code thunk
export const sendPhoneVerificationThunk = createAsyncThunk(
  'auth/sendPhoneVerification',
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      const verificationId = await sendPhoneVerificationCode(phoneNumber);
      return { phoneNumber, verificationId };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Verify phone code thunk
export const verifyPhoneThunk = createAsyncThunk(
  'auth/verifyPhone',
  async (
    { verificationId }: { verificationId: string },
    { rejectWithValue },
  ) => {
    try {
      const member = await verifyPhoneCodeAndSignIn(verificationId);
      return member;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Forgot password thunks
export const sendForgotPasswordThunk = createAsyncThunk(
  'auth/sendForgotPassword',
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      const verificationId = await sendForgotPasswordCode(phoneNumber);
      return { phoneNumber, verificationId };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const resetPasswordThunk = createAsyncThunk(
  'auth/resetPassword',
  async (
    {
      phoneNumber,
      verificationId,
      code,
      newPassword,
    }: {
      phoneNumber: string;
      verificationId: string;
      code: string;
      newPassword: string;
    },
    { rejectWithValue },
  ) => {
    try {
      await resetPasswordWithPhone(
        phoneNumber,
        verificationId,
        code,
        newPassword,
      );
      return { success: true };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
