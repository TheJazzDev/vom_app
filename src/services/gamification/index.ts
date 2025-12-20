import { firestore } from '@/src/config/firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  increment,
  arrayUnion,
  Timestamp,
  addDoc,
  where,
} from 'firebase/firestore';
import { serializeFirestoreData } from '@/src/utils';

// ============================================
// TYPES
// ============================================

export type ActivityType =
  | 'daily_login'
  | 'daily_prayer_read'
  | 'prayer_request_submit'
  | 'pray_for_someone'
  | 'bible_study_complete'
  | 'sermon_watch'
  | 'testimony_submit'
  | 'comment_post'
  | 'profile_complete'
  | 'streak_bonus'
  | 'first_action'
  | 'weekly_goal'
  | 'like_given'
  | 'share_content';

export interface UserEngagement {
  odUserId: string;
  points: number;
  level: number;
  levelName: string;
  streakDays: number;
  longestStreak: number;
  lastActiveDate: string;
  badges: string[];
  prayerRequestsSubmitted: number;
  prayerRequestsPrayedFor: number;
  testimoniesShared: number;
  bibleStudiesCompleted: number;
  sermonsWatched: number;
  commentsPosted: number;
  dailyPrayersRead: number;
  likesGiven: number;
  totalLogins: number;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  type: ActivityType;
  points: number;
  description: string;
  createdAt: string;
}

export interface LeaderboardEntry {
  odUserId: string;
  userName: string;
  userAvatar: string | null;
  points: number;
  level: number;
  levelName: string;
  rank: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  category: 'prayer' | 'study' | 'community' | 'streak' | 'special';
  threshold: number;
  isEarned: boolean;
  earnedAt: string | null;
  progress: number;
}

// ============================================
// LEVEL CONFIGURATION - 14 LEVELS
// ============================================

export interface LevelConfig {
  level: number;
  name: string;
  minPoints: number;
  icon: string;
  color: string;
  description: string;
}

export const LEVELS: LevelConfig[] = [
  {
    level: 1,
    name: 'Seedling',
    minPoints: 0,
    icon: '🌱',
    color: '#A3E635',
    description: 'Just planted in faith',
  },
  {
    level: 2,
    name: 'Sprout',
    minPoints: 100,
    icon: '🌿',
    color: '#84CC16',
    description: 'Beginning to grow',
  },
  {
    level: 3,
    name: 'Sapling',
    minPoints: 300,
    icon: '🪴',
    color: '#65A30D',
    description: 'Taking root in the Word',
  },
  {
    level: 4,
    name: 'Young Tree',
    minPoints: 600,
    icon: '🌳',
    color: '#4D7C0F',
    description: 'Growing stronger daily',
  },
  {
    level: 5,
    name: 'Growing Tree',
    minPoints: 1000,
    icon: '🌲',
    color: '#3F6212',
    description: 'Reaching for the heavens',
  },
  {
    level: 6,
    name: 'Fruitful Tree',
    minPoints: 1800,
    icon: '🍇',
    color: '#7C3AED',
    description: 'Bearing spiritual fruit',
  },
  {
    level: 7,
    name: 'Strong Oak',
    minPoints: 3000,
    icon: '🪵',
    color: '#92400E',
    description: 'Standing firm in faith',
  },
  {
    level: 8,
    name: 'Mighty Oak',
    minPoints: 5000,
    icon: '🏔️',
    color: '#78716C',
    description: 'Unmovable and steadfast',
  },
  {
    level: 9,
    name: 'Ancient Oak',
    minPoints: 8500,
    icon: '🦅',
    color: '#0369A1',
    description: 'Wisdom of the ages',
  },
  {
    level: 10,
    name: 'Forest Guardian',
    minPoints: 14000,
    icon: '🛡️',
    color: '#0F766E',
    description: 'Protector of the flock',
  },
  {
    level: 11,
    name: 'Mountain Elder',
    minPoints: 23000,
    icon: '⛰️',
    color: '#6366F1',
    description: 'A pillar of the community',
  },
  {
    level: 12,
    name: 'Valley Sage',
    minPoints: 38000,
    icon: '📜',
    color: '#A855F7',
    description: 'Teacher of many',
  },
  {
    level: 13,
    name: 'Kingdom Pillar',
    minPoints: 62000,
    icon: '👑',
    color: '#F59E0B',
    description: 'A foundation of the Kingdom',
  },
  {
    level: 14,
    name: 'Eternal Flame',
    minPoints: 100000,
    icon: '🔥',
    color: '#DC2626',
    description: 'Burning bright for eternity',
  },
];

// ============================================
// POINTS CONFIGURATION
// ============================================

