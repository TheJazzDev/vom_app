import React, { useEffect, useRef } from 'react';
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
  const translateY = useRef(new Animated.Value(-100)).current;
  const isVisible = useRef(false);

  useEffect(() => {
    if (isOffline && !isVisible.current) {
      isVisible.current = true;
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 12,
      }).start();
    } else if (!isOffline && isVisible.current) {
      isVisible.current = false;
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isOffline, translateY]);

  const handleRetry = async () => {
    await refresh();
    onRetry?.();
  };

  // Always render but animate visibility
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          paddingTop: insets.top + 8,
        },
      ]}
      pointerEvents={isOffline ? 'auto' : 'none'}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <IconSymbol name="wifi.slash" size={18} color="#FFFFFF" />
        </View>

        <Text style={styles.message} numberOfLines={2}>
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
            <IconSymbol name="arrow.clockwise" size={14} color="#F59E0B" />
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
    zIndex: 9998,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 12,
  },
  retryButtonPressed: {
    opacity: 0.8,
  },
  retryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F59E0B',
    marginLeft: 4,
  },
});

export default OfflineBanner;
