import { ProgrammeCard } from '@/src/components/Programme/components/ProgrammeCard';
import { programmeOptions } from '@/src/components/Programme/constants/programmeOptions';
import { Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { dispatch, useProgrammeSlice } from '@/src/store';
import { fetchProgrammeStats } from '@/src/store/thunks/programme';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';

export default function ProgrammeIndex() {
  const theme = useTheme();
  const { stats, isStatsLoading } = useProgrammeSlice();

  const quickStats = [
    {
      label: 'This Week',
      value: stats?.thisWeek?.toString() || '0',
      color: theme.primary,
    },
    {
      label: 'This Month',
      value: stats?.thisMonth?.toString() || '0',
      color: theme.secondary,
    },
    {
      label: 'Total',
      value: stats?.total ? `${stats.total}+` : '0',
      color: theme.tertiary,
    },
  ];

  useEffect(() => {
    dispatch(fetchProgrammeStats());
  }, []);

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <View className="relative h-56 mb-6">
        <LinearGradient
          colors={['#3B82F6', '#1E40AF', '#6F42F2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            padding: 24,
          }}
        >
          <Text
            variant="h1"
            className="text-white dark:text-white/90 font-bold mb-2"
          >
            Programmes
          </Text>
          <Text
            variant="body"
            className="text-white/90 dark:text-white/80 leading-6 mb-4"
          >
            Stay connected with all church activities, services, and special
            events
          </Text>

          {/* Quick Stats */}
          <View className="flex-row">
            {isStatsLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <View
                    key={index}
                    className=" rounded-lg px-3 py-2 backdrop-blur-sm mr-2 min-w-24 min-h-16 flex items-center justify-center"
                  >
                    <ActivityIndicator size="small" color="white" />
                  </View>
                ))
              : quickStats.map((stat, index) => (
                  <View
                    key={index}
                    className="bg-white/20 rounded-xl px-3 py-2 backdrop-blur-sm mr-2 min-w-20"
                  >
                    <Text variant="h4" className="text-white font-bold">
                      {stat.value}
                    </Text>
                    <Text variant="caption" className="text-white/80">
                      {stat.label}
                    </Text>
                  </View>
                ))}
          </View>
        </LinearGradient>
      </View>

      <View className="px-4">
        <Text
          variant="h3"
          className="font-semibold mb-4"
          style={{ color: theme.heading }}
        >
          Browse Programmes
        </Text>

        {programmeOptions.map((programme) => (
          <ProgrammeCard key={programme.route} programme={programme} />
        ))}
      </View>
    </ScrollView>
  );
}
