import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { Text } from './themed-ui';

interface ButtonProps extends TouchableOpacityProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

const getVariantStyles = (
  variant: ButtonProps['variant'],
  disabled?: boolean,
  loading?: boolean
) => {
  const isDisabledOrLoading = disabled || loading;

  switch (variant) {
    case 'primary':
      return isDisabledOrLoading
        ? 'bg-interactive-disabled dark:bg-interactive-dark-disabled border-interactive-disabled dark:border-interactive-dark-disabled'
        : 'bg-interactive-primary dark:bg-interactive-dark-primary border-interactive-primary dark:border-interactive-dark-primary active:bg-brand-primary-dark';
    case 'secondary':
      return isDisabledOrLoading
        ? 'bg-interactive-disabled dark:bg-interactive-dark-disabled border-interactive-disabled dark:border-interactive-dark-disabled'
        : 'bg-interactive-secondary dark:bg-interactive-dark-secondary border-border-primary dark:border-border-dark-primary active:bg-neutral-200 dark:active:bg-neutral-600';
    case 'outline':
      return isDisabledOrLoading
        ? 'bg-transparent border-interactive-disabled dark:border-interactive-dark-disabled border-2'
        : 'bg-transparent border-border-secondary dark:border-border-dark-secondary border-2 active:bg-neutral-50 dark:active:bg-neutral-800';
    case 'ghost':
      return isDisabledOrLoading
        ? 'bg-transparent border-transparent'
        : 'bg-transparent border-transparent active:bg-neutral-100 dark:active:bg-neutral-800';
    case 'destructive':
      return isDisabledOrLoading
        ? 'bg-interactive-disabled dark:bg-interactive-dark-disabled border-interactive-disabled dark:border-interactive-dark-disabled'
        : 'bg-semantic-error border-semantic-error active:bg-red-600';
    case 'success':
      return isDisabledOrLoading
        ? 'bg-interactive-disabled dark:bg-interactive-dark-disabled border-interactive-disabled dark:border-interactive-dark-disabled'
        : 'bg-semantic-success border-semantic-success active:bg-green-600';
    case 'warning':
      return isDisabledOrLoading
        ? 'bg-interactive-disabled dark:bg-interactive-dark-disabled border-interactive-disabled dark:border-interactive-dark-disabled'
        : 'bg-semantic-warning border-semantic-warning active:bg-yellow-600';
    case 'info':
      return isDisabledOrLoading
        ? 'bg-interactive-disabled dark:bg-interactive-dark-disabled border-interactive-disabled dark:border-interactive-dark-disabled'
        : 'bg-semantic-info border-semantic-info active:bg-blue-600';
    default:
      return isDisabledOrLoading
        ? 'bg-interactive-disabled dark:bg-interactive-dark-disabled border-interactive-disabled dark:border-interactive-dark-disabled'
        : 'bg-interactive-primary dark:bg-interactive-dark-primary border-interactive-primary dark:border-interactive-dark-primary active:bg-brand-primary-dark';
  }
};

const getSizeStyles = (size: ButtonProps['size']) => {
  switch (size) {
    case 'xs':
      return 'px-2 py-1 min-h-[24px]';
    case 'sm':
      return 'px-3 py-1.5 min-h-[32px]';
    case 'lg':
      return 'px-6 py-3 min-h-[48px]';
    case 'xl':
      return 'px-8 py-4 min-h-[56px]';
    case 'md':
    default:
      return 'px-4 py-2 min-h-[40px]';
  }
};

const getRoundedStyles = (rounded: ButtonProps['rounded']) => {
  switch (rounded) {
    case 'none':
      return 'rounded-none';
    case 'sm':
      return 'rounded-sm';
    case 'lg':
      return 'rounded-lg';
    case 'full':
      return 'rounded-full';
    case 'md':
    default:
      return 'rounded-md';
  }
};

const getTextColor = (
  variant: ButtonProps['variant'],
  disabled?: boolean,
  loading?: boolean
) => {
  const isDisabledOrLoading = disabled || loading;

  if (isDisabledOrLoading) {
    return 'tertiary';
  }

  switch (variant) {
    case 'outline':
    case 'ghost':
      return 'primary';
    case 'secondary':
      return 'primary';
    case 'primary':
    case 'destructive':
    case 'success':
    case 'warning':
    case 'info':
      return 'inverse';
    default:
      return 'inverse';
  }
};

const getTextSize = (size: ButtonProps['size']) => {
  switch (size) {
    case 'xs':
      return 'caption';
    case 'sm':
      return 'body2';
    case 'lg':
      return 'body1';
    case 'xl':
      return 'subtitle2';
    case 'md':
    default:
      return 'body2';
  }
};

const getIconSpacing = (
  size: ButtonProps['size'],
  position: 'left' | 'right'
) => {
  const spacing = size === 'xs' || size === 'sm' ? '1' : '1.5';
  return position === 'left' ? `mr-${spacing}` : `ml-${spacing}`;
};

const getLoadingSpinnerSize = (size: ButtonProps['size']) => {
  switch (size) {
    case 'xs':
      return 12;
    case 'sm':
      return 14;
    case 'lg':
      return 18;
    case 'xl':
      return 20;
    case 'md':
    default:
      return 16;
  }
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  rounded = 'md',
  style,
  onPress,
  ...props
}) => {
  const isDisabled = disabled || loading;
  const variantStyles = getVariantStyles(variant, disabled, loading);
  const sizeStyles = getSizeStyles(size);
  const roundedStyles = getRoundedStyles(rounded);
  const textColor = getTextColor(variant, disabled, loading);
  const textVariant = getTextSize(size);
  const fullWidthStyle = fullWidth ? 'w-full' : '';
  const opacityStyle = isDisabled ? 'opacity-60' : '';

  const combinedClassName = `
    ${variantStyles}
    ${sizeStyles}
    ${roundedStyles}
    ${fullWidthStyle}
    ${opacityStyle}
    border
    flex-row
    items-center
    justify-center
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  const handlePress = (event: any) => {
    if (!isDisabled && onPress) {
      onPress(event);
    }
  };

  const spinnerColor =
    textColor === 'inverse'
      ? '#FFFFFF'
      : variant === 'outline' || variant === 'ghost'
        ? '#8B5CF6'
        : '#6B7280';

  return (
    <TouchableOpacity
      className={combinedClassName}
      style={style}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={isDisabled ? 1 : 0.8}
      {...props}>
      {loading ? (
        <View className='flex-row items-center'>
          <ActivityIndicator
            size={getLoadingSpinnerSize(size)}
            color={spinnerColor}
          />
          {children && (
            <Text
              variant={textVariant}
              color={textColor}
              className='ml-2 font-medium'>
              {children}
            </Text>
          )}
        </View>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <View className={getIconSpacing(size, 'left')}>{icon}</View>
          )}

          <Text
            variant={textVariant}
            color={textColor}
            className='font-medium text-center'>
            {children}
          </Text>

          {icon && iconPosition === 'right' && (
            <View className={getIconSpacing(size, 'right')}>{icon}</View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
