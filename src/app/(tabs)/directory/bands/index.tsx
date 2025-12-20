import BandCategoryCard from '@/src/components/Directory/Bands/BandCard';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { dispatch, useDirectorySlice } from '@/src/store';
import { fetchAllBandsThunk } from '@/src/store/thunks/directory';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, RefreshControl } from 'react-native';

// Performance constants
const INITIAL_NUM_TO_RENDER = 4;
const MAX_TO_RENDER_PER_BATCH = 4;
const WINDOW_SIZE = 5;

export default function DirectoryBands() {
  const [refreshing, setRefreshing] = useState(false);
  const { allBands, isFetchingBands } = useDirectorySlice();
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchAllBandsThunk());
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchAllBandsThunk());
    } catch (error) {
      console.error('Error refreshing bands:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Band }) => <BandCategoryCard band={item} />,
    []
  );

  const keyExtractor = useCallback((item: Band) => item.id, []);

  return (
    <View gradient className="flex-1">
      <View className="px-4 py-3">
        <Text variant="body" className="text-center font-semibold">
          Church Bands {''}
          {isFetchingBands ? `(0)` : `(${allBands.length - 1})`}
        </Text>
        <Text variant="body" className="text-center">
          Our various bands serving God with their unique purposes and callings.
        </Text>
      </View>

      <FlatList
        data={allBands}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 20,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
        ListEmptyComponent={
          isFetchingBands ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#2563EB" />
            </View>
          ) : (
            <View className="mx-auto mt-6">
              <Text variant="h4">No band members</Text>
            </View>
          )
        }
        // Performance optimizations
        initialNumToRender={INITIAL_NUM_TO_RENDER}
        maxToRenderPerBatch={MAX_TO_RENDER_PER_BATCH}
        windowSize={WINDOW_SIZE}
        removeClippedSubviews={Platform.OS === 'android'}
      />
    </View>
  );
}
