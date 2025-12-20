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

  const renderHeader = () => (
    <>
      <LinearGradient
        colors={['#F59E0B', '#D97706']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center">
              <IconSymbol name="quote.bubble.fill" size={26} color="white" />
            </View>
            <View>
              <Text className="text-white/80 text-sm font-medium">
                Praise Reports
              </Text>
              <Text className="text-white font-bold text-xl">Testimonies</Text>
            </View>
          </View>
          <Pressable
            onPress={handleCreateTestimony}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          >
            <IconSymbol name="plus" size={22} color="white" />
          </Pressable>
        </View>
        <Text className="text-white/90 leading-6">
          Share and celebrate what God has done. Your testimony can inspire others!
        </Text>
      </LinearGradient>

      {/* Category Filter */}
      <View className="py-3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          <TouchableOpacity
            onPress={() => setActiveCategory(null)}
            style={[
              styles.categoryChip,
              {
                backgroundColor: activeCategory === null ? theme.brand : theme.card,
                borderColor: activeCategory === null ? theme.brand : theme.border,
              },
            ]}
          >
            <Text
              style={{
                color: activeCategory === null ? 'white' : theme.text,
              }}
              className="font-medium"
            >
              All
            </Text>
          </TouchableOpacity>
          {categories.map(([key, cat]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setActiveCategory(key)}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: activeCategory === key ? `${cat.color}20` : theme.card,
                  borderColor: activeCategory === key ? cat.color : theme.border,
                },
              ]}
            >
              <Text
                style={{
                  color: activeCategory === key ? cat.color : theme.text,
                }}
              >
                {cat.emoji} {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center py-20">
      <View
        className="w-20 h-20 rounded-full items-center justify-center mb-4"
        style={{ backgroundColor: `${theme.brand}15` }}
      >
        <IconSymbol name="quote.bubble.fill" size={40} color={theme.brand} />
      </View>
      <Text
        variant="h4"
        style={{ color: theme.heading }}
        className="font-bold mb-2"
      >
        No Testimonies Yet
      </Text>
      <Text
        variant="body"
        style={{ color: theme.textSecondary }}
        className="text-center px-8 mb-6"
      >
        Be the first to share what God has done in your life!
      </Text>
      <Pressable
        onPress={handleCreateTestimony}
        className="px-6 py-3 rounded-xl flex-row items-center gap-2"
        style={{ backgroundColor: theme.brand }}
      >
        <IconSymbol name="plus" size={18} color="white" />
        <Text className="text-white font-semibold">Share Your Testimony</Text>
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
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={theme.brand} />
          <Text
            variant="body"
            style={{ color: theme.textSecondary }}
            className="mt-4"
          >
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
          <View className="px-4">
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
            tintColor={theme.brand}
            colors={[theme.brand]}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      {testimonies.length > 0 && (
        <Pressable
          onPress={handleCreateTestimony}
          style={[
            styles.fab,
            { backgroundColor: theme.brand },
          ]}
        >
          <IconSymbol name="plus" size={24} color="white" />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    padding: 20,
    marginBottom: 4,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
