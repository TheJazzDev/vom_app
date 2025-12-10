import { DirectoryCategoryCard } from '@/src/components';
import { IconSymbol } from '@/src/components/Icons/IconSymbol';
import { Text, View } from '@/src/components/UI';
import { DIRECTORY_CATEGORIES } from '@/src/constants/directory';
import { useTheme } from '@/src/hooks';
import { dispatch, useDirectorySlice } from '@/src/store';
import { fetchDirectoryStatsThunk } from '@/src/store/thunks/directory';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, RefreshControl } from 'react-native';

interface StatCardProps {
  count?: number;
  label: string;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  count,
  label,
  variant = 'primary',
  isLoading = false,
}) => {
  const theme = useTheme();

  return (
    <View
      className="flex-1 rounded-xl py-3 px-3"
      style={{
        backgroundColor:
          variant === 'primary' ? `${theme.brand}15` : `${theme.secondary}15`,
        borderWidth: 1,
        borderColor:
          variant === 'primary' ? `${theme.brand}20` : `${theme.secondary}20`,
      }}
    >
      {isLoading ? (
        <View className="my-1.5 flex items-start">
          <ActivityIndicator size="small" color={theme.brand} />
        </View>
      ) : (
        <Text
          variant="h2"
          className="font-bold mb-0.5"
          style={{
            color: variant === 'primary' ? theme.brand : theme.secondary,
          }}
        >
          {count?.toLocaleString() || '0'}
        </Text>
      )}
      <Text
        variant="caption"
        className="text-gray-600 dark:text-gray-400 font-medium"
      >
        {label}
      </Text>
    </View>
  );
};

export default function DirectoryIndex() {
  const { directoryStats, isFetchingDirectoryStats } = useDirectorySlice();
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchDirectoryStatsThunk());
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchDirectoryStatsThunk());
    } catch (error) {
      console.error('Error refreshing directory stats:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <View gradient className="flex-1">
      {/* Enhanced Header Section */}
      <View className={`px-4 pb-5 ${Platform.OS === 'ios' ? 'pt-3' : 'pt-6'}`}>
        {/* Title Row with Action Button */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-1">
              <IconSymbol
                name="person.3.sequence.fill"
                size={28}
                color={theme.brand}
              />
              <Text
                variant="h1"
                className="font-bold text-gray-900 dark:text-white"
              >
                Directory
              </Text>
            </View>
            <Text
              variant="body"
              className="leading-5 text-gray-600 dark:text-gray-400 pr-2"
            >
              Connect with our church family and find your place in our
              community
            </Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View className="flex-row gap-2 mt-4">
          <StatCard
            count={directoryStats?.membersCount}
            label="Members"
            isLoading={isFetchingDirectoryStats}
          />
          <StatCard
            count={directoryStats?.childrenCount}
            label="Children"
            isLoading={isFetchingDirectoryStats}
          />
          <StatCard
            count={directoryStats?.bandsCount}
            label="Bands"
            isLoading={isFetchingDirectoryStats}
          />
          <StatCard
            count={directoryStats?.departmentsCount}
            label="Depts"
            isLoading={isFetchingDirectoryStats}
          />
        </View>

        {/* Section Divider with Label */}
        <View className="flex-row items-center gap-3 mt-6">
          <View
            className="flex-1 h-px"
            style={{ backgroundColor: theme.border }}
          />
          <Text
            variant="caption"
            className="text-gray-500 dark:text-gray-500 font-semibold uppercase tracking-wider"
          >
            Browse Categories
          </Text>
          <View
            className="flex-1 h-px"
            style={{ backgroundColor: theme.border }}
          />
        </View>
      </View>

      {/* Categories List */}
      <FlatList
        data={DIRECTORY_CATEGORIES}
        keyExtractor={(item) => item.route}
        renderItem={({ item }) => <DirectoryCategoryCard category={item} />}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 20,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
      />
    </View>
  );
}
