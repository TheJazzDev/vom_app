import { IconSymbol } from '@/src/components/Icons';
import {
  BadgeGrid,
  LevelIndicator,
  PointsBadge,
  StreakCounter,
} from '@/src/components/Gamification';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import {
  formatPoints,
  getProgressToNextLevel,
  LEVELS,
} from '@/src/services/gamification';
import { getEarnedBadgesCount } from '@/src/services/gamification/badges';
import { useAuthSlice, useGamificationSlice } from '@/src/store/slices';
import {
  fetchUserEngagementThunk,
  fetchUserBadgesThunk,
  fetchActivityLogThunk,
} from '@/src/store/thunks';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store/store';

export default function AchievementsScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuthSlice();
  const {
    engagement,
    badges,
    activityLog,
    isLoadingEngagement,
    isLoadingBadges,
    isLoadingActivity,
  } = useGamificationSlice();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserEngagementThunk(user.id));
      dispatch(fetchUserBadgesThunk(user.id));
      dispatch(fetchActivityLogThunk({ odUserId: user.id, limit: 10 }));
    }
  }, [dispatch, user?.id]);

  const handleRefresh = () => {
    if (user?.id) {
      dispatch(fetchUserEngagementThunk(user.id));
      dispatch(fetchUserBadgesThunk(user.id));
      dispatch(fetchActivityLogThunk({ odUserId: user.id, limit: 10 }));
    }
  };

  const earnedBadges = getEarnedBadgesCount(badges);
  const currentLevel = engagement ? LEVELS.find((l) => l.level === engagement.level) : LEVELS[0];
  const progress = engagement ? getProgressToNextLevel(engagement.points) : { percentage: 0 };

  const isLoading = isLoadingEngagement || isLoadingBadges;

  if (isLoading && !engagement) {
    return (
      <SafeAreaView
        edges={['top']}
        style={{ flex: 1, backgroundColor: theme.background }}
      >
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={theme.brand} />
          <Text
            variant="body"
            style={{ color: theme.textSecondary, marginTop: 12 }}
          >
            Loading achievements...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={[]}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            tintColor={theme.brand}
            colors={[theme.brand]}
          />
        }
      >
        {/* Header */}
        <LinearGradient
          colors={[currentLevel?.color || theme.brand, '#1F2937']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View className="items-center mb-4">
            <Text className="text-white/80 text-sm font-medium mb-2">
              Your Journey
            </Text>
            <View
              style={[
                styles.levelIconLarge,
                { backgroundColor: 'rgba(255,255,255,0.2)' },
              ]}
            >
              <Text style={styles.levelIconText}>{currentLevel?.icon}</Text>
            </View>
          </View>

          <View className="items-center">
            <Text style={[styles.levelNumber, { color: 'white' }]}>
              Level {engagement?.level || 1}
            </Text>
            <Text style={[styles.levelName, { color: 'white' }]}>
              {engagement?.levelName || 'Seedling'}
            </Text>
            {currentLevel?.description && (
              <Text style={styles.levelDescription}>
                "{currentLevel.description}"
              </Text>
            )}
          </View>

          {/* Progress to next level */}
          {engagement && engagement.level < 14 && (
            <View style={styles.progressSection}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progress.percentage}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {Math.round(progress.percentage)}% to Level {engagement.level + 1}
              </Text>
            </View>
          )}

          {engagement?.level === 14 && (
            <View style={styles.maxLevelBadge}>
              <Text style={styles.maxLevelText}>
                MAXIMUM LEVEL ACHIEVED
              </Text>
            </View>
          )}
        </LinearGradient>

        {/* Stats Grid */}
        <View style={[styles.statsGrid, { backgroundColor: theme.card }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.brand }]}>
              {formatPoints(engagement?.points || 0)}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Total Points
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
          <View style={styles.statItem}>
            <View className="flex-row items-center gap-1">
              <IconSymbol name="flame.fill" size={18} color="#F59E0B" />
              <Text style={[styles.statValue, { color: '#F59E0B' }]}>
                {engagement?.streakDays || 0}
              </Text>
            </View>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Day Streak
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#10B981' }]}>
              {earnedBadges}/{badges.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Badges
            </Text>
          </View>
        </View>

        {/* Badges Section */}
        <View style={styles.section}>
          <BadgeGrid badges={badges} showCategories />
        </View>

        {/* Recent Activity */}
        {activityLog.length > 0 && (
          <View style={styles.section}>
            <Text
              variant="h4"
              style={[styles.sectionTitle, { color: theme.heading }]}
            >
              Recent Activity
            </Text>
            <View
              style={[
                styles.activityList,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              {activityLog.slice(0, 5).map((activity, index) => (
                <View
                  key={activity.id}
                  style={[
                    styles.activityItem,
                    index < activityLog.slice(0, 5).length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: theme.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.activityIcon,
                      { backgroundColor: `${theme.brand}15` },
                    ]}
                  >
                    <Text style={{ fontSize: 16 }}>+{activity.points}</Text>
                  </View>
                  <View style={styles.activityInfo}>
                    <Text
                      style={[styles.activityDescription, { color: theme.heading }]}
                    >
                      {activity.description}
                    </Text>
                    <Text
                      variant="caption"
                      style={{ color: theme.textSecondary }}
                    >
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text style={[styles.activityPoints, { color: theme.brand }]}>
                    +{activity.points}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Level Progression Guide */}
        <View style={styles.section}>
          <Text
            variant="h4"
            style={[styles.sectionTitle, { color: theme.heading }]}
          >
            Level Journey
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.levelsScroll}
          >
            {LEVELS.map((level) => {
              const isCurrentLevel = level.level === engagement?.level;
              const isAchieved = (engagement?.level || 1) >= level.level;

              return (
                <View
                  key={level.level}
                  style={[
                    styles.levelCard,
                    {
                      backgroundColor: isCurrentLevel
                        ? `${level.color}20`
                        : theme.card,
                      borderColor: isCurrentLevel ? level.color : theme.border,
                      opacity: isAchieved ? 1 : 0.5,
                    },
                  ]}
                >
                  <Text style={{ fontSize: 32 }}>{level.icon}</Text>
                  <Text
                    style={[
                      styles.levelCardNumber,
                      { color: isCurrentLevel ? level.color : theme.textSecondary },
                    ]}
                  >
                    Lv.{level.level}
                  </Text>
                  <Text
                    style={[
                      styles.levelCardName,
                      { color: isCurrentLevel ? level.color : theme.heading },
                    ]}
                    numberOfLines={1}
                  >
                    {level.name}
                  </Text>
                  <Text
                    variant="caption"
                    style={{ color: theme.textSecondary, textAlign: 'center' }}
                  >
                    {formatPoints(level.minPoints)} pts
                  </Text>
                  {isCurrentLevel && (
                    <View
                      style={[
                        styles.currentBadge,
                        { backgroundColor: level.color },
                      ]}
                    >
                      <Text style={styles.currentBadgeText}>Current</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  levelIconLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelIconText: {
    fontSize: 56,
  },
  levelNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  levelName: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  levelDescription: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontStyle: 'italic',
  },
  progressSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  progressText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 8,
  },
  maxLevelBadge: {
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
  maxLevelText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: -32,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: 16,
  },
  activityList: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityInfo: {
    flex: 1,
  },
  activityDescription: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  activityPoints: {
    fontSize: 16,
    fontWeight: '700',
  },
  levelsScroll: {
    gap: 12,
    paddingRight: 16,
  },
  levelCard: {
    width: 100,
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    position: 'relative',
  },
  levelCardNumber: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  levelCardName: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 4,
  },
  currentBadge: {
    position: 'absolute',
    top: -8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  currentBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
});
