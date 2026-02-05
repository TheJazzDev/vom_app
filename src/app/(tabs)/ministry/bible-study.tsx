import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import {
  DEFAULT_BIBLE_STUDY_TOPICS,
  BIBLE_STUDY_TYPES,
  BibleStudyType,
} from '@/src/services/bibleStudy';
import { useBibleStudySlice } from '@/src/store/slices';
import {
  fetchBibleStudySessionsThunk,
  fetchBibleStudyTopicsThunk,
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

export default function BibleStudyScreen() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { sessions, topics, isLoadingSessions } = useBibleStudySlice();
  const [activeType, setActiveType] = useState<BibleStudyType | null>(null);

  useEffect(() => {
    dispatch(fetchBibleStudySessionsThunk({ type: activeType || undefined }));
    dispatch(fetchBibleStudyTopicsThunk());
  }, [dispatch, activeType]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchBibleStudySessionsThunk({ type: activeType || undefined }));
    dispatch(fetchBibleStudyTopicsThunk());
  }, [dispatch, activeType]);

  const studyTypes = Object.entries(BIBLE_STUDY_TYPES) as [
    BibleStudyType,
    { label: string; emoji: string; color: string },
  ][];

  const displayTopics = topics.length > 0 ? topics : DEFAULT_BIBLE_STUDY_TOPICS;

  const renderHeader = () => (
    <>
      <LinearGradient
        colors={['#2563EB', '#1E40AF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View className="flex-row items-center justify-between mb-3">
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="arrow.left" size={20} color="white" />
          </Pressable>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text className="text-white/80 text-sm font-medium">
              Grow in Faith
            </Text>
            <Text className="text-white font-bold text-xl">Bible Study</Text>
          </View>
          <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center">
            <IconSymbol name="book.fill" size={26} color="white" />
          </View>
        </View>
        <Text className="text-white/90 leading-6">
          Deepen your understanding of God&apos;s Word through our study
          resources and sessions.
        </Text>
      </LinearGradient>

      {/* Type Filter */}
      <View className="py-3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typeScroll}
        >
          <TouchableOpacity
            onPress={() => setActiveType(null)}
            style={[
              styles.typeChip,
              {
                backgroundColor: activeType === null ? theme.brand : theme.card,
                borderColor: activeType === null ? theme.brand : theme.border,
              },
            ]}
          >
            <Text
              style={{
                color: activeType === null ? 'white' : theme.text,
              }}
              className="font-medium"
            >
              All
            </Text>
          </TouchableOpacity>
          {studyTypes.map(([key, type]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setActiveType(key)}
              style={[
                styles.typeChip,
                {
                  backgroundColor:
                    activeType === key ? `${type.color}20` : theme.card,
                  borderColor: activeType === key ? type.color : theme.border,
                },
              ]}
            >
              <Text
                style={{
                  color: activeType === key ? type.color : theme.text,
                }}
              >
                {type.emoji} {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Topics Section */}
      <View className="px-4 mb-4">
        <Text
          variant="h4"
          style={{ color: theme.heading }}
          className="font-bold mb-3"
        >
          Study Topics
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {displayTopics.slice(0, 6).map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={[
                styles.topicCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <View className="flex-row items-center gap-2">
                <Text className="text-lg">{topic.icon}</Text>
                <View>
                  <Text
                    variant="body"
                    style={{ color: theme.heading }}
                    className="font-semibold"
                  >
                    {topic.title}
                  </Text>
                  <Text
                    variant="caption"
                    style={{ color: theme.muted }}
                    numberOfLines={1}
                  >
                    {topic.sessionsCount} sessions
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sessions Header */}
      <View className="px-4 mb-3">
        <Text
          variant="h4"
          style={{ color: theme.heading }}
          className="font-bold"
        >
          Recent Studies
        </Text>
      </View>
    </>
  );

  const renderSessionCard = ({ item }: { item: any }) => {
    const type = BIBLE_STUDY_TYPES[item.type as BibleStudyType];

    return (
      <View className="px-4">
        <Pressable
          style={[
            styles.sessionCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          {/* Header */}
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-row items-center gap-2 flex-1">
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: `${type?.color || theme.brand}20` }}
              >
                <Text className="text-lg">{type?.emoji || '📖'}</Text>
              </View>
              <View className="flex-1">
                <Text
                  variant="body"
                  style={{ color: theme.heading }}
                  className="font-semibold"
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
                <Text variant="caption" style={{ color: theme.muted }}>
                  {type?.label || 'Study'} • {item.duration} min
                </Text>
              </View>
            </View>
          </View>

          {/* Scripture Reference */}
          <View
            className="rounded-lg p-3 mb-3"
            style={{ backgroundColor: `${theme.brand}08` }}
          >
            <Text
              variant="caption"
              style={{ color: theme.brand }}
              className="font-semibold"
            >
              📖 {item.scriptureReference}
            </Text>
          </View>

          {/* Description */}
          <Text
            variant="body"
            style={{ color: theme.text }}
            className="leading-5"
            numberOfLines={2}
          >
            {item.description}
          </Text>

          {/* Footer */}
          <View className="flex-row items-center justify-between mt-3 pt-3" style={{ borderTopWidth: 1, borderTopColor: theme.border }}>
            <View className="flex-row items-center gap-2">
              {item.videoUrl && (
                <View className="flex-row items-center gap-1">
                  <IconSymbol
                    name="play.circle.fill"
                    size={14}
                    color={theme.brand}
                  />
                  <Text variant="caption" style={{ color: theme.brand }}>
                    Video
                  </Text>
                </View>
              )}
              {item.audioUrl && (
                <View className="flex-row items-center gap-1">
                  <IconSymbol name="headphones" size={14} color={theme.brand} />
                  <Text variant="caption" style={{ color: theme.brand }}>
                    Audio
                  </Text>
                </View>
              )}
              {item.pdfUrl && (
                <View className="flex-row items-center gap-1">
                  <IconSymbol name="doc.fill" size={14} color={theme.brand} />
                  <Text variant="caption" style={{ color: theme.brand }}>
                    PDF
                  </Text>
                </View>
              )}
            </View>
            <View className="flex-row items-center gap-1">
              <Text
                variant="caption"
                style={{ color: theme.brand }}
                className="font-medium"
              >
                Start Study
              </Text>
              <IconSymbol name="chevron.right" size={14} color={theme.brand} />
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
        <IconSymbol name="book.fill" size={40} color={theme.brand} />
      </View>
      <Text
        variant="h4"
        style={{ color: theme.heading }}
        className="font-bold mb-2"
      >
        No Studies Available
      </Text>
      <Text
        variant="body"
        style={{ color: theme.muted }}
        className="text-center px-8"
      >
        Bible study sessions will appear here. Check back soon for new content.
      </Text>
    </View>
  );

  if (isLoadingSessions && sessions.length === 0) {
    return (
      <SafeAreaView
        edges={['top']}
        style={{ flex: 1, backgroundColor: theme.background }}
      >
        {renderHeader()}
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={theme.brand} />
          <Text variant="body" style={{ color: theme.muted }} className="mt-4">
            Loading Bible studies...
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
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={renderSessionCard}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingSessions}
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
    marginBottom: 4,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  typeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  topicCard: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    width: '48%',
  },
  sessionCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
});
