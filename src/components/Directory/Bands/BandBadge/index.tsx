import React from 'react';
import { View } from 'react-native';

import { BandDisplayNames } from '@/src/enum';
import { Text } from '../../../UI';
import { getBandColor } from './color';
import { getBandIcon } from './icon';
import { getSizeStyles } from './size';

export const BandBadge: React.FC<BandBadgeProps> = ({
  band,
  size = 'sm',
  variant = 'default',
  showIcon = true,
  className = '',
  style,
  ...props
}) => {
  const colors = getBandColor(band, variant);
  const sizeStyles = getSizeStyles(size, variant);
  const displayName = BandDisplayNames[band as BandKeys];
  const icon = getBandIcon(band);

  const combinedClassName = `
  ${colors.container}
  ${colors.border}
  ${colors.shadow}
    ${sizeStyles.container}
    rounded-lg
    flex-row
    items-center
    justify-center
    ${variant === 'glow' ? 'elevation-8' : ''}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <View
      className={combinedClassName}
      style={[
        variant === 'glow' && {
          shadowColor: colors.shadow.includes('purple')
            ? '#8B5CF6'
            : colors.shadow.includes('emerald')
              ? '#10B981'
              : colors.shadow.includes('indigo')
                ? '#6366F1'
                : colors.shadow.includes('red')
                  ? '#F43F5E'
                  : colors.shadow.includes('blue')
                    ? '#3B82F6'
                    : colors.shadow.includes('pink')
                      ? '#EC4899'
                      : colors.shadow.includes('orange')
                        ? '#F97316'
                        : colors.shadow.includes('amber')
                          ? '#F59E0B'
                          : '#6B7280',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        },
        style,
      ]}
      {...props}
    >
      {showIcon && (
        <Text
          className={`${sizeStyles.icon} mr-1.5`}
          style={{ lineHeight: size === 'lg' ? 24 : size === 'md' ? 20 : 16 }}
        >
          {icon}
        </Text>
      )}

      <Text
        variant={sizeStyles.text as any}
        className={`${colors.text} font-semibold tracking-wide`}
      >
        {displayName}
      </Text>
    </View>
  );
};
