import { Text, View } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import { useTheme } from '@/src/hooks';
import { getMonthlyActivities } from '@/src/services/activities/monthlyActivities';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, View as RNView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MonthlyActivities() {
  const theme = useTheme();
  const [activities, setActivities] = useState<MonthlyActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProgrammes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMonthlyActivities();
      setActivities(data);
    } catch (err) {
      console.error('Error loading monthly activities:', err);
      setError('Failed to load monthly activities');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadProgrammes();
    } finally {
      setRefreshing(false);
    }
  }, [loadProgrammes]);

  useEffect(() => {
    loadProgrammes();
  }, [loadProgrammes]);

  return (
    <SafeAreaView
      edges={['top']}
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <View gradient className="flex-1 px-4 pt-4">
        <Text variant="h4" className="font-bold mb-1" style={{ color: theme.heading }}>
          Monthly Activities
        </Text>
        <Text variant="body" className="mb-4" style={{ color: theme.muted }}>
          Recurring monthly church activities
        </Text>

        {error && (
          <Text variant="body" className="mb-3" style={{ color: theme.error }}>
            {error}
          </Text>
        )}

        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.primary}
              colors={[theme.primary]}
            />
          }
          ListEmptyComponent={
            isLoading ? null : (
              <RNView className="py-12 items-center justify-center">
                <IconSymbol
                  name="calendar.badge.exclamationmark"
                  size={28}
                  color={theme.muted}
                />
                <Text variant="h4" className="mt-3">
                  No monthly activities found
                </Text>
              </RNView>
            )
          }
          renderItem={({ item }) => (
            <RNView
              className="rounded-2xl border p-4 mb-3"
              style={{ backgroundColor: theme.card, borderColor: theme.border }}
            >
              <Text variant="h5" className="font-semibold mb-1">
                {item.title}
              </Text>
              <Text variant="caption" style={{ color: theme.muted }}>
                {item.weekOfMonth} {item.dayOfWeek} • {item.time}
              </Text>
              {item.location ? (
                <Text variant="caption" style={{ color: theme.muted }} className="mt-1">
                  {item.location}
                </Text>
              ) : null}
              {item.description ? (
                <Text variant="body" style={{ color: theme.muted }} className="mt-2">
                  {item.description}
                </Text>
              ) : null}
            </RNView>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
