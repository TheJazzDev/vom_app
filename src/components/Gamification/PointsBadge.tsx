import { Text, View } from '@/src/components/UI';
import { useTheme } from '@/src/hooks';
import { formatPoints } from '@/src/services/gamification';
import React from 'react';

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

  const sizeClasses = {
    sm: 'px-2 py-0.5',
    md: 'px-3 py-1',
    lg: 'px-4 py-2',
  };

  const textClasses = {
    sm: 'text-xs font-semibold',
    md: 'text-sm font-bold',
    lg: 'text-lg font-bold',
  };

  return (
    <View
      className={`flex-row items-center justify-center rounded-full ${sizeClasses[size]}`}
      style={{ backgroundColor: `${theme.brand}15` }}
    >
      <Text className={textClasses[size]} style={{ color: theme.brand }}>
        {formatPoints(points)}
      </Text>
      {showLabel && (
        <Text
          variant="caption"
          className="ml-0.5"
          style={{ color: theme.brand }}
        >
          pts
        </Text>
      )}
    </View>
  );
};
