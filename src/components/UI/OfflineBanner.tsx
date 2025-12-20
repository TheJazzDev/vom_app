import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();
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
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          bottom: bottomPosition,
        },
      ]}
      pointerEvents={isOffline ? 'auto' : 'none'}
    >
      <View style={styles.snackbar}>
        <View style={styles.iconContainer}>
          <IconSymbol name="wifi.slash" size={18} color="#FFFFFF" />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.message} numberOfLines={1}>
            {isRefreshing ? 'Checking connection...' : message}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {isRefreshing ? 'Please wait' : 'Some features may be unavailable'}
          </Text>
        </View>

        {showRetry && (
          <Pressable
            style={({ pressed }) => [
              styles.retryButton,
              pressed && !isRefreshing && styles.retryButtonPressed,
              isRefreshing && styles.retryButtonDisabled,
            ]}
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

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 999,
  },
  snackbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  retryButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  retryButtonPressed: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  retryButtonDisabled: {
    opacity: 0.6,
  },
});

export default OfflineBanner;
