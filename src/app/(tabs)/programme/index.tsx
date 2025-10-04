import { quickStats } from '@/src/components';
import { ProgrammeCard } from '@/src/components/Programme/components/ProgrammeCard';
import { programmeOptions } from '@/src/components/Programme/constants/programmeOptions';
import { Text, View } from '@/src/components/UI';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import { useTheme } from '@/src/hooks';
import { dispatch, useProgrammeSlice } from '@/src/store';
import { fetchProgrammeStats } from '@/src/store/thunks/programme';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';

export default function ProgrammeIndex() {
  const theme = useTheme();
  const { stats, isStatsLoading } = useProgrammeSlice();

  useEffect(() => {
    dispatch(fetchProgrammeStats());
  }, []);

  return (
    <View scrollable gradient paddingHorizontal={0}>
      {/* Enhanced Gradient Header */}
      <LinearGradient
        colors={['#3B82F6', '#2563EB', '#6366F1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 32,
          paddingBottom: 32,
          paddingHorizontal: 16,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          // elevation: 8,
        }}
      >
        {/* Header with Icon and Optional Action */}
        <View className="flex-row items-start justify-between mb-4">
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-2">
              <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
                <IconSymbol
                  name="calendar"
                  size={22}
                  color="white"
                />
              </View>
              <Text
                variant="h1"
                className="text-white font-bold"
              >
                Programmes
              </Text>
            </View>
            <Text
              variant="body"
              className="text-white/90 leading-6 pr-2"
            >
              Stay connected with all church activities, services, and special events
            </Text>
          </View>

          {/* Optional: Calendar/Filter Button */}
          <Pressable
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center ml-2"
          >
            <IconSymbol
              name="line.3.horizontal.decrease.circle"
              size={22}
              color="white"
            />
          </Pressable>
        </View>

        {/* Enhanced Quick Stats */}
        <View className="flex-row gap-2 mt-4">
          {isStatsLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <View
                  key={index}
                  className="flex-1 rounded-2xl px-4 py-3 bg-white/15 backdrop-blur-sm min-h-[72px] items-center justify-center border border-white/10"
                >
                  <ActivityIndicator size="small" color="white" />
                </View>
              ))
            : quickStats(stats as ProgrammeStats, theme).map((stat, index) => (
                <View
                  key={index}
                  className="flex-1 bg-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm border border-white/10"
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    // elevation: 3,
                  }}
                >
                  <Text
                    variant="h3"
                    className="text-white font-bold mb-1"
                  >
                    {stat.value}
                  </Text>
                  <Text
                    variant="caption"
                    className="text-white/90 font-medium"
                  >
                    {stat.label}
                  </Text>
                </View>
              ))}
        </View>

        {/* Optional: Quick Action Chips */}
        <View className="flex-row gap-2 mt-4">
          <Pressable className="bg-white/15 rounded-full px-4 py-2 flex-row items-center gap-1.5 border border-white/10">
            <IconSymbol name="calendar.badge.plus" size={16} color="white" />
            <Text variant="caption" className="text-white font-semibold">
              This Week
            </Text>
          </Pressable>
          <Pressable className="bg-white/15 rounded-full px-4 py-2 flex-row items-center gap-1.5 border border-white/10">
            <IconSymbol name="star.fill" size={16} color="white" />
            <Text variant="caption" className="text-white font-semibold">
              Featured
            </Text>
          </Pressable>
        </View>
      </LinearGradient>

      {/* Programme Cards Section */}
      <View className="px-4 pt-6">
        {/* Section Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text
            variant="h3"
            className="font-bold text-gray-900 dark:text-white"
          >
            All Programmes
          </Text>
          <Text
            variant="caption"
            className="text-gray-500 dark:text-gray-400"
          >
            {programmeOptions.length} Categories
          </Text>
        </View>

        {programmeOptions.map((programme) => (
          <ProgrammeCard key={programme.route} programme={programme} />
        ))}
      </View>
    </View>
  );
}