export const POINTS_CONFIG: Record<ActivityType, { points: number; description: string }> = {
  daily_login: { points: 5, description: 'Daily login bonus' },
  daily_prayer_read: { points: 10, description: 'Read daily prayer' },
  prayer_request_submit: { points: 20, description: 'Submitted prayer request' },
  pray_for_someone: { points: 5, description: 'Prayed for someone' },
  bible_study_complete: { points: 30, description: 'Completed Bible study' },
  sermon_watch: { points: 15, description: 'Watched a sermon' },
  testimony_submit: { points: 50, description: 'Shared testimony' },
  comment_post: { points: 3, description: 'Posted a comment' },
  profile_complete: { points: 25, description: 'Completed profile' },
  streak_bonus: { points: 10, description: 'Streak bonus' },
  first_action: { points: 15, description: 'First time bonus' },
  weekly_goal: { points: 50, description: 'Weekly goal achieved' },
  like_given: { points: 1, description: 'Liked content' },
  share_content: { points: 10, description: 'Shared content' },
};

// Streak bonuses (extra points for maintaining streaks)
export const STREAK_BONUSES: Record<number, number> = {
  7: 50,    // 7-day streak
  14: 100,  // 14-day streak
  30: 250,  // 30-day streak
  60: 500,  // 60-day streak
  90: 1000, // 90-day streak
  180: 2500, // 180-day streak
  365: 10000, // 1-year streak (legendary!)
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getLevelFromPoints = (points: number): LevelConfig => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].minPoints) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
};

export const getNextLevel = (currentLevel: number): LevelConfig | null => {
  if (currentLevel >= 14) return null;
  return LEVELS[currentLevel]; // since levels are 1-indexed, currentLevel gives next
};

export const getProgressToNextLevel = (points: number): { current: number; required: number; percentage: number } => {
  const currentLevel = getLevelFromPoints(points);
  const nextLevel = getNextLevel(currentLevel.level);

  if (!nextLevel) {
    return { current: points, required: points, percentage: 100 };
  }

  const pointsInCurrentLevel = points - currentLevel.minPoints;
  const pointsRequiredForNext = nextLevel.minPoints - currentLevel.minPoints;
  const percentage = Math.min((pointsInCurrentLevel / pointsRequiredForNext) * 100, 100);

  return {
    current: pointsInCurrentLevel,
    required: pointsRequiredForNext,
    percentage,
  };
};

export const formatPoints = (points: number): string => {
  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1)}M`;
  }
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}K`;
  }
  return points.toString();
};

// ============================================
// FIRESTORE OPERATIONS
// ============================================

const engagementRef = collection(firestore, 'userEngagement');

// Initialize user engagement (called on first login or signup)
export const initializeUserEngagement = async (
  odUserId: string
): Promise<UserEngagement> => {
  try {
    const docRef = doc(engagementRef, odUserId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return serializeFirestoreData<UserEngagement>(docSnap.data());
    }

    const now = new Date().toISOString();
    const initialEngagement: Omit<UserEngagement, 'levelName'> & { levelName?: string } = {
      odUserId,
      points: 0,
      level: 1,
      levelName: 'Seedling',
      streakDays: 0,
      longestStreak: 0,
      lastActiveDate: now,
      badges: [],
      prayerRequestsSubmitted: 0,
      prayerRequestsPrayedFor: 0,
      testimoniesShared: 0,
      bibleStudiesCompleted: 0,
      sermonsWatched: 0,
      commentsPosted: 0,
      dailyPrayersRead: 0,
      likesGiven: 0,
      totalLogins: 1,
      createdAt: now,
      updatedAt: now,
    };

    await setDoc(docRef, initialEngagement);

    return initialEngagement as UserEngagement;
  } catch (error) {
    console.error('Initialize user engagement error:', error);
    throw error;
  }
};

