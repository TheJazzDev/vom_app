import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  getMemberByAuthUidThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
  resetPasswordThunk,
  sendEmailVerificationThunk,
  sendPhoneVerificationThunk,
  updateProfileThunk,
  verifyEmailThunk,
} from '../thunks/auth';

const initialState: AuthState = {
  currentMember: null,
  isAuthenticated: false,
  registrationResult: null,
  foundMember: null,
  phoneVerificationId: null,
  phoneNumber: null,
  isWaitingForSMS: false,
  isLoading: false,
  isRegistering: false,
  isVerifyingEmail: false,
  isSendingEmailCode: false,
  isLoggingIn: false,
  isSigningOut: false,
  isResettingPassword: false,
  isUpdatingProfile: false,
  isSendingPhoneCode: false,
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
    setAuthInitialized: (state) => {
      state.isInitialized = true;
    },
    // For handling Firebase Auth state changes
    setCurrentMember: (state, action: PayloadAction<MemberProfile | null>) => {
      state.currentMember = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerThunk.pending, (state) => {
        state.isRegistering = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isRegistering = false;
        state.currentMember = action.payload.member;
        state.isAuthenticated = true;
        state.successMessage = 'Registration successful! Welcome!';
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isRegistering = false;
        state.error = action.payload as string;
      });

    // Send Email Verification
    builder
      .addCase(sendEmailVerificationThunk.pending, (state) => {
        state.isSendingEmailCode = true;
        state.error = null;
      })
      .addCase(sendEmailVerificationThunk.fulfilled, (state) => {
        state.isSendingEmailCode = false;
        state.successMessage = 'Verification code sent to your email!';
      })
      .addCase(sendEmailVerificationThunk.rejected, (state, action) => {
        state.isSendingEmailCode = false;
        state.error = action.payload as string;
      });

    // Verify Email
    builder
      .addCase(verifyEmailThunk.pending, (state) => {
        state.isVerifyingEmail = true;
        state.error = null;
      })
      .addCase(verifyEmailThunk.fulfilled, (state, action) => {
        state.isVerifyingEmail = false;
        if (state.registrationResult) {
          state.currentMember = {
            ...state.registrationResult.member,
            emailVerified: true,
            verified: true,
          } as MemberProfile;
          state.isAuthenticated = true;
          state.registrationResult = null;
        }
        state.successMessage = 'Email verified successfully!';
      })
      .addCase(verifyEmailThunk.rejected, (state, action) => {
        state.isVerifyingEmail = false;
        state.error = action.payload as string;
      });

    // Send Phone Code
    builder
      .addCase(sendPhoneVerificationThunk.pending, (state) => {
        state.isSendingPhoneCode = true;
        state.error = null;
      })
      .addCase(sendPhoneVerificationThunk.fulfilled, (state, action) => {
        state.isSendingPhoneCode = false;
        state.phoneVerificationId = action.payload.verificationId;
        state.phoneNumber = action.payload.phoneNumber;
        state.isWaitingForSMS = true;
        state.successMessage = 'Verification code sent to your phone!';
      })
      .addCase(sendPhoneVerificationThunk.rejected, (state, action) => {
        state.isSendingPhoneCode = false;
        state.error = action.payload as string;
      });

    // Sign In (updated to handle phone auth)
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoggingIn = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.currentMember = action.payload;
        state.isAuthenticated = true;
        state.phoneVerificationId = null;
        state.phoneNumber = null;
        state.isWaitingForSMS = false;
        state.successMessage = 'Signed in successfully!';
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoggingIn = false;
        const errorMessage = action.payload as string;

        if (errorMessage === 'VERIFICATION_CODE_SENT') {
          // Special case: phone verification code was sent
          state.isWaitingForSMS = true;
          state.successMessage = 'Verification code sent to your phone!';
        } else {
          state.error = errorMessage;
        }
      });

    // Log Out
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.isSigningOut = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isSigningOut = false;
        state.currentMember = null;
        state.isAuthenticated = false;
        state.foundMember = null;
        state.successMessage = 'Signed out successfully!';
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isSigningOut = false;
        state.error = action.payload as string;
      });

    // Get Member by Auth UID
    builder
      .addCase(getMemberByAuthUidThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMemberByAuthUidThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMember = action.payload;
        state.isAuthenticated = !!action.payload;
        state.isInitialized = true;
      })
      .addCase(getMemberByAuthUidThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isInitialized = true;
      });

    // Reset Password
    builder
      .addCase(resetPasswordThunk.pending, (state) => {
        state.isResettingPassword = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.isResettingPassword = false;
        // state.successMessage = action.payload;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.isResettingPassword = false;
        state.error = action.payload as string;
      });

    // Update Profile
    builder
      .addCase(updateProfileThunk.pending, (state) => {
        state.isUpdatingProfile = true;
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.isUpdatingProfile = false;
        if (state.currentMember) {
          state.currentMember = { ...state.currentMember, ...action.payload };
        }
        state.successMessage = 'Profile updated successfully!';
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.isUpdatingProfile = false;
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
