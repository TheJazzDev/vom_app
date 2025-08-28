import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  findMemberThunk,
  loginThunk,
  registerThunk,
  sendEmailVerificationThunk,
  verifyEmailThunk,
} from '../thunks/auth';

interface AuthState {
  currentMember: MemberProfile | null;
  isAuthenticated: boolean;
  foundMember: MemberProfile | null;
  pendingPhoneVerification: boolean;
  pendingEmailVerification: boolean;
  registrationResult: RegistrationResult | null;
  phoneVerificationId: string | null;
  phoneNumber: string | null;
  isWaitingForSMS: boolean;
  isFindingMember: boolean;
  isRegistering: boolean;
  isSigningIn: boolean;
  isSendingEmailCode: boolean;
  isVerifyingEmail: boolean;
  error: string | null;
  successMessage: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  currentMember: null,
  isAuthenticated: false,
  foundMember: null,
  pendingPhoneVerification: false,
  pendingEmailVerification: false,
  registrationResult: null,
  phoneVerificationId: null,
  phoneNumber: null,
  isWaitingForSMS: false,
  isFindingMember: false,
  isRegistering: false,
  isSigningIn: false,
  isSendingEmailCode: false,
  isVerifyingEmail: false,
  error: null,
  successMessage: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearFoundMember: (state) => {
      state.foundMember = null;
    },
    clearRegistrationResult: (state) => {
      state.registrationResult = null;
      state.pendingPhoneVerification = false;
      state.pendingEmailVerification = false;
    },
    setAuthInitialized: (state) => {
      state.isInitialized = true;
    },
    setCurrentMember: (state, action: PayloadAction<MemberProfile | null>) => {
      state.currentMember = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setPhoneVerificationData: (
      state,
      action: PayloadAction<{
        phoneVerificationId: string;
        phoneNumber: string;
      }>,
    ) => {
      state.phoneVerificationId = action.payload.phoneVerificationId;
      state.phoneNumber = action.payload.phoneNumber;
      state.isWaitingForSMS = true;
    },
    clearPhoneVerificationData: (state) => {
      state.phoneVerificationId = null;
      state.phoneNumber = null;
      state.isWaitingForSMS = false;
    },
    completePendingRegistration: (state) => {
      if (state.registrationResult) {
        state.currentMember = state.registrationResult.member;
        state.isAuthenticated = true;
        state.pendingPhoneVerification = false;
        state.pendingEmailVerification = false;
        state.registrationResult = null;
      }
    },
    logout: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Find Member
    builder
      .addCase(findMemberThunk.pending, (state) => {
        state.isFindingMember = true;
        state.error = null;
        state.foundMember = null;
      })
      .addCase(findMemberThunk.fulfilled, (state, action) => {
        state.isFindingMember = false;
        state.foundMember = action.payload;
      })
      .addCase(findMemberThunk.rejected, (state, action) => {
        state.isFindingMember = false;
        state.error = action.payload as string;
        state.foundMember = null;
      });

    // Login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isSigningIn = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isSigningIn = false;
        state.currentMember = action.payload;
        state.isAuthenticated = true;
        state.phoneVerificationId = null;
        state.phoneNumber = null;
        state.isWaitingForSMS = false;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isSigningIn = false;
        const errorMessage = action.payload as string;

        if (errorMessage === 'VERIFICATION_CODE_SENT') {
          // Special case: phone verification code was sent
          state.isWaitingForSMS = true;
          state.successMessage = 'Verification code sent to your phone!';
        } else {
          state.error = errorMessage;
        }
      });

    // Register
    builder
      .addCase(registerThunk.pending, (state) => {
        state.isRegistering = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isRegistering = false;
        state.registrationResult = action.payload;
        state.foundMember = null;

        if (action.payload.requiresPhoneVerification) {
          state.pendingPhoneVerification = true;
        }

        if (action.payload.requiresEmailVerification) {
          state.pendingEmailVerification = true;
        }
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isRegistering = false;
        state.error = action.payload as string;
      });

    // Send Email Verification Code
    builder
      .addCase(sendEmailVerificationThunk.pending, (state) => {
        state.isSendingEmailCode = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendEmailVerificationThunk.fulfilled, (state) => {
        state.isSendingEmailCode = false;
        state.successMessage = 'Verification code sent to your email!';
      })
      .addCase(sendEmailVerificationThunk.rejected, (state, action) => {
        state.isSendingEmailCode = false;
        state.error = action.payload as string;
      });

    // Verify Email Code
    builder
      .addCase(verifyEmailThunk.pending, (state) => {
        state.isVerifyingEmail = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(verifyEmailThunk.fulfilled, (state, action) => {
        state.isVerifyingEmail = false;
        state.pendingEmailVerification = false;
        state.successMessage = 'Email verified successfully!';

        // Complete authentication if we have a registration result
        if (state.registrationResult) {
          state.currentMember = {
            ...state.registrationResult.member,
            emailVerified: true,
            verified: true,
          };
          state.isAuthenticated = true;
          state.registrationResult = null;
        }
      })
      .addCase(verifyEmailThunk.rejected, (state, action) => {
        state.isVerifyingEmail = false;
        state.error = action.payload as string;
      });
  },
});

// Custom hook for using auth slice
export function useAuthSlice() {
  const state = useSelector(({ auth }: RootState) => auth);

  return {
    ...state,
    ...authSlice.actions,
  };
}

export default authSlice.reducer;
