import { useColorScheme } from '@/src/hooks';
import React from 'react';
import { Platform, View, type ViewProps } from 'react-native';

export type CardProps = ViewProps & {
  variant?:
    | 'default'
    | 'elevated'
    | 'outlined'
    | 'filled'
    | 'ghost'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error';
  shadow?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  interactive?: boolean;
  fullWidth?: boolean;
  className?: string;
};

const cardVariants = {
  default: {
    light: 'bg-white border-gray-200',
    dark: 'bg-gray-900 border-gray-700',
    shadow: 'shadow-sm',
    border: true,
  },
  elevated: {
    light: 'bg-white border-gray-100',
    dark: 'bg-gray-800 border-gray-600',
    shadow: 'shadow-lg',
    border: false,
  },
  outlined: {
    light: 'bg-transparent border-gray-300',
    dark: 'bg-transparent border-gray-600',
    shadow: '',
    border: true,
  },
  filled: {
    light: 'bg-gray-50 border-gray-200',
    dark: 'bg-gray-800 border-gray-700',
    shadow: '',
    border: false,
  },
  ghost: {
    light: 'bg-gray-50/50 border-transparent',
    dark: 'bg-gray-800/50 border-transparent',
    shadow: '',
    border: false,
  },
  primary: {
    light: 'bg-blue-50 border-blue-200',
    dark: 'bg-blue-900/20 border-blue-700/50',
    shadow: 'shadow-sm',
    border: true,
  },
  secondary: {
    light: 'bg-purple-50 border-purple-200',
    dark: 'bg-purple-900/20 border-purple-700/50',
    shadow: 'shadow-sm',
    border: true,
  },
  success: {
    light: 'bg-green-50 border-green-200',
    dark: 'bg-green-900/20 border-green-700/50',
    shadow: 'shadow-sm',
    border: true,
  },
  warning: {
    light: 'bg-yellow-50 border-yellow-200',
    dark: 'bg-yellow-900/20 border-yellow-700/50',
    shadow: 'shadow-sm',
    border: true,
  },
  error: {
    light: 'bg-red-50 border-red-200',
    dark: 'bg-red-900/20 border-red-700/50',
    shadow: 'shadow-sm',
    border: true,
  },
};

const cardSizes = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
};

export function Card({
  style,
  variant = 'default',
  size = 'md',
  shadow = false,
  disabled = false,
  interactive = false,
  fullWidth = false,
  className = '',
  children,
  ...otherProps
}: CardProps) {
  const isLightMode = useColorScheme() === 'light';

  const getShadowStyle = () => {
    if (!shadow) return {};

    if (Platform.OS === 'ios') {
      return {
        shadowColor: isLightMode ? '#000000' : '#ffffff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isLightMode ? 0.1 : 0.2,
        shadowRadius: 6,
      };
    } else {
      return {
        elevation: 3,
        backgroundColor: 'transparent',
      };
    }
  };

  const variantConfig = cardVariants[variant];
  const sizeClasses = cardSizes[size];

  // Get variant classes based on theme
  const variantClasses = isLightMode ? variantConfig.light : variantConfig.dark;

  // Build complete class string
  const classes = [
    // Base classes
    fullWidth ? 'w-full' : 'w-auto',
    sizeClasses,
    variantClasses,
    variantConfig.shadow,

    // Border classes
    variantConfig.border ? 'border' : '',

    // State classes
    disabled ? 'opacity-50' : '',
    interactive ? 'active:scale-95 active:opacity-80' : '',

    // Custom classes
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (shadow) {
    return (
      <View style={getShadowStyle()}>
        <View style={style} className={classes} {...otherProps}>
          {children}
        </View>
      </View>
    );
  }

  // No shadow - single container
  return (
    <View style={style} className={classes} {...otherProps}>
      {children}
    </View>
  );

  // return (
  //   <View style={style} className={classes} {...otherProps}>
  //     {children}
  //   </View>
  // );
}
