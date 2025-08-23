import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../UI';
import { Tab } from '../UI/Tab';

// Enhanced blur background with Card integration
export function EnhancedBlurTabBarBackground() {
  //   const tabBarHeight = useBottomTabBarHeight();

  if (Platform.OS === 'ios') {
    return (
      <BlurView
        tint='systemChromeMaterial'
        intensity={100}
        style={StyleSheet.absoluteFill}
      />
    );
  }

  // Android fallback with Card gradient
  return (
    <Card
      // gradient
      // gradientType='subtle'
      shadow
      style={[
        StyleSheet.absoluteFill,
        {
          borderRadius: 0,
          marginBottom: 0,
        },
      ]}
    />
  );
}

// Custom Tab Bar Component using your Tab component
interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: CustomTabBarProps) {
  const insets = useSafeAreaInsets();

  // Calculate tab bar height manually
  // Base height + bottom safe area inset
  const tabBarHeight = 60 + insets.bottom;

  // Convert navigation state to Tab component format
  const tabs = state.routes.map((route: any, index: number) => {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel || options.title || route.name;

    return {
      label,
      value: route.key,
      icon: options.tabBarIcon
        ? options.tabBarIcon({
            focused: state.index === index,
            color: state.index === index ? '#8B5CF6' : '#6B7280',
            size: 24,
          })
        : undefined,
    };
  });

  const handleTabChange = (routeKey: string) => {
    const route = state.routes.find((r: any) => r.key === routeKey);
    if (route) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View
      style={[
        styles.tabBarContainer,
        { height: tabBarHeight, paddingBottom: insets.bottom },
      ]}>
      {/* Background */}
      <EnhancedBlurTabBarBackground />

      {/* Tab Content */}
      <View style={styles.tabContent}>
        <Tab
          tabs={tabs}
          value={state.routes[state.index].key}
          onChange={handleTabChange}
          variant='minimal'
          background='transparent'
          size='sm'
          showIndicator={false}
          fullWidth
        />
      </View>
    </View>
  );
}

// Alternative: Floating Tab Bar with Card
export function FloatingTabBar({
  state,
  descriptors,
  navigation,
}: CustomTabBarProps) {
  const tabs = state.routes.map((route: any, index: number) => {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel || options.title || route.name;

    return {
      label,
      value: route.key,
      icon: options.tabBarIcon
        ? options.tabBarIcon({
            focused: state.index === index,
            color: state.index === index ? '#FFFFFF' : '#9CA3AF',
            size: 20,
          })
        : undefined,
    };
  });

  const handleTabChange = (routeKey: string) => {
    const route = state.routes.find((r: any) => r.key === routeKey);
    if (route) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View style={styles.floatingContainer}>
      <Card
        // gradient
        // gradientType='brand'
        shadow
        style={styles.floatingCard}>
        <Tab
          tabs={tabs}
          value={state.routes[state.index].key}
          onChange={handleTabChange}
          variant='pills'
          background='transparent'
          size='sm'
          fullWidth
        />
      </Card>
    </View>
  );
}

// Card-based Tab Bar
export function CardTabBar({
  state,
  descriptors,
  navigation,
}: CustomTabBarProps) {
  const insets = useSafeAreaInsets();

  // Calculate tab bar height manually
  // Base height + bottom safe area inset
  const tabBarHeight = 60 + insets.bottom;

  const tabs = state.routes.map((route: any, index: number) => {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel || options.title || route.name;

    return {
      label,
      value: route.key,
      icon: options.tabBarIcon
        ? options.tabBarIcon({
            focused: state.index === index,
            color: state.index === index ? '#FFFFFF' : '#6B7280',
            size: 22,
          })
        : undefined,
    };
  });

  const handleTabChange = (routeKey: string) => {
    const route = state.routes.find((r: any) => r.key === routeKey);
    if (route) {
      navigation.navigate(route.name);
    }
  };

  return (
    <Card
      // gradient
      // gradientType='subtle'
      shadow
      style={[
        styles.cardTabBarContainer,
        { height: tabBarHeight + 10 }, // Extra padding
      ]}>
      <Tab
        tabs={tabs}
        value={state.routes[state.index].key}
        onChange={handleTabChange}
        variant='cards'
        background='transparent'
        size='md'
        fullWidth
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 20 : 16,
  },
  floatingContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  floatingCard: {
    marginBottom: 0,
    paddingHorizontal: 8,
    paddingVertical: 6,
    minWidth: '100%',
  },
  cardTabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 0,
    marginBottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
  },
});

// Usage in your navigator
export const TabBarComponents = {
  CustomTabBar,
  FloatingTabBar,
  CardTabBar,
  EnhancedBlurTabBarBackground,
};
