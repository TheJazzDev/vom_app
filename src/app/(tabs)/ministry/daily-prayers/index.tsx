import { DailyPrayerCard } from '@/src/components/DailyPrayer';
import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { useAuthSlice, useDailyPrayerSlice } from '@/src/store/slices';
import {
  fetchDailyPrayersThunk,
  toggleDailyPrayerLikeThunk,
} from '@/src/store/thunks';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store/store';

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
      if (!user?.id) return;
      await dispatch(toggleDailyPrayerLikeThunk({ prayerId, userId: user.id }));
    },
    [dispatch, user?.id],
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Custom Header with Back Button */}
      <View style={styles.customHeader}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
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
        style={styles.heroGradient}
      >
        <View style={styles.heroContent}>
          <View style={styles.sunIconContainer}>
            <IconSymbol name="sun.max.fill" size={40} color="#EA580C" />
          </View>
          <Text style={styles.heroTitle}>
            &quot;This is the day the Lord has made&quot;
          </Text>
          <Text style={styles.heroSubtitle}>
            Let us rejoice and be glad in it
          </Text>
          <View style={styles.verseReference}>
            <Text style={styles.verseText}>Psalm 118:24</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Stats Row */}
      <View style={[styles.statsRow, { backgroundColor: theme.card }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: theme.primary }]}>
            {prayers.length}
          </Text>
          <Text style={[styles.statLabel, { color: theme.muted }]}>
            Prayers
          </Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#10B981' }]}>
            {Object.keys(userLikes).length}
          </Text>
          <Text style={[styles.statLabel, { color: theme.muted }]}>Prayed</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
        <View style={styles.statItem}>
          <IconSymbol name="calendar" size={24} color={theme.primary} />
          <Text style={[styles.statLabel, { color: theme.muted }]}>Daily</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
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
    <View style={styles.emptyContainer}>
      <View
        style={[
          styles.emptyIconContainer,
          { backgroundColor: `${theme.primary}10` },
        ]}
      >
        <IconSymbol name="book.closed.fill" size={50} color={theme.primary} />
      </View>
      <Text
        variant="h4"
        style={{ color: theme.heading, fontWeight: '700', marginBottom: 8 }}
      >
        No Prayers Available
      </Text>
      <Text
        variant="body"
        style={{
          color: theme.muted,
          textAlign: 'center',
          paddingHorizontal: 40,
        }}
      >
        Daily devotionals will appear here. Check back tomorrow for spiritual
        nourishment.
      </Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.errorIconContainer}>
        <IconSymbol
          name="exclamationmark.triangle.fill"
          size={50}
          color="#EF4444"
        />
      </View>
      <Text
        variant="h4"
        style={{ color: theme.heading, fontWeight: '700', marginBottom: 8 }}
      >
        Oops! Something Went Wrong
      </Text>
      <Text
        variant="body"
        style={{
          color: theme.muted,
          textAlign: 'center',
          paddingHorizontal: 40,
        }}
      >
        {error || 'Unable to load prayers. Please try again.'}
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
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text variant="body" style={{ color: theme.muted, marginTop: 16 }}>
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
          <View style={styles.cardWrapper}>
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
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 12,
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroGradient: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  heroContent: {
    padding: 24,
    alignItems: 'center',
  },
  sunIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#78350F',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 28,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#92400E',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  verseReference: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 16,
  },
  verseText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#78350F',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    marginVertical: 8,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  cardWrapper: {
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  errorIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 24,
  },
});
