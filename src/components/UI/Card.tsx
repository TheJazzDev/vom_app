import { useColorScheme } from '@/src/hooks';
import { LinearGradient } from 'expo-linear-gradient';
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
    | 'error'
    | 'gradient-primary'
    | 'gradient-secondary'
    | 'gradient-brand'
    // | 'gradient-sunset'
    | 'gradient-ocean'
    | 'gradient-forest'
    // | 'gradient-royal'
    | 'gradient-soft';
  shadow?: boolean;
  disabled?: boolean;
  interactive?: boolean;
  fullWidth?: boolean;
  className?: string;
  borderRadius?: number; // Add explicit borderRadius prop
};

// Helper function to get text color for gradient cards
export const getCardTextColor = (
  variant: CardProps['variant'],
): string | undefined => {
  if (!variant) return undefined;
  const variantConfig = cardVariants[variant];
  return 'textColor' in variantConfig ? variantConfig.textColor : undefined;
};

// Helper function to extract border radius from className
const getBorderRadiusFromClassName = (className: string): number | undefined => {
  // Check for common border radius classes
  if (className.includes('rounded-none')) return 0;
  if (className.includes('rounded-full')) return 9999;
  if (className.includes('rounded-3xl')) return 24;
  if (className.includes('rounded-2xl')) return 16;
  if (className.includes('rounded-xl')) return 12;
  if (className.includes('rounded-lg')) return 8;
  if (className.includes('rounded-md')) return 6;
  if (className.includes('rounded-sm')) return 4;
  if (className.includes('rounded')) return 4;

  // Check for specific corner radius (these won't affect the container but we'll return default)
  if (className.includes('rounded-t-') || className.includes('rounded-b-') ||
      className.includes('rounded-l-') || className.includes('rounded-r-')) {
    return 12; // Return default since we can't easily extract specific corner values
  }

  return undefined;
};

const cardVariants = {
  // Solid variants
  default: {
    className: 'bg-card dark:bg-dark-card p-4 mb-2 rounded-xl',
    gradient: false,
  },
  elevated: {
    className: 'bg-card dark:bg-dark-card p-4 mb-2 rounded-xl',
    gradient: false,
    shadow: true,
  },
  outlined: {
    className:
      'bg-transparent border border-border dark:border-dark-border p-4 mb-2 rounded-xl',
    gradient: false,
  },
  ghost: {
    className: 'bg-surfaceStrong dark:bg-dark-surface p-4 mb-2 rounded-xl',
    gradient: false,
  },
  primary: {
    className: 'bg-primary dark:bg-dark-primary p-4 mb-2 rounded-xl',
    gradient: false,
  },
  secondary: {
    className: 'bg-secondary/50 dark:bg-dark-secondary/80 p-4 mb-2 rounded-xl',
    gradient: false,
  },
  tertiary: {
    className: 'bg-tertiary dark:bg-dark-tertiary p-4 mb-2 rounded-xl',
    gradient: false,
  },
  success: {
    className: 'p-4 mb-2 rounded-xl',
    gradient: false,
    backgroundColor: '#16a34a',
  },
  warning: {
    className: 'p-4 mb-2 rounded-xl',
    gradient: false,
    backgroundColor: '#f59e0b',
  },
  error: {
    className: 'p-4 mb-2 rounded-xl',
    gradient: false,
    backgroundColor: '#dc2626',
  },

  // Gradient variants
  'gradient-primary': {
    className: 'p-4 mb-2 rounded-xl',
    gradient: true,
    textColor: '#FFFFFF',
    gradientColors: {
      light: ['#1D4ED8', '#2563EB'],
      dark: ['#3B82F6', '#60A5FA'],
    },
  },
  'gradient-secondary': {
    className: 'p-4 mb-2 rounded-xl',
    gradient: true,
    textColor: '#FFFFFF',
    gradientColors: {
      light: ['#415A77', '#778DA9'],
      dark: ['#415A77', '#778DA9'],
    },
  },
  'gradient-brand': {
    className: 'p-4 mb-2 rounded-xl',
    gradient: true,
    textColor: '#FFFFFF',
    gradientColors: {
      dark: ['#2563EB', '#1D4ED8', '#1B263B'],
      light: ['#60A5FA', '#3B82F6', '#2563EB'],
    },
  },
  'gradient-ocean': {
    className: 'p-4 mb-2 rounded-xl',
    gradient: true,
    textColor: '#FFFFFF',
    gradientColors: {
      light: ['#0ea5e9', '#2563EB', '#1e40af'],
      dark: ['#0ea5e9', '#2563EB', '#1e40af'],
    },
  },
  'gradient-forest': {
    className: 'p-4 mb-2 rounded-xl',
    gradient: true,
    textColor: '#FFFFFF',
    gradientColors: {
      light: ['#16a34a', '#15803d', '#166534'],
      dark: ['#16a34a', '#15803d', '#166534'],
    },
  },
  'gradient-soft': {
    className: 'p-4 mb-2 rounded-xl',
    gradient: true,
    textColor: '#0D1B2A',
    gradientColors: {
      light: ['#E5F2FF', '#CFE0F5', '#B0C9E8'],
      dark: ['#415A77', '#1B263B', '#0D1B2A'],
    },
  },
};

