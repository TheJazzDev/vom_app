import { firestore } from '@/src/config/firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import type { Badge, UserEngagement } from './index';

// ============================================
// BADGE DEFINITIONS
// ============================================

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'prayer' | 'study' | 'community' | 'streak' | 'special';
  requirement: string;
  field: keyof UserEngagement;
  threshold: number;
  color: string;
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // Prayer Badges
  {
    id: 'prayer_starter',
    name: 'Prayer Starter',
    description: 'Submit your first prayer request',
    icon: '🙏',
    category: 'prayer',
    requirement: 'Submit 1 prayer request',
    field: 'prayerRequestsSubmitted',
    threshold: 1,
    color: '#3B82F6',
  },
  {
    id: 'prayer_warrior',
    name: 'Prayer Warrior',
    description: 'Pray for 50 people in need',
    icon: '⚔️',
    category: 'prayer',
    requirement: 'Pray for 50 requests',
    field: 'prayerRequestsPrayedFor',
    threshold: 50,
    color: '#8B5CF6',
  },
  {
    id: 'intercessor',
    name: 'Intercessor',
    description: 'A dedicated prayer champion',
    icon: '✨',
    category: 'prayer',
    requirement: 'Pray for 200 requests',
    field: 'prayerRequestsPrayedFor',
    threshold: 200,
    color: '#EC4899',
  },
  {
    id: 'prayer_general',
    name: 'Prayer General',
    description: 'Leading the army of prayer',
    icon: '🎖️',
    category: 'prayer',
    requirement: 'Pray for 500 requests',
    field: 'prayerRequestsPrayedFor',
    threshold: 500,
    color: '#F59E0B',
  },
  {
    id: 'prayer_legend',
    name: 'Prayer Legend',
    description: 'A living testimony of prayer',
    icon: '👑',
    category: 'prayer',
    requirement: 'Pray for 1000 requests',
    field: 'prayerRequestsPrayedFor',
    threshold: 1000,
    color: '#EF4444',
  },

  // Study Badges
  {
    id: 'bible_reader',
    name: 'Bible Reader',
    description: 'Start your Bible study journey',
    icon: '📖',
    category: 'study',
    requirement: 'Complete 1 Bible study',
    field: 'bibleStudiesCompleted',
    threshold: 1,
    color: '#10B981',
  },
  {
    id: 'bible_student',
    name: 'Bible Student',
    description: 'Committed to learning the Word',
    icon: '📚',
    category: 'study',
    requirement: 'Complete 10 Bible studies',
    field: 'bibleStudiesCompleted',
    threshold: 10,
    color: '#14B8A6',
  },
  {
    id: 'bible_scholar',
    name: 'Bible Scholar',
    description: 'A true student of Scripture',
    icon: '🎓',
    category: 'study',
    requirement: 'Complete 50 Bible studies',
    field: 'bibleStudiesCompleted',
    threshold: 50,
    color: '#6366F1',
  },
  {
    id: 'bible_master',
    name: 'Bible Master',
    description: 'Mastery of the Word',
    icon: '🏛️',
    category: 'study',
    requirement: 'Complete 100 Bible studies',
    field: 'bibleStudiesCompleted',
    threshold: 100,
    color: '#7C3AED',
  },
  {
    id: 'sermon_listener',
    name: 'Sermon Listener',
    description: 'Start watching sermons',
    icon: '🎧',
    category: 'study',
    requirement: 'Watch 5 sermons',
    field: 'sermonsWatched',
    threshold: 5,
    color: '#0EA5E9',
  },
  {
    id: 'devoted_listener',
    name: 'Devoted Listener',
    description: 'Hungry for the Word',
    icon: '🎬',
    category: 'study',
    requirement: 'Watch 25 sermons',
    field: 'sermonsWatched',
    threshold: 25,
    color: '#0284C7',
  },
  {
    id: 'sermon_enthusiast',
    name: 'Sermon Enthusiast',
    description: 'A true sermon lover',
    icon: '📺',
    category: 'study',
    requirement: 'Watch 100 sermons',
    field: 'sermonsWatched',
    threshold: 100,
    color: '#0369A1',
  },

  // Community Badges
  {
    id: 'first_testimony',
    name: 'First Testimony',
    description: 'Share your first testimony',
    icon: '🌟',
    category: 'community',
    requirement: 'Share 1 testimony',
    field: 'testimoniesShared',
    threshold: 1,
    color: '#F59E0B',
  },
  {
    id: 'witness',
    name: 'Witness',
    description: "Sharing God's goodness",
    icon: '📢',
    category: 'community',
    requirement: 'Share 5 testimonies',
    field: 'testimoniesShared',
    threshold: 5,
    color: '#D97706',
  },
  {
    id: 'testimony_champion',
    name: 'Testimony Champion',
    description: 'A powerful witness',
    icon: '🏆',
    category: 'community',
    requirement: 'Share 20 testimonies',
    field: 'testimoniesShared',
    threshold: 20,
    color: '#B45309',
  },
  {
    id: 'encourager',
    name: 'Encourager',
    description: 'Spreading encouragement',
    icon: '💬',
    category: 'community',
    requirement: 'Post 20 comments',
    field: 'commentsPosted',
    threshold: 20,
    color: '#22C55E',
  },
  {
    id: 'community_voice',
    name: 'Community Voice',
    description: 'An active community member',
    icon: '🗣️',
    category: 'community',
    requirement: 'Post 100 comments',
    field: 'commentsPosted',
    threshold: 100,
    color: '#16A34A',
  },
  {
    id: 'community_pillar',
    name: 'Community Pillar',
    description: 'The heart of our community',
    icon: '🏛️',
    category: 'community',
    requirement: 'Post 500 comments',
    field: 'commentsPosted',
    threshold: 500,
    color: '#15803D',
  },

  // Streak Badges
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: '7-day login streak',
    icon: '🔥',
    category: 'streak',
    requirement: 'Login for 7 consecutive days',
    field: 'streakDays',
    threshold: 7,
    color: '#F97316',
  },
  {
    id: 'fortnight_faithful',
    name: 'Fortnight Faithful',
    description: '14-day login streak',
    icon: '🔥',
    category: 'streak',
    requirement: 'Login for 14 consecutive days',
    field: 'streakDays',
    threshold: 14,
    color: '#EA580C',
  },
  {
    id: 'monthly_marvel',
    name: 'Monthly Marvel',
    description: '30-day login streak',
    icon: '💎',
    category: 'streak',
    requirement: 'Login for 30 consecutive days',
    field: 'streakDays',
    threshold: 30,
    color: '#06B6D4',
  },
  {
    id: 'quarterly_champion',
    name: 'Quarterly Champion',
    description: '90-day login streak',
    icon: '🏅',
    category: 'streak',
    requirement: 'Login for 90 consecutive days',
    field: 'streakDays',
    threshold: 90,
    color: '#8B5CF6',
  },
  {
    id: 'half_year_hero',
    name: 'Half-Year Hero',
    description: '180-day login streak',
    icon: '🦸',
    category: 'streak',
    requirement: 'Login for 180 consecutive days',
    field: 'streakDays',
    threshold: 180,
    color: '#EC4899',
  },
  {
    id: 'annual_legend',
    name: 'Annual Legend',
    description: '365-day login streak - Legendary!',
    icon: '👑',
    category: 'streak',
    requirement: 'Login for 365 consecutive days',
    field: 'streakDays',
    threshold: 365,
    color: '#EF4444',
  },

  // Special Badges
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Read 10 daily prayers',
    icon: '🌅',
    category: 'special',
    requirement: 'Read 10 daily prayers',
    field: 'dailyPrayersRead',
    threshold: 10,
    color: '#FBBF24',
  },
  {
    id: 'daily_devotee',
    name: 'Daily Devotee',
    description: 'Read 50 daily prayers',
    icon: '☀️',
    category: 'special',
    requirement: 'Read 50 daily prayers',
    field: 'dailyPrayersRead',
    threshold: 50,
    color: '#F59E0B',
  },
  {
    id: 'prayer_champion',
    name: 'Prayer Champion',
    description: 'Read 200 daily prayers',
    icon: '🌞',
    category: 'special',
    requirement: 'Read 200 daily prayers',
    field: 'dailyPrayersRead',
    threshold: 200,
    color: '#D97706',
  },
  {
    id: 'generous_heart',
    name: 'Generous Heart',
    description: 'Give 100 likes',
    icon: '❤️',
    category: 'special',
    requirement: 'Give 100 likes',
    field: 'likesGiven',
    threshold: 100,
    color: '#EF4444',
  },
  {
    id: 'love_spreader',
    name: 'Love Spreader',
    description: 'Give 500 likes',
    icon: '💕',
    category: 'special',
    requirement: 'Give 500 likes',
    field: 'likesGiven',
    threshold: 500,
    color: '#EC4899',
  },
  {
    id: 'faithful_member',
    name: 'Faithful Member',
    description: 'Login 100 times',
    icon: '🏠',
    category: 'special',
    requirement: 'Login 100 times',
    field: 'totalLogins',
    threshold: 100,
    color: '#6366F1',
  },
  {
    id: 'dedicated_member',
    name: 'Dedicated Member',
    description: 'Login 500 times',
    icon: '🏰',
    category: 'special',
    requirement: 'Login 500 times',
    field: 'totalLogins',
    threshold: 500,
    color: '#7C3AED',
  },
];

