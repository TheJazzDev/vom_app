import { Button, ProgrammeList, Spacer, Text, View } from '@/src/components';
import { ProgrammeFilters } from '@/src/components/Programme/components/ProgrammeFilters';
import { useTheme } from '@/src/hooks';
import { dispatch } from '@/src/store';
import React, { useEffect, useMemo, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

interface PastAndUpcomingScreenProps {
  programmes: any[];
  isLoading: boolean;
  error: string | null;
  title: string;
  subtitle: string;
  emptyMessage?: string;
  refreshAction: () => void;
  showRefreshControl?: boolean;
}

export const PastAndUpcomingScreen: React.FC<PastAndUpcomingScreenProps> = ({
  programmes,
  isLoading,
  error,
  title,
  subtitle,
  emptyMessage = 'No programmes found',
  refreshAction,
  showRefreshControl = true,
}) => {
  const theme = useTheme();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [dateRange, setDateRange] = useState<
    'today' | 'week' | 'month' | 'all'
  >('all');

  // Get unique programme types
  const programmeTypes = useMemo(() => {
    const types = [...new Set(programmes.map((p) => p?.type).filter(Boolean))];
    return ['all', ...types];
  }, [programmes]);

  // Filter programmes based on selected filters
  const filteredProgrammes = useMemo(() => {
    let filtered = programmes;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter((p) => p?.type === selectedType);
    }

    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();

      if (dateRange === 'today') {
        filterDate.setDate(now.getDate() + 1);
        filterDate.setHours(0, 0, 0, 0);
      } else if (dateRange === 'week') {
        filterDate.setDate(now.getDate() + 7);
      } else if (dateRange === 'month') {
        filterDate.setMonth(now.getMonth() + 1);
      }

      filtered = filtered.filter((p) => {
        if (!p?.date) return false;
        return new Date(p.date) <= filterDate;
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();

      filtered = filtered.filter((p) => {
        if (!p) return false;

        const searchableFields: string[] = [
          p.theme,
          p.topic,
          p.type,
          p.lesson,
          (p as any).callToWorship,
          (p as any).callToWorshipText,
          ...Object.values(p.officiating || {}),
          ...Object.values(p.hynms || p.hymns || {}),
        ]
          .flat()
          .filter(Boolean)
          .map((s) => String(s).toLowerCase());

        return searchableFields.some((field) => field.includes(q));
      });
    }

    return filtered;
  }, [programmes, selectedType, dateRange, searchQuery]);

  const handleRefresh = () => {
    dispatch(() => refreshAction());
  };

  useEffect(() => {
    dispatch(() => refreshAction());
  }, [refreshAction]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View gradient style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          {/* <Text variant="h4" color="heading" className="mb-1">
            {title} ({filteredProgrammes.length || 0})
          </Text> */}
          <Text variant="body" color="muted" className="mb-4">
            {subtitle} ({filteredProgrammes.length || 0})
          </Text>

          <ProgrammeFilters
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            programmeTypes={programmeTypes}
          />

          <Spacer height={16} />
        </View>

        {/* Error State */}
        {error && (
          <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
            <View className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
              <Text
                variant="body"
                className="text-red-600 dark:text-red-400 mb-2"
              >
                Failed to load programmes
              </Text>
              <Button
                variant="outline"
                size="sm"
                onPress={handleRefresh}
                className="self-start"
              >
                Try Again
              </Button>
            </View>
          </View>
        )}

        {/* Programme List */}
        <View style={{ paddingHorizontal: 16, flex: 1 }}>
          <ProgrammeList
            programmes={filteredProgrammes}
            isLoading={isLoading}
            emptyMessage={
              searchQuery || selectedType !== 'all' || dateRange !== 'all'
                ? 'No programmes match your filters'
                : emptyMessage
            }
          />
        </View>

        <Spacer height={24} />
      </View>
    </TouchableWithoutFeedback>
  );
};
