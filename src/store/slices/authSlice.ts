import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  activateMemberAccountThunk,
  createGuestAccountThunk,
  findMemberByPhoneThunk,
  findMemberForActivationThunk,
  getMemberByAuthUidThunk,
  getMemberByIdThunk,
  loginThunk,
  logoutThunk,
  sendEmailVerificationLinkThunk,
  sendPasswordResetEmailThunk,
  sendPhoneLoginCodeThunk,
  updateUserProfileThunk,
  verifyPhoneAndSignInThunk,
  verifyPhoneLoginCodeThunk,
} from '../thunks/auth';

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  guestRegistrationResult: null,
  foundMember: null,
  activationResult: null,
  searchedMemberDetails: null,
  isSearchingMember: false,
  phoneVerificationId: null,
  phoneNumber: null,
  isWaitingForSMS: false,
  phoneMemberFound: null,
  passwordResetEmailSent: false,
  isLoading: false,
  isfindingMemberForActivation: false,
  isActivatingMemberAccount: false,
  isCreatingGuestAccount: false,
  isVerifyingEmail: false,
  isSendingEmailVerificationLink: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isUpdatingProfile: false,
  isSendingPasswordResetEmail: false,
  isSendingPhoneCode: false,
  isVerifyingPhoneCode: false,
  isFindingMemberByPhone: false,
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
    clearGuestRegistrationResult: (state) => {
      state.guestRegistrationResult = null;
    },
    clearPhoneLoginState: (state) => {
      state.phoneVerificationId = null;
      state.phoneNumber = null;
      state.isWaitingForSMS = false;
      state.phoneMemberFound = null;
    },
    clearPasswordResetState: (state) => {
      state.passwordResetEmailSent = false;
    },
    setAuthInitialized: (state) => {
      state.isInitialized = true;
    },
    setCurrentUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findMemberForActivationThunk.pending, (state) => {
        state.isfindingMemberForActivation = true;
        state.error = null;
        state.foundMember = null;
      })
      .addCase(findMemberForActivationThunk.fulfilled, (state, action) => {
        state.isfindingMemberForActivation = false;
        state.foundMember = action.payload;
        if (action.payload) {
          state.successMessage = 'Member profile found!';
        } else {
          state.error =
            'No member found with this email or phone. Please contact admin or try a different auth method.';
        }
      })
      .addCase(findMemberForActivationThunk.rejected, (state, action) => {
        state.isfindingMemberForActivation = false;
        state.error = action.payload as string;
        state.foundMember = null;
      });

    // Activate Member
    builder
      .addCase(activateMemberAccountThunk.pending, (state) => {
        state.isActivatingMemberAccount = true;
        state.error = null;
      })
      .addCase(activateMemberAccountThunk.fulfilled, (state, action) => {
        state.isActivatingMemberAccount = false;
        state.activationResult = action.payload;
      })
      .addCase(activateMemberAccountThunk.rejected, (state, action) => {
        state.isActivatingMemberAccount = false;
        state.error = action.payload as string;
      });

    // Verify member and signin using phone
    builder
      .addCase(verifyPhoneAndSignInThunk.pending, (state) => {
        state.isActivatingMemberAccount = true;
        state.error = null;
      })
      .addCase(verifyPhoneAndSignInThunk.fulfilled, (state, action) => {
        state.isActivatingMemberAccount = false;
        state.foundMember = null;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.successMessage = 'Phone verified and signed in successfully';
      })
      .addCase(verifyPhoneAndSignInThunk.rejected, (state, action) => {
        state.isActivatingMemberAccount = false;
        state.error = action.payload as string;
      });

    // Create Guest Account
    builder
      .addCase(createGuestAccountThunk.pending, (state) => {
        state.isCreatingGuestAccount = true;
        state.error = null;
      })
      .addCase(createGuestAccountThunk.fulfilled, (state, action) => {
        state.isCreatingGuestAccount = false;
        state.guestRegistrationResult = action.payload;
      })
      .addCase(createGuestAccountThunk.rejected, (state, action) => {
        state.isCreatingGuestAccount = false;
        state.error = action.payload as string;
      });

    // Send Email Verification
    builder
      .addCase(sendEmailVerificationLinkThunk.pending, (state) => {
        state.isSendingEmailVerificationLink = true;
        state.error = null;
      })
      .addCase(sendEmailVerificationLinkThunk.fulfilled, (state) => {
        state.isSendingEmailVerificationLink = false;
        state.successMessage = 'Verification link sent to your email!';
      })
      .addCase(sendEmailVerificationLinkThunk.rejected, (state, action) => {
        state.isSendingEmailVerificationLink = false;
        state.error = action.payload as string;
      });

    // Login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoggingIn = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.phoneVerificationId = null;
        state.phoneNumber = null;
        state.isWaitingForSMS = false;
        state.successMessage = 'Signed in successfully!';
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoggingIn = false;
        const errorMessage = action.payload as string;

        if (errorMessage === 'SMS_CODE_SENT') {
          state.isWaitingForSMS = true;
          state.successMessage = 'Verification code sent to your phone!';
        } else {
          state.error = errorMessage;
        }
      });

    // Logout
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.isLoggingOut = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isLoggingOut = false;
        state.currentUser = null;
        state.isAuthenticated = false;
        state.foundMember = null;
        state.guestRegistrationResult = null;
        state.successMessage = 'Signed out successfully!';
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.isLoggingOut = false;
        state.error = action.payload as string;
      });

    // Get Member by Auth UID
    builder
      .addCase(getMemberByAuthUidThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMemberByAuthUidThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.isAuthenticated = !!action.payload;
        state.isInitialized = true;
      })
      .addCase(getMemberByAuthUidThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isInitialized = true;
      });

    // Get Member by ID
    builder
      .addCase(getMemberByIdThunk.pending, (state) => {
        state.isSearchingMember = true;
      })
      .addCase(getMemberByIdThunk.fulfilled, (state, action) => {
        state.isSearchingMember = false;
        state.searchedMemberDetails = action.payload;
      })
      .addCase(getMemberByIdThunk.rejected, (state, action) => {
        state.isSearchingMember = false;
        state.error = action.payload as string;
      });

    // Update User Profile
    builder
      .addCase(updateUserProfileThunk.pending, (state) => {
        state.isUpdatingProfile = true;
        state.error = null;
      })
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        state.isUpdatingProfile = false;
        if (
          action.payload &&
          typeof action.payload === 'object' &&
          'id' in action.payload
        ) {
          state.currentUser = action.payload;
        }
        state.successMessage = 'Profile updated successfully!';
      })
      .addCase(updateUserProfileThunk.rejected, (state, action) => {
        state.isUpdatingProfile = false;
        state.error = action.payload as string;
      });

    // Send Password Reset Email
    builder
      .addCase(sendPasswordResetEmailThunk.pending, (state) => {
        state.isSendingPasswordResetEmail = true;
        state.error = null;
        state.passwordResetEmailSent = false;
      })
      .addCase(sendPasswordResetEmailThunk.fulfilled, (state) => {
        state.isSendingPasswordResetEmail = false;
        state.passwordResetEmailSent = true;
        state.successMessage = 'Password reset email sent! Check your inbox.';
      })
      .addCase(sendPasswordResetEmailThunk.rejected, (state, action) => {
        state.isSendingPasswordResetEmail = false;
        state.error = action.payload as string;
      });

    // Find Member by Phone
    builder
      .addCase(findMemberByPhoneThunk.pending, (state) => {
        state.isFindingMemberByPhone = true;
        state.error = null;
        state.phoneMemberFound = null;
      })
      .addCase(findMemberByPhoneThunk.fulfilled, (state, action) => {
        state.isFindingMemberByPhone = false;
        state.phoneMemberFound = action.payload;
      })
      .addCase(findMemberByPhoneThunk.rejected, (state, action) => {
        state.isFindingMemberByPhone = false;
        state.error = action.payload as string;
      });

    // Send Phone Login Code
    builder
      .addCase(sendPhoneLoginCodeThunk.pending, (state) => {
        state.isSendingPhoneCode = true;
        state.error = null;
      })
      .addCase(sendPhoneLoginCodeThunk.fulfilled, (state, action) => {
        state.isSendingPhoneCode = false;
        state.phoneVerificationId = action.payload.verificationId;
        state.phoneNumber = action.payload.phoneNumber;
        state.isWaitingForSMS = true;
        state.successMessage = 'Verification code sent to your phone!';
      })
      .addCase(sendPhoneLoginCodeThunk.rejected, (state, action) => {
        state.isSendingPhoneCode = false;
        state.error = action.payload as string;
      });

    // Verify Phone Login Code
    builder
      .addCase(verifyPhoneLoginCodeThunk.pending, (state) => {
        state.isVerifyingPhoneCode = true;
        state.error = null;
      })
      .addCase(verifyPhoneLoginCodeThunk.fulfilled, (state, action) => {
        state.isVerifyingPhoneCode = false;
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.phoneVerificationId = null;
        state.phoneNumber = null;
        state.isWaitingForSMS = false;
        state.phoneMemberFound = null;
        state.successMessage = 'Signed in successfully!';
      })
      .addCase(verifyPhoneLoginCodeThunk.rejected, (state, action) => {
        state.isVerifyingPhoneCode = false;
        state.error = action.payload as string;
      });
  },
});

export function useAuthSlice() {
  const state = useSelector(({ auth }: RootState) => auth);

  const { currentUser, ...rest } = state;

  return {
    currentUser,
    isMember: currentUser?.accountType === 'member',
    isGuest: currentUser?.accountType === 'guest',
    ...rest,
    ...authSlice.actions,
  };
}

export default authSlice.reducer;
