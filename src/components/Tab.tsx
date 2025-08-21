import React, { useEffect, useRef } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from './UI';

interface Tab<T> {
  label: string;
  value: T;
  count?: number;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabProps<T> {
  tabs: Tab<T>[];
  value: T;
  onChange: (val: T) => void;
  variant?: 'default' | 'pills' | 'underline' | 'buttons' | 'minimal' | 'cards';
  background?:
    | 'elevated'
    | 'primary'
    | 'secondary'
    | 'transparent'
    | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  // scrollable?: boolean;
  showIndicator?: boolean;
  indicatorType?: 'line' | 'dot' | 'background' | 'border';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  spacing?: 'tight' | 'normal' | 'loose';
  animationType?: 'spring' | 'timing' | 'none';
}

export function Tab<T>({
  tabs,
  value,
  onChange,
  variant = 'default',
  background = 'elevated',
  size = 'md',
  fullWidth = true,
  // scrollable = false,
  showIndicator = true,
  indicatorType = 'line',
  rounded = 'lg',
  spacing = 'normal',
  animationType = 'spring',
}: TabProps<T>) {
  const widths = useRef<number[]>([]);
  const positions = useRef<number[]>([]);
  const indicator = useRef(new Animated.Value(0)).current;
  const activeIndex = tabs.findIndex((t) => t.value === value);

  useEffect(() => {
    if (
      positions.current[activeIndex] !== undefined &&
      animationType !== 'none'
    ) {
      const animation =
        animationType === 'spring'
          ? Animated.spring(indicator, {
              toValue: positions.current[activeIndex],
              useNativeDriver: false,
              tension: 100,
              friction: 8,
            })
          : Animated.timing(indicator, {
              toValue: positions.current[activeIndex],
              duration: 200,
              useNativeDriver: false,
            });

      animation.start();
    }
  }, [activeIndex, animationType]);

  const handleLayout = (e: LayoutChangeEvent, i: number) => {
    const { width, x } = e.nativeEvent.layout;
    widths.current[i] = width;
    positions.current[i] = x;
  };

  // Get container styles based on variant and background
  const getContainerStyle = () => {
    const baseStyle = 'relative flex-row overflow-hidden';

    // Background styles
    const backgroundStyle = {
      elevated: 'bg-background-elevated dark:bg-background-dark-elevated',
      primary: 'bg-brand-primary dark:bg-brand-primary',
      secondary: 'bg-background-secondary dark:bg-background-dark-secondary',
      transparent: 'bg-transparent',
      gradient: '', // Will be handled separately
    }[background];

    // Variant-specific styles with container padding for pills
    const variantStyle = {
      default: 'border border-border-primary dark:border-border-dark-primary',
      pills: 'p-1', // Add padding inside container for pills
      underline:
        'border-b border-border-primary dark:border-border-dark-primary',
      buttons: fullWidth ? 'gap-2' : 'gap-2 justify-center', // Handle fullWidth for buttons
      minimal: '',
      cards: 'gap-0', // Remove gap for cards, handle spacing differently
    }[variant];

    // Rounded styles - pills should match container radius
    let roundedStyle = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    }[rounded];

    // For pills variant, always use full rounding to match pill shape
    if (variant === 'pills') {
      roundedStyle = 'rounded-full';
    }

    // Spacing styles
    const spacingStyle = {
      tight:
        variant === 'buttons'
          ? 'gap-1'
          : variant === 'cards'
            ? 'gap-0'
            : 'gap-0',
      normal:
        variant === 'buttons' ? 'gap-2' : variant === 'cards' ? 'gap-0' : '',
      loose:
        variant === 'buttons' ? 'gap-4' : variant === 'cards' ? 'gap-0' : '',
    }[spacing];

    return `${baseStyle} ${backgroundStyle} ${variantStyle} ${roundedStyle} ${spacingStyle}`.trim();
  };

