import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import type { LeaderboardEntry } from '@/src/services/gamification';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { LeaderboardItem } from './LeaderboardItem';

interface LeaderboardListProps {
  entries: LeaderboardEntry[];
  currentUserId: string;
  isLoading: boolean;
  onRefresh: () => void;
  activeTab: 'weekly' | 'monthly' | 'allTime';
  onTabChange: (tab: 'weekly' | 'monthly' | 'allTime') => void;
}

export const LeaderboardList: React.FC<LeaderboardListProps> = ({
  entries,
  currentUserId,
  isLoading,
  onRefresh,
  activeTab,
  onTabChange,
}) => {
  const theme = useTheme();

  const tabs: { key: 'weekly' | 'monthly' | 'allTime'; label: string }[] = [
    { key: 'weekly', label: 'This Week' },
    { key: 'monthly', label: 'This Month' },
    { key: 'allTime', label: 'All Time' },
  ];

  const renderHeader = () => (
    <View className="flex-row gap-2 mb-4">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          onPress={() => onTabChange(tab.key)}
          className="flex-1 py-2.5 px-3 rounded-full items-center"
          style={{
            backgroundColor:
              activeTab === tab.key ? theme.brand : `${theme.brand}10`,
          }}
        >
          <Text
            className="text-[13px] font-semibold"
            style={{
              color: activeTab === tab.key ? 'white' : theme.brand,
            }}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderEmpty = () => (
    <View className="items-center py-12">
      <Text style={{ fontSize: 48, marginBottom: 12 }}>🏆</Text>
      <Text
        variant="h4"
        style={{ color: theme.heading, textAlign: 'center', marginBottom: 8 }}
      >
        No Rankings Yet
      </Text>
      <Text
        variant="body"
        style={{ color: theme.textSecondary, textAlign: 'center' }}
      >
        Be the first to earn points and claim the top spot!
      </Text>
    </View>
  );

  if (isLoading && entries.length === 0) {
    return (
      <View className="flex-1 p-4 items-center justify-center">
        {renderHeader()}
        <ActivityIndicator size="large" color={theme.brand} />
        <Text
          variant="body"
          style={{ color: theme.textSecondary, marginTop: 12 }}
        >
          Loading leaderboard...
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.odUserId}
      renderItem={({ item }) => (
        <LeaderboardItem
          entry={item}
          isCurrentUser={item.odUserId === currentUserId}
        />
      )}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmpty}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={onRefresh}
          tintColor={theme.brand}
          colors={[theme.brand]}
        />
      }
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    />
  );
};
