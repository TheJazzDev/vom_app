import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text, Card } from '@/src/components/UI';
import { IconSymbol } from '@/src/components/Icons';
import { useTheme } from '@/src/hooks';

interface ProgrammeSummaryProps {
  totalCount: number;
  filteredCount: number;
  isLoading: boolean;
}

export const ProgrammeSummary: React.FC<ProgrammeSummaryProps> = ({
  totalCount,
  filteredCount,
  isLoading,
}) => {
  const theme = useTheme();

  if (isLoading) {
    return (
      <Card className="p-4">
        <View className="flex-row items-center justify-center">
          <ActivityIndicator size="small" color={theme.primary} />
          <Text variant="body" className="ml-2" color="muted">
            Loading programmes...
          </Text>
        </View>
      </Card>
    );
  }

  const hasFilters = filteredCount !== totalCount;

  return (
    <Card className="p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: `${theme.primary}15` }}
          >
            <IconSymbol
              name="calendar.badge.clock"
              size={20}
              color={theme.primary}
            />
          </View>
          <View className="ml-3">
            <Text variant="h4" color="heading">
              {filteredCount} Programme{filteredCount !== 1 ? 's' : ''}
            </Text>
            <Text variant="caption" color="muted">
              {hasFilters ? `of ${totalCount} total` : 'upcoming'}
            </Text>
          </View>
        </View>

        {hasFilters && (
          <View
            className="px-2 py-1 rounded-full"
            style={{ backgroundColor: `${theme.secondary}20` }}
          >
            <Text variant="caption" style={{ color: theme.secondary }}>
              Filtered
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
};