  // Get tab styles based on variant and state
  const getTabStyle = (isActive: boolean, isDisabled: boolean) => {
    const baseStyle = 'items-center justify-center';

    // Size styles
    const sizeStyle = {
      sm: 'py-2 px-3',
      md: 'py-3 px-4',
      lg: 'py-4 px-6',
    }[size];

    // Width style - handle fullWidth properly for each variant
    let widthStyle = '';
    if (variant === 'buttons') {
      // For buttons, flex-1 only when fullWidth is true
      widthStyle = fullWidth ? 'flex-1' : '';
    } else if (variant === 'cards') {
      // Cards always take full width and distribute evenly
      widthStyle = 'flex-1';
    } else {
      // Default behavior for other variants
      widthStyle = fullWidth ? 'flex-1' : '';
    }

    // Variant-specific styles
    let variantStyle = '';
    switch (variant) {
      case 'default':
        variantStyle = isActive ? 'bg-interactive-primary' : 'bg-transparent';
        break;
      case 'pills':
        variantStyle = isActive
          ? 'bg-brand-primary rounded-full mx-0.5' // Small margin for pill separation
          : 'bg-transparent rounded-full mx-0.5';
        break;
      case 'underline':
        variantStyle = 'bg-transparent';
        break;
      case 'buttons':
        variantStyle = isActive
          ? 'bg-brand-primary border border-brand-primary rounded-md'
          : 'bg-transparent border border-border-primary dark:border-border-dark-primary rounded-md';
        break;
      case 'minimal':
        variantStyle = isActive ? 'bg-brand-primary/10' : 'bg-transparent';
        break;
      case 'cards':
        variantStyle = isActive
          ? 'bg-brand-primary rounded-lg shadow-sm mx-1' // Small margin for card separation
          : 'bg-background-secondary dark:bg-background-dark-secondary rounded-lg mx-1';
        break;
    }

    // Disabled style
    const disabledStyle = isDisabled ? 'opacity-50' : '';

    return `${baseStyle} ${sizeStyle} ${widthStyle} ${variantStyle} ${disabledStyle}`.trim();
  };

  // Get text color based on variant and state
  const getTextColor = (isActive: boolean, isDisabled: boolean) => {
    if (isDisabled) return 'tertiary';

    switch (variant) {
      case 'default':
      case 'pills':
      case 'buttons':
      case 'cards':
        return isActive ? 'inverse' : 'primary';
      case 'underline':
      case 'minimal':
        return isActive ? 'brand' : 'primary';
      default:
        return isActive ? 'inverse' : 'primary';
    }
  };

  // Get indicator style
  const getIndicatorStyle = () => {
    if (
      !showIndicator ||
      variant === 'pills' ||
      variant === 'buttons' ||
      variant === 'cards'
    ) {
      return null;
    }

    const baseStyle = 'absolute bg-brand-primary';

    switch (indicatorType) {
      case 'line':
        return variant === 'underline'
          ? `${baseStyle} bottom-0 h-0.5`
          : `${baseStyle} bottom-0 h-0.5`;
      case 'dot':
        return `${baseStyle} bottom-1 h-1 w-1 rounded-full left-1/2 transform -translate-x-1/2`;
      case 'background':
        return `${baseStyle} top-0 bottom-0 rounded-md opacity-20`;
      case 'border':
        return `${baseStyle} top-0 bottom-0 w-0.5 left-0`;
      default:
        return `${baseStyle} bottom-0 h-0.5`;
    }
  };

  const renderIndicator = () => {
    const indicatorStyle = getIndicatorStyle();
    if (!indicatorStyle || !widths.current[activeIndex]) return null;

    let animatedStyle = {};

    switch (indicatorType) {
      case 'dot':
        animatedStyle = { left: indicator };
        break;
      case 'background':
      case 'border':
        animatedStyle = {
          width: widths.current[activeIndex],
          left: indicator,
        };
        break;
      default: // line
        animatedStyle = {
          width: widths.current[activeIndex],
          left: indicator,
        };
    }

    return <Animated.View className={indicatorStyle} style={animatedStyle} />;
  };

  return (
    <View className={getContainerStyle()}>
      {tabs.map((tab, i) => {
        const isActive = value === tab.value;
        const isDisabled = tab.disabled || false;

        return (
          <TouchableOpacity
            key={String(tab.value)}
            onPress={() => !isDisabled && onChange(tab.value)}
            onLayout={(e) => handleLayout(e, i)}
            className={getTabStyle(isActive, isDisabled)}
            disabled={isDisabled}
            activeOpacity={isDisabled ? 1 : 0.7}>
            <View className='flex-row items-center justify-center gap-2'>
              {tab.icon && <View className='opacity-80'>{tab.icon}</View>}

              <Text
                variant={
                  size === 'sm' ? 'caption' : size === 'lg' ? 'h5' : 'h6'
                }
                color={getTextColor(isActive, isDisabled)}
                className='font-medium text-center'>
                {tab.label}
                {typeof tab.count === 'number' ? ` (${tab.count})` : ''}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}

      {renderIndicator()}
    </View>
  );
}

export default Tab;
