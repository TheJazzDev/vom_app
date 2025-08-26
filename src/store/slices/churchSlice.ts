import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '..';

interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  requestedBy: string;
  createdAt: string;
  status: 'active' | 'answered' | 'closed';
}

interface ChurchState {
  members: MemberProfile[];
  prayerRequests: PrayerRequest[];
  announcements: any[];
  isLoading: boolean;
}

const initialState: ChurchState = {
  members: [],
  prayerRequests: [],
  announcements: [],
  isLoading: false,
};

const churchSlice = createSlice({
  name: 'church',
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<MemberProfile[]>) => {
      state.members = action.payload;
    },
    addMember: (state, action: PayloadAction<MemberProfile>) => {
      state.members.push(action.payload);
    },
    setPrayerRequests: (state, action: PayloadAction<PrayerRequest[]>) => {
      state.prayerRequests = action.payload;
    },
    addPrayerRequest: (state, action: PayloadAction<PrayerRequest>) => {
      state.prayerRequests.unshift(action.payload);
    },
    updatePrayerRequest: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<PrayerRequest> }>,
    ) => {
      const index = state.prayerRequests.findIndex(
        (req) => req.id === action.payload.id,
      );
      if (index !== -1) {
        state.prayerRequests[index] = {
          ...state.prayerRequests[index],
          ...action.payload.updates,
        };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export function useChurchSlice() {
  const state = useSelector(({ church }: RootState) => church);

  return {
    ...state,
    ...churchSlice.actions,
  };
}

export default churchSlice.reducer;
