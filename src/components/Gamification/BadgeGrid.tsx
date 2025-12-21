import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import type { Badge } from '@/src/services/gamification/badges';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text
          variant="h4"
          style={[styles.headerTitle, { color: theme.heading }]}
        >
          Badges
        </Text>
        <View
          style={[
            styles.countBadge,
            { backgroundColor: `${theme.brand}15` },
          ]}
        >
          <Text style={{ color: theme.brand, fontWeight: '600' }}>
            {earnedCount}/{badges.length}
          </Text>
        </View>
      </View>

      {/* Category Filter */}
      {showCategories && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          <TouchableOpacity
            onPress={() => setActiveCategory('all')}
            style={[
              styles.categoryChip,
              {
                backgroundColor:
                  activeCategory === 'all' ? theme.brand : `${theme.brand}15`,
              },
            ]}
          >
            <Text
              style={{
                color: activeCategory === 'all' ? 'white' : theme.brand,
                fontWeight: '600',
              }}
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
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor:
                      activeCategory === category
                        ? getCategoryColor(category)
                        : `${getCategoryColor(category)}15`,
                  },
                ]}
              >
                <Text style={{ fontSize: 14 }}>{config.emoji}</Text>
                <Text
                  style={{
                    color:
                      activeCategory === category
                        ? 'white'
                        : getCategoryColor(category),
                    fontWeight: '600',
                    marginLeft: 4,
                  }}
                >
                  {config.label}
                </Text>
                <View
                  style={[
                    styles.categoryCount,
                    {
                      backgroundColor:
                        activeCategory === category
                          ? 'rgba(255,255,255,0.3)'
                          : `${getCategoryColor(category)}30`,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color:
                        activeCategory === category
                          ? 'white'
                          : getCategoryColor(category),
                      fontWeight: '600',
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
      <View style={styles.grid}>
        {filteredBadges.map((badge) => (
          <View key={badge.id} style={styles.gridItem}>
            <BadgeCard
              badge={badge}
              size="md"
              onPress={() => setSelectedBadge(badge)}
            />
          </View>
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
          style={styles.modalOverlay}
          onPress={() => setSelectedBadge(null)}
        >
          <Pressable
            style={[
              styles.modalContent,
              { backgroundColor: theme.card },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            {selectedBadge && (
              <>
                <View
                  style={[
                    styles.modalIcon,
                    {
                      backgroundColor: selectedBadge.isEarned
                        ? `${getCategoryColor(selectedBadge.category)}20`
                        : `${theme.textSecondary}10`,
                    },
                  ]}
                >
                  <Text style={{ fontSize: 48 }}>{selectedBadge.icon}</Text>
                </View>
                <Text
                  variant="h3"
                  style={[styles.modalTitle, { color: theme.heading }]}
                >
                  {selectedBadge.name}
                </Text>
                <Text
                  variant="body"
                  style={[
                    styles.modalDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  {selectedBadge.description}
                </Text>
                <View
                  style={[
                    styles.modalRequirement,
                    { backgroundColor: `${theme.brand}10` },
                  ]}
                >
                  <Text style={{ color: theme.brand }}>
                    {selectedBadge.requirement}
                  </Text>
                </View>
                {selectedBadge.isEarned ? (
                  <View
                    style={[
                      styles.earnedIndicator,
                      { backgroundColor: getCategoryColor(selectedBadge.category) },
                    ]}
                  >
                    <Text style={styles.earnedIndicatorText}>
                      ✓ Earned
                    </Text>
                  </View>
                ) : (
                  <View style={styles.progressSection}>
                    <View
                      style={[
                        styles.modalProgressBg,
                        { backgroundColor: `${getCategoryColor(selectedBadge.category)}20` },
                      ]}
                    >
                      <View
                        style={[
                          styles.modalProgressFill,
                          {
                            width: `${selectedBadge.progress}%`,
                            backgroundColor: getCategoryColor(selectedBadge.category),
                          },
                        ]}
                      />
                    </View>
                    <Text
                      variant="caption"
                      style={{ color: theme.textSecondary, marginTop: 4 }}
                    >
                      {Math.round(selectedBadge.progress)}% complete
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => setSelectedBadge(null)}
                  style={[styles.closeButton, { backgroundColor: theme.brand }]}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  headerTitle: {
    fontWeight: '700',
  },
  countBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryScroll: {
    gap: 8,
    paddingBottom: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryCount: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0,
    // marginHorizontal: -6,
  },
  gridItem: {
    width: '31.333%', // 3 columns: (100% - 2 gaps) / 3
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  modalIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalDescription: {
    textAlign: 'center',
    marginBottom: 16,
  },
  modalRequirement: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  earnedIndicator: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 16,
  },
  earnedIndicatorText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  progressSection: {
    width: '100%',
    marginBottom: 16,
  },
  modalProgressBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  modalProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  closeButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
