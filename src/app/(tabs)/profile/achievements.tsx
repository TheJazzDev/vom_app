import { IconSymbol } from '@/src/components/Icons';
import {
  BadgeGrid,
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
    if (user?.odUserId) {
      dispatch(fetchUserEngagementThunk(user.odUserId));
      dispatch(fetchUserBadgesThunk(user.odUserId));
      dispatch(fetchActivityLogThunk({ odUserId: user.odUserId, limit: 10 }));
    }
  }, [dispatch, user?.odUserId]);

  const handleRefresh = () => {
    if (user?.odUserId) {
      dispatch(fetchUserEngagementThunk(user.odUserId));
      dispatch(fetchUserBadgesThunk(user.odUserId));
      dispatch(fetchActivityLogThunk({ odUserId: user.odUserId, limit: 10 }));
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
      edges={['top']}
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
          className="p-6 pt-4 rounded-b-[32px]"
        >
          <View className="items-center mb-4">
            <Text className="text-white/80 text-sm font-medium mb-2">
              Your Journey
            </Text>
            <View className="w-[100px] h-[100px] rounded-full items-center justify-center bg-white/20">
              <Text className="text-[56px]">{currentLevel?.icon}</Text>
            </View>
          </View>

          <View className="items-center">
            <Text className="text-white text-sm font-semibold mb-1">
              Level {engagement?.level || 1}
            </Text>
            <Text className="text-white text-[28px] font-extrabold mb-1">
              {engagement?.levelName || 'Seedling'}
            </Text>
            {currentLevel?.description && (
              <Text className="text-white/80 text-sm italic">
                &quot;{currentLevel.description}&quot;
              </Text>
            )}
          </View>

          {/* Progress to next level */}
          {engagement && engagement.level < 14 && (
            <View className="mt-5 items-center">
              <View className="w-full h-2 bg-white/20 rounded overflow-hidden">
                <View
                  className="h-full bg-white rounded"
                  style={{ width: `${progress.percentage}%` }}
                />
              </View>
              <Text className="text-white/80 text-xs mt-2">
                {Math.round(progress.percentage)}% to Level {engagement.level + 1}
              </Text>
            </View>
          )}

          {engagement?.level === 14 && (
            <View className="mt-4 bg-white/20 px-5 py-2 rounded-full self-center">
              <Text className="text-white font-bold text-xs tracking-widest">
                MAXIMUM LEVEL ACHIEVED
              </Text>
            </View>
          )}
        </LinearGradient>

        {/* Stats Grid */}
        <View
          className="flex-row mx-4 -mt-5 rounded-2xl p-4 shadow-lg"
          style={{
            backgroundColor: theme.card,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold" style={{ color: theme.brand }}>
              {formatPoints(engagement?.points || 0)}
            </Text>
            <Text className="text-[11px] mt-1" style={{ color: theme.textSecondary }}>
              Total Points
            </Text>
          </View>
          <View className="w-px h-full" style={{ backgroundColor: theme.border }} />
          <View className="flex-1 items-center">
            <View className="flex-row items-center gap-1">
              <IconSymbol name="flame.fill" size={18} color="#F59E0B" />
              <Text className="text-xl font-bold text-[#F59E0B]">
                {engagement?.streakDays || 0}
              </Text>
            </View>
            <Text className="text-[11px] mt-1" style={{ color: theme.textSecondary }}>
              Day Streak
            </Text>
          </View>
          <View className="w-px h-full" style={{ backgroundColor: theme.border }} />
          <View className="flex-1 items-center">
            <Text className="text-xl font-bold text-[#10B981]">
              {earnedBadges}/{badges.length}
            </Text>
            <Text className="text-[11px] mt-1" style={{ color: theme.textSecondary }}>
              Badges
            </Text>
          </View>
        </View>

        {/* Badges Section */}
        <View className="p-4">
          <BadgeGrid badges={badges} showCategories />
        </View>

        {/* Recent Activity */}
        {activityLog.length > 0 && (
          <View className="p-4">
            <Text
              variant="h4"
              className="font-bold mb-4"
              style={{ color: theme.heading }}
            >
              Recent Activity
            </Text>
            <View
              className="rounded-2xl border overflow-hidden"
              style={{ backgroundColor: theme.card, borderColor: theme.border }}
            >
              {activityLog.slice(0, 5).map((activity, index) => (
                <View
                  key={activity.id}
                  className="flex-row items-center p-3 gap-3"
                  style={index < activityLog.slice(0, 5).length - 1 ? {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                  } : undefined}
                >
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={{ backgroundColor: `${theme.brand}15` }}
                  >
                    <Text className="text-base">+{activity.points}</Text>
                  </View>
                  <View className="flex-1">
                    <Text
                      className="text-sm font-medium mb-0.5"
                      style={{ color: theme.heading }}
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
                  <Text className="text-base font-bold" style={{ color: theme.brand }}>
                    +{activity.points}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Level Progression Guide */}
        <View className="p-4">
          <Text
            variant="h4"
            className="font-bold mb-4"
            style={{ color: theme.heading }}
          >
            Level Journey
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingRight: 16 }}
          >
            {LEVELS.map((level) => {
              const isCurrentLevel = level.level === engagement?.level;
              const isAchieved = (engagement?.level || 1) >= level.level;

              return (
                <View
                  key={level.level}
                  className="w-[100px] p-3 rounded-2xl border-2 items-center relative"
                  style={{
                    backgroundColor: isCurrentLevel ? `${level.color}20` : theme.card,
                    borderColor: isCurrentLevel ? level.color : theme.border,
                    opacity: isAchieved ? 1 : 0.5,
                  }}
                >
                  <Text className="text-[32px]">{level.icon}</Text>
                  <Text
                    className="text-xs font-semibold mt-2"
                    style={{ color: isCurrentLevel ? level.color : theme.textSecondary }}
                  >
                    Lv.{level.level}
                  </Text>
                  <Text
                    className="text-[11px] font-semibold mt-0.5 mb-1"
                    style={{ color: isCurrentLevel ? level.color : theme.heading }}
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
                      className="absolute -top-2 px-2 py-0.5 rounded-lg"
                      style={{ backgroundColor: level.color }}
                    >
                      <Text className="text-white text-[10px] font-bold">Current</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