// ============================================
// BADGE FUNCTIONS
// ============================================

// Get user's badges with progress
export const getUserBadges = async (odUserId: string): Promise<Badge[]> => {
  try {
    const engagementRef = doc(firestore, 'userEngagement', odUserId);
    const docSnap = await getDoc(engagementRef);

    if (!docSnap.exists()) {
      // Return all badges as unearned
      return BADGE_DEFINITIONS.map((badge) => ({
        id: badge.id,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        requirement: badge.requirement,
        category: badge.category,
        threshold: badge.threshold,
        isEarned: false,
        earnedAt: null,
        progress: 0,
      }));
    }

    const data = docSnap.data() as UserEngagement;
    const earnedBadges = data.badges || [];

    return BADGE_DEFINITIONS.map((badge) => {
      const currentValue = (data[badge.field] as number) || 0;
      const progress = Math.min((currentValue / badge.threshold) * 100, 100);
      const isEarned = earnedBadges.includes(badge.id);

      return {
        id: badge.id,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        requirement: badge.requirement,
        category: badge.category,
        threshold: badge.threshold,
        isEarned,
        earnedAt: isEarned ? data.updatedAt : null, // Simplified - in production, track individual badge earn dates
        progress,
      };
    });
  } catch (error) {
    console.error('Get user badges error:', error);
    throw error;
  }
};

