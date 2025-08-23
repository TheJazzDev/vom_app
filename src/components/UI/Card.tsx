import { useColorScheme } from '@/src/hooks';
import React from 'react';
import { Platform, View, type ViewProps } from 'react-native';

export type CardProps = ViewProps & {
  variant?:
    | 'default'
    | 'elevated'
    | 'outlined'
    | 'ghost'
    | 'primary'
    | 'secondary'
    | 'tertiary'
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
    light: 'bg-background/50 border border-border',
    dark: 'dark:bg-dark-background/50 border dark:border-dark-border',
    shadow: 'shadow-sm',
    border: true,
  },
  elevated: {
    light: 'bg-card border border',
    dark: 'dark:bg-dark-card border dark:border',
    shadow: 'shadow-lg',
    border: false,
  },
  outlined: {
    light: 'bg-transparent border border-border',
    dark: 'dark:bg-transparent border dark:border-dark-border',
    shadow: '',
    border: true,
  },
  ghost: {
    light: 'bg-background/50 border border-transparent',
    dark: 'dark:bg-dark-background/50 border border-transparent',
    shadow: '',
    border: true,
  },
  primary: {
    light: 'bg-primary/10 border border-primary',
    dark: 'dark:bg-primary/20 border dark:border-primary',
    shadow: 'shadow-sm',
    border: false,
  },
  secondary: {
    light: 'bg-secondary/10 border border-secondary',
    dark: 'dark:bg-secondary/20 border dark:border-secondary',
    shadow: 'shadow-sm',
    border: true,
  },
  tertiary: {
    light: 'bg-background border border-tertiary',
    dark: 'dark:bg-dark-background border dark:border-dark-tertiary',
    shadow: '',
    border: false,
  },
  success: {
    light: 'bg-success/10 border border-success',
    dark: 'dark:bg-success/20 border dark:border-success',
    shadow: 'shadow-sm',
    border: true,
  },
  warning: {
    light: 'bg-warning/10 border border-warning',
    dark: 'dark:bg-warning/20 border dark:border-warning',
    shadow: 'shadow-sm',
    border: true,
  },
  error: {
    light: 'bg-error/10 border border-error',
    dark: 'dark:bg-error/20 border dark:border-error',
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
  const variantConfig = cardVariants[variant];
  const sizeClasses = cardSizes[size];

  const variantClasses = isLightMode ? variantConfig.light : variantConfig.dark;

  const classes = [
    fullWidth ? 'w-full' : 'w-auto',
    sizeClasses,
    variantClasses,
    variantConfig.shadow,
    disabled ? 'opacity-50' : '',
    interactive ? 'active:scale-95 active:opacity-80' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

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

  if (shadow) {
    return (
      <View style={getShadowStyle()}>
        <View style={style} className={classes} {...otherProps}>
          {children}
        </View>
      </View>
    );
  }

  return (
    <View style={style} className={classes} {...otherProps}>
      {children}
    </View>
  );
}
