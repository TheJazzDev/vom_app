import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchAllBandsThunk,
  fetchAllChildrenThunk,
  fetchAllMembersThunk,
  fetchBandWithMembersThunk,
  fetchDirectoryStatsThunk,
} from '../thunks/directory';

const initialState: DirectoryState = {
  directoryStats: {
    membersCount: 0,
    guestsCount: 0,
    bandsCount: 0,
    departmentsCount: 0,
    childrenCount: 0,
  },
  allMembers: [],
  allBands: [],
  allChildren: [],
  bandWithMembers: null,
  isFetchingBandWithMembers: false,
  isFetchingDirectoryStats: false,
  isFetchingMembers: false,
  isFetchingBands: false,
  isFetchingChildren: false,
  error: null,
};

const directorySlice = createSlice({
  name: 'directory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMembersThunk.pending, (state) => {
        state.isFetchingMembers = true;
        state.error = null;
      })
      .addCase(
        fetchAllMembersThunk.fulfilled,
        (state, action: PayloadAction<UserProfile[]>) => {
          state.isFetchingMembers = false;
          state.allMembers = action.payload;
        },
      )
      .addCase(fetchAllMembersThunk.rejected, (state, action) => {
        state.isFetchingMembers = false;
        state.error = action.error.message || 'Failed to load members';
      });
    builder
      .addCase(fetchDirectoryStatsThunk.pending, (state) => {
        state.isFetchingDirectoryStats = true;
        state.error = null;
      })
      .addCase(fetchDirectoryStatsThunk.fulfilled, (state, action) => {
        state.isFetchingDirectoryStats = false;
        state.directoryStats = action.payload;
      })
      .addCase(fetchDirectoryStatsThunk.rejected, (state, action) => {
        state.isFetchingDirectoryStats = false;
        state.error = action.error.message || 'Failed to load band members';
      });
    builder
      .addCase(fetchAllBandsThunk.pending, (state) => {
        state.isFetchingBands = true;
        state.error = null;
      })
      .addCase(fetchAllBandsThunk.fulfilled, (state, action) => {
        state.isFetchingBands = false;
        state.allBands = action.payload;
      })
      .addCase(fetchAllBandsThunk.rejected, (state, action) => {
        state.isFetchingBands = false;
        state.error = action.error.message || 'Failed to load band members';
      });
    builder
      .addCase(fetchBandWithMembersThunk.pending, (state) => {
        state.isFetchingBandWithMembers = true;
        state.error = null;
      })
      .addCase(fetchBandWithMembersThunk.fulfilled, (state, action) => {
        state.isFetchingBandWithMembers = false;
        state.bandWithMembers = action.payload;
      })
      .addCase(fetchBandWithMembersThunk.rejected, (state, action) => {
        state.isFetchingBandWithMembers = false;
        state.error = action.error.message || 'Failed to load band members';
      });
    builder
      .addCase(fetchAllChildrenThunk.pending, (state) => {
        state.isFetchingChildren = true;
        state.error = null;
      })
      .addCase(
        fetchAllChildrenThunk.fulfilled,
        (state, action: PayloadAction<ChildrenProfile[]>) => {
          state.isFetchingChildren = false;
          state.allChildren = action.payload;
        },
      )
      .addCase(fetchAllChildrenThunk.rejected, (state, action) => {
        state.isFetchingChildren = false;
        state.error = action.error.message || 'Failed to load Children';
      });
  },
});

export function useDirectorySlice() {
  const state = useSelector(({ directory }: RootState) => directory);

  return {
    ...state,
    ...directorySlice.actions,
  };
}

export default directorySlice.reducer;
