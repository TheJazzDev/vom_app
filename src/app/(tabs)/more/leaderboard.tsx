import { IconSymbol } from '@/src/components/Icons';
import { LeaderboardList } from '@/src/components/Gamification';
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
    if (user?.odUserId) {
      dispatch(fetchUserEngagementThunk(user.odUserId));
      dispatch(fetchLeaderboardThunk({ type: leaderboardType }));
      dispatch(fetchUserRankThunk(user.odUserId));
    }
  }, [dispatch, user?.odUserId, leaderboardType]);

  const handleRefresh = useCallback(() => {
    if (user?.odUserId) {
      dispatch(fetchLeaderboardThunk({ type: leaderboardType }));
      dispatch(fetchUserRankThunk(user.odUserId));
    }
  }, [dispatch, user?.odUserId, leaderboardType]);

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
        className="p-5 rounded-b-3xl"
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
          <View className="flex-row justify-between bg-white/15 rounded-2xl p-4">
            {/* Rank */}
            <View className="items-center">
              <Text className="text-white text-lg font-bold">#{userRank || '-'}</Text>
              <Text className="text-white/80 text-[11px] mt-0.5">Your Rank</Text>
            </View>

            {/* Points */}
            <View className="items-center">
              <Text className="text-white text-lg font-bold">
                {formatPoints(engagement.points)}
              </Text>
              <Text className="text-white/80 text-[11px] mt-0.5">Points</Text>
            </View>

            {/* Streak */}
            <View className="items-center">
              <View className="flex-row items-center gap-1">
                <IconSymbol name="flame.fill" size={16} color="white" />
                <Text className="text-white text-lg font-bold">{engagement.streakDays}</Text>
              </View>
              <Text className="text-white/80 text-[11px] mt-0.5">Day Streak</Text>
            </View>

            {/* Level */}
            <View className="items-center">
              <Text className="text-white text-lg font-bold">Lv.{engagement.level}</Text>
              <Text className="text-white/80 text-[11px] mt-0.5">{engagement.levelName}</Text>
            </View>
          </View>
        )}
      </LinearGradient>

      {/* Leaderboard List */}
      <LeaderboardList
        entries={leaderboard}
        currentUserId={user?.odUserId || ''}
        isLoading={isLoadingLeaderboard}
        onRefresh={handleRefresh}
        activeTab={leaderboardType}
        onTabChange={handleTabChange}
      />
    </SafeAreaView>
  );
}
