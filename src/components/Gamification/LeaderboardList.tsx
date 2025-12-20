import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import type { LeaderboardEntry } from '@/src/services/gamification';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
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
    <View style={styles.tabsContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          onPress={() => onTabChange(tab.key)}
          style={[
            styles.tab,
            {
              backgroundColor:
                activeTab === tab.key ? theme.brand : `${theme.brand}10`,
            },
          ]}
        >
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === tab.key ? 'white' : theme.brand,
              },
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
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
      <View style={styles.loadingContainer}>
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
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
  },
});
