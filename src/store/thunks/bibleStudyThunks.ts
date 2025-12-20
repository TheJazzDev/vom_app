import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getBibleStudySessions,
  getBibleStudySessionById,
  getUpcomingBibleStudySessions,
  getBibleStudyTopics,
  BibleStudySession,
  BibleStudyTopic,
  BibleStudyType,
} from '@/src/services/bibleStudy';

// Fetch Bible study sessions
export const fetchBibleStudySessionsThunk = createAsyncThunk<
  BibleStudySession[],
  {
    limitCount?: number;
    type?: BibleStudyType;
    topicId?: string;
  } | undefined,
  { rejectValue: string }
>('bibleStudy/fetchSessions', async (options, { rejectWithValue }) => {
  try {
    return await getBibleStudySessions(options);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch Bible study sessions');
  }
});

// Fetch Bible study session by ID
export const fetchBibleStudySessionByIdThunk = createAsyncThunk<
  BibleStudySession | null,
  string,
  { rejectValue: string }
>('bibleStudy/fetchSessionById', async (sessionId, { rejectWithValue }) => {
  try {
    return await getBibleStudySessionById(sessionId);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch Bible study session');
  }
});

// Fetch upcoming Bible study sessions
export const fetchUpcomingBibleStudySessionsThunk = createAsyncThunk<
  BibleStudySession[],
  number | undefined,
  { rejectValue: string }
>('bibleStudy/fetchUpcoming', async (limitCount, { rejectWithValue }) => {
  try {
    return await getUpcomingBibleStudySessions(limitCount);
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch upcoming sessions');
  }
});

// Fetch Bible study topics
export const fetchBibleStudyTopicsThunk = createAsyncThunk<
  BibleStudyTopic[],
  void,
  { rejectValue: string }
>('bibleStudy/fetchTopics', async (_, { rejectWithValue }) => {
  try {
    return await getBibleStudyTopics();
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch Bible study topics');
  }
});
