import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '..';

interface UserState {
  profile: MemberProfile | null;
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark';
    language: string;
  };
  isLoading: boolean;
}

const initialState: UserState = {
  profile: null,
  preferences: {
    notifications: true,
    theme: 'light',
    language: 'en',
  },
  isLoading: false,
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<MemberProfile>) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<MemberProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    updatePreferences: (
      state,
      action: PayloadAction<Partial<UserState['preferences']>>,
    ) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export function useMemberSlice() {
  const state = useSelector(({ member }: RootState) => member);

  return {
    ...state,
    ...memberSlice.actions,
  };
}

export default memberSlice.reducer;
