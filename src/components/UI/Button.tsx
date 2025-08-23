import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { Text } from './Text';

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
  textVariant?: TextVariant;
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
        ? 'bg-muted border-border dark:bg-dark-muted dark:border-dark-border'
        : 'bg-primary border-border-primary dark:bg-dark-primary dark:border-dark-border-primary active:bg-tertiary dark:active:bg-dark-tertiary';
    case 'secondary':
      return isDisabledOrLoading
        ? 'bg-muted border-border dark:bg-dark-muted dark:border-dark-border'
        : 'bg-secondary border-border-secondary dark:bg-dark-secondary dark:border-dark-border-secondary active:bg-tertiary dark:active:bg-dark-tertiary';
    case 'outline':
      return isDisabledOrLoading
        ? 'bg-transparent border-muted dark:border-dark-muted'
        : 'bg-transparent border-border dark:border-dark-border active:bg-background dark:active:bg-dark-background';
    case 'ghost':
      return isDisabledOrLoading
        ? 'bg-transparent border-transparent'
        : 'bg-transparent border-transparent active:bg-card dark:active:bg-dark-card';
    case 'destructive':
      return isDisabledOrLoading
        ? 'bg-muted border-border dark:bg-dark-muted dark:border-dark-border'
        : 'bg-error border-border-error dark:bg-dark-error dark:border-dark-border-error active:bg-red-700';
    case 'success':
      return isDisabledOrLoading
        ? 'bg-muted border-border dark:bg-dark-muted dark:border-dark-border'
        : 'bg-success border-border-success dark:bg-dark-success dark:border-dark-border-success active:bg-green-700';
    case 'warning':
      return isDisabledOrLoading
        ? 'bg-muted border-border dark:bg-dark-muted dark:border-dark-border'
        : 'bg-warning border-border-warning dark:bg-dark-warning dark:border-dark-border-warning active:bg-yellow-700';
    case 'info':
      return isDisabledOrLoading
        ? 'bg-muted border-border dark:bg-dark-muted dark:border-dark-border'
        : 'bg-info border-border-info dark:bg-dark-info dark:border-dark-border-info active:bg-blue-700';
    default:
      return isDisabledOrLoading
        ? 'bg-muted border-border dark:bg-dark-muted dark:border-dark-border'
        : 'bg-primary border-border-primary dark:bg-dark-primary dark:border-dark-border-primary active:bg-tertiary dark:active:bg-dark-tertiary';
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
    case 'primary':
      return 'neutral';
    case 'outline':
    case 'ghost':
      return 'primary';
    case 'secondary':
      return 'primary';
    // case 'primary':
    //   return 'inverse';
    case 'destructive':
    case 'success':
    case 'warning':
    case 'info':
      return 'inverse';
    default:
      return 'inverse';
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
  textVariant,
  ...props
}) => {
  const isDisabled = disabled || loading;
  const variantStyles = getVariantStyles(variant, disabled, loading);
  const sizeStyles = getSizeStyles(size);
  const roundedStyles = getRoundedStyles(rounded);
  const textColor = getTextColor(variant, disabled, loading);
  const fullWidthStyle = fullWidth ? 'w-full' : '';
  const opacityStyle = isDisabled ? 'opacity-60' : '';

  const combinedClassName = `
    ${variantStyles}
    ${sizeStyles}
    ${roundedStyles}
    ${fullWidthStyle}
    ${opacityStyle}
    border
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

  // const spinnerColor =
  //   textColor === 'inverse'
  //     ? '#FFFFFF'
  //     : variant === 'outline' || variant === 'ghost'
  //       ? '#8B5CF6'
  //       : '#6B7280';

  const spinnerColor =
    textColor === 'neutral' || textColor === 'inverse' ? '#FFFFFF' : '#0084ff';

  return (
    <TouchableOpacity
      style={style}
      onPress={handlePress}
      disabled={isDisabled}
      className={combinedClassName}
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
        <View className='flex-row items-center gap-1 py-1'>
          {icon && iconPosition === 'left' && (
            <View className={getIconSpacing(size, 'left')}>{icon}</View>
          )}

          <Text variant={textVariant} color={textColor}>
            {children}
          </Text>

          {icon && iconPosition === 'right' && (
            <View className={getIconSpacing(size, 'right')}>{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
