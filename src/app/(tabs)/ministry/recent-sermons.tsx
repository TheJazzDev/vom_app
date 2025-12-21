import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import {
  SERMON_CATEGORIES,
  SermonCategory,
  formatDuration,
} from '@/src/services/sermon';
import { useSermonSlice } from '@/src/store/slices';
import {
  fetchSermonsThunk,
  fetchFeaturedSermonsThunk,
  fetchSermonSeriesThunk,
} from '@/src/store/thunks';
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
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/src/store/store';

export default function RecentSermonsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    sermons,
    featuredSermons,
    series,
    isLoadingSermons,
    isLoadingFeatured,
    error,
  } = useSermonSlice();
  const [activeCategory, setActiveCategory] = useState<SermonCategory | null>(null);

  useEffect(() => {
    dispatch(fetchSermonsThunk({ category: activeCategory || undefined }));
    dispatch(fetchFeaturedSermonsThunk());
    dispatch(fetchSermonSeriesThunk());
  }, [dispatch, activeCategory]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchSermonsThunk({ category: activeCategory || undefined }));
    dispatch(fetchFeaturedSermonsThunk());
    dispatch(fetchSermonSeriesThunk());
  }, [dispatch, activeCategory]);

  const categories = Object.entries(SERMON_CATEGORIES) as [
    SermonCategory,
    { label: string; emoji: string; color: string }
  ][];

  const renderHeader = () => (
    <>
      <LinearGradient
        colors={['#7C3AED', '#5B21B6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-5 mb-1 rounded-b-3xl"
      >
        <View className="flex-row items-center justify-between mb-3">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <IconSymbol name="arrow.left" size={20} color="white" />
          </Pressable>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text className="text-white/80 text-sm font-medium">
              Word of God
            </Text>
            <Text className="text-white font-bold text-xl">Recent Sermons</Text>
          </View>
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center">
            <IconSymbol name="play.circle.fill" size={26} color="white" />
          </View>
        </View>
        <Text className="text-white/90 leading-6">
          Watch and listen to powerful messages from our ministers to strengthen your faith.
        </Text>
      </LinearGradient>

      {/* Category Filter */}
      <View className="py-3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        >
          <TouchableOpacity
            onPress={() => setActiveCategory(null)}
            className="px-4 py-2 rounded-2xl font-medium"
            style={{
              backgroundColor: activeCategory === null ? theme.brand : theme.card,
              borderColor: activeCategory === null ? theme.brand : theme.border,
              borderWidth: 1,
            }}
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
          {categories.map(([key, category]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setActiveCategory(key)}
              className="px-4 py-2 rounded-2xl"
              style={{
                backgroundColor: activeCategory === key ? `${category.color}20` : theme.card,
                borderColor: activeCategory === key ? category.color : theme.border,
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  color: activeCategory === key ? category.color : theme.text,
                }}
              >
                {category.emoji} {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Sermons */}
      {featuredSermons.length > 0 && !activeCategory && (
        <View className="mb-4">
          <View className="px-4 mb-3 flex-row items-center justify-between">
            <Text
              variant="h4"
              style={{ color: theme.heading }}
              className="font-bold"
            >
              Featured
            </Text>
            <View className="flex-row items-center gap-1">
              <IconSymbol name="flame.fill" size={16} color="#F59E0B" />
              <Text variant="caption" style={{ color: theme.textSecondary }}>
                Most Viewed
              </Text>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {featuredSermons.slice(0, 5).map((sermon) => {
              const category = SERMON_CATEGORIES[sermon.category];
              return (
                <Pressable
                  key={sermon.id}
                  className="w-[220px] rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                    borderWidth: 1,
                  }}
                >
                  {/* Thumbnail */}
                  <View
                    className="h-[120px] relative"
                    style={{ backgroundColor: `${category?.color || theme.brand}15` }}
                  >
                    {sermon.thumbnailUrl ? (
                      <Image
                        source={{ uri: sermon.thumbnailUrl }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="flex-1 items-center justify-center">
                        <IconSymbol
                          name="play.circle.fill"
                          size={40}
                          color={category?.color || theme.brand}
                        />
                      </View>
                    )}
                    <View
                      className="absolute bottom-2 right-2 px-2 py-1 rounded"
                      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
                    >
                      <Text className="text-white text-xs font-medium">
                        {formatDuration(sermon.duration)}
                      </Text>
                    </View>
                  </View>

                  {/* Content */}
                  <View className="p-3">
                    <Text
                      variant="body"
                      style={{ color: theme.heading }}
                      className="font-semibold"
                      numberOfLines={2}
                    >
                      {sermon.title}
                    </Text>
                    <Text
                      variant="caption"
                      style={{ color: theme.textSecondary }}
                      className="mt-1"
                    >
                      {sermon.preacher}
                    </Text>
                    <View className="flex-row items-center gap-2 mt-2">
                      <Text
                        variant="caption"
                        style={{ color: category?.color || theme.brand }}
                      >
                        {category?.emoji} {category?.label}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* Series Section */}
      {series.length > 0 && !activeCategory && (
        <View className="px-4 mb-4">
          <Text
            variant="h4"
            style={{ color: theme.heading }}
            className="font-bold mb-3"
          >
            Sermon Series
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {series.map((s) => (
              <TouchableOpacity
                key={s.id}
                className="w-[140px] p-3 rounded-xl"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  borderWidth: 1,
                }}
              >
                <View
                  className="w-12 h-12 rounded-lg items-center justify-center mb-2"
                  style={{ backgroundColor: `${theme.brand}15` }}
                >
                  <IconSymbol name="folder.fill" size={24} color={theme.brand} />
                </View>
                <Text
                  variant="body"
                  style={{ color: theme.heading }}
                  className="font-semibold"
                  numberOfLines={1}
                >
                  {s.title}
                </Text>
                <Text variant="caption" style={{ color: theme.textSecondary }}>
                  {s.sermonsCount} sermons
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Sermons List Header */}
      <View className="px-4 mb-3">
        <Text
          variant="h4"
          style={{ color: theme.heading }}
          className="font-bold"
        >
          {activeCategory ? SERMON_CATEGORIES[activeCategory].label : 'All Sermons'}
        </Text>
      </View>
    </>
  );

  const renderSermonCard = ({ item }: { item: any }) => {
    const category = SERMON_CATEGORIES[item.category as SermonCategory];

    return (
      <View className="px-4">
        <Pressable
          className="rounded-2xl p-4 mb-3"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.border,
            borderWidth: 1,
          }}
        >
          <View className="flex-row gap-3">
            {/* Thumbnail */}
            <View
              className="w-[100px] h-20 rounded-xl items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: `${category?.color || theme.brand}15` }}
            >
              {item.thumbnailUrl ? (
                <Image
                  source={{ uri: item.thumbnailUrl }}
                  className="w-full h-full rounded-xl"
                  resizeMode="cover"
                />
              ) : (
                <IconSymbol
                  name="play.circle.fill"
                  size={32}
                  color={category?.color || theme.brand}
                />
              )}
              <View
                className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded"
                style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
              >
                <Text className="text-white text-[10px] font-medium">
                  {formatDuration(item.duration)}
                </Text>
              </View>
            </View>

            {/* Content */}
            <View className="flex-1 py-1">
              <Text
                variant="body"
                style={{ color: theme.heading }}
                className="font-semibold"
                numberOfLines={2}
              >
                {item.title}
              </Text>
              <Text
                variant="caption"
                style={{ color: theme.textSecondary }}
                className="mt-1"
              >
                {item.preacher} • {item.preacherTitle}
              </Text>
              <View className="flex-row items-center gap-2 mt-2">
                <View
                  className="px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${category?.color || theme.brand}15` }}
                >
                  <Text
                    className="text-xs font-medium"
                    style={{ color: category?.color || theme.brand }}
                  >
                    {category?.emoji} {category?.label}
                  </Text>
                </View>
                {item.viewCount > 0 && (
                  <View className="flex-row items-center gap-1">
                    <IconSymbol name="eye.fill" size={12} color={theme.textSecondary} />
                    <Text variant="caption" style={{ color: theme.textSecondary }}>
                      {item.viewCount.toLocaleString()}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Scripture & Actions */}
          <View className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center justify-between">
              <View
                className="flex-row items-center gap-1 px-2 py-1 rounded-lg"
                style={{ backgroundColor: `${theme.brand}08` }}
              >
                <IconSymbol name="book.fill" size={12} color={theme.brand} />
                <Text variant="caption" style={{ color: theme.brand }} className="font-medium">
                  {item.scriptureReference}
                </Text>
              </View>
              <View className="flex-row items-center gap-3">
                {item.videoUrl && (
                  <TouchableOpacity className="flex-row items-center gap-1">
                    <IconSymbol name="play.circle.fill" size={16} color={theme.brand} />
                    <Text variant="caption" style={{ color: theme.brand }}>Watch</Text>
                  </TouchableOpacity>
                )}
                {item.audioUrl && (
                  <TouchableOpacity className="flex-row items-center gap-1">
                    <IconSymbol name="headphones" size={16} color={theme.brand} />
                    <Text variant="caption" style={{ color: theme.brand }}>Listen</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center py-20">
      <View
        className="w-20 h-20 rounded-full items-center justify-center mb-4"
        style={{ backgroundColor: `${theme.brand}15` }}
      >
        <IconSymbol name="play.circle.fill" size={40} color={theme.brand} />
      </View>
      <Text
        variant="h4"
        style={{ color: theme.heading }}
        className="font-bold mb-2"
      >
        No Sermons Available
      </Text>
      <Text
        variant="body"
        style={{ color: theme.textSecondary }}
        className="text-center px-8"
      >
        {activeCategory
          ? `No ${SERMON_CATEGORIES[activeCategory].label} sermons found. Check back soon for new messages.`
          : 'Sermons will appear here. Check back soon for powerful messages.'}
      </Text>
    </View>
  );

  if (isLoadingSermons && sermons.length === 0) {
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
            Loading sermons...
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
        data={sermons}
        keyExtractor={(item) => item.id}
        renderItem={renderSermonCard}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingSermons}
            onRefresh={handleRefresh}
            tintColor={theme.brand}
            colors={[theme.brand]}
          />
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
