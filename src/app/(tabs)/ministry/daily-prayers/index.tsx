import { DailyPrayerCard } from '@/src/components/DailyPrayer';
import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { useAuthSlice, useDailyPrayerSlice } from '@/src/store/slices';
import { fetchDailyPrayersThunk, toggleDailyPrayerLikeThunk } from '@/src/store/thunks';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Pressable,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store/store';

const { width } = Dimensions.get('window');

export default function DailyPrayersScreen() {
  const theme = useTheme();
  const router = useRouter();
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
    <View className="mb-3">
      {/* Custom Header with Back Button */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center"
        >
          <IconSymbol name="arrow.left" size={20} color={theme.text} />
        </Pressable>
        <Text variant="h4" style={{ color: theme.heading, fontWeight: 'bold' }}>
          Daily Prayers
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Hero Section - More Devotional Feel */}
      <LinearGradient
        colors={['#FEF3C7', '#FCD34D', '#F59E0B']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="mx-4 rounded-3xl overflow-hidden mb-4"
      >
        <View className="p-6 items-center">
          <View
            className="w-20 h-20 rounded-full items-center justify-center mb-4"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
          >
            <IconSymbol name="sun.max.fill" size={40} color="#EA580C" />
          </View>
          <Text
            className="text-center mb-2"
            style={{ fontSize: 22, fontWeight: '700', color: '#78350F', lineHeight: 28 }}
          >
            &quot;This is the day the Lord has made&quot;
          </Text>
          <Text
            className="text-center italic mb-3"
            style={{ fontSize: 16, color: '#92400E' }}
          >
            Let us rejoice and be glad in it
          </Text>
          <View
            className="px-4 py-1.5 rounded-2xl"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
          >
            <Text
              style={{ fontSize: 13, fontWeight: '600', color: '#78350F' }}
            >
              Psalm 118:24
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Stats Row */}
      <View
        className="mx-4 rounded-2xl p-4 mb-5 flex-row"
        style={{
          backgroundColor: theme.card,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        }}
      >
        <View className="flex-1 items-center">
          <Text
            className="font-bold mb-1"
            style={{ fontSize: 24, color: theme.primary }}
          >
            {prayers.length}
          </Text>
          <Text
            className="font-medium"
            style={{ fontSize: 12, color: theme.muted }}
          >
            Prayers
          </Text>
        </View>
        <View
          className="w-[1px] my-2"
          style={{ backgroundColor: theme.border }}
        />
        <View className="flex-1 items-center">
          <Text
            className="font-bold mb-1"
            style={{ fontSize: 24, color: '#10B981' }}
          >
            {Object.keys(userLikes).length}
          </Text>
          <Text
            className="font-medium"
            style={{ fontSize: 12, color: theme.muted }}
          >
            Prayed
          </Text>
        </View>
        <View
          className="w-[1px] my-2"
          style={{ backgroundColor: theme.border }}
        />
        <View className="flex-1 items-center">
          <IconSymbol name="calendar" size={24} color={theme.primary} />
          <Text
            className="font-medium"
            style={{ fontSize: 12, color: theme.muted }}
          >
            Daily
          </Text>
        </View>
      </View>

      <View className="px-4 mb-3">
        <Text variant="h5" style={{ color: theme.heading, fontWeight: '600' }}>
          Prayer Journey
        </Text>
        <Text variant="caption" style={{ color: theme.muted }}>
          Tap a prayer to dive deeper
        </Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center py-[60px]">
      <View
        className="w-[100px] h-[100px] rounded-full items-center justify-center mb-5"
        style={{ backgroundColor: `${theme.primary}10` }}
      >
        <IconSymbol name="book.closed.fill" size={50} color={theme.primary} />
      </View>
      <Text variant="h4" style={{ color: theme.heading, fontWeight: '700', marginBottom: 8 }}>
        No Prayers Available
      </Text>
      <Text variant="body" style={{ color: theme.muted, textAlign: 'center', paddingHorizontal: 40 }}>
        Daily devotionals will appear here. Check back tomorrow for spiritual nourishment.
      </Text>
    </View>
  );

  const renderError = () => (
    <View className="flex-1 items-center justify-center py-[60px]">
      <View
        className="w-[100px] h-[100px] rounded-full bg-red-100 items-center justify-center mb-5"
      >
        <IconSymbol name="exclamationmark.triangle.fill" size={50} color="#EF4444" />
      </View>
      <Text variant="h4" style={{ color: theme.heading, fontWeight: '700', marginBottom: 8 }}>
        Oops! Something Went Wrong
      </Text>
      <Text variant="body" style={{ color: theme.muted, textAlign: 'center', paddingHorizontal: 40 }}>
        {error || 'Unable to load prayers. Please try again.'}
      </Text>
    </View>
  );

  if (isLoadingPrayers && prayers.length === 0) {
    return (
      <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.background }}>
        {renderHeader()}
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={theme.primary} />
          <Text variant="body" style={{ color: theme.muted, marginTop: 16 }}>
            Loading prayers...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={prayers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="px-4 mb-1">
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
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
