import { useTheme } from '@/src/hooks';
import React from 'react';
import { FlatList, Platform, View } from 'react-native';
import { IconSymbol } from '../../Icons';
import { Text } from '../../UI';
import { ProgrammeListCardSkeleton } from '../skeletons/ProgrammeListCardSkeleton';
import ProgrammeListCard from './ProgrammeListCard';

interface ProgrammeListProps {
  isLoading: boolean;
  programmes: AllProgrammes[];
  emptyMessage?: string;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export const ProgrammeList: React.FC<ProgrammeListProps> = ({
  programmes,
  isLoading,
  emptyMessage = 'No programmes found',
  onRefresh,
  refreshing = false,
}) => {
  const theme = useTheme();

  const LoadingSkeleton = () => (
    <View>
      {Array.from({ length: 6 }).map((_, index) => (
        <ProgrammeListCardSkeleton key={`skeleton-${index}`} />
      ))}
    </View>
  );

  const EmptyState = () => (
    <View className="flex-1 items-center justify-center py-12">
      <View
        className="w-16 h-16 rounded-full items-center justify-center mb-4"
        style={{ backgroundColor: `${theme.muted}20` }}
      >
        <IconSymbol
          name="calendar.badge.exclamationmark"
          size={28}
          color={theme.muted}
        />
      </View>
      <Text variant="h4" color="heading" className="mb-2">
        {emptyMessage}
      </Text>
      <Text variant="body" color="muted" className="text-center max-w-xs">
        Check back later or adjust your filters to see more programmes
      </Text>
    </View>
  );

  if (isLoading && programmes.length === 0) {
    return <LoadingSkeleton />;
  }

  return (
    <FlatList
      data={programmes}
      keyExtractor={(program) => program?.id!}
      renderItem={({ item }) => <ProgrammeListCard programme={item} />}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      contentContainerStyle={{
        paddingBottom: 24,
        flexGrow: 1,
      }}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListEmptyComponent={EmptyState}
      ListFooterComponent={() => {
        if (isLoading && programmes.length > 0) {
          return (
            <View className="mt-2">
              <ProgrammeListCardSkeleton />
            </View>
          );
        }
        return null;
      }}
    />
  );
};
