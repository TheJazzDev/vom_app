import React, { useEffect, useRef } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../hooks';
import { Text } from './themed-ui';

interface Tab<T> {
  label: string;
  value: T;
  count?: number;
}

interface TabsProps<T> {
  tabs: Tab<T>[];
  value: T;
  onChange: (val: T) => void;
}

export function Tabs<T>({ tabs, value, onChange }: TabsProps<T>) {
  const theme = useTheme();
  const widths = useRef<number[]>([]);
  const positions = useRef<number[]>([]);
  const indicator = useRef(new Animated.Value(0)).current;
  const activeIndex = tabs.findIndex((t) => t.value === value);

  useEffect(() => {
    if (positions.current[activeIndex] !== undefined) {
      Animated.spring(indicator, {
        toValue: positions.current[activeIndex],
        useNativeDriver: false,
      }).start();
    }
  }, [activeIndex]);

  const handleLayout = (e: LayoutChangeEvent, i: number) => {
    const { width, x } = e.nativeEvent.layout;
    widths.current[i] = width;
    positions.current[i] = x;
  };

  return (
    <View className='relative flex-row border border-border-primary dark:border-border-dark-primary bg-background-elevated dark:bg-background-dark-elevated rounded-lg overflow-hidden'>
      {tabs.map((tab, i) => {
        const isActive = value === tab.value;

        return (
          <TouchableOpacity
            key={String(tab.value)}
            onPress={() => onChange(tab.value)}
            onLayout={(e) => handleLayout(e, i)}
            className={`flex-1 py-3 items-center justify-center ${
              isActive ? 'bg-interactive-primary' : 'bg-transparent'
            }`}>
            <Text
              variant='h6'
              color={isActive ? 'neutral' : 'primary'}
              className='font-medium'>
              {tab.label}
              {typeof tab.count === 'number' ? ` (${tab.count})` : ''}
            </Text>
          </TouchableOpacity>
        );
      })}

      {widths.current[activeIndex] && (
        <Animated.View
          className='absolute bottom-0 h-0.5 bg-brand-primary'
          style={{
            width: widths.current[activeIndex],
            left: indicator,
          }}
        />
      )}
    </View>
  );
}

export default Tab;
