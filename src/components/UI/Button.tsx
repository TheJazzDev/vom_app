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
    | 'info'
    | 'tertiary';
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
  loading?: boolean,
) => {
  const isDisabledOrLoading = disabled || loading;

  if (isDisabledOrLoading) {
    return 'bg-surface border-border-muted dark:bg-dark-surface dark:border-dark-border-muted';
  }

  switch (variant) {
    case 'primary':
      // Strong brand color - most prominent
      return 'bg-brand border-brand active:bg-primary dark:bg-dark-primary dark:border-dark-primary dark:active:bg-dark-secondary';

    case 'secondary':
      // Light background with brand text - less prominent than primary
      return 'bg-card border-border active:bg-background dark:bg-dark-card dark:border-dark-border dark:active:bg-dark-background';

    case 'tertiary':
      // Subtle tertiary color
      return 'bg-tertiary border-tertiary active:bg-muted dark:bg-dark-tertiary dark:border-dark-tertiary dark:active:bg-dark-muted';

    case 'outline':
      // Transparent with border
      return 'bg-transparent border-border-secondary active:bg-surface dark:border-dark-border-secondary dark:active:bg-dark-surface';

    case 'ghost':
      // No border, minimal styling
      return 'bg-transparent border-transparent active:bg-surface dark:active:bg-dark-surface';

    case 'destructive':
      return 'bg-error border-error active:bg-red-700 dark:bg-error dark:border-error dark:active:bg-red-700';

    case 'success':
      return 'bg-success border-success active:bg-green-700 dark:bg-success dark:border-success dark:active:bg-green-700';

    case 'warning':
      return 'bg-warning border-warning active:bg-yellow-700 dark:bg-warning dark:border-warning dark:active:bg-yellow-700';

    case 'info':
      return 'bg-info border-info active:bg-blue-700 dark:bg-info dark:border-info dark:active:bg-blue-700';

    default:
      return 'bg-brand border-brand active:bg-primary dark:bg-dark-primary dark:border-dark-primary dark:active:bg-dark-secondary';
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
  loading?: boolean,
) => {
  const isDisabledOrLoading = disabled || loading;

  if (isDisabledOrLoading) {
    return 'muted';
  }

  switch (variant) {
    case 'primary':
      return 'inverse'; // White text for dark brand background

    case 'secondary':
      return 'brand'; // Brand color text on light background

    case 'tertiary':
      return 'inverse'; // White text for tertiary background

    case 'outline':
      return 'secondary'; // Uses secondary color for text

    case 'ghost':
      return 'body'; // Uses body color for subtle appearance

    case 'destructive':
    case 'success':
    case 'warning':
    case 'info':
      return 'inverse'; // White text for colored backgrounds

    default:
      return 'inverse';
  }
};

const getIconSpacing = (
  size: ButtonProps['size'],
  position: 'left' | 'right',
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

const getSpinnerColor = (
  variant: ButtonProps['variant'],
  disabled?: boolean,
  loading?: boolean,
) => {
  const isDisabledOrLoading = disabled || loading;

  if (isDisabledOrLoading) {
    return '#778DA9'; // tertiary color for disabled state
  }

  switch (variant) {
    case 'primary':
    case 'tertiary':
    case 'destructive':
    case 'success':
    case 'warning':
    case 'info':
      return '#FFFFFF'; // White spinner for colored backgrounds

    case 'secondary':
      return '#0D1B2A'; // Brand color for secondary variant

    case 'outline':
      return '#415A77'; // secondary color

    case 'ghost':
      return '#1B263B'; // body color

    default:
      return '#FFFFFF';
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
  const spinnerColor = getSpinnerColor(variant, disabled, loading);
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

  return (
    <TouchableOpacity
      style={style}
      onPress={handlePress}
      disabled={isDisabled}
      className={combinedClassName}
      activeOpacity={isDisabled ? 1 : 0.8}
      {...props}
    >
      {loading ? (
        <View className="flex-row items-center">
          <ActivityIndicator
            size={getLoadingSpinnerSize(size)}
            color={spinnerColor}
          />
          {children && (
            <Text
              variant={textVariant}
              color={textColor}
              className="ml-2 font-medium"
            >
              {children}
            </Text>
          )}
        </View>
      ) : (
        <View className="flex-row items-center gap-1 py-1">
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
