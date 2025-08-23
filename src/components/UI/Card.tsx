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
  disabled?: boolean;
  interactive?: boolean;
  fullWidth?: boolean;
  className?: string;
};

const cardVariants = {
  default: 'bg-surface dark:bg-dark-surface p-4 mb-2 rounded-xl',
  outlined:
    'bg-transparent border border-border dark:bg-transparent border dark:border-dark-border p-4 mb-2 rounded-xl',
  elevated: 'bg-secondary/10 dark:bg-secondary/20 border border-secondary dark:border-secondary p-2 mb-2 rounded-md',
  ghost:
    'bg-background/50 border border-transparent dark:bg-dark-background/50 border border-transparent',
  primary:
    'bg-primary/10 border border-primary dark:bg-primary/20 border dark:border-primary',
  secondary:
    'bg-secondary/10 border border-secondary dark:bg-secondary/20 border dark:border-secondary mb-2',
  tertiary:
    'bg-background border border-tertiary dark:bg-dark-background border dark:border-dark-tertiary',
  success:
    'bg-success/10 border border-success dark:bg-success/20 border dark:border-success',
  warning:
    'bg-warning/10 border border-warning dark:bg-warning/20 border dark:border-warning',
  error:
    'bg-error/10 border border-error dark:bg-error/20 border dark:border-error',
};

export function Card({
  style,
  variant = 'default',
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

  // const variantClasses = isLightMode ? variantConfig.light : variantConfig.dark;

  const classes = [
    fullWidth ? 'w-full' : 'w-auto',
    variantConfig,
    // variantConfig.shadow,
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
