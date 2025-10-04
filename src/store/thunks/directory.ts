import {
  getAllBands,
  getBandById,
  getBandWithMembers,
} from '@/src/services/directory/bands';
import { getAllChildren } from '@/src/services/directory/children';
import {
  getAllDepartments,
  getDepartmentById,
  getDepartmentWithMembers,
} from '@/src/services/directory/departments';
import { getDirectoryStats } from '@/src/services/directory/directory';
import { getAllMembers } from '@/src/services/directory/members';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDirectoryStatsThunk = createAsyncThunk(
  'directory/fetchDirectoryStatsThunk',
  async () => {
    const stats = await getDirectoryStats();

    return stats;
  },
);

export const fetchAllMembersThunk = createAsyncThunk<UserProfile[]>(
  'directory/fetchMembers',
  async () => {
    const members = await getAllMembers();
    return members;
  },
);

export const fetchAllBandsThunk = createAsyncThunk(
  'directory/fetchAllBands',
  async () => {
    const bands = await getAllBands();

    return bands;
  },
);

export const fetchBandByIdThunk = createAsyncThunk(
  'directory/fetchBandByIdThunk',
  async (bandId: BandKeys) => {
    const band = await getBandById(bandId);

    return band;
  },
);

export const fetchBandWithMembersThunk = createAsyncThunk(
  'directory/fetchBandWithMembersThunk',
  async (bandId: BandKeys) => {
    const band = await getBandWithMembers(bandId);

    return band;
  },
);

export const fetchAllChildrenThunk = createAsyncThunk<ChildrenProfile[]>(
  'directory/fetchChildren',
  async () => {
    const members = await getAllChildren();
    return members;
  },
);

export const fetchAllDepartmentsThunk = createAsyncThunk<Department[]>(
  'directory/fetchAllDepartments',
  async () => {
    const departments = await getAllDepartments();
    return departments;
  },
);

export const fetchDepartmentWithMembersThunk = createAsyncThunk(
  'directory/fetchDepartmentWithMembersThunk',
  async (departmentId: DepartmentKeys) => {
    const department = await getDepartmentWithMembers(departmentId);
    return department;
  },
);

export const fetchDepartmentByIdThunk = createAsyncThunk(
  'directory/fetchDepartmentByIdThunk',
  async (departmentId: DepartmentKeys) => {
    const department = await getDepartmentById(departmentId);
    return department;
  },
);
