import { TestimonyCard } from '@/src/components/Testimony';
import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { TESTIMONY_CATEGORIES, TestimonyCategory } from '@/src/services/testimony';
import { useAuthSlice, useTestimonySlice } from '@/src/store/slices';
import { fetchTestimoniesThunk, toggleTestimonyLikeThunk } from '@/src/store/thunks';
import { LinearGradient } from 'expo-linear-gradient';
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

export default function TestimoniesScreen() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { testimonies, userLikes, isLoadingTestimonies, error } = useTestimonySlice();
  const { user } = useAuthSlice();
  const [activeCategory, setActiveCategory] = useState<TestimonyCategory | null>(null);

  useEffect(() => {
    dispatch(fetchTestimoniesThunk({ category: activeCategory || undefined }));
  }, [dispatch, activeCategory]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchTestimoniesThunk({ category: activeCategory || undefined }));
  }, [dispatch, activeCategory]);

  const handleLikeToggle = useCallback(
    async (testimonyId: string) => {
      if (!user?.odUserId) return;
      await dispatch(
        toggleTestimonyLikeThunk({ testimonyId, userId: user.odUserId })
      );
    },
    [dispatch, user?.odUserId]
  );

  const handleCreateTestimony = () => {
    router.push('/ministry/testimonies/create' as any);
  };

  const categories = Object.entries(TESTIMONY_CATEGORIES) as [
    TestimonyCategory,
    { label: string; emoji: string; color: string }
  ][];

  const featuredTestimonies = testimonies.filter(t => t.isFeatured);
  const totalLikes = testimonies.reduce((sum, t) => sum + t.likesCount, 0);

  const renderHeader = () => (
    <View>
      {/* Magazine-style Header */}
      <LinearGradient
        colors={['#7C3AED', '#5B21B6', '#4C1D95']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="pt-3 pb-6 mb-5"
      >
        <View className="flex-row items-center justify-between px-4 mb-5">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <IconSymbol name="arrow.left" size={20} color="white" />
          </Pressable>
          <View
            className="px-4 py-1.5 rounded-2xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <Text
              className="text-white font-extrabold"
              style={{ fontSize: 11, letterSpacing: 1.5 }}
            >
              TESTIMONIES
            </Text>
          </View>
          <Pressable
            onPress={handleCreateTestimony}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <IconSymbol name="square.and.pencil" size={22} color="white" />
          </Pressable>
        </View>

        <View className="items-center px-6">
          <View className="mb-2">
            <IconSymbol name="quote.opening" size={32} color="rgba(255,255,255,0.4)" />
          </View>
          <Text
            className="text-white font-black mb-2"
            style={{ fontSize: 32, letterSpacing: -0.5 }}
          >
            Praise Reports
          </Text>
          <Text
            className="text-center italic mb-4"
            style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)' }}
          >
            Stories of God&apos;s faithfulness in our lives
          </Text>
          <View
            className="flex-row items-center px-4 py-2 rounded-3xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <View
              className="w-1.5 h-1.5 rounded-full mr-2"
              style={{ backgroundColor: '#10B981' }}
            />
            <Text className="text-white text-[13px] font-semibold">
              {featuredTestimonies.length} Featured • {totalLikes} Amens
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Category Pills */}
      <View className="mb-5">
        <Text
          className="px-4 mb-3 font-bold"
          style={{ fontSize: 11, letterSpacing: 1, color: theme.muted }}
        >
          BROWSE BY CATEGORY
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        >
          <TouchableOpacity
            onPress={() => setActiveCategory(null)}
            className="flex-row items-center px-4 py-2.5 rounded-3xl mr-2"
            style={{
              backgroundColor: activeCategory === null ? theme.primary : theme.card,
              borderColor: activeCategory === null ? theme.primary : theme.border,
              borderWidth: 1.5,
            }}
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
              className="ml-2 px-2 py-0.5 rounded-xl"
              style={{
                backgroundColor: activeCategory === null ? 'rgba(255,255,255,0.3)' : theme.background
              }}
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
              className="flex-row items-center px-4 py-2.5 rounded-3xl mr-2"
              style={{
                backgroundColor: activeCategory === key ? cat.color : theme.card,
                borderColor: activeCategory === key ? cat.color : theme.border,
                borderWidth: 1.5,
              }}
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
      <View className="px-4 mb-3">
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
    <View className="flex-1 items-center justify-center py-20">
      <LinearGradient
        colors={['#EDE9FE', '#DDD6FE']}
        className="w-[140px] h-[140px] rounded-full items-center justify-center"
      >
        <IconSymbol name="sparkles" size={60} color="#7C3AED" />
      </LinearGradient>
      <Text
        variant="h4"
        className="font-bold mt-6 mb-2"
        style={{ color: theme.heading }}
      >
        No Testimonies Yet
      </Text>
      <Text
        variant="body"
        className="text-center px-10 mb-6"
        style={{ color: theme.muted, lineHeight: 22 }}
      >
        Be the first to share how God has moved in your life. Your story could inspire others!
      </Text>
      <Pressable
        onPress={handleCreateTestimony}
        className="flex-row items-center gap-2 px-7 py-3.5 rounded-[28px]"
        style={{
          backgroundColor: '#7C3AED',
          shadowColor: '#7C3AED',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        <IconSymbol name="sparkles" size={20} color="white" />
        <Text className="text-white text-base font-bold">Share Your Story</Text>
      </Pressable>
    </View>
  );

  if (isLoadingTestimonies && testimonies.length === 0) {
    return (
      <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.background }}>
        {renderHeader()}
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#7C3AED" />
          <Text variant="body" className="mt-4" style={{ color: theme.muted }}>
            Loading testimonies...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.background }}>
      <FlatList
        data={testimonies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="px-4 mb-1">
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
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Write Story FAB */}
      {testimonies.length > 0 && (
        <Pressable
          onPress={handleCreateTestimony}
          className="absolute bottom-6 right-6 rounded-[30px]"
          style={{
            shadowColor: '#7C3AED',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            elevation: 12,
          }}
        >
          <LinearGradient
            colors={['#7C3AED', '#5B21B6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-[60px] h-[60px] rounded-[30px] items-center justify-center"
          >
            <IconSymbol name="sparkles" size={24} color="white" />
          </LinearGradient>
        </Pressable>
      )}
    </SafeAreaView>
  );
}
