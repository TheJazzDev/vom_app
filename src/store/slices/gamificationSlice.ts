import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  fetchUserEngagementThunk,
  awardPointsThunk,
  updateStreakThunk,
  fetchLeaderboardThunk,
  fetchUserBadgesThunk,
  checkBadgesThunk,
  fetchActivityLogThunk,
  fetchUserRankThunk,
} from '../thunks/gamificationThunks';
import type {
  UserEngagement,
  LeaderboardEntry,
  ActivityLog,
  LevelConfig,
} from '@/src/services/gamification';
import type { Badge } from '@/src/services/gamification/badges';

interface PointsAward {
  points: number;
  description: string;
  timestamp: number;
}

interface GamificationState {
  // User engagement
  engagement: UserEngagement | null;
  userRank: number;

  // Badges
  badges: Badge[];
  newlyEarnedBadges: Badge[];

  // Leaderboard
  leaderboard: LeaderboardEntry[];
  leaderboardType: 'weekly' | 'monthly' | 'allTime';

  // Activity log
  activityLog: ActivityLog[];

  // Points animation
  recentPointsAward: PointsAward | null;
  showPointsAnimation: boolean;

  // Level up
  leveledUp: boolean;
  newLevel: LevelConfig | null;

  // Loading states
  isLoadingEngagement: boolean;
  isLoadingLeaderboard: boolean;
  isLoadingBadges: boolean;
  isLoadingActivity: boolean;
  isAwardingPoints: boolean;

  // Error states
  error: string | null;
}

const initialState: GamificationState = {
  engagement: null,
  userRank: 0,

  badges: [],
  newlyEarnedBadges: [],

  leaderboard: [],
  leaderboardType: 'allTime',

  activityLog: [],

  recentPointsAward: null,
  showPointsAnimation: false,

  leveledUp: false,
  newLevel: null,

  isLoadingEngagement: false,
  isLoadingLeaderboard: false,
  isLoadingBadges: false,
  isLoadingActivity: false,
  isAwardingPoints: false,

  error: null,
};

const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPointsAnimation: (state) => {
      state.showPointsAnimation = false;
      state.recentPointsAward = null;
    },
    clearLevelUp: (state) => {
      state.leveledUp = false;
      state.newLevel = null;
    },
    clearNewlyEarnedBadges: (state) => {
      state.newlyEarnedBadges = [];
    },
    setLeaderboardType: (
      state,
      action: PayloadAction<'weekly' | 'monthly' | 'allTime'>,
    ) => {
      state.leaderboardType = action.payload;
    },
    showPointsAward: (state, action: PayloadAction<PointsAward>) => {
      state.recentPointsAward = action.payload;
      state.showPointsAnimation = true;
    },
  },
  extraReducers: (builder) => {
    // Fetch user engagement
    builder
      .addCase(fetchUserEngagementThunk.pending, (state) => {
        state.isLoadingEngagement = true;
        state.error = null;
      })
      .addCase(fetchUserEngagementThunk.fulfilled, (state, action) => {
        state.isLoadingEngagement = false;
        state.engagement = action.payload;
      })
      .addCase(fetchUserEngagementThunk.rejected, (state, action) => {
        state.isLoadingEngagement = false;
        state.error = action.payload as string;
      });

    // Award points
    builder
      .addCase(awardPointsThunk.pending, (state) => {
        state.isAwardingPoints = true;
        state.error = null;
      })
      .addCase(awardPointsThunk.fulfilled, (state, action) => {
        state.isAwardingPoints = false;
        const { newPoints, leveledUp, newLevel, pointsAwarded, description } =
          action.payload;

        // Update engagement points
        if (state.engagement) {
          state.engagement.points = newPoints;
          if (newLevel) {
            state.engagement.level = newLevel.level;
            state.engagement.levelName = newLevel.name;
          }
        }

        // Show points animation
        state.recentPointsAward = {
          points: pointsAwarded,
          description,
          timestamp: Date.now(),
        };
        state.showPointsAnimation = true;

        // Handle level up
        if (leveledUp && newLevel) {
          state.leveledUp = true;
          state.newLevel = newLevel;
        }
      })
      .addCase(awardPointsThunk.rejected, (state, action) => {
        state.isAwardingPoints = false;
        state.error = action.payload as string;
      });

    // Update streak
    builder.addCase(updateStreakThunk.fulfilled, (state, action) => {
      const { streakDays, streakBonus } = action.payload;
      if (state.engagement) {
        state.engagement.streakDays = streakDays;
      }

      // Show streak bonus if awarded
      if (streakBonus) {
        state.recentPointsAward = {
          points: streakBonus,
          description: `${streakDays}-day streak bonus!`,
          timestamp: Date.now(),
        };
        state.showPointsAnimation = true;
      }
    });

    // Fetch leaderboard
    builder
      .addCase(fetchLeaderboardThunk.pending, (state) => {
        state.isLoadingLeaderboard = true;
        state.error = null;
      })
      .addCase(fetchLeaderboardThunk.fulfilled, (state, action) => {
        state.isLoadingLeaderboard = false;
        state.leaderboard = action.payload;
      })
      .addCase(fetchLeaderboardThunk.rejected, (state, action) => {
        state.isLoadingLeaderboard = false;
        state.error = action.payload as string;
      });

    // Fetch user rank
    builder.addCase(fetchUserRankThunk.fulfilled, (state, action) => {
      state.userRank = action.payload;
    });

    // Fetch badges
    builder
      .addCase(fetchUserBadgesThunk.pending, (state) => {
        state.isLoadingBadges = true;
        state.error = null;
      })
      .addCase(fetchUserBadgesThunk.fulfilled, (state, action) => {
        state.isLoadingBadges = false;
        state.badges = action.payload;
      })
      .addCase(fetchUserBadgesThunk.rejected, (state, action) => {
        state.isLoadingBadges = false;
        state.error = action.payload as string;
      });

    // Check badges
    builder.addCase(checkBadgesThunk.fulfilled, (state, action) => {
      const newBadges = action.payload;
      if (newBadges.length > 0) {
        state.newlyEarnedBadges = newBadges;

        // Update badges list
        newBadges.forEach((newBadge) => {
          const index = state.badges.findIndex((b) => b.id === newBadge.id);
          if (index !== -1) {
            state.badges[index] = newBadge;
          }
        });
      }
    });

    // Fetch activity log
    builder
      .addCase(fetchActivityLogThunk.pending, (state) => {
        state.isLoadingActivity = true;
        state.error = null;
      })
      .addCase(fetchActivityLogThunk.fulfilled, (state, action) => {
        state.isLoadingActivity = false;
        state.activityLog = action.payload;
      })
      .addCase(fetchActivityLogThunk.rejected, (state, action) => {
        state.isLoadingActivity = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearError,
  clearPointsAnimation,
  clearLevelUp,
  clearNewlyEarnedBadges,
  setLeaderboardType,
  showPointsAward,
} = gamificationSlice.actions;

export function useGamificationSlice() {
  return useSelector(({ gamification }: RootState) => gamification);
}

export default gamificationSlice.reducer;
