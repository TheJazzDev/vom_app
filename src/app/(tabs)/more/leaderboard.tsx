import { IconSymbol } from '@/src/components/Icons';
import { LeaderboardList, LevelIndicator, StreakCounter } from '@/src/components/Gamification';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { formatPoints } from '@/src/services/gamification';
import { useAuthSlice, useGamificationSlice } from '@/src/store/slices';
import {
  fetchLeaderboardThunk,
  fetchUserEngagementThunk,
  fetchUserRankThunk,
} from '@/src/store/thunks';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store/store';

export default function LeaderboardScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuthSlice();
  const {
    engagement,
    leaderboard,
    leaderboardType,
    userRank,
    isLoadingLeaderboard,
  } = useGamificationSlice();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserEngagementThunk(user.id));
      dispatch(fetchLeaderboardThunk({ type: leaderboardType }));
      dispatch(fetchUserRankThunk(user.id));
    }
  }, [dispatch, user?.id, leaderboardType]);

  const handleRefresh = useCallback(() => {
    if (user?.id) {
      dispatch(fetchLeaderboardThunk({ type: leaderboardType }));
      dispatch(fetchUserRankThunk(user.id));
    }
  }, [dispatch, user?.id, leaderboardType]);

  const handleTabChange = useCallback(
    (tab: 'weekly' | 'monthly' | 'allTime') => {
      dispatch(fetchLeaderboardThunk({ type: tab }));
    },
    [dispatch]
  );

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      {/* Header */}
      <LinearGradient
        colors={['#F59E0B', '#D97706']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View className="flex-row items-center gap-3 mb-4">
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center">
            <IconSymbol name="trophy.fill" size={26} color="white" />
          </View>
          <View>
            <Text className="text-white/80 text-sm font-medium">
              Community Rankings
            </Text>
            <Text className="text-white font-bold text-xl">Leaderboard</Text>
          </View>
        </View>

        {/* User Stats */}
        {engagement && (
          <View style={styles.statsContainer}>
            {/* Rank */}
            <View style={styles.statItem}>
              <Text style={styles.statValue}>#{userRank || '-'}</Text>
              <Text style={styles.statLabel}>Your Rank</Text>
            </View>

            {/* Points */}
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {formatPoints(engagement.points)}
              </Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>

            {/* Streak */}
            <View style={styles.statItem}>
              <View className="flex-row items-center gap-1">
                <IconSymbol name="flame.fill" size={16} color="white" />
                <Text style={styles.statValue}>{engagement.streakDays}</Text>
              </View>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>

            {/* Level */}
            <View style={styles.statItem}>
              <Text style={styles.statValue}>Lv.{engagement.level}</Text>
              <Text style={styles.statLabel}>{engagement.levelName}</Text>
            </View>
          </View>
        )}
      </LinearGradient>

      {/* Leaderboard List */}
      <LeaderboardList
        entries={leaderboard}
        currentUserId={user?.id || ''}
        isLoading={isLoadingLeaderboard}
        onRefresh={handleRefresh}
        activeTab={leaderboardType}
        onTabChange={handleTabChange}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    marginTop: 2,
  },
});
