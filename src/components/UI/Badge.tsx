import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from './Text';

interface BadgeProps extends ViewProps {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'outline'
    | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  dot?: boolean;
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default:
    'bg-background border-border dark:bg-dark-background dark:border-dark-border-border',
  primary: 'bg-primary border-border-primary',
  secondary: 'bg-secondary dark:bg-dark-secondary border-border-secondary',
  success: 'bg-success border-border-success',
  warning: 'bg-warning border-border-warning',
  error: 'bg-error border-border-error',
  info: 'bg-info border-border-info',
  outline:
    'bg-transparent border border-border-secondary dark:border-dark-border-secondary',
  ghost: 'bg-transparent border-transparent',
};

/**
 * Sizes → spacing utilities
 */
const sizeClasses: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'px-2 py-0.5 min-h-[20px]',
  md: 'px-3 py-1 min-h-[24px]',
  lg: 'px-4 py-2 min-h-[38px]',
};

/**
 * Text colors driven by theme
 */
const textColors: Record<NonNullable<BadgeProps['variant']>, string> = {
  primary: 'inverse',
  success: 'body',
  warning: 'inverse',
  error: 'inverse',
  info: 'inverse',
  outline: 'text-primary',
  ghost: 'text-primary',
  secondary: 'text-primary',
  default: 'text-primary',
};

/**
 * Text variant sizes
 */
const textVariants: Record<NonNullable<BadgeProps['size']>, TextVariant> = {
  sm: 'caption',
  md: 'caption',
  lg: 'body2',
};

/**
 * Dot mapping → tailwind tokens
 */
const getDotClasses = (
  variant: BadgeProps['variant'],
  size: BadgeProps['size'],
) => {
  const dotSize =
    size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-2.5 h-2.5' : 'w-2 h-2';

  if (['primary', 'success', 'warning', 'error', 'info'].includes(variant!)) {
    return `${dotSize} bg-white rounded-full`;
  }
  if (variant === 'outline') {
    return `${dotSize} bg-border-secondary dark:bg-dark-border-secondary rounded-full`;
  }
  if (variant === 'ghost') {
    return `${dotSize} bg-muted dark:bg-dark-muted rounded-full`;
  }
  return `${dotSize} bg-muted dark:bg-dark-muted rounded-full`;
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  icon,
  iconPosition = 'left',
  dot = false,
  style,
  ...props
}) => {
  const baseClasses = [
    'flex-row items-center justify-center border self-start rounded-md',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const dotSpacing = size === 'lg' ? 'mr-1.5' : 'mr-1';
  const iconSpacing = size === 'lg' ? 'mx-1.5' : 'mx-1';

  return (
    <View className={baseClasses} style={style} {...props}>
      {dot && (
        <View className={`${getDotClasses(variant, size)} ${dotSpacing}`} />
      )}

      {icon && iconPosition === 'left' && (
        <View className={iconSpacing}>{icon}</View>
      )}

      <Text
        variant={textVariants[size]}
        color={textColors[variant]}
        className="font-medium"
      >
        {children}
      </Text>

      {icon && iconPosition === 'right' && (
        <View className={iconSpacing}>{icon}</View>
      )}
    </View>
  );
};
