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
  const layoutComplete = useRef<boolean[]>([]);
  const activeIndex = tabs.findIndex((t) => t.value === value);

  // Initialize indicator position after all layouts are complete
  useEffect(() => {
    const allLayoutsComplete =
      layoutComplete.current.length === tabs.length &&
      layoutComplete.current.every(Boolean);

    if (allLayoutsComplete && positions.current[activeIndex] !== undefined) {
      if (animationType === 'none') {
        indicator.setValue(positions.current[activeIndex]);
      } else {
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
    }
  }, [activeIndex, animationType, layoutComplete.current]);

  const handleLayout = (e: LayoutChangeEvent, i: number) => {
    const { width, x } = e.nativeEvent.layout;
    widths.current[i] = width;
    positions.current[i] = x;
    layoutComplete.current[i] = true;
  };

  const getContainerStyle = () => {
    const baseStyle = 'relative flex-row overflow-hidden';

    const backgroundStyle = {
      elevated: 'bg-card dark:bg-dark-card',
      primary: 'bg-brand/10 dark:bg-dark-brand/20',
      secondary: 'bg-secondary/10 dark:bg-dark-secondary/20',
      transparent: 'bg-transparent',
      gradient:
        'bg-gradient-to-r from-gradient1 to-gradient2 dark:from-dark-gradient1 dark:to-dark-gradient2',
    }[background];

    const variantStyle = {
      default: '',
      pills: 'p-1',
      underline: '',
      buttons: fullWidth ? 'gap-2' : 'gap-2 justify-center',
      minimal: '',
      cards: 'gap-1',
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
    const baseStyle = 'items-center justify-center transition-colors';

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
      case 'pills':
        variantStyle = isActive
          ? 'bg-brand text-white rounded-full dark:bg-dark-brand'
          : 'bg-transparent text-body rounded-full hover:bg-surface dark:hover:bg-dark-surface';
        break;
      case 'underline':
        variantStyle = isActive
          ? 'border-b-2 border-brand text-brand dark:border-dark-brand dark:text-dark-brand'
          : 'text-body dark:text-dark-body border-b-2 border-transparent';
        break;
      case 'buttons':
        variantStyle = isActive
          ? 'bg-brand text-white rounded-md dark:bg-dark-brand'
          : 'border border-border text-body rounded-md dark:border-dark-border dark:text-dark-body hover:bg-surface dark:hover:bg-dark-surface';
        break;
      case 'cards':
        variantStyle = isActive
          ? 'bg-brand text-white rounded-lg dark:bg-dark-brand'
          : 'bg-card text-body rounded-lg border border-border dark:bg-dark-card dark:text-dark-body dark:border-dark-border hover:bg-surface dark:hover:bg-dark-surface';
        break;
      case 'minimal':
        variantStyle = isActive
          ? 'text-brand dark:text-dark-brand'
          : 'text-body dark:text-dark-body';
        break;
      default:
        variantStyle = isActive
          ? 'bg-brand/10 text-brand rounded-md dark:bg-dark-brand/20 dark:text-dark-brand'
          : 'text-body dark:text-dark-body hover:bg-surface dark:hover:bg-dark-surface';
    }

    const disabledStyle = isDisabled ? 'opacity-50' : '';

    return `${baseStyle} ${sizeStyle} ${widthStyle} ${variantStyle} ${disabledStyle}`.trim();
  };

  const getTextColor = (isActive: boolean, isDisabled: boolean) => {
    if (isDisabled) return 'muted';

    // For variants that handle their own text colors in styles
    if (['pills', 'buttons', 'cards'].includes(variant) && isActive) {
      return 'inverse';
    }

    return isActive ? 'brand' : 'body';
  };

  const getIndicatorStyle = () => {
    if (!showIndicator) return null;

    const baseStyle = 'absolute bg-brand dark:bg-dark-brand';

    // Handle variants that need background sliding animation
    if (['pills', 'buttons', 'cards'].includes(variant)) {
      switch (variant) {
        case 'pills':
          return `top-1 bottom-1 rounded-full ${baseStyle}`;
        case 'buttons':
          return `top-0 bottom-0 rounded-md ${baseStyle}`;
        case 'cards':
          return `top-0 bottom-0 rounded-lg ${baseStyle}`;
        default:
          return null;
      }
    }

    switch (indicatorType) {
      case 'line':
        return `bottom-0 h-1 rounded-t-md ${baseStyle}`;
      case 'dot':
        return `bottom-1 h-1.5 w-1.5 rounded-full ${baseStyle} left-1/2 transform -translate-x-1/2`;
      case 'background':
        return `top-0 bottom-0 rounded-md opacity-10 ${baseStyle}`;
      case 'border':
        return `top-0 bottom-0 w-0.5 left-0 rounded-r-sm ${baseStyle}`;
      default:
        return `bottom-0 h-0.5 ${baseStyle}`;
    }
  };

  const renderIndicator = () => {
    const indicatorStyle = getIndicatorStyle();

    if (!indicatorStyle || !widths.current[activeIndex] || activeIndex === -1) {
      return null;
    }

    let animatedStyle = {};

    if (indicatorType === 'dot') {
      // For dot indicator, center it within the tab
      animatedStyle = {
        left: Animated.add(
          indicator,
          Animated.multiply(
            new Animated.Value(widths.current[activeIndex] || 0),
            0.5
          )
        ),
      };
    } else if (['pills', 'buttons', 'cards'].includes(variant)) {
      // For background sliding variants, animate both width and position
      animatedStyle = {
        width: widths.current[activeIndex],
        left: indicator,
        zIndex: -1, // Place behind the tab content
      };
    } else {
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
