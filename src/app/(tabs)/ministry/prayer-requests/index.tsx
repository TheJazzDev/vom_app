import { PrayerRequestCard } from '@/src/components/PrayerRequest';
import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { PRAYER_CATEGORIES, PrayerRequestCategory } from '@/src/services/prayerRequest';
import { useAuthSlice, usePrayerRequestSlice } from '@/src/store/slices';
import { fetchPrayerRequestsThunk, togglePrayedThunk } from '@/src/store/thunks';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store/store';

export default function PrayerRequestsScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { requests, userPrayed, isLoadingRequests, error } = usePrayerRequestSlice();
  const { user } = useAuthSlice();
  const [activeCategory, setActiveCategory] = useState<PrayerRequestCategory | null>(null);

  useEffect(() => {
    dispatch(fetchPrayerRequestsThunk({ category: activeCategory || undefined }));
  }, [dispatch, activeCategory]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchPrayerRequestsThunk({ category: activeCategory || undefined }));
  }, [dispatch, activeCategory]);

  const handlePray = useCallback(
    async (requestId: string) => {
      if (!user?.odUserId) return;
      await dispatch(togglePrayedThunk({ requestId, userId: user.odUserId }));
    },
    [dispatch, user?.odUserId]
  );

  const handleCreateRequest = () => {
    router.push('/ministry/prayer-requests/create' as any);
  };

  const categories = Object.entries(PRAYER_CATEGORIES) as [
    PrayerRequestCategory,
    { label: string; emoji: string; color: string }
  ][];

  const activeRequests = requests.filter(r => r.status === 'active');
  const totalPrayers = requests.reduce((sum, r) => sum + r.prayerCount, 0);

  const renderHeader = () => (
    <View>
      {/* Custom Navbar */}
      <View className="flex-row items-center px-4 py-3 mb-2">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center"
        >
          <IconSymbol name="arrow.left" size={20} color={theme.text} />
        </Pressable>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text variant="h5" style={{ color: theme.heading, fontWeight: '700' }}>
            Prayer Wall
          </Text>
        </View>
        <Pressable
          onPress={handleCreateRequest}
          className="w-10 h-10 items-center justify-center"
        >
          <IconSymbol name="plus.circle.fill" size={28} color={theme.primary} />
        </Pressable>
      </View>

      {/* Community Banner */}
      <View
        className="mx-4 p-4 rounded-2xl mb-4"
        style={{ backgroundColor: theme.card }}
      >
        <View className="flex-row items-center mb-3">
          <View className="flex-row">
            <View
              className="w-8 h-8 rounded-2xl items-center justify-center border-2 border-white"
              style={{ backgroundColor: '#EF4444' }}
            >
              <IconSymbol name="heart.fill" size={14} color="white" />
            </View>
            <View
              className="w-8 h-8 rounded-2xl items-center justify-center -ml-2 border-2 border-white"
              style={{ backgroundColor: '#10B981' }}
            >
              <IconSymbol name="hands.sparkles.fill" size={14} color="white" />
            </View>
            <View
              className="w-8 h-8 rounded-2xl items-center justify-center -ml-2 border-2 border-white"
              style={{ backgroundColor: '#8B5CF6' }}
            >
              <IconSymbol name="person.2.fill" size={14} color="white" />
            </View>
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              className="font-bold mb-0.5"
              style={{ fontSize: 18, color: theme.heading }}
            >
              Our Community
            </Text>
            <Text
              className="font-medium"
              style={{ fontSize: 13, color: theme.muted }}
            >
              {activeRequests.length} active requests • {totalPrayers} prayers lifted
            </Text>
          </View>
        </View>
        <Text
          className="leading-5 italic"
          style={{ fontSize: 14, color: theme.textSecondary }}
        >
          When two or more are gathered, He is there. Share your burdens and lift each other up in prayer.
        </Text>
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-3"
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
      >
        <TouchableOpacity
          onPress={() => setActiveCategory(null)}
          className="px-3.5 py-2 rounded-2xl border-2 mr-2"
          style={{
            backgroundColor: activeCategory === null ? theme.primary : `${theme.muted}20`,
            borderColor: activeCategory === null ? theme.primary : 'transparent',
          }}
        >
          <Text style={{ color: activeCategory === null ? 'white' : theme.muted, fontWeight: '600', fontSize: 13 }}>
            🌟 All
          </Text>
        </TouchableOpacity>
        {categories.map(([key, cat]) => (
          <TouchableOpacity
            key={key}
            onPress={() => setActiveCategory(key)}
            className="px-3.5 py-2 rounded-2xl border-2 mr-2"
            style={{
              backgroundColor: activeCategory === key ? `${cat.color}` : `${cat.color}15`,
              borderColor: activeCategory === key ? cat.color : 'transparent',
            }}
          >
            <Text
              style={{
                color: activeCategory === key ? 'white' : cat.color,
                fontWeight: '600',
                fontSize: 13,
              }}
            >
              {cat.emoji} {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center py-20">
      <View
        className="w-[140px] h-[140px] rounded-full items-center justify-center"
        style={{ backgroundColor: `${theme.primary}10` }}
      >
        <View
          className="w-[100px] h-[100px] rounded-full items-center justify-center"
          style={{ backgroundColor: `${theme.primary}20` }}
        >
          <IconSymbol name="hands.sparkles.fill" size={50} color={theme.primary} />
        </View>
      </View>
      <Text variant="h4" style={{ color: theme.heading, fontWeight: '700', marginTop: 24, marginBottom: 8 }}>
        No Prayer Requests
      </Text>
      <Text variant="body" style={{ color: theme.muted, textAlign: 'center', paddingHorizontal: 40, marginBottom: 24 }}>
        Be the first to share a prayer need. Your church family is here to support you.
      </Text>
      <Pressable
        onPress={handleCreateRequest}
        className="flex-row items-center gap-2 px-6 py-3 rounded-3xl"
        style={{ backgroundColor: theme.primary }}
      >
        <IconSymbol name="plus" size={20} color="white" />
        <Text className="text-white text-base font-semibold">Submit Request</Text>
      </Pressable>
    </View>
  );

  if (isLoadingRequests && requests.length === 0) {
    return (
      <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.background }}>
        {renderHeader()}
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={theme.primary} />
          <Text variant="body" style={{ color: theme.muted, marginTop: 16 }}>
            Loading prayer wall...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="px-4 mb-1">
            <PrayerRequestCard
              request={item}
              hasPrayed={userPrayed[item.id] || false}
              onPray={() => handlePray(item.id)}
            />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingRequests}
            onRefresh={handleRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
          />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      {requests.length > 0 && (
        <Pressable
          onPress={handleCreateRequest}
          className="absolute bottom-6 right-6 w-[60px] h-[60px] rounded-[30px] items-center justify-center"
          style={{
            backgroundColor: theme.primary,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 12,
          }}
        >
          <IconSymbol name="hands.sparkles.fill" size={24} color="white" />
        </Pressable>
      )}
    </SafeAreaView>
  );
}
