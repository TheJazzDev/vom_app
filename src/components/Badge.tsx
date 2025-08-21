import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from './UI';

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
  rounded?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  dot?: boolean;
  band?: boolean;
}

const getVariantStyles = (variant: BadgeProps['variant']) => {
  switch (variant) {
    case 'primary':
      return 'bg-brand-primary border-brand-primary';
    case 'secondary':
      return 'bg-background-tertiary dark:bg-background-dark-tertiary border-border-primary dark:border-border-dark-primary';
    case 'success':
      return 'bg-semantic-success border-semantic-success';
    case 'warning':
      return 'bg-semantic-warning border-semantic-warning';
    case 'error':
      return 'bg-semantic-error border-semantic-error';
    case 'info':
      return 'bg-semantic-info border-semantic-info';
    case 'outline':
      return 'bg-transparent border-border-secondary dark:border-border-dark-secondary border-2';
    case 'ghost':
      return 'bg-transparent border-transparent';
    case 'default':
    default:
      return 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700';
  }
};

const getSizeStyles = (size: BadgeProps['size']) => {
  switch (size) {
    case 'sm':
      return 'px-2 py-0.5 min-h-[20px] self-start';
    case 'lg':
      return 'px-4 py-2 min-h-[38px] self-start';
    case 'md':
    default:
      return 'px-3 py-1 min-h-[24px] self-start';
  }
};

const getTextColor = (variant: BadgeProps['variant']) => {
  switch (variant) {
    case 'primary':
    case 'success':
    case 'warning':
    case 'error':
    case 'info':
      return 'inverse';
    case 'outline':
    case 'ghost':
      return 'primary';
    case 'secondary':
    case 'default':
    default:
      return 'primary';
  }
};

const getTextVariant = (size: BadgeProps['size']) => {
  switch (size) {
    case 'sm':
      return 'caption';
    case 'lg':
      return 'body2';
    case 'md':
    default:
      return 'caption';
  }
};

const getDotStyles = (
  variant: BadgeProps['variant'],
  size: BadgeProps['size']
) => {
  const dotSize =
    size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-2.5 h-2.5' : 'w-2 h-2';

  switch (variant) {
    case 'primary':
      return `${dotSize} bg-white rounded-full`;
    case 'success':
      return `${dotSize} bg-white rounded-full`;
    case 'warning':
      return `${dotSize} bg-white rounded-full`;
    case 'error':
      return `${dotSize} bg-white rounded-full`;
    case 'info':
      return `${dotSize} bg-white rounded-full`;
    case 'outline':
      return `${dotSize} bg-border-secondary dark:bg-border-dark-secondary rounded-full`;
    case 'ghost':
      return `${dotSize} bg-text-tertiary dark:bg-text-dark-tertiary rounded-full`;
    case 'secondary':
    case 'default':
    default:
      return `${dotSize} bg-text-secondary dark:bg-text-dark-secondary rounded-full`;
  }
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className = '',
  rounded = true,
  icon,
  iconPosition = 'left',
  dot = false,
  style,
  ...props
}) => {
  const variantStyles = getVariantStyles(variant);
  const sizeStyles = getSizeStyles(size);
  const roundedStyles = rounded ? 'rounded-full' : 'rounded-md';
  const textColor = getTextColor(variant);
  const textVariant = getTextVariant(size);
  const dotStyles = dot ? getDotStyles(variant, size) : '';

  const combinedClassName = `
    ${variantStyles}
    ${sizeStyles}
    ${roundedStyles}
    border
    flex-row
    items-center
    justify-center
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  const iconSpacing =
    size === 'sm' ? 'mx-1' : size === 'lg' ? 'mx-1.5' : 'mx-1';
  const dotSpacing = size === 'sm' ? 'mr-1' : size === 'lg' ? 'mr-1.5' : 'mr-1';

  return (
    <View className={combinedClassName} style={style} {...props}>
      {dot && <View className={`${dotStyles} ${dotSpacing}`} />}

      {icon && iconPosition === 'left' && (
        <View className={`${iconSpacing}`}>{icon}</View>
      )}

      <Text variant={textVariant} color={textColor} className='font-medium'>
        {children}
      </Text>

      {icon && iconPosition === 'right' && (
        <View className={`${iconSpacing}`}>{icon}</View>
      )}
    </View>
  );
};

export default Badge;
