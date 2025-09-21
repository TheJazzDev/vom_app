import { DirectoryCategoryCard } from '@/src/components';
import { Text, View } from '@/src/components/UI';
import { DIRECTORY_CATEGORIES } from '@/src/constants/directory';
import { dispatch, useDirectorySlice } from '@/src/store';
import { fetchDirectoryStatsThunk } from '@/src/store/thunks/directory';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

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
}) => (
  <View
    className={`flex-1 rounded-lg py-2 px-4 ${
      variant === 'primary' ? 'bg-primary/5' : 'bg-secondary/5'
    }`}
  >
    {isLoading ? (
      <View className="my-[7px]  flex items-start ">
        <ActivityIndicator size="small" className="text-gray-400" />
      </View>
    ) : (
      <Text variant="h2" className="font-bold text-gray-900 dark:text-white">
        {count || '0'}
      </Text>
    )}
    <Text variant="caption" className="text-gray-600 dark:text-gray-400">
      {label}
    </Text>
  </View>
);

export default function DirectoryIndex() {
  const { directoryStats, isFetchingDirectoryStats } = useDirectorySlice();

  useEffect(() => {
    dispatch(fetchDirectoryStatsThunk());
  }, []);

  return (
    <View gradient className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <View className="p-4 pb-4">
        <Text
          variant="h1"
          className="font-bold text-gray-900 dark:text-white mb-1"
        >
          Directory
        </Text>
        <Text
          variant="body"
          className="leading-6 text-gray-600 dark:text-gray-300"
        >
          Connect with our church family, explore our various bands, departments
          and find your place in our community
        </Text>
      </View>

      {/* Stats Cards */}
      <View className="flex-row px-4 mb-4 gap-2">
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
          variant="secondary"
          isLoading={isFetchingDirectoryStats}
        />
        <StatCard
          count={directoryStats?.departmentsCount}
          label="Depts"
          variant="secondary"
          isLoading={isFetchingDirectoryStats}
        />
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
      />
    </View>
  );
}
