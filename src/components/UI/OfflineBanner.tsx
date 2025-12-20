import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
 * A banner that appears at the top of the screen when the device is offline.
 * Automatically shows/hides based on network status.
 */
export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  message = "You're offline. Some features may be unavailable.",
  showRetry = true,
  onRetry,
}) => {
  const { isOffline, refresh } = useNetworkStatus();
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-200)).current;
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOffline) {
      setShouldRender(true);
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 12,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: -200,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        // Only unmount after animation completes
        setShouldRender(false);
      });
    }
  }, [isOffline, translateY]);

  const handleRetry = async () => {
    await refresh();
    onRetry?.();
  };

  // Don't render at all when not needed (after animation)
  if (!shouldRender && !isOffline) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          paddingTop: insets.top + 4,
        },
      ]}
      pointerEvents={isOffline ? 'auto' : 'none'}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <IconSymbol name="wifi.slash" size={16} color="#FFFFFF" />
        </View>

        <Text style={styles.message} numberOfLines={1}>
          {message}
        </Text>

        {showRetry && (
          <Pressable
            style={({ pressed }) => [
              styles.retryButton,
              pressed && styles.retryButtonPressed,
            ]}
            onPress={handleRetry}
          >
            <IconSymbol name="arrow.clockwise" size={12} color="#F59E0B" />
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F59E0B',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    paddingBottom: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  message: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 16,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginLeft: 8,
  },
  retryButtonPressed: {
    opacity: 0.8,
  },
  retryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
    marginLeft: 3,
  },
});

export default OfflineBanner;
