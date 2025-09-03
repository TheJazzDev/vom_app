import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  activateMemberAccountThunk,
  createGuestAccountThunk,
  findMemberForActivationThunk,
  getMemberByAuthUidThunk,
  loginThunk,
  logoutThunk,
  resetPasswordThunk,
  sendEmailVerificationLinkThunk,
  // sendEmailVerificationThunk,
  sendPhoneVerificationThunk,
  updateProfileThunk,
} from '../thunks/auth';

const initialState: AuthState = {
  currentUser: null,
  isAuthenticated: false,
  // activationResult: null,
  guestRegistrationResult: null,
  foundMember: null,
  phoneVerificationId: null,
  phoneNumber: null,
  isWaitingForSMS: false,
  isLoading: false,
  isfindingMemberForActivation: false,
  isActivatingMemberAccount: false,
  isCreatingGuestAccount: false,
  isVerifyingEmail: false,
  // isSendingEmailCode: false,
  isSendingEmailVerificationLink: false,
  isLoggingIn: false,
  isLoggingOut: false,
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
    // clearActivationResult: (state) => {
    //   state.activationResult = null;
    // },
    clearGuestRegistrationResult: (state) => {
      state.guestRegistrationResult = null;
    },
    setAuthInitialized: (state) => {
      state.isInitialized = true;
    },
    setCurrentUser: (
      state,
      action: PayloadAction<MemberProfile | GuestProfile | null>,
    ) => {
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
        // state.activationResult = action.payload;
        state.foundMember = null;
      })
      .addCase(activateMemberAccountThunk.rejected, (state, action) => {
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
    // builder
    //   .addCase(sendEmailVerificationThunk.pending, (state) => {
    //     state.isSendingEmailCode = true;
    //     state.error = null;
    //   })
    //   .addCase(sendEmailVerificationThunk.fulfilled, (state) => {
    //     state.isSendingEmailCode = false;
    //     state.successMessage = 'Verification code sent to your email!';
    //   })
    //   .addCase(sendEmailVerificationThunk.rejected, (state, action) => {
    //     state.isSendingEmailCode = false;
    //     state.error = action.payload as string;
    //   });

    // Verify Email
    // builder
    //   .addCase(verifyEmailThunk.pending, (state) => {
    //     state.isVerifyingEmail = true;
    //     state.error = null;
    //   })
    //   .addCase(verifyEmailThunk.fulfilled, (state, action) => {
    //     state.isVerifyingEmail = false;

    //     if (state.activationResult) {
    //       // Member activation completed
    //       state.currentUser = {
    //         ...state.activationResult.member,
    //         emailVerified: true,
    //         verified: true,
    //       } as MemberProfile;
    //       state.isAuthenticated = true;
    //       state.activationResult = null;
    //     } else if (state.guestRegistrationResult) {
    //       // Guest registration completed
    //       state.currentUser = {
    //         ...state.guestRegistrationResult.guest,
    //         emailVerified: true,
    //         verified: true,
    //       } as GuestProfile;
    //       state.isAuthenticated = true;
    //       state.guestRegistrationResult = null;
    //     }

    //     state.successMessage = 'Email verified successfully!';
    //   })
    //   .addCase(verifyEmailThunk.rejected, (state, action) => {
    //     state.isVerifyingEmail = false;
    //     state.error = action.payload as string;
    //   });

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
        // state.activationResult = null;
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

    // Reset Password
    builder
      .addCase(resetPasswordThunk.pending, (state) => {
        state.isResettingPassword = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.isResettingPassword = false;
        state.successMessage = 'Password reset email sent!';
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
        if (state.currentUser) {
          state.currentUser = {
            ...state.currentUser,
            ...action.payload,
          } as UserProfile;
        }
        state.successMessage = 'Profile updated successfully!';
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.isUpdatingProfile = false;
        state.error = action.payload as string;
      });
  },
});

export function useAuthSlice() {
  const state = useSelector(({ auth }: RootState) => auth);

  const { currentUser, ...rest } = state;

  const getGuestId = (user: UserProfile | null): string | null => {
    if (!user || user.accountType !== 'guest') return null;
    return user.guestId;
  };
  const getMemberId = (user: UserProfile | null): string | null => {
    if (!user || user.accountType !== 'member') return null;
    return user.memberId;
  };

  return {
    currentUser,
    guestId: getGuestId(currentUser),
    memberId: getMemberId(currentUser),
    isMember: currentUser?.accountType === 'member',
    isGuest: currentUser?.accountType === 'guest',
    ...rest,
    ...authSlice.actions,
  };
}

export default authSlice.reducer;
