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
      <View className="px-4 pt-4 pb-3">
        <Text variant="h2" className=" mb-2">
          Church Bands {''}
          {isFetchingBands ? `(0)` : `(${allBands.length - 1})`}
        </Text>
        <Text variant="body">
          Our various bands serving God with their unique purposes and callings
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
