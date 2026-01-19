import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchAllBandsThunk,
  fetchAllChildrenThunk,
  fetchAllDepartmentsThunk,
  fetchAllMembersThunk,
  fetchBandWithMembersThunk,
  fetchDepartmentWithMembersThunk,
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
  allChildren: [],

  allBands: [],
  bandWithMembers: null,
  isFetchingBands: false,
  isFetchingBandWithMembers: false,

  isFetchingDirectoryStats: false,
  isFetchingMembers: false,
  isFetchingChildren: false,

  allDepartments: [],
  departmentWithMembers: null,
  isFetchingAllDepartment: false,
  // isFetchingDepartmentById: false,
  isFetchingDepartmentWithMembers: false,

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
    builder
      .addCase(fetchDepartmentWithMembersThunk.pending, (state) => {
        state.isFetchingDepartmentWithMembers = true;
        state.error = null;
      })
      .addCase(fetchDepartmentWithMembersThunk.fulfilled, (state, action) => {
        state.isFetchingDepartmentWithMembers = false;
        state.departmentWithMembers = action.payload;
      })
      .addCase(fetchDepartmentWithMembersThunk.rejected, (state, action) => {
        state.isFetchingDepartmentWithMembers = false;
        state.error =
          action.error.message || 'Failed to load Department members';
      });
    builder
      .addCase(fetchAllDepartmentsThunk.pending, (state) => {
        state.isFetchingAllDepartment = true;
        state.error = null;
      })
      .addCase(fetchAllDepartmentsThunk.fulfilled, (state, action) => {
        state.isFetchingAllDepartment = false;
        state.allDepartments = action.payload;
      })
      .addCase(fetchAllDepartmentsThunk.rejected, (state, action) => {
        state.isFetchingAllDepartment = false;
        state.error = action.error.message || 'Failed to load all departments';
      });
    // builder
    //   .addCase(fetchDepartmentByIdThunk.pending, (state) => {
    //     state.isFetchingAllDepartment = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchDepartmentByIdThunk.fulfilled, (state, action) => {
    //     state.isFetchingAllDepartment = false;
    //     state.allDepartments = action.payload;
    //   })
    //   .addCase(fetchDepartmentByIdThunk.rejected, (state, action) => {
    //     state.isFetchingAllDepartment = false;
    //     state.error = action.error.message || 'Failed to load all departments';
    //   });
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
