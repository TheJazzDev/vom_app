import { SearchInput, Text } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { capitalizeFirstLetter } from '@/src/utils';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Spacer from '../../Spacer';

interface ProgrammeFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  dateRange: 'today' | 'week' | 'month' | 'all';
  onDateRangeChange: (range: 'today' | 'week' | 'month' | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  programmeTypes: string[];
}

export const ProgrammeFilters: React.FC<ProgrammeFiltersProps> = ({
  selectedType,
  onTypeChange,
  dateRange,
  onDateRangeChange,
  searchQuery,
  onSearchChange,
  programmeTypes,
}) => {
  const theme = useTheme();

  const dateRanges = [
    { key: 'all', label: 'All Time' },
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
  ] as const;

  const Pill = ({
    label,
    isSelected,
    onPress,
  }: {
    label: string;
    isSelected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="px-3 py-1 rounded-lg mr-2"
      style={{
        backgroundColor: isSelected ? theme.brand : theme.gradient1,
      }}
    >
      <Text
        variant="caption"
        style={{ color: isSelected ? '#fff' : theme.text }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <SearchInput
        removeMargin
        placeholder="Search"
        value={searchQuery}
        onChangeText={onSearchChange}
      />
      <Spacer height={10} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {/* Programme Types */}
        {programmeTypes.map((type) => (
          <Pill
            key={type}
            label={type === 'all' ? 'All Types' : capitalizeFirstLetter(type)}
            isSelected={selectedType === type}
            onPress={() => onTypeChange(type)}
          />
        ))}

        <View
          style={{
            width: 1,
            backgroundColor: theme.border,
            marginHorizontal: 8,
          }}
        />

        {dateRanges.map((range) => (
          <Pill
            key={range.key}
            label={range.label}
            isSelected={dateRange === range.key}
            onPress={() => onDateRangeChange(range.key)}
          />
        ))}
      </ScrollView>
    </View>
  );
};
