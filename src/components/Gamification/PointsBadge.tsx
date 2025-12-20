import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { formatPoints } from '@/src/services/gamification';
import React from 'react';
import { StyleSheet } from 'react-native';

interface PointsBadgeProps {
  points: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const PointsBadge: React.FC<PointsBadgeProps> = ({
  points,
  size = 'md',
  showLabel = true,
}) => {
  const theme = useTheme();

  const sizeStyles = {
    sm: {
      container: styles.containerSm,
      text: styles.textSm,
    },
    md: {
      container: styles.containerMd,
      text: styles.textMd,
    },
    lg: {
      container: styles.containerLg,
      text: styles.textLg,
    },
  };

  return (
    <View
      style={[
        styles.container,
        sizeStyles[size].container,
        { backgroundColor: `${theme.brand}15` },
      ]}
    >
      <Text style={[sizeStyles[size].text, { color: theme.brand }]}>
        {formatPoints(points)}
      </Text>
      {showLabel && (
        <Text
          variant="caption"
          style={{ color: theme.brand, marginLeft: 2 }}
        >
          pts
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  containerSm: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  containerMd: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  containerLg: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textSm: {
    fontSize: 12,
    fontWeight: '600',
  },
  textMd: {
    fontSize: 14,
    fontWeight: '700',
  },
  textLg: {
    fontSize: 18,
    fontWeight: '700',
  },
});