// Check and award new badges
export const checkAndAwardBadges = async (
  odUserId: string,
): Promise<Badge[]> => {
  try {
    const engagementRef = doc(firestore, 'userEngagement', odUserId);
    const docSnap = await getDoc(engagementRef);

    if (!docSnap.exists()) return [];

    const data = docSnap.data() as UserEngagement;
    const earnedBadges = data.badges || [];
    const newBadges: Badge[] = [];

    for (const badge of BADGE_DEFINITIONS) {
      if (earnedBadges.includes(badge.id)) continue;

      const currentValue = (data[badge.field] as number) || 0;

      if (currentValue >= badge.threshold) {
        // Award the badge
        await updateDoc(engagementRef, {
          badges: arrayUnion(badge.id),
          updatedAt: new Date().toISOString(),
        });

        newBadges.push({
          id: badge.id,
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          requirement: badge.requirement,
          category: badge.category,
          threshold: badge.threshold,
          isEarned: true,
          earnedAt: new Date().toISOString(),
          progress: 100,
        });
      }
    }

    return newBadges;
  } catch (error) {
    console.error('Check and award badges error:', error);
    throw error;
  }
};

// Get badges by category
export const getBadgesByCategory = (
  badges: Badge[],
  category: Badge['category'],
): Badge[] => {
  return badges.filter((badge) => badge.category === category);
};

// Get earned badges count
export const getEarnedBadgesCount = (badges: Badge[]): number => {
  return badges.filter((badge) => badge.isEarned).length;
};

// Get next achievable badges (closest to earning)
export const getNextAchievableBadges = (
  badges: Badge[],
  count: number = 3,
): Badge[] => {
  return badges
    .filter((badge) => !badge.isEarned && badge.progress > 0)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, count);
};
