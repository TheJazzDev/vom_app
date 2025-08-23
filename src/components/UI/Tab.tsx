import React, { useEffect, useRef } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from './Text';

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
  scrollable?: boolean;
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
  scrollable = false,
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

  const getContainerStyle = () => {
    const baseStyle = 'relative flex-row overflow-hidden';

    const backgroundStyle = {
      elevated: 'bg-background dark:bg-dark-background',
      primary: 'bg-primary/10 dark:bg-dark-primary/20',
      secondary: 'bg-secondary/10 dark:bg-dark-secondary/20',
      transparent: 'bg-transparent',
      gradient: '',
    }[background];

    const variantStyle = {
      default: '',
      pills: 'p-1',
      underline: '',
      buttons: fullWidth ? 'gap-2' : 'gap-2 justify-center',
      minimal: '',
      cards: 'gap-0',
      none: '',
    }[variant];

    const roundedStyle = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    }[
      variant === 'pills' ? 'full' : variant === 'underline' ? 'none' : rounded
    ];

    const spacingStyle = {
      tight: variant === 'buttons' ? 'gap-1' : 'gap-0',
      normal: variant === 'buttons' ? 'gap-2' : '',
      loose: variant === 'buttons' ? 'gap-4' : '',
    }[spacing];

    return `${baseStyle} ${backgroundStyle} ${variantStyle} ${roundedStyle} ${spacingStyle}`.trim();
  };

  const getTabStyle = (isActive: boolean, isDisabled: boolean) => {
    const baseStyle = 'items-center justify-center';

    const sizeStyle = {
      sm: 'py-2 px-3',
      md: 'py-3 px-4',
      lg: 'py-4 px-6',
    }[size];

    const widthStyle =
      variant === 'buttons' || variant === 'cards'
        ? 'flex-1'
        : fullWidth
          ? 'flex-1'
          : '';

    let variantStyle = '';

    switch (variant) {
      case 'default':
        variantStyle = isActive
          ? 'bg-primary/20 dark:bg-dark-primary/20'
          : 'bg-transparent';
        break;
      case 'pills':
        // Remove background - let the animated indicator handle it
        variantStyle = 'bg-transparent rounded-full mx-0.5 relative z-10';
        break;
      case 'underline':
        variantStyle = 'bg-transparent';
        break;
      case 'buttons':
        // Remove background for active state - let the animated indicator handle it
        variantStyle =
          'bg-transparent border border-primary/30 dark:border-dark-primary/30 rounded-md relative z-10';
        break;
      case 'minimal':
        variantStyle = isActive
          ? 'bg-primary/10 dark:bg-dark-primary/10'
          : 'bg-transparent';
        break;
      case 'cards':
        // Remove background - let the animated indicator handle it
        variantStyle = 'bg-transparent rounded-lg mx-1 relative z-10';
        break;
      default:
        variantStyle = isActive
          ? 'bg-primary/10 dark:bg-dark-primary/10'
          : 'bg-transparent';
    }

    const disabledStyle = isDisabled ? 'opacity-50' : '';

    return `${baseStyle} ${sizeStyle} ${widthStyle} ${variantStyle} ${disabledStyle}`.trim();
  };

  const getTextColor = (isActive: boolean, isDisabled: boolean) => {
    if (isDisabled) return 'tertiary';

    switch (variant) {
      case 'default':
        return isActive ? 'inverse' : 'primary';
      case 'pills':
      case 'buttons':
      case 'cards':
        return isActive ? 'neutral' : 'body';
      case 'underline':
      case 'minimal':
        return isActive ? 'brand' : 'body';
      default:
        return isActive ? 'brand' : 'inverse';
    }
  };

  const getIndicatorStyle = () => {
    if (!showIndicator) return null;

    const baseStyle = 'absolute bg-primary dark:bg-dark-primary';

    // Handle variants that need background sliding animation
    if (['pills', 'buttons', 'cards'].includes(variant)) {
      switch (variant) {
        case 'pills':
          return `top-1 bottom-1 rounded-full ${baseStyle}`;
        case 'buttons':
          return `top-0 bottom-0 rounded-md ${baseStyle}`;
        case 'cards':
          return `top-1 bottom-1 rounded-lg ${baseStyle} mx-1`;
        default:
          return null;
      }
    }

    switch (indicatorType) {
      case 'line':
        return 'bottom-0 h-1 rounded-t-md ' + baseStyle;
      case 'dot':
        return 'absolute bottom-0 h-2 w-2 rounded-full ' + baseStyle;
      case 'background':
        return 'top-0 bottom-0 rounded-md opacity-20 ' + baseStyle;
      case 'border':
        return 'top-0 bottom-0 w-0.5 left-0 ' + baseStyle;
      default:
        return 'bottom-0 h-0.5 ' + baseStyle;
    }
  };

  const renderIndicator = () => {
    const indicatorStyle = getIndicatorStyle();

    if (!indicatorStyle || !widths.current[activeIndex]) return null;

    let animatedStyle = {};

    if (indicatorType === 'dot') {
      animatedStyle = { left: indicator };
    } else if (['pills', 'buttons', 'cards'].includes(variant)) {
      // For background sliding variants, animate both width and position
      animatedStyle = {
        width: widths.current[activeIndex],
        left: indicator,
        zIndex: -1, // Place behind the tab content
      };
    } else {
      animatedStyle = { width: widths.current[activeIndex], left: indicator };
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
            disabled={isDisabled}
            key={String(tab.value)}
            onLayout={(e) => handleLayout(e, i)}
            className={getTabStyle(isActive, isDisabled)}
            onPress={() => !isDisabled && onChange(tab.value)}
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