// Get user engagement
export const getUserEngagement = async (
  odUserId: string
): Promise<UserEngagement | null> => {
  try {
    const docRef = doc(engagementRef, odUserId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return serializeFirestoreData<UserEngagement>(docSnap.data());
  } catch (error) {
    console.error('Get user engagement error:', error);
    throw error;
  }
};

// Award points and update engagement
export const awardPoints = async (
  odUserId: string,
  activityType: ActivityType,
  customPoints?: number
): Promise<{ newPoints: number; leveledUp: boolean; newLevel: LevelConfig | null; pointsAwarded: number }> => {
  try {
    const docRef = doc(engagementRef, odUserId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await initializeUserEngagement(odUserId);
    }

    const currentData = (await getDoc(docRef)).data() as UserEngagement;
    const pointsToAward = customPoints ?? POINTS_CONFIG[activityType].points;
    const newPoints = currentData.points + pointsToAward;

    const oldLevel = getLevelFromPoints(currentData.points);
    const newLevel = getLevelFromPoints(newPoints);
    const leveledUp = newLevel.level > oldLevel.level;

    // Prepare updates based on activity type
    const updates: Record<string, any> = {
      points: increment(pointsToAward),
      level: newLevel.level,
      levelName: newLevel.name,
      updatedAt: new Date().toISOString(),
    };

    // Update specific counters based on activity type
    switch (activityType) {
      case 'prayer_request_submit':
        updates.prayerRequestsSubmitted = increment(1);
        break;
      case 'pray_for_someone':
        updates.prayerRequestsPrayedFor = increment(1);
        break;
      case 'testimony_submit':
        updates.testimoniesShared = increment(1);
        break;
      case 'bible_study_complete':
        updates.bibleStudiesCompleted = increment(1);
        break;
      case 'sermon_watch':
        updates.sermonsWatched = increment(1);
        break;
      case 'comment_post':
        updates.commentsPosted = increment(1);
        break;
      case 'daily_prayer_read':
        updates.dailyPrayersRead = increment(1);
        break;
      case 'like_given':
        updates.likesGiven = increment(1);
        break;
      case 'daily_login':
        updates.totalLogins = increment(1);
        break;
    }

    await updateDoc(docRef, updates);

    // Log the activity
    const activityLogRef = collection(docRef, 'activityLog');
    await addDoc(activityLogRef, {
      type: activityType,
      points: pointsToAward,
      description: POINTS_CONFIG[activityType].description,
      createdAt: Timestamp.now(),
    });

    return {
      newPoints,
      leveledUp,
      newLevel: leveledUp ? newLevel : null,
      pointsAwarded: pointsToAward,
    };
  } catch (error) {
    console.error('Award points error:', error);
    throw error;
  }
};

// Update streak
export const updateStreak = async (
  odUserId: string
): Promise<{ streakDays: number; streakBonus: number | null; isNewDay: boolean }> => {
  try {
    const docRef = doc(engagementRef, odUserId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await initializeUserEngagement(odUserId);
      return { streakDays: 1, streakBonus: null, isNewDay: true };
    }

    const data = docSnap.data() as UserEngagement;
    const lastActive = new Date(data.lastActiveDate);
    const now = new Date();

    // Check if it's a new day
    const lastActiveDay = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const daysDiff = Math.floor((today.getTime() - lastActiveDay.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
      // Same day, no streak update
      return { streakDays: data.streakDays, streakBonus: null, isNewDay: false };
    }

    let newStreak: number;
    let streakBonus: number | null = null;

    if (daysDiff === 1) {
      // Consecutive day - increase streak
      newStreak = data.streakDays + 1;

      // Check for streak bonuses
      if (STREAK_BONUSES[newStreak]) {
        streakBonus = STREAK_BONUSES[newStreak];
        await awardPoints(odUserId, 'streak_bonus', streakBonus);
      }
    } else {
      // Streak broken - reset to 1
      newStreak = 1;
    }

    const longestStreak = Math.max(data.longestStreak, newStreak);

    await updateDoc(docRef, {
      streakDays: newStreak,
      longestStreak,
      lastActiveDate: now.toISOString(),
      updatedAt: now.toISOString(),
    });

    return { streakDays: newStreak, streakBonus, isNewDay: true };
  } catch (error) {
    console.error('Update streak error:', error);
    throw error;
  }
};

// Get activity log
export const getActivityLog = async (
  odUserId: string,
  limitCount: number = 20
): Promise<ActivityLog[]> => {
  try {
    const docRef = doc(engagementRef, odUserId);
    const activityLogRef = collection(docRef, 'activityLog');

    const q = query(
      activityLogRef,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) =>
      serializeFirestoreData<ActivityLog>({
        ...doc.data(),
        id: doc.id,
      })
    );
  } catch (error) {
    console.error('Get activity log error:', error);
    throw error;
  }
};

// Get leaderboard
export const getLeaderboard = async (
  type: 'weekly' | 'monthly' | 'allTime' = 'allTime',
  limitCount: number = 50
): Promise<LeaderboardEntry[]> => {
  try {
    // For now, we'll query directly from userEngagement
    // In production, this should be a separate aggregated collection updated by Cloud Functions
    const q = query(
      engagementRef,
      orderBy('points', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);

    // We need to fetch user info for each entry
    // In production, this should be denormalized
    const entries: LeaderboardEntry[] = snapshot.docs.map((doc, index) => {
      const data = doc.data();
      const level = getLevelFromPoints(data.points);

      return {
        odUserId: doc.id,
        userName: data.userName || 'Anonymous',
        userAvatar: data.userAvatar || null,
        points: data.points,
        level: level.level,
        levelName: level.name,
        rank: index + 1,
      };
    });

    return entries;
  } catch (error) {
    console.error('Get leaderboard error:', error);
    throw error;
  }
};

// Get user rank
export const getUserRank = async (
  odUserId: string
): Promise<number> => {
  try {
    const userDoc = await getDoc(doc(engagementRef, odUserId));
    if (!userDoc.exists()) return 0;

    const userPoints = userDoc.data().points || 0;

    // Count users with more points
    const q = query(
      engagementRef,
      where('points', '>', userPoints)
    );

    const snapshot = await getDocs(q);
    return snapshot.size + 1;
  } catch (error) {
    console.error('Get user rank error:', error);
    throw error;
  }
};

// Update user display info for leaderboard (call when user updates profile)
export const updateLeaderboardInfo = async (
  odUserId: string,
  userName: string,
  userAvatar: string | null
): Promise<void> => {
  try {
    const docRef = doc(engagementRef, odUserId);
    await updateDoc(docRef, {
      userName,
      userAvatar,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Update leaderboard info error:', error);
    throw error;
  }
};
