import { DailyPrayerCard } from '@/src/components/DailyPrayer';
import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { useAuthSlice, useDailyPrayerSlice } from '@/src/store/slices';
import { fetchDailyPrayersThunk, toggleDailyPrayerLikeThunk } from '@/src/store/thunks';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store/store';

export default function DailyPrayersScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { prayers, userLikes, isLoadingPrayers, error } = useDailyPrayerSlice();
  const { user } = useAuthSlice();

  useEffect(() => {
    dispatch(fetchDailyPrayersThunk());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchDailyPrayersThunk());
  }, [dispatch]);

  const handleLikeToggle = useCallback(
    async (prayerId: string) => {
      if (!user?.odUserId) return;
      await dispatch(
        toggleDailyPrayerLikeThunk({ prayerId, userId: user.odUserId })
      );
    },
    [dispatch, user?.odUserId]
  );

  const renderHeader = () => (
    <LinearGradient
      colors={['#F97316', '#EA580C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.headerGradient}
    >
      <View className="flex-row items-center gap-3 mb-3">
        <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center">
          <IconSymbol name="sun.max.fill" size={26} color="white" />
        </View>
        <View>
          <Text className="text-white/80 text-sm font-medium">
            Daily Devotion
          </Text>
          <Text className="text-white font-bold text-xl">Daily Prayers</Text>
        </View>
      </View>
      <Text className="text-white/90 leading-6">
        Start each day with a guided prayer and scripture meditation.
        Let God's word transform your heart and mind.
      </Text>
    </LinearGradient>
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center py-20">
      <View
        className="w-20 h-20 rounded-full items-center justify-center mb-4"
        style={{ backgroundColor: `${theme.brand}15` }}
      >
        <IconSymbol name="sun.max.fill" size={40} color={theme.brand} />
      </View>
      <Text
        variant="h4"
        style={{ color: theme.heading }}
        className="font-bold mb-2"
      >
        No Prayers Yet
      </Text>
      <Text
        variant="body"
        style={{ color: theme.textSecondary }}
        className="text-center px-8"
      >
        Daily prayers will appear here. Check back soon for your spiritual nourishment.
      </Text>
    </View>
  );

  const renderError = () => (
    <View className="flex-1 items-center justify-center py-20">
      <View
        className="w-20 h-20 rounded-full items-center justify-center mb-4"
        style={{ backgroundColor: '#FEE2E2' }}
      >
        <IconSymbol name="exclamationmark.triangle.fill" size={40} color="#EF4444" />
      </View>
      <Text
        variant="h4"
        style={{ color: theme.heading }}
        className="font-bold mb-2"
      >
        Something Went Wrong
      </Text>
      <Text
        variant="body"
        style={{ color: theme.textSecondary }}
        className="text-center px-8"
      >
        {error || 'Failed to load prayers. Please try again.'}
      </Text>
    </View>
  );

  if (isLoadingPrayers && prayers.length === 0) {
    return (
      <SafeAreaView
        edges={['top']}
        style={{ flex: 1, backgroundColor: theme.background }}
      >
        {renderHeader()}
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={theme.brand} />
          <Text
            variant="body"
            style={{ color: theme.textSecondary }}
            className="mt-4"
          >
            Loading prayers...
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
      <FlatList
        data={prayers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="px-4">
            <DailyPrayerCard
              prayer={item}
              isLiked={userLikes[item.id] || false}
              onLikeToggle={() => handleLikeToggle(item.id)}
            />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={error ? renderError : renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingPrayers}
            onRefresh={handleRefresh}
            tintColor={theme.brand}
            colors={[theme.brand]}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    padding: 20,
    marginBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  listContent: {
    paddingBottom: 24,
  },
});
