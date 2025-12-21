import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import {
  formatPoints,
  LEVELS,
  type LeaderboardEntry,
} from '@/src/services/gamification';
import React from 'react';
import { Image } from 'react-native';

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
      className="flex-row items-center p-3 rounded-xl mb-2 gap-3"
      style={{
        backgroundColor: isCurrentUser ? `${theme.brand}10` : theme.card,
        borderColor: isCurrentUser ? theme.brand : theme.border,
        borderWidth: isCurrentUser ? 2 : 1,
      }}
    >
      {/* Rank */}
      <View
        className="w-9 h-9 rounded-full items-center justify-center"
        style={{ backgroundColor: rankStyle.backgroundColor }}
      >
        {rankStyle.medal ? (
          <Text className="text-xl" style={{ color: rankStyle.color }}>
            {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
          </Text>
        ) : (
          <Text className="text-sm font-bold" style={{ color: rankStyle.color }}>
            {entry.rank}
          </Text>
        )}
      </View>

      {/* Avatar */}
      <View
        className="w-11 h-11 rounded-full border-2 items-center justify-center overflow-hidden"
        style={{ backgroundColor: `${level.color}20`, borderColor: level.color }}
      >
        {entry.userAvatar ? (
          <Image
            source={{ uri: entry.userAvatar }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Text className="text-2xl">{level.icon}</Text>
        )}
      </View>

      {/* User Info */}
      <View className="flex-1">
        <View className="flex-row items-center gap-2 mb-0.5">
          <Text
            className="text-[15px] font-semibold flex-shrink"
            style={{ color: theme.heading }}
            numberOfLines={1}
          >
            {entry.userName}
          </Text>
          {isCurrentUser && (
            <View
              className="px-1.5 py-0.5 rounded"
              style={{ backgroundColor: theme.brand }}
            >
              <Text className="text-white text-[10px] font-semibold">You</Text>
            </View>
          )}
        </View>
        <View className="flex-row items-center gap-1">
          <Text className="text-xs">{level.icon}</Text>
          <Text
            variant="caption"
            className="font-semibold"
            style={{ color: level.color }}
          >
            Lv.{entry.level} {entry.levelName}
          </Text>
        </View>
      </View>

      {/* Points */}
      <View className="items-end">
        <Text className="text-base font-bold" style={{ color: theme.brand }}>
          {formatPoints(entry.points)}
        </Text>
        <Text variant="caption" style={{ color: theme.textSecondary }}>
          pts
        </Text>
      </View>
    </View>
  );
};
