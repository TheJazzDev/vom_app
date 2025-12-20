import { IconSymbol } from '@/src/components/Icons';
import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import {
  formatPoints,
  getLevelFromPoints,
  LEVELS,
  type LeaderboardEntry,
} from '@/src/services/gamification';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface LeaderboardItemProps {
  entry: LeaderboardEntry;
  isCurrentUser?: boolean;
}

export const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  entry,
  isCurrentUser = false,
}) => {
  const theme = useTheme();
  const level = LEVELS.find((l) => l.level === entry.level) || LEVELS[0];

  const getRankStyle = () => {
    switch (entry.rank) {
      case 1:
        return {
          backgroundColor: '#FEF3C7',
          color: '#D97706',
          icon: '1',
          medal: true,
        };
      case 2:
        return {
          backgroundColor: '#E5E7EB',
          color: '#6B7280',
          icon: '2',
          medal: true,
        };
      case 3:
        return {
          backgroundColor: '#FED7AA',
          color: '#EA580C',
          icon: '3',
          medal: true,
        };
      default:
        return {
          backgroundColor: theme.card,
          color: theme.textSecondary,
          icon: entry.rank.toString(),
          medal: false,
        };
    }
  };

  const rankStyle = getRankStyle();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isCurrentUser ? `${theme.brand}10` : theme.card,
          borderColor: isCurrentUser ? theme.brand : theme.border,
          borderWidth: isCurrentUser ? 2 : 1,
        },
      ]}
    >
      {/* Rank */}
      <View
        style={[
          styles.rankContainer,
          { backgroundColor: rankStyle.backgroundColor },
        ]}
      >
        {rankStyle.medal ? (
          <Text style={[styles.rankMedal, { color: rankStyle.color }]}>
            {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
          </Text>
        ) : (
          <Text style={[styles.rankText, { color: rankStyle.color }]}>
            {entry.rank}
          </Text>
        )}
      </View>

      {/* Avatar */}
      <View
        style={[
          styles.avatarContainer,
          { backgroundColor: `${level.color}20`, borderColor: level.color },
        ]}
      >
        {entry.userAvatar ? (
          <Image
            source={{ uri: entry.userAvatar }}
            style={styles.avatar}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.avatarIcon}>{level.icon}</Text>
        )}
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <View style={styles.nameRow}>
          <Text
            style={[styles.userName, { color: theme.heading }]}
            numberOfLines={1}
          >
            {entry.userName}
          </Text>
          {isCurrentUser && (
            <View
              style={[styles.youBadge, { backgroundColor: theme.brand }]}
            >
              <Text style={styles.youText}>You</Text>
            </View>
          )}
        </View>
        <View style={styles.levelRow}>
          <Text style={{ fontSize: 12 }}>{level.icon}</Text>
          <Text
            variant="caption"
            style={{ color: level.color, fontWeight: '600' }}
          >
            Lv.{entry.level} {entry.levelName}
          </Text>
        </View>
      </View>

      {/* Points */}
      <View style={styles.pointsContainer}>
        <Text style={[styles.pointsText, { color: theme.brand }]}>
          {formatPoints(entry.points)}
        </Text>
        <Text variant="caption" style={{ color: theme.textSecondary }}>
          pts
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  rankContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankMedal: {
    fontSize: 20,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '700',
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarIcon: {
    fontSize: 24,
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    flexShrink: 1,
  },
  youBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  youText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