export function Card({
  style,
  variant = 'default',
  shadow = false,
  disabled = false,
  interactive = false,
  fullWidth = false,
  className = '',
  borderRadius,
  children,
  ...otherProps
}: CardProps) {
  const isLightMode = useColorScheme() === 'light';
  const variantConfig = cardVariants[variant];

  const baseClasses = [
    fullWidth ? 'w-full' : 'w-auto',
    disabled ? 'opacity-50' : '',
    interactive ? 'active:scale-95 active:opacity-80' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Determine border radius priority: explicit prop > className > default
  const getEffectiveBorderRadius = (): number => {
    if (borderRadius !== undefined) return borderRadius;

    const classNameRadius = getBorderRadiusFromClassName(className);
    if (classNameRadius !== undefined) return classNameRadius;

    return 12; // Default fallback
  };

  const getShadowStyle = () => {
    const shouldShowShadow =
      shadow || ('shadow' in variantConfig && variantConfig.shadow);
    if (!shouldShowShadow) return {};

    if (Platform.OS === 'ios') {
      return {
        shadowColor: isLightMode ? '#000000' : '#ffffff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isLightMode ? 0.12 : 0.25,
        shadowRadius: 8,
      };
    } else {
      return {
        elevation: 3,
        backgroundColor: 'transparent',
      };
    }
  };

  const renderCardContent = () => {
    if (variantConfig.gradient && 'gradientColors' in variantConfig) {
      const gradientColors = isLightMode
        ? variantConfig.gradientColors.light
        : variantConfig.gradientColors.dark;

      const effectiveBorderRadius = getEffectiveBorderRadius();

      return (
        <LinearGradient
          colors={gradientColors as GradientColor}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            {
              borderRadius: effectiveBorderRadius,
              padding: 16, // p-4 equivalent
              marginBottom: 8, // mb-2 equivalent
            },
            style,
          ]}
          className={baseClasses}
          {...otherProps}
        >
          {children}
        </LinearGradient>
      );
    }

    const cardStyle = [
      'backgroundColor' in variantConfig &&
        variantConfig.backgroundColor && {
          backgroundColor: variantConfig.backgroundColor,
        },
      style,
    ].filter(Boolean);

    return (
      <View
        style={cardStyle}
        className={`${variantConfig.className} ${baseClasses}`}
        {...otherProps}
      >
        {children}
      </View>
    );
  };

  if (shadow || ('shadow' in variantConfig && variantConfig.shadow)) {
    return <View style={getShadowStyle()}>{renderCardContent()}</View>;
  }

  return renderCardContent();
}