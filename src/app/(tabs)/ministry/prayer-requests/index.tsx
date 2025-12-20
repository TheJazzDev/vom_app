import { PrayerRequestCard } from '@/src/components/PrayerRequest';
import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { PRAYER_CATEGORIES, PrayerRequestCategory } from '@/src/services/prayerRequest';
import { useAuthSlice, usePrayerRequestSlice } from '@/src/store/slices';
import { fetchPrayerRequestsThunk, togglePrayedThunk } from '@/src/store/thunks';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ImageBackground,
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
      <View style={styles.navbar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <IconSymbol name="arrow.left" size={20} color={theme.text} />
        </Pressable>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text variant="h5" style={{ color: theme.heading, fontWeight: '700' }}>
            Prayer Wall
          </Text>
        </View>
        <Pressable onPress={handleCreateRequest} style={styles.addBtn}>
          <IconSymbol name="plus.circle.fill" size={28} color={theme.primary} />
        </Pressable>
      </View>

      {/* Community Banner */}
      <View style={[styles.communityBanner, { backgroundColor: theme.card }]}>
        <View style={styles.communityHeader}>
          <View style={styles.iconCluster}>
            <View style={[styles.clusterIcon, { backgroundColor: '#EF4444' }]}>
              <IconSymbol name="heart.fill" size={14} color="white" />
            </View>
            <View style={[styles.clusterIcon, { backgroundColor: '#10B981', marginLeft: -8 }]}>
              <IconSymbol name="hands.sparkles.fill" size={14} color="white" />
            </View>
            <View style={[styles.clusterIcon, { backgroundColor: '#8B5CF6', marginLeft: -8 }]}>
              <IconSymbol name="person.2.fill" size={14} color="white" />
            </View>
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.communityTitle, { color: theme.heading }]}>
              Our Community
            </Text>
            <Text style={[styles.communitySubtitle, { color: theme.muted }]}>
              {activeRequests.length} active requests • {totalPrayers} prayers lifted
            </Text>
          </View>
        </View>
        <Text style={[styles.communityDesc, { color: theme.textSecondary }]}>
          When two or more are gathered, He is there. Share your burdens and lift each other up in prayer.
        </Text>
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        <TouchableOpacity
          onPress={() => setActiveCategory(null)}
          style={[
            styles.filterChip,
            {
              backgroundColor: activeCategory === null ? theme.primary : `${theme.muted}20`,
              borderColor: activeCategory === null ? theme.primary : 'transparent',
            },
          ]}
        >
          <Text style={{ color: activeCategory === null ? 'white' : theme.muted, fontWeight: '600', fontSize: 13 }}>
            🌟 All
          </Text>
        </TouchableOpacity>
        {categories.map(([key, cat]) => (
          <TouchableOpacity
            key={key}
            onPress={() => setActiveCategory(key)}
            style={[
              styles.filterChip,
              {
                backgroundColor: activeCategory === key ? `${cat.color}` : `${cat.color}15`,
                borderColor: activeCategory === key ? cat.color : 'transparent',
              },
            ]}
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
    <View style={styles.emptyState}>
      <View style={[styles.emptyCircle, { backgroundColor: `${theme.primary}10` }]}>
        <View style={[styles.innerCircle, { backgroundColor: `${theme.primary}20` }]}>
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
        style={[styles.emptyButton, { backgroundColor: theme.primary }]}
      >
        <IconSymbol name="plus" size={20} color="white" />
        <Text style={styles.emptyButtonText}>Submit Request</Text>
      </Pressable>
    </View>
  );

  if (isLoadingRequests && requests.length === 0) {
    return (
      <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.background }}>
        {renderHeader()}
        <View style={styles.loadingState}>
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
          <View style={styles.requestWrapper}>
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
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      {requests.length > 0 && (
        <Pressable
          onPress={handleCreateRequest}
          style={[styles.fab, { backgroundColor: theme.primary }]}
        >
          <IconSymbol name="hands.sparkles.fill" size={24} color="white" />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  communityBanner: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  communityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCluster: {
    flexDirection: 'row',
  },
  clusterIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  communitySubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  communityDesc: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  filterContainer: {
    marginBottom: 12,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    marginRight: 8,
  },
  requestWrapper: {
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  emptyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
});
