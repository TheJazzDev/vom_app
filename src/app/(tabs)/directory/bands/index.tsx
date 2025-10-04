import BandCategoryCard from '@/src/components/Directory/Bands/BandCard';
import { Text, View } from '@/src/components/UI';
import { dispatch, useDirectorySlice } from '@/src/store';
import { fetchAllBandsThunk } from '@/src/store/thunks/directory';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

export default function DirectoryBands() {
  const { allBands, isFetchingBands } = useDirectorySlice();

  useEffect(() => {
    dispatch(fetchAllBandsThunk());
  }, []);

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BandCategoryCard band={item} />}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 20,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
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
      />
    </View>
  );
}
