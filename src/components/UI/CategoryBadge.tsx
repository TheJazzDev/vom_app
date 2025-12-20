import { useTheme } from '@/src/hooks';
import React from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Text } from './Text';
import { View } from './View';

type CategoryType =
  | 'health'
  | 'family'
  | 'work'
  | 'spiritual'
  | 'financial'
  | 'other'
  | 'healing'
  | 'provision'
  | 'deliverance'
  | 'breakthrough'
  | 'salvation'
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'custom';

interface CategoryBadgeProps {
  category: CategoryType | string;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  // Prayer request categories
  health: { bg: '#FEE2E2', text: '#DC2626' },
  family: { bg: '#FCE7F3', text: '#DB2777' },
  work: { bg: '#DBEAFE', text: '#2563EB' },
  spiritual: { bg: '#F3E8FF', text: '#9333EA' },
  financial: { bg: '#D1FAE5', text: '#059669' },
  other: { bg: '#F3F4F6', text: '#6B7280' },

  // Testimony categories
  healing: { bg: '#FEE2E2', text: '#DC2626' },
  provision: { bg: '#D1FAE5', text: '#059669' },
  deliverance: { bg: '#F3E8FF', text: '#9333EA' },
  breakthrough: { bg: '#FEF3C7', text: '#D97706' },
  salvation: { bg: '#DBEAFE', text: '#2563EB' },

  // Difficulty levels
  beginner: { bg: '#D1FAE5', text: '#059669' },
  intermediate: { bg: '#FEF3C7', text: '#D97706' },
  advanced: { bg: '#FEE2E2', text: '#DC2626' },

  // Default
  custom: { bg: '#E5E7EB', text: '#374151' },
};

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  label,
  size = 'medium',
  style,
  textStyle,
}) => {
  const theme = useTheme();

  const colors = categoryColors[category.toLowerCase()] || categoryColors.custom;

  const sizeStyles = {
    small: {
      container: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
      text: { fontSize: 10 },
    },
    medium: {
      container: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
      text: { fontSize: 12 },
    },
    large: {
      container: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8 },
      text: { fontSize: 14 },
    },
  };

  const sizeConfig = sizeStyles[size];
  const displayLabel = label || category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <View
      style={[
        styles.container,
        sizeConfig.container,
        { backgroundColor: colors.bg },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          sizeConfig.text,
          { color: colors.text },
          textStyle,
        ]}
      >
        {displayLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
  },
});

export default CategoryBadge;
