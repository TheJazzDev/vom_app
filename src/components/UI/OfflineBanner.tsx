import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { IconSymbol } from '../Icons';
import { useNetworkStatus } from '@/src/hooks/useNetworkStatus';

interface OfflineBannerProps {
  /**
   * Custom message to display when offline
   */
  message?: string;
  /**
   * Whether to show a retry button
   */
  showRetry?: boolean;
  /**
   * Callback when retry is pressed
   */
  onRetry?: () => void;
}

/**
 * A snackbar that appears at the bottom of the screen when the device is offline.
 * Automatically shows/hides based on network status.
 */
export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  message = "You're offline",
  showRetry = true,
  onRetry,
}) => {
  const { isOffline, refresh } = useNetworkStatus();
  const translateY = useRef(new Animated.Value(200)).current;
  const [shouldRender, setShouldRender] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isOffline) {
      setShouldRender(true);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 200,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        // Only unmount after animation completes
        setShouldRender(false);
      });
    }
  }, [isOffline, translateY]);

  const triggerHaptic = async (
    type: 'light' | 'medium' | 'success'
  ) => {
    try {
      if (type === 'light') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else if (type === 'medium') {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (error) {
      console.debug('[OfflineBanner] Haptic feedback not available:', error);
    }
  };

  const handleRetry = async () => {
    if (isRefreshing) return;

    try {
      setIsRefreshing(true);

      // Initial haptic feedback
      triggerHaptic('light');

      // Check network status
      const status = await refresh();

      // Give user time to see the loading state
      await new Promise(resolve => setTimeout(resolve, 500));

      if (status.isConnected && status.isInternetReachable !== false) {
        // Network is back - haptic success
        triggerHaptic('success');
      } else {
        // Still offline - gentle haptic
        triggerHaptic('medium');
      }

      onRetry?.();
    } catch (error) {
      console.error('[OfflineBanner] Error refreshing:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Don't render at all when not needed (after animation)
  if (!shouldRender && !isOffline) {
    return null;
  }

  // Calculate bottom position
  // Tab bar height is 85px which already includes safe area handling
  // Just add spacing above the tab bar
  const bottomPosition = 85 + 16;

  return (
    <Animated.View
      className="absolute left-4 right-4 z-[999]"
      style={{
        transform: [{ translateY }],
        bottom: bottomPosition,
      }}
      pointerEvents={isOffline ? 'auto' : 'none'}
    >
      <View className="flex-row items-center bg-gray-800 rounded-xl px-4 py-3 shadow-lg">
        <View className="w-9 h-9 rounded-full bg-red-500 justify-center items-center mr-3">
          <IconSymbol name="wifi.slash" size={18} color="#FFFFFF" />
        </View>

        <View className="flex-1">
          <Text className="text-sm font-semibold text-white mb-0.5" numberOfLines={1}>
            {isRefreshing ? 'Checking connection...' : message}
          </Text>
          <Text className="text-xs text-gray-400" numberOfLines={1}>
            {isRefreshing ? 'Please wait' : 'Some features may be unavailable'}
          </Text>
        </View>

        {showRetry && (
          <Pressable
            className={`w-9 h-9 rounded-full justify-center items-center ml-2 ${
              isRefreshing ? 'opacity-60' : ''
            }`}
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            onPress={handleRetry}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <IconSymbol name="arrow.clockwise" size={16} color="#FFFFFF" />
            )}
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
};

export default OfflineBanner;
