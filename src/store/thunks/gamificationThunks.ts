import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserEngagement,
  initializeUserEngagement,
  awardPoints,
  updateStreak,
  getLeaderboard,
  getActivityLog,
  getUserRank,
  POINTS_CONFIG,
  type ActivityType,
} from '@/src/services/gamification';
import {
  getUserBadges,
  checkAndAwardBadges,
} from '@/src/services/gamification/badges';

// Fetch user engagement
export const fetchUserEngagementThunk = createAsyncThunk(
  'gamification/fetchUserEngagement',
  async (odUserId: string, { rejectWithValue }) => {
    try {
      let engagement = await getUserEngagement(odUserId);

      if (!engagement) {
        engagement = await initializeUserEngagement(odUserId);
      }

      return engagement;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch engagement');
    }
  }
);

// Initialize user engagement (for new users)
export const initializeEngagementThunk = createAsyncThunk(
  'gamification/initializeEngagement',
  async (odUserId: string, { rejectWithValue }) => {
    try {
      const engagement = await initializeUserEngagement(odUserId);
      return engagement;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to initialize engagement');
    }
  }
);

// Award points
export const awardPointsThunk = createAsyncThunk(
  'gamification/awardPoints',
  async (
    {
      odUserId,
      activityType,
      customPoints,
    }: {
      odUserId: string;
      activityType: ActivityType;
      customPoints?: number;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const result = await awardPoints(odUserId, activityType, customPoints);

      // Check for new badges after awarding points
      dispatch(checkBadgesThunk(odUserId));

      return {
        ...result,
        description: POINTS_CONFIG[activityType].description,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to award points');
    }
  }
);

// Update streak (call on app open/daily login)
export const updateStreakThunk = createAsyncThunk(
  'gamification/updateStreak',
  async (odUserId: string, { rejectWithValue, dispatch }) => {
    try {
      const result = await updateStreak(odUserId);

      // If it's a new day, also check for badges
      if (result.isNewDay) {
        dispatch(checkBadgesThunk(odUserId));
      }

      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update streak');
    }
  }
);

// Fetch leaderboard
export const fetchLeaderboardThunk = createAsyncThunk(
  'gamification/fetchLeaderboard',
  async (
    {
      type = 'allTime',
      limit = 50,
    }: {
      type?: 'weekly' | 'monthly' | 'allTime';
      limit?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const leaderboard = await getLeaderboard(type, limit);
      return leaderboard;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch leaderboard');
    }
  }
);

// Fetch user rank
export const fetchUserRankThunk = createAsyncThunk(
  'gamification/fetchUserRank',
  async (odUserId: string, { rejectWithValue }) => {
    try {
      const rank = await getUserRank(odUserId);
      return rank;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch user rank');
    }
  }
);

// Fetch user badges
export const fetchUserBadgesThunk = createAsyncThunk(
  'gamification/fetchUserBadges',
  async (odUserId: string, { rejectWithValue }) => {
    try {
      const badges = await getUserBadges(odUserId);
      return badges;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch badges');
    }
  }
);

// Check and award badges
export const checkBadgesThunk = createAsyncThunk(
  'gamification/checkBadges',
  async (odUserId: string, { rejectWithValue }) => {
    try {
      const newBadges = await checkAndAwardBadges(odUserId);
      return newBadges;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to check badges');
    }
  }
);

// Fetch activity log
export const fetchActivityLogThunk = createAsyncThunk(
  'gamification/fetchActivityLog',
  async (
    { odUserId, limit = 20 }: { odUserId: string; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const activityLog = await getActivityLog(odUserId, limit);
      return activityLog;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch activity log');
    }
  }
);

// Combined action: Daily login check (updates streak + awards daily points)
export const dailyLoginCheckThunk = createAsyncThunk(
  'gamification/dailyLoginCheck',
  async (odUserId: string, { dispatch, rejectWithValue }) => {
    try {
      // Update streak first
      const streakResult = await dispatch(updateStreakThunk(odUserId)).unwrap();

      // Award daily login points only if it's a new day
      if (streakResult.isNewDay) {
        await dispatch(
          awardPointsThunk({
            odUserId,
            activityType: 'daily_login',
          })
        ).unwrap();
      }

      // Refresh engagement data
      await dispatch(fetchUserEngagementThunk(odUserId)).unwrap();

      return streakResult;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to process daily login');
    }
  }
);
