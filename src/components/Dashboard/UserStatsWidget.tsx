import { useGamificationSlice } from '@/src/store/slices/gamificationSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { IconSymbol } from '../Icons';
import { Card, Text, View } from '../UI';

const UserStatsWidget = () => {
  const router = useRouter();
  const { engagement, badges } = useGamificationSlice();

  // Extract data from engagement
  const userLevel = engagement?.currentLevel;
  const userPoints = engagement?.totalPoints || 0;
  const currentStreak = engagement?.currentStreak || 0;

  // Get recent badges (last 5) - ensure badges is an array and filter out null values
  const recentBadges =
    badges && Array.isArray(badges)
      ? badges.filter((badge) => badge != null).slice(0, 5)
      : [];

  // Safe defaults
  const safeUserPoints = userPoints;
  const safeCurrentStreak = currentStreak;
  const safeRecentBadges = recentBadges;

  const getProgressPercentage = () => {
    if (!userLevel) return 0;
    const pointsInCurrentLevel = safeUserPoints - userLevel.minPoints;
    const pointsNeededForNextLevel = userLevel.maxPoints - userLevel.minPoints;
    return Math.min(
      (pointsInCurrentLevel / pointsNeededForNextLevel) * 100,
      100,
    );
  };

  const pointsToNextLevel = () => {
    if (!userLevel) return 0;
    return Math.max(0, userLevel.maxPoints - safeUserPoints);
  };

  return (
    <Pressable
      onPress={() => router.push('/(tabs)/profile' as any)}
      android_ripple={{ color: 'rgba(139,92,246,0.1)' }}
    >
      <Card variant="ghost" className="mb-4 relative overflow-hidden">
        <LinearGradient
          colors={['#8B5CF6', '#6D28D9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        <View className="relative z-10">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center flex-1">
              <View
                className="w-12 h-12 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <IconSymbol name="star.fill" size={22} color="white" />
              </View>
              <View className="flex-1">
                <Text
                  variant="h4"
                  className="text-white font-bold"
                  style={{ color: 'white' }}
                >
                  Your Progress
                </Text>
                <Text variant="caption" className="text-white/80">
                  {userLevel?.name || 'Member'} • {safeUserPoints} points
                </Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <IconSymbol name="chevron.right" size={16} color="white" />
            </View>
          </View>

          {/* Stats Grid */}
          <View className="flex-row gap-2 mb-4">
            {/* Level Card */}
            <View
              className="flex-1 rounded-xl p-3"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <View className="flex-row items-center mb-1">
                <IconSymbol name="chart.bar.fill" size={16} color="white" />
                <Text
                  variant="caption"
                  className="ml-1.5 text-white/80 font-medium"
                >
                  Level
                </Text>
              </View>
              <Text
                variant="h3"
                className="text-white font-bold"
                style={{ color: 'white' }}
              >
                {userLevel?.level || 1}
              </Text>
              <Text variant="caption" className="text-white/70">
                {pointsToNextLevel()} to next
              </Text>
            </View>

            {/* Streak Card */}
            <View
              className="flex-1 rounded-xl p-3"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <View className="flex-row items-center mb-1">
                <IconSymbol name="flame.fill" size={16} color="#F59E0B" />
                <Text
                  variant="caption"
                  className="ml-1.5 text-white/80 font-medium"
                >
                  Streak
                </Text>
              </View>
              <Text
                variant="h3"
                className="text-white font-bold"
                style={{ color: 'white' }}
              >
                {safeCurrentStreak}
              </Text>
              <Text variant="caption" className="text-white/70">
                days active
              </Text>
            </View>

            {/* Badges Card */}
            <View
              className="flex-1 rounded-xl p-3"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <View className="flex-row items-center mb-1">
                <IconSymbol name="trophy.fill" size={16} color="#F59E0B" />
                <Text
                  variant="caption"
                  className="ml-1.5 text-white/80 font-medium"
                >
                  Badges
                </Text>
              </View>
              <Text
                variant="h3"
                className="text-white font-bold"
                style={{ color: 'white' }}
              >
                {safeRecentBadges.length}
              </Text>
              <Text variant="caption" className="text-white/70">
                earned
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          {userLevel && (
            <View>
              <View className="flex-row items-center justify-between mb-2">
                <Text variant="caption" className="text-white/80 font-medium">
                  Progress to{' '}
                  {userLevel.name === 'Champion' ? 'Max Level' : 'Next Level'}
                </Text>
                <Text variant="caption" className="text-white/80 font-bold">
                  {Math.round(getProgressPercentage())}%
                </Text>
              </View>
              <View
                className="h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <View
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: '#F59E0B',
                    width: `${getProgressPercentage()}%`,
                  }}
                />
              </View>
            </View>
          )}

          {/* Recent Badges Preview */}
          {safeRecentBadges.length > 0 && safeRecentBadges[0] && (
            <View className="mt-4 pt-4 border-t border-white/10">
              <Text
                variant="caption"
                className="text-white/80 font-semibold mb-2"
              >
                Latest Badge
              </Text>
              <View className="flex-row items-center">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: 'rgba(245,158,11,0.2)' }}
                >
                  <Text className="text-xl">
                    {safeRecentBadges[0]?.icon || '🏆'}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    variant="body"
                    className="text-white font-semibold"
                    numberOfLines={1}
                  >
                    {safeRecentBadges[0]?.name || 'Badge'}
                  </Text>
                  <Text variant="caption" className="text-white/70">
                    {safeRecentBadges[0]?.description || 'Achievement unlocked'}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Call to Action */}
          <View
            className="mt-4 rounded-lg p-3 flex-row items-center justify-between"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <Text variant="body" className="text-white/90 font-medium">
              View all achievements
            </Text>
            <IconSymbol name="arrow.right" size={16} color="white" />
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

export default UserStatsWidget;
