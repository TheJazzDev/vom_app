import { TestimonyCard } from '@/src/components/Testimony';
import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import {
  TESTIMONY_CATEGORIES,
  TestimonyCategory,
} from '@/src/services/testimony';
import { useAuthSlice, useTestimonySlice } from '@/src/store/slices';
import {
  fetchTestimoniesThunk,
  toggleTestimonyLikeThunk,
} from '@/src/store/thunks';
import { LinearGradient } from 'expo-linear-gradient';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store/store';

export default function TestimoniesScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { testimonies, userLikes, isLoadingTestimonies } = useTestimonySlice();
  const { user } = useAuthSlice();
  const [activeCategory, setActiveCategory] =
    useState<TestimonyCategory | null>(null);

  useEffect(() => {
    dispatch(fetchTestimoniesThunk({ category: activeCategory || undefined }));
  }, [dispatch, activeCategory]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchTestimoniesThunk({ category: activeCategory || undefined }));
  }, [dispatch, activeCategory]);

  const handleLikeToggle = useCallback(
    async (testimonyId: string) => {
      if (!user?.id) return;
      await dispatch(
        toggleTestimonyLikeThunk({ testimonyId, userId: user.id }),
      );
    },
    [dispatch, user?.id],
  );

  const handleCreateTestimony = () => {
    router.push('/create-testimony' as any);
  };

  const categories = Object.entries(TESTIMONY_CATEGORIES) as [
    TestimonyCategory,
    { label: string; emoji: string; color: string },
  ][];

  const featuredTestimonies = testimonies.filter((t) => t.isFeatured);
  const totalLikes = testimonies.reduce((sum, t) => sum + t.likesCount, 0);

  const renderHeader = () => (
    <View>
      {/* Magazine-style Header */}
      <LinearGradient
        colors={['#7C3AED', '#5B21B6', '#4C1D95']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.magazineHeader}
      >
        <View style={styles.headerTop}>
          <Pressable onPress={() => router.back()} style={styles.headerBackBtn}>
            <IconSymbol name="arrow.left" size={20} color="white" />
          </Pressable>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>TESTIMONIES</Text>
          </View>
          <Pressable
            onPress={handleCreateTestimony}
            style={styles.headerActionBtn}
          >
            <IconSymbol name="square.and.pencil" size={22} color="white" />
          </Pressable>
        </View>

        <View style={styles.heroSection}>
          <View style={styles.quoteIcon}>
            <IconSymbol
              name="quote.opening"
              size={32}
              color="rgba(255,255,255,0.4)"
            />
          </View>
          <Text style={styles.heroTitle}>Praise Reports</Text>
          <Text style={styles.heroTagline}>
            Stories of God&apos;s faithfulness in our lives
          </Text>
          <View style={styles.featuredBanner}>
            <View style={styles.featuredDot} />
            <Text style={styles.featuredText}>
              {featuredTestimonies.length} Featured • {totalLikes} Amens
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Category Pills */}
      <View style={styles.categorySection}>
        <Text style={[styles.sectionLabel, { color: theme.muted }]}>
          BROWSE BY CATEGORY
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          <TouchableOpacity
            onPress={() => setActiveCategory(null)}
            style={[
              styles.categoryPill,
              {
                backgroundColor:
                  activeCategory === null ? theme.primary : theme.card,
                borderColor:
                  activeCategory === null ? theme.primary : theme.border,
              },
            ]}
          >
            <Text
              style={{
                color: activeCategory === null ? 'white' : theme.text,
                fontWeight: '700',
                fontSize: 14,
              }}
            >
              All Stories
            </Text>
            <View
              style={[
                styles.pillBadge,
                {
                  backgroundColor:
                    activeCategory === null
                      ? 'rgba(255,255,255,0.3)'
                      : theme.background,
                },
              ]}
            >
              <Text
                style={{
                  color: activeCategory === null ? 'white' : theme.muted,
                  fontSize: 12,
                  fontWeight: '700',
                }}
              >
                {testimonies.length}
              </Text>
            </View>
          </TouchableOpacity>
          {categories.map(([key, cat]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setActiveCategory(key)}
              style={[
                styles.categoryPill,
                {
                  backgroundColor:
                    activeCategory === key ? cat.color : theme.card,
                  borderColor:
                    activeCategory === key ? cat.color : theme.border,
                },
              ]}
            >
              <Text style={{ fontSize: 16, marginRight: 4 }}>{cat.emoji}</Text>
              <Text
                style={{
                  color: activeCategory === key ? 'white' : theme.text,
                  fontWeight: '600',
                  fontSize: 14,
                }}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Stories Header */}
      <View style={styles.storiesHeader}>
        <Text variant="h5" style={{ color: theme.heading, fontWeight: '700' }}>
          Recent Stories
        </Text>
        <Text variant="caption" style={{ color: theme.muted }}>
          Tap to read the full testimony
        </Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <LinearGradient
        colors={['#EDE9FE', '#DDD6FE']}
        style={styles.emptyGradient}
      >
        <IconSymbol name="sparkles" size={60} color="#7C3AED" />
      </LinearGradient>
      <Text
        variant="h4"
        style={{
          color: theme.heading,
          fontWeight: '700',
          marginTop: 24,
          marginBottom: 8,
        }}
      >
        No Testimonies Yet
      </Text>
      <Text
        variant="body"
        style={{
          color: theme.muted,
          textAlign: 'center',
          paddingHorizontal: 40,
          marginBottom: 24,
          lineHeight: 22,
        }}
      >
        Be the first to share how God has moved in your life. Your story could
        inspire others!
      </Text>
      <Pressable
        onPress={handleCreateTestimony}
        style={[styles.emptyButton, { backgroundColor: '#7C3AED' }]}
      >
        <IconSymbol name="sparkles" size={20} color="white" />
        <Text style={styles.emptyButtonText}>Share Your Story</Text>
      </Pressable>
    </View>
  );

  if (isLoadingTestimonies && testimonies.length === 0) {
    return (
      <SafeAreaView
        edges={['top']}
        style={{ flex: 1, backgroundColor: theme.background }}
      >
        {renderHeader()}
        <View style={styles.loadingState}>
          <ActivityIndicator size="large" color="#7C3AED" />
          <Text variant="body" style={{ color: theme.muted, marginTop: 16 }}>
            Loading testimonies...
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
        data={testimonies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.testimonyWrapper}>
            <TestimonyCard
              testimony={item}
              isLiked={userLikes[item.id] || false}
              onLikeToggle={() => handleLikeToggle(item.id)}
            />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingTestimonies}
            onRefresh={handleRefresh}
            tintColor="#7C3AED"
            colors={['#7C3AED']}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Write Story FAB */}
      {testimonies.length > 0 && (
        <Pressable onPress={handleCreateTestimony} style={styles.fab}>
          <LinearGradient
            colors={['#7C3AED', '#5B21B6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fabGradient}
          >
            <IconSymbol name="sparkles" size={24} color="white" />
          </LinearGradient>
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  magazineHeader: {
    paddingTop: 12,
    paddingBottom: 24,
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
  },
  headerBadgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  headerActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  quoteIcon: {
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: 'white',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  heroTagline: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  featuredBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
  },
  featuredDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  featuredText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  categorySection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1.5,
    marginRight: 8,
  },
  pillBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  storiesHeader: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  testimonyWrapper: {
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyGradient: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 28,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  emptyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
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
    borderRadius: 30,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  fabGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
