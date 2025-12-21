import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import type { Badge } from '@/src/services/gamification/badges';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { BadgeCard } from './BadgeCard';

interface BadgeGridProps {
  badges: Badge[];
  showCategories?: boolean;
}

type BadgeCategory = Badge['category'];

const CATEGORY_CONFIG: Record<BadgeCategory, { label: string; emoji: string }> = {
  prayer: { label: 'Prayer', emoji: '🙏' },
  study: { label: 'Study', emoji: '📖' },
  community: { label: 'Community', emoji: '👥' },
  streak: { label: 'Streaks', emoji: '🔥' },
  special: { label: 'Special', emoji: '✨' },
};

export const BadgeGrid: React.FC<BadgeGridProps> = ({
  badges,
  showCategories = true,
}) => {
  const theme = useTheme();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [activeCategory, setActiveCategory] = useState<BadgeCategory | 'all'>('all');

  const categories = Object.keys(CATEGORY_CONFIG) as BadgeCategory[];

  const filteredBadges =
    activeCategory === 'all'
      ? badges
      : badges.filter((b) => b.category === activeCategory);

  const earnedCount = badges.filter((b) => b.isEarned).length;

  const getCategoryColor = (category: BadgeCategory) => {
    const colors = {
      prayer: '#8B5CF6',
      study: '#10B981',
      community: '#F59E0B',
      streak: '#EF4444',
      special: '#3B82F6',
    };
    return colors[category];
  };

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4 px-1">
        <Text
          variant="h4"
          className="font-bold"
          style={{ color: theme.heading }}
        >
          Badges
        </Text>
        <View
          className="px-3 py-1 rounded-xl"
          style={{ backgroundColor: `${theme.brand}15` }}
        >
          <Text className="font-semibold" style={{ color: theme.brand }}>
            {earnedCount}/{badges.length}
          </Text>
        </View>
      </View>

      {/* Category Filter */}
      {showCategories && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingBottom: 12 }}
        >
          <TouchableOpacity
            onPress={() => setActiveCategory('all')}
            className="flex-row items-center px-3 py-2 rounded-full"
            style={{
              backgroundColor: activeCategory === 'all' ? theme.brand : `${theme.brand}15`,
            }}
          >
            <Text
              className="font-semibold"
              style={{ color: activeCategory === 'all' ? 'white' : theme.brand }}
            >
              All
            </Text>
          </TouchableOpacity>
          {categories.map((category) => {
            const config = CATEGORY_CONFIG[category];
            const categoryBadges = badges.filter((b) => b.category === category);
            const earnedInCategory = categoryBadges.filter((b) => b.isEarned).length;

            return (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                className="flex-row items-center px-3 py-2 rounded-full"
                style={{
                  backgroundColor: activeCategory === category
                    ? getCategoryColor(category)
                    : `${getCategoryColor(category)}15`,
                }}
              >
                <Text className="text-sm">{config.emoji}</Text>
                <Text
                  className="font-semibold ml-1"
                  style={{
                    color: activeCategory === category
                      ? 'white'
                      : getCategoryColor(category),
                  }}
                >
                  {config.label}
                </Text>
                <View
                  className="ml-1.5 px-1.5 py-0.5 rounded-lg"
                  style={{
                    backgroundColor: activeCategory === category
                      ? 'rgba(255,255,255,0.3)'
                      : `${getCategoryColor(category)}30`,
                  }}
                >
                  <Text
                    className="text-[10px] font-semibold"
                    style={{
                      color: activeCategory === category
                        ? 'white'
                        : getCategoryColor(category),
                    }}
                  >
                    {earnedInCategory}/{categoryBadges.length}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      {/* Badge Grid */}
      <View className="flex-row flex-wrap gap-3">
        {filteredBadges.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            size="md"
            onPress={() => setSelectedBadge(badge)}
          />
        ))}
      </View>

      {/* Badge Detail Modal */}
      <Modal
        visible={!!selectedBadge}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedBadge(null)}
      >
        <Pressable
          className="flex-1 bg-black/50 items-center justify-center p-6"
          onPress={() => setSelectedBadge(null)}
        >
          <Pressable
            className="w-full max-w-[340px] rounded-3xl p-6 items-center"
            style={{ backgroundColor: theme.card }}
            onPress={(e) => e.stopPropagation()}
          >
            {selectedBadge && (
              <>
                <View
                  className="w-[100px] h-[100px] rounded-full items-center justify-center mb-4"
                  style={{
                    backgroundColor: selectedBadge.isEarned
                      ? `${getCategoryColor(selectedBadge.category)}20`
                      : `${theme.textSecondary}10`,
                  }}
                >
                  <Text className="text-5xl">{selectedBadge.icon}</Text>
                </View>
                <Text
                  variant="h3"
                  className="font-bold mb-2 text-center"
                  style={{ color: theme.heading }}
                >
                  {selectedBadge.name}
                </Text>
                <Text
                  variant="body"
                  className="text-center mb-4"
                  style={{ color: theme.textSecondary }}
                >
                  {selectedBadge.description}
                </Text>
                <View
                  className="px-4 py-2 rounded-lg mb-4"
                  style={{ backgroundColor: `${theme.brand}10` }}
                >
                  <Text style={{ color: theme.brand }}>
                    {selectedBadge.requirement}
                  </Text>
                </View>
                {selectedBadge.isEarned ? (
                  <View
                    className="px-5 py-2.5 rounded-full mb-4"
                    style={{ backgroundColor: getCategoryColor(selectedBadge.category) }}
                  >
                    <Text className="text-white font-bold text-base">
                      ✓ Earned
                    </Text>
                  </View>
                ) : (
                  <View className="w-full mb-4">
                    <View
                      className="h-2 rounded overflow-hidden"
                      style={{ backgroundColor: `${getCategoryColor(selectedBadge.category)}20` }}
                    >
                      <View
                        className="h-full rounded"
                        style={{
                          width: `${selectedBadge.progress}%`,
                          backgroundColor: getCategoryColor(selectedBadge.category),
                        }}
                      />
                    </View>
                    <Text
                      variant="caption"
                      className="mt-1"
                      style={{ color: theme.textSecondary }}
                    >
                      {Math.round(selectedBadge.progress)}% complete
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => setSelectedBadge(null)}
                  className="px-8 py-3 rounded-xl"
                  style={{ backgroundColor: theme.brand }}
                >
                  <Text className="text-white font-semibold text-base">Close</Text>
                </TouchableOpacity>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};